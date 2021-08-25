interface Transaction {
  id: number;
  text: string;
  amount: number;
}

const app = new (class {
  htmlElements = {
    balance: <HTMLHeadingElement>document.getElementById("balance"),
    moneyDisplayPlus: <HTMLParagraphElement>(
      document.getElementById("money-plus")
    ),
    moneyDisplayMinus: <HTMLParagraphElement>(
      document.getElementById("money-minus")
    ),
    list: <HTMLUListElement>document.getElementById("list"),
    form: <HTMLFormElement>document.getElementById("form"),
    text: <HTMLInputElement>document.getElementById("text"),
    amount: <HTMLInputElement>document.getElementById("amount"),
  };
  dummyTransactions: Transaction[] = [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: 150 },
  ];
  transactions = this.dummyTransactions;

  constructor() {
    this.htmlElements.list.innerHTML = "";
    this.transactions.forEach((transaction) => {
      this.addTransactionDOM(transaction);
    });
  }

  addTransactionDOM(transaction: Transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
      <button class="delete-btn">x</button>
    `;
    this.htmlElements.list.appendChild(item);
  }

  updateValues() {
    const amounts = this.transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0)
      .toFixed(2);
    const expense = (
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1
    ).toFixed(2);

    this.htmlElements.balance.innerText = `$${total}`;
    this.htmlElements.moneyDisplayPlus.innerText = `$${income}`;
    this.htmlElements.moneyDisplayMinus.innerText = `$${expense}`;
  }
})();
