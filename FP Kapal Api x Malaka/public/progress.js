function storeProgress(taskId) {
  // Retrieve the existing tasks or initialize as empty array
  let tasksDone = JSON.parse(sessionStorage.getItem("tasksDone")) || [];

  // If the task is not already recorded, add it to the tasks list
  if (!tasksDone.includes(taskId)) {
    tasksDone.push(taskId);
    sessionStorage.setItem("tasksDone", JSON.stringify(tasksDone)); // Store updated list
    alert("Progress saved for " + taskId);

    // Redirect to file.html after the alert
    window.location.href = "file.html";
  } else {
    alert(taskId + " is already recorded.");
    window.location.href = "file.html";
  }
}

let number = document.getElementById("number");
let counter = 0;

setInterval(() => {
  if (counter == 65) {
    clearInterval;
  } else {
    counter += 1;
    number.innerHTML = `${counter}%`;
  }
}, 30); //delay in milisecond

// Sample data for total stories per level
// Sample data for total stories per level
const totalStoriesPerLevel = { 1: 9, 2: 9, 3: 9 }; // Adjust according to your actual story count

window.onload = function () {
  // Retrieve tasks from sessionStorage
  let tasksDone = JSON.parse(sessionStorage.getItem("tasksDone")) || [];

  // Initialize progress and story lists for each level
  let progress = { 1: 0, 2: 0, 3: 0 };
  let storiesRead = { 1: [], 2: [], 3: [] };

  // Categorize tasks based on their levels
  tasksDone.forEach(taskId => {
    if (taskId.includes("Level 1")) {
      progress[1]++;
      storiesRead[1].push(taskId);
    }
    if (taskId.includes("Level 2")) {
      progress[2]++;
      storiesRead[2].push(taskId);
    }
    if (taskId.includes("Level 3")) {
      progress[3]++;
      storiesRead[3].push(taskId);
    }
  });

  // Update progress for each circular progress bar
  updateProgress(progress);

  // Display recap lists for each level
  displayRecap(storiesRead);
};

function updateProgress(progress) {
  for (let level = 1; level <= 3; level++) {
    let percentage = Math.round((progress[level] / totalStoriesPerLevel[level]) * 100);
    let dashOffsetTarget = 440 - (440 * percentage) / 100; // Calculate target stroke-dashoffset for circle
    let circle = document.getElementById(`circle${level}`);
    let progressText = document.getElementById(`level${level}-progress`);

    let currentOffset = 440; // Start from the full circle
    let currentPercentage = 0;

    // Animate the progress
    let animation = setInterval(() => {
      if (currentOffset <= dashOffsetTarget) {
        clearInterval(animation); // Stop the animation when the target is reached
      } else {
        currentOffset -= 4; // Decrease offset for smooth animation
        currentPercentage = Math.min(percentage, (440 - currentOffset) / 4.4); // Calculate percentage dynamically
        circle.style.strokeDashoffset = currentOffset;
        circle.style.stroke = `url(#GradientColor${level})`; // Apply gradient color
        progressText.innerText = `${Math.round(currentPercentage)}%`;
      }
    }, 20); // Adjust timing for smoother animation
  }
}



function displayRecap(storiesRead) {
  for (let level = 1; level <= 3; level++) {
    let recapElement = document.getElementById(`level${level}-recap`);
    if (storiesRead[level].length > 0) {
      recapElement.innerHTML += `<br>${storiesRead[level].join('<br>')}`;
    } else {
      recapElement.innerHTML += `<br>Belum ada`;
    }
  }
}
