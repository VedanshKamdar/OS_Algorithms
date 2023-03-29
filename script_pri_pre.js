let processes = [];
let time = 0;

function addProcess() {
  const name = document.getElementById("process-name").value;
  const burstTime = parseInt(document.getElementById("burst-time").value);
  const priority = parseInt(document.getElementById("priority").value);

  if (!name || isNaN(burstTime) || isNaN(priority)) {
    alert("Please enter valid input");
    return;
  }

  processes.push({ name, burstTime, priority });

  updateTable();
  drawChart();

  document.getElementById("process-name").value = "";
  document.getElementById("burst-time").value = "";
  document.getElementById("priority").value = "";
}

function updateTable() {
  const table = document.getElementById("process-table");
  table.innerHTML = "";

  let totalWaitingTime = 0;
  let totalTurnaroundTime = 0;
  for (let i = 0; i < processes.length; i++) {
    const process = processes[i];
    const row = document.createElement("tr");

const nameCell = document.createElement("td");
nameCell.textContent = process.name;
row.appendChild(nameCell);

const burstTimeCell = document.createElement("td");
burstTimeCell.textContent = process.burstTime;
row.appendChild(burstTimeCell);

const priorityCell = document.createElement("td");
priorityCell.textContent = process.priority;
row.appendChild(priorityCell);

const waitingTimeCell = document.createElement("td");
const turnaroundTimeCell = document.createElement("td");

if (i === 0) {
  waitingTimeCell.textContent = 0;
  totalWaitingTime += 0;
  turnaroundTimeCell.textContent = process.burstTime;
  totalTurnaroundTime += process.burstTime;
} else {
  const prevProcess = processes[i - 1];
  const prevTurnaroundTime =
    parseInt(table.rows[i - 1].cells[4].textContent);

  const waitingTime = prevTurnaroundTime;
  waitingTimeCell.textContent = waitingTime;
  totalWaitingTime += waitingTime;

  const turnaroundTime = waitingTime + process.burstTime;
  turnaroundTimeCell.textContent = turnaroundTime;
  totalTurnaroundTime += turnaroundTime;
}

row.appendChild(waitingTimeCell);
row.appendChild(turnaroundTimeCell);

table.appendChild(row);
}

const avgWaitingTime = totalWaitingTime / processes.length;
const avgTurnaroundTime = totalTurnaroundTime / processes.length;

const avgRow = document.createElement("tr");

const avgCell = document.createElement("td");
avgCell.colSpan = 3;
avgCell.textContent = "Average";
avgRow.appendChild(avgCell);

const avgWaitingTimeCell = document.createElement("td");
avgWaitingTimeCell.textContent = avgWaitingTime.toFixed(2);
avgRow.appendChild(avgWaitingTimeCell);

const avgTurnaroundTimeCell = document.createElement("td");
avgTurnaroundTimeCell.textContent = avgTurnaroundTime.toFixed(2);
avgRow.appendChild(avgTurnaroundTimeCell);

table.appendChild(avgRow);
}

function drawChart() {
const chart = document.querySelector(".gantt-chart");
chart.innerHTML = "";

for (let i = 0; i < processes.length; i++) {
const process = processes[i];
const div = document.createElement("div");
div.style.width = `${process.burstTime * 50}px`;

const span = document.createElement("span");
span.textContent = process.name;

div.appendChild(span);

if (i === 0) {
  div.style.marginLeft = "0";
} else {
  const prevProcess = processes[i - 1];
  const prevEndTime = prevProcess.endTime || prevProcess.burstTime;

  const gap = process.priority < prevProcess.priority ? 0 : 1;

  div.style.marginLeft = `${(prevEndTime + gap) * 50}px`;
}

process.endTime = prevEndTime + process.burstTime;

chart.appendChild(div);
}
}

setInterval(() => {
if (processes.length === 0) {
return;
}

const currProcess = processes.reduce((acc, curr) => {
if (!acc || curr.priority > acc.priority) {
return curr;
}
return acc;
}, null);

if (currProcess.burstTime === 1) {
processes = processes.filter
} else {
    currProcess.burstTime--;
    }
    
    updateTable();
    drawChart();
    }, 1000); // interval time in milliseconds
    
    // function to add a new process to the list
    function addProcess() {
    const name = document.getElementById("process-name").value;
    const burstTime = parseInt(document.getElementById("burst-time").value);
    const priority = parseInt(document.getElementById("priority").value);
    
    // add the new process to the processes array
    processes.push({
    name,
    burstTime,
    priority,
    endTime: null,
    });
    
    updateTable();
    drawChart();
    }
    
    // event listener for the "Add Process" button
    document.getElementById("add-process").addEventListener("click", addProcess);
    // function to reset the simulation
function resetSimulation() {
    processes = [];
    
    // clear the table
    const table = document.getElementById("process-table");
    table.innerHTML = "";
    
    // clear the chart
    const chart = document.querySelector(".gantt-chart");
    chart.innerHTML = "";
    }
    
    // event listener for the "Reset" button
    document.getElementById("reset").addEventListener("click", resetSimulation);
    
    // function to validate user input
    function validateInput() {
    const name = document.getElementById("process-name").value;
    const burstTime = document.getElementById("burst-time").value;
    const priority = document.getElementById("priority").value;
    
    if (name === "" || burstTime === "" || priority === "") {
    alert("Please fill out all fields.");
    return false;
    }
    
    if (isNaN(parseInt(burstTime)) || isNaN(parseInt(priority))) {
    alert("Burst time and priority must be numbers.");
    return false;
    }
    
    return true;
    }
    
    // event listener for the form submit button
    document.getElementById("process-form").addEventListener("submit", (event) => {
    event.preventDefault(); // prevent form submission
    if (validateInput()) {
    addProcess(); // add the new process to the list
    event.target.reset(); // reset the form fields
    }
    });
