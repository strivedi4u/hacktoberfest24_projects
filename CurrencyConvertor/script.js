const apiKey = "b8298bcac14286480c0cf612";

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertButton = document.getElementById("convert");

function populateCurrencyOptions() {
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data.conversion_rates);
      currencies.forEach((currency) => {
        const optionFrom = document.createElement("option");
        const optionTo = document.createElement("option");
        optionFrom.value = currency;
        optionTo.value = currency;
        optionFrom.textContent = currency;
        optionTo.textContent = currency;
        fromCurrency.appendChild(optionFrom);
        toCurrency.appendChild(optionTo);
      });
      fromCurrency.value = "USD";
      toCurrency.value = "EUR";
    });
}

function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = amount.value;

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data.conversion_rates[to];
      const convertedAmount = (amountValue * rate).toFixed(2);
      result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
    })
    .catch((error) => console.error("Error fetching exchange rates:", error));
}

convertButton.addEventListener("click", convertCurrency);
populateCurrencyOptions();
