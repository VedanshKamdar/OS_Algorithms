let flag = [false, false]; // flags for both processes
let turn = 0; // shared variable for turn
let process1_chart = document.querySelector(".process1 .gantt-chart");
let process2_chart = document.querySelector(".process2 .gantt-chart");

function runProcess1() {
  let i = 0;
  while (i < 60) {
    flag[0] = true;
    turn = 1;

    while (flag[1] && turn === 1) {
      // wait for process 2 to finish or for it to be our turn
    }

    // critical section
    let block = document.createElement("div");
    block.classList.add("process1");
    block.innerHTML = i + 1;
    process1_chart.appendChild(block);

    flag[0] = false;

    // non-critical section
    let empty_block = document.createElement("div");
    empty_block.classList.add("empty");
    process1_chart.appendChild(empty_block);

    i++;
}
}

function runProcess2() {
let i = 0;
while (i < 60) {
flag[1] = true;
turn = 0;
while (flag[0] && turn === 0) {
    // wait for process 1 to finish or for it to be our turn
  }
  
  // critical section
  let block = document.createElement("div");
  block.classList.add("process2");
  block.innerHTML = i + 1;
  process2_chart.appendChild(block);
  
  flag[1] = false;
  
  // non-critical section
  let empty_block = document.createElement("div");
  empty_block.classList.add("empty");
  process2_chart.appendChild(empty_block);
  
  i++;
}
}

setTimeout(() => {
runProcess1();
}, 0);

setTimeout(() => {
runProcess2();
}, 0);  