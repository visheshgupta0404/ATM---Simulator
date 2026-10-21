const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createAccount, parseAmount } = require('../account');
test('negative withdrawals cannot increase a balance', () => {
  const account = createAccount();
  assert.throws(() => account.withdraw('-200'), /positive/);
  assert.equal(account.balance(), 1000000);
});
test('invalid inputs cannot poison or change the balance', () => {
  for (const amount of ['', ' ', 'abc', 'NaN', 'Infinity', '0', '-1', '1e3', '1.234', '1,000', '₹50', '+1']) {
    const account = createAccount();
    assert.throws(() => account.deposit(amount));
    assert.throws(() => account.withdraw(amount));
    assert.equal(account.balance(), 1000000);
  }
});
test('decimal transactions use exact integer paise', () => {
  const account = createAccount('0.10');
  account.deposit('0.20');
  assert.equal(account.balance(), 30);
  account.withdraw('0.30');
  assert.equal(account.balance(), 0);
  account.deposit('5.5');
  assert.equal(account.balance(), 550);
});
test('overdraft fails without changing the balance; withdrawing all is allowed', () => {
  const account = createAccount('100');
  assert.throws(() => account.withdraw('100.01'), /Insufficient/);
  assert.equal(account.balance(), 10000);
  account.withdraw('100');
  assert.equal(account.balance(), 0);
});
test('balance overflow and oversized amounts are rejected', () => {
  assert.throws(() => parseAmount('90071992547409.92'), /limit/);
  const account = createAccount('90071992547409.90');
  assert.throws(() => account.deposit('0.02'), /limit/);
  assert.equal(account.balance(), 9007199254740990);
});
test('accounts are isolated, and callers cannot overwrite their balance', () => {
  const first = createAccount(), second = createAccount();
  first.withdraw('1');
  assert.equal(second.balance(), 1000000);
  const transaction = first.deposit('1');
  assert.ok(Object.isFrozen(first));
  assert.ok(Object.isFrozen(transaction));
  assert.equal(first.balance(), 1000000);
});
