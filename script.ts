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
})();
