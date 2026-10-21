"use strict";

function parseAmount(value) {
  const text = String(value).trim();
  if (!/^\d+(?:\.\d{1,2})?$/.test(text)) throw new Error("Enter a positive amount with up to two decimal places.");
  const [whole, fraction = ""] = text.split(".");
  const paise = BigInt(whole) * 100n + BigInt(fraction.padEnd(2, "0"));
  if (paise <= 0n || paise > BigInt(Number.MAX_SAFE_INTEGER)) throw new Error("Enter a positive amount within the supported limit.");
  return Number(paise);
}

function createAccount(initialAmount = "10000") {
  let balance = parseAmount(initialAmount);
  function transact(kind, amount) {
    const paise = parseAmount(amount);
    if (kind === "withdrawal" && paise > balance) throw new Error("Insufficient balance. Try a smaller withdrawal.");
    if (kind === "deposit" && paise > Number.MAX_SAFE_INTEGER - balance) throw new Error("This deposit exceeds the supported balance limit.");
    balance += kind === "deposit" ? paise : -paise;
    return Object.freeze({ kind, amount: paise, balance });
  }
  return Object.freeze({
    balance: () => balance,
    deposit: amount => transact("deposit", amount),
    withdraw: amount => transact("withdrawal", amount),
  });
}
const Account = { parseAmount, createAccount };
if (typeof module !== "undefined") module.exports = Account;
if (typeof window !== "undefined") window.Account = Account;
