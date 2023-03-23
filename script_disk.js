// The code declares two variables inputForm and resultDiv that select the HTML elements with IDs of input-form and result , respectively.
// The code attaches an event listener to the submit event of the inputForm element.
// When the form is submitted, the code first prevents the default form submission behavior by calling the preventDefault() method on the event object.
// The code then retrieves the values of several form inputs using the Number() method to convert them to numbers where applicable.
// The code constructs an array of process objects using the retrieved input values.
// The code sorts the array of process objects by their arrival times in ascending order.
// The code initializes several variables used to calculate various process timings.
// The code loops through the sorted process array and calculates various timings, including completion time, waiting time, and turnaround time for each process.
// The code constructs an HTML table with the calculated timings and appends it to the resultDiv element.
// The code also constructs a Gantt chart based on the calculated timings and appends it to the resultDiv element.
// The code constructs an object containing the calculated timings and the Gantt chart data and sends it to the server using the fetch API.
// If the request is successful, the server response is logged to the console. If not, an error is logged to the console


// const inputForm = document.querySelector("#input-form");
// const resultDiv = document.querySelector("#result");

// inputForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const process1ArrivalTime = Number(
//     document.querySelector("#process-1-arrival-time").value
//   );
//   const process1BurstTime = Number(
//     document.querySelector("#process-1-burst-time").value
//   );
//   const process2ArrivalTime = Number(
//     document.querySelector("#process-2-arrival-time").value
//   );
//   const process2BurstTime = Number(
//     document.querySelector("#process-2-burst-time").value
//   );
//   const process3ArrivalTime = Number(
//     document.querySelector("#process-3-arrival-time").value
//   );
//   const process3BurstTime = Number(
//     document.querySelector("#process-3-burst-time").value
//   );

//   const processes = [    { id: 1, arrivalTime: process1ArrivalTime, burstTime: process1BurstTime },    { id: 2, arrivalTime: process2ArrivalTime, burstTime: process2BurstTime },    { id: 3, arrivalTime: process3ArrivalTime, burstTime: process3BurstTime },  ];

//   const sortedProcesses = [...processes].sort(
//     (a, b) => a.arrivalTime - b.arrivalTime
//   );

//   let currentTime = 0;
//   let completionTimes = {};
//   let waitingTimes = {};
//   let turnaroundTimes = {};
//   let ganttChart = [];

//   sortedProcesses.forEach((process) => {
//     completionTimes[process.id] = currentTime + process.burstTime;
//     waitingTimes[process.id] = Math.abs(currentTime - process.arrivalTime);
//     turnaroundTimes[process.id] =
//       completionTimes[process.id] - process.arrivalTime;
//     currentTime = completionTimes[process.id];

  
  
//     ganttChart.push({
//       id: process.id,
//       startTime: completionTimes[process.id] - process.burstTime,
//       endTime: completionTimes[process.id],
//     });
//   });

//   const resultTable = `
//     <table>
//       <tr>
//         <th>Process</th>
//         <th>Arrival Time</th>
//         <th>Burst Time</th>
//         <th>Completion Time</th>
//         <th>Waiting Time</th>
//         <th>Turnaround Time</th>
//       </tr>
//       ${sortedProcesses
//         .map(
//           (process) => `
//             <tr>
//               <td>${process.id}</td>
//               <td>${process.arrivalTime}</td>
//               <td>${process.burstTime}</td>
//               <td>${completionTimes[process.id]}</td>
//               <td>${waitingTimes[process.id]}</td>
//               <td>${turnaroundTimes[process.id]}</td>
//               </tr>`)
//               .join("")}
//             </table>`;
            
// const ganttChartDiv = document.createElement("div");
// ganttChartDiv.classList.add("gantt-chart");
// ganttChart.forEach((bar) => {
//   const ganttBarDiv = document.createElement("div");
//   ganttBarDiv.classList.add("gantt-bar");
//   ganttBarDiv.style.width = `${(bar.endTime - bar.startTime) * 10}px`;
//   ganttChartDiv.appendChild(ganttBarDiv);
// });

// resultDiv.innerHTML = "";
// resultDiv.appendChild(document.createElement("hr"));
// resultDiv.insertAdjacentHTML("beforeend", resultTable);
// resultDiv.appendChild(ganttChartDiv);

// const resultData = {
//   processes,
//   completionTimes,
//   waitingTimes,
//   turnaroundTimes,
//   ganttChart,
// };

// fetch("/result", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(resultData),
// })
//   .then((res) => res.json())
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));
//       });

function simulate() {
    // Get the input queue from the user
    const inputQueue = document.getElementById("queue").value;

    // Parse the input queue as an array of integers
    const queue = inputQueue.split(",").map(Number);

    // Initialize the starting head position and total seek time
    let headPos = queue[0];
    let seekTime = 0;

    // Initialize the output table body
    const outputBody = document.getElementById("output-body");
    outputBody.innerHTML = "";

    // Create an array to hold the track numbers and add the starting head position
    const tracks = [headPos];

    // Iterate through the queue and calculate the start and end positions for each request
    for (let i = 0; i < queue.length; i++) {
        const request = queue[i];
        const start = headPos;
        const end = request;

        // Calculate the seek time for this request
        const diff = Math.abs(end - start);
        seekTime += diff;

        // Add a row to the output table for this request
        const row = outputBody.insertRow();
        row.insertCell().innerText = request;
        row.insertCell().innerText = start;
        row.insertCell().innerText = end;

        // Update the head position for the next request
        headPos = end;

        // Add the track number to the array
        tracks.push(headPos);
    }

    // Display the total seek time
    alert(`Total Seek Time: ${seekTime}`);

    // Draw the disk head movement chart
    const chartContainer = document.createElement("div");
    chartContainer.id = "chart-container";
    document.body.appendChild(chartContainer);

    const chart = new Chartist.Line("#chart-container", {
        labels: tracks,
        series: [
            tracks.map((track, i) => ({ x: i, y: track }))
        ]
    }, {
        showPoint: true,
        lineSmooth: false,
        axisX: {
            labelInterpolationFnc: function (value, index) {
                return index % 5 === 0 ? value : null;
            }
        }
    });
}
