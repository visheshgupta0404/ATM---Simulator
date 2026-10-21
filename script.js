"use strict";
const account = Account.createAccount();
const format = paise => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(paise / 100);
const balance = document.getElementById("Bal");
const status = document.getElementById("status");
const history = document.getElementById("transactions");
balance.textContent = format(account.balance());

for (const kind of ["deposit", "withdrawal"]) {
  const form = document.getElementById(`${kind}-form`);
  const input = form.querySelector("input");
  form.addEventListener("submit", event => {
    event.preventDefault();
    input.removeAttribute("aria-invalid");
    try {
      const transaction = kind === "deposit" ? account.deposit(input.value) : account.withdraw(input.value);
      balance.textContent = format(account.balance());
      status.textContent = `${kind === "deposit" ? "Deposited" : "Withdrew"} ${format(transaction.amount)} successfully.`;
      const row = document.createElement("li");
      const label = document.createElement("span");
      label.textContent = kind === "deposit" ? "Deposit" : "Withdrawal";
      const amount = document.createElement("strong");
      amount.textContent = `${kind === "deposit" ? "+" : "−"}${format(transaction.amount)}`;
      row.append(label, amount);
      history.prepend(row);
      while (history.children.length > 10) history.lastElementChild.remove();
      document.getElementById("empty-history").hidden = true;
      input.value = "";
    } catch (error) {
      status.textContent = error.message;
      input.setAttribute("aria-invalid", "true");
    }
    input.focus();
  });
}
