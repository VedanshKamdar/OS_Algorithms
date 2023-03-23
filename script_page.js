// Get elements from the HTML document
const pageReferenceString = document.getElementById("page-reference-string");
const pageFaults = document.getElementById("page-faults");
const pageReplacements = document.getElementById("page-replacements");
const pageFrameStates = document.getElementById("page-frame-states");

// Define the Optimal Page Replacement Simulator function
function simulate() {
    // Get the page reference string from the input field
    const inputString = pageReferenceString.value;

    // Split the input string by commas and convert to an array of integers
    const pages = inputString.split(",").map(Number);

    // Get the number of pages and the number of page frames from the input array
    const numPages = pages.length;
    const numFrames = 4; // You can change this to any number of frames you want to simulate

    // Initialize the page frame array with all -1s
    let pageFrames = Array(numFrames).fill(-1);

    // Initialize the page faults, page replacements, and page frame states variables
    let faults = 0;
    let replacements = 0;
    let frameStates = [];

    // Loop through the pages in the input array
    for (let i = 0; i < numPages; i++) {
        // If the page is not in any of the frames, it is a page fault
        if (!pageFrames.includes(pages[i])) {
            // Increment the page fault count
            faults++;

            // If there is an empty frame, add the page to the empty frame
            if (pageFrames.includes(-1)) {
                const emptyFrameIndex = pageFrames.indexOf(-1);
                pageFrames[emptyFrameIndex] = pages[i];
            }
            // Otherwise, replace the page that will be accessed farthest in the future
            else {
                replacements++;

                // Find the page that will be accessed farthest in the future
                let farthestPage = -1;
                let farthestPageIndex = -1;
                for (let j = 0; j < numFrames; j++) {
                    let pageFound = false;
                    for (let k = i + 1; k < numPages; k++) {
                        if (pageFrames[j] === pages[k]) {
                            if (k > farthestPageIndex) {
                                farthestPageIndex = k;
                                farthestPage = pageFrames[j];
                            }
                            pageFound = true;
                            break;
                        }
                    }
                    if (!pageFound) {
                        farthestPageIndex = numPages;
                        farthestPage = pageFrames[j];
                    }
                }

                // Replace the farthest page with the current page
                const replaceIndex = pageFrames.indexOf(farthestPage);
                pageFrames[replaceIndex] = pages[i];
            }
        }

        // Add the current state of the page frames to the frameStates array
        frameStates.push(pageFrames.slice());
    }

    // Update the output elements in the HTML document with the simulation results
    pageFaults.innerHTML = `Page Faults: ${faults}`;
    pageReplacements.innerHTML = `Page Replacements: ${replacements}`;
    pageFrameStates.innerHTML = `Page Frame States: ${frameStates.map(state => `[${state.join(", ")}]`).join(" => ")}`;

    // Create a bar chart to display the frequency of page requests and page faults
const chartData = {
    labels: ["Page Requests", "Page Faults"],
    datasets: [
      {
        label: "Frequency",
        data: [numPages, faults],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1
      }
    ]
  };
  
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  
  const myChart = new Chart(document.getElementById("myChart"), {
    type: "bar",
    data: chartData,
    options: chartOptions
  });
  
}

