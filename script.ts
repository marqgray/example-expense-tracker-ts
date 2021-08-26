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

  localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
  transactions =
    localStorage.getItem("transactions") !== null
      ? this.localStorageTransactions
      : [];

  constructor() {
    this.init();
    this.htmlElements.form.addEventListener("submit", (e) => {
      this.addTransaction(e);
    });
  }

  addTransaction(e: Event) {
    e.preventDefault();
    if (
      this.htmlElements.text.value.trim() === "" ||
      this.htmlElements.amount.value.trim() === ""
    ) {
      alert("Please add text and amount.");
    } else {
      const transaction: Transaction = {
        id: this.generateId(),
        text: this.htmlElements.text.value,
        amount: Number(this.htmlElements.amount.value),
      };
      this.transactions.push(transaction);
      this.addTransactionDOM(transaction);
      this.updateValues();
      this.updateLocalStorage();
      this.htmlElements.text.value = "";
      this.htmlElements.amount.value = "";
    }
  }

  generateId() {
    return Math.floor(Math.random() * 1000000000);
  }

  updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }

  init() {
    this.htmlElements.list.innerHTML = "";
    this.transactions.forEach((transaction) => {
      this.addTransactionDOM(transaction);
    });
    this.updateValues();
  }

  addTransactionDOM(transaction: Transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `
      ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
      <button class="delete-btn" onclick="app.removeTransaction(${
        transaction.id
      })">x</button>
    `;
    this.htmlElements.list.appendChild(item);
  }

  removeTransaction(id) {
    this.transactions = this.transactions.filter(
      (transaction) => transaction.id !== id
    );
    this.updateLocalStorage();
    this.init();
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
