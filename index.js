// console.log("HelooZ world !");
const balance = document.getElementById("balance");
const money_plus = document.getElementById("money_plus");
const money_minus = document.getElementById("money_minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");
var myChart = new Chart(document.getElementById("myChart"));
let Transactions = [];

function addTransaction(e) {
  e.preventDefault();
  if (text.value.trim(0) === "" || amount.value.trim() === "") {
    alert("Please enter text and value");
  } else {
    myChart.destroy();
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
    Transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    text.value = "";
    amount.value = "";

    paintChart();
  }
}

// generate iD
function generateID() {
  return Math.floor(Math.random() * 10000000);
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");
  item.innerHTML = `${transaction.text} <span> ${sign} ${Math.abs(
    transaction.amount
  )} </span>
    <button class="deleteBtn" onclick= "removeTransaction(${
      transaction.id
    })">X</button> `;

  list.appendChild(item);
}

// func - removeTransaction
  function removeTransaction(id) {
    Transactions = Transactions.filter((transaction) => transaction.id !== id);
    Init();
    paintChart();
}

function updateValues() {
  const amounts = Transactions.map((transaction) => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);
  const expense = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = ` ₹${total} `;
  money_plus.innerText = `₹${income}`;
  money_minus.innerText = `₹${expense}`;
}

// update local storage

function Init() {
  (list.innerHTML = ""), Transactions.forEach(addTransactionDOM);
  updateValues();
}

// addTransaction(Transactions);

form.addEventListener("submit", addTransaction);

Init();

 
// function for adding a chart -->
function paintChart() {
  let temp = Transactions.map((transaction) => transaction.amount);
  let temp1 = Transactions.map((transaction) => transaction.text);

  console.log(temp);
  console.log(temp1);

  const data = {
    labels: [...temp1],
    datasets: [
      {
        label: "details",
        data: [...temp],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Configuration options
  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  // Create the chart
  myChart = new Chart(document.getElementById("myChart"), config);
}
