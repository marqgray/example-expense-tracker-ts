interface Transaction {
  id: number;
  text: string;
  amount: number;
}

const app = new (class {
  htmlElements = {
    balance: document.getElementById("balance"),
    moneyDisplayPlus: document.getElementById("money-plus"),
    moneyDisplayMinus: document.getElementById("money-minus"),
    list: document.getElementById("list"),
    form: document.getElementById("form"),
    text: document.getElementById("text"),
    amount: document.getElementById("amount"),
  };

  dummyTransactions: Transaction[] = [
    { id: 1, text: "Flower", amount: -20 },
    { id: 2, text: "Salary", amount: 300 },
    { id: 3, text: "Book", amount: -10 },
    { id: 4, text: "Camera", amount: 150 },
  ];
})();
