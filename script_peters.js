const N = 3; // number of processes
let turn = 0; // shared turn variable
let interested = [false, false, false]; // shared interested array
let log = document.getElementById("log"); // reference to log area

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// async function named process which takes an argument called id
async function process(id) {
  
  interested[id] = true; // set the value of 'id' index in interested array to true
  turn = id; // make 'id' as the turn variable value 
  
  // wait until other processes' interested values become false and it's turn comes up
  while (interested[(id + 1) % N] || interested[(id + 2) % N] && turn == id) {
    log.innerHTML += `Process ${id + 1} is waiting<br>`; // add a string message indicating that the process is waiting
    await sleep(500); // wait for 500ms using the custom sleep() function
  }
  
  // critical section where only one process can enter at a time
  log.innerHTML += `Process ${id + 1} is in critical section<br>`;
  await sleep(1500); // wait for 1500ms using the custom sleep() function
  
  log.innerHTML += `Process ${id + 1} is out of critical section<br>`; // message after process exits critical section
  
  interested[id] = false; // interested set to false after execution ends
}

// event listeners on HTML elements listening for clicks which trigger the process with relevant params 
document.getElementById("p1").addEventListener("click", async function() {
  await process(0);
});

document.getElementById("p2").addEventListener("click", async function() {
  await process(1);
});

document.getElementById("p3").addEventListener("click", async function() {
  await process(2);
});
