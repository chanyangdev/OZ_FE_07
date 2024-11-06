// Select input box and list container elements
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById('list-container');

// Function to add a new task
function addTask() {
  // Check if the input box is empty; if so, alert the user
  if (inputBox.value === '') {
    alert('You must write something');
  } else {
    // Create a new list item and set its text to the input box value
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    // Add the new list item to the list container
    listContainer.appendChild(li);
    
    // Create a "delete" button (span) and append it to the list item
    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // Unicode for "×" symbol
    li.appendChild(span);
  }
  
  // Clear the input box after adding the task
  inputBox.value = "";
  
  // Save the updated list to local storage
  saveData();
}

// Event listener for list container
listContainer.addEventListener("click", function(e) {
  // If a list item is clicked, toggle its "checked" status
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData(); // Save updated list to local storage
  }
  // If the delete button (span) is clicked, remove the parent list item
  else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData(); // Save updated list to local storage
  }
}, false);

// Function to save the current list to local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show the saved tasks from local storage when the page loads
function showTask() {
  // Retrieve the saved tasks from local storage and display them
  listContainer.innerHTML = localStorage.getItem("data");
}

// Call showTask() to display saved tasks on page load
showTask();