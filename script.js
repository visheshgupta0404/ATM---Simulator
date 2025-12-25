let debit = document.getElementById("enter");
let credit = document.getElementById("creditButton")
const Vishesh = (function atm(initialBalance){
    let balance = initialBalance;
    document.getElementById("Bal").innerText = `Initial Balance: ${balance}`;

    function withdrawal(amt){
        if(amt > balance){
            document.getElementById("Bal").innerText = "Not sufficient balance";
        } else {
            balance -= amt;
            document.getElementById("Bal").innerText =`Balance left: ${balance}`;
        }
    };

    function CreditAmt(amt){
        balance+=amt
        document.getElementById("Bal").innerText =`Balance left: ${balance}`;
        
    }

    return {
        withdrawal,
        CreditAmt
    }
})(10000);

debit.addEventListener("click", () => {
    let amt = Number(document.getElementById("debit").value);
    Vishesh.withdrawal(amt);
});
credit.addEventListener("click",()=>{
    let amt = Number(document.getElementById("credit").value)
    Vishesh.CreditAmt(amt)
})