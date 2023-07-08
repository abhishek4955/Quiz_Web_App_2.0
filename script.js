const ul = document.querySelector("ul"); // Get reference to the <ul> element
const input = document.querySelector(".todo-input"); // Get reference to the input field
const btnAdd = document.querySelector(".add-btn"); // Get reference to the add button
const alertInfo = document.querySelector(".alert-info"); // Get reference to the alert message

const popup = document.querySelector(".popup"); // Get reference to the popup container
const popupInput = document.querySelector(".popup-input"); // Get reference to the popup input field
const popupSubmitBtn = document.querySelector(".popup-btn.accept"); // Get reference to the popup submit button
const popupCancelBtn = document.querySelector(".popup-btn.cancel"); // Get reference to the popup cancel button

let editedTodo; // Variable to store the edited todo item


// Function to create a new todo item
const createNewTodo = () => {
  if (input.value.length) {
    const liText = input.value.trim(); // Get the trimmed value from the input field
    const liHTML = `
      ${liText}
      <div class="tools">
        <button class="complete"><i class="fas fa-check"></i></button>
        <button class="edit">EDIT</button>
        <button class="delete"><i class="fas fa-times"></i></button>
      </div>
    `;
    const id = Date.now(); // Generate a unique ID for the todo item
    const li = document.createElement("li"); // Create a new <li> element
    li.setAttribute("id", id); // Set the ID attribute of the <li> element
    li.innerHTML = liHTML; // Set the content of the <li> element

    ul.appendChild(li); // Append the <li> element to the <ul> element
    input.value = ""; // Clear the input field
    handleEmptyListMessage(); // Check if the todo list is empty
  }
};

// Function to handle keydown event on the todo input field
const handleInputKeyDown = (event) => {
  if (event.key === "Enter") {
    createNewTodo(); // Call the createNewTodo function when Enter key is pressed
  }
};

// Add event listener to the todo input field for keydown event
input.addEventListener("keydown", handleInputKeyDown);


// Function to delete a todo item
const deleteTodo = (e) => {
  const todoToDelete = e.target.closest("li"); // Get the closest <li> element to the clicked delete button
  todoToDelete.remove(); // Remove the todo item from the DOM
  handleEmptyListMessage(); // Check if the todo list is empty
};

// Function to mark a todo item as completed
const completedTodo = (e) => {
  e.target.closest("li").classList.toggle("completed"); // Toggle the "completed" class of the closest <li> element
};

// Function to handle the edit action of a todo item
const handleEdit = (e) => {
  popup.style.display = "flex"; // Show the popup
  editedTodo = e.target.closest("li"); // Store the edited todo item
  const text = editedTodo.firstChild.textContent; // Get the text content of the todo item
  popupInput.value = text.trim(); // Set the value of the popup input field to the todo item text
  popupSubmitBtn.addEventListener("click", () => submitEdition(editedTodo)); // Add event listener to the popup submit button
};

// Function to submit the edition of a todo item
const submitEdition = (editedTodo) => {
  if (popupInput.value.length) {
    const popupInputValue = popupInput.value.trim(); // Get the trimmed value from the popup input field
    editedTodo.firstChild.textContent = popupInputValue; // Update the text content of the edited todo item
    closePopup(); // Close the popup
  }
};

// Function to close the popup
const closePopup = () => {
  popup.style.display = "none"; // Hide the popup
};

// Function to handle todo item actions
const handleTodoTools = (e) => {
  if (e.target.classList.contains("delete")) {
    deleteTodo(e); // Delete action
  } else if (e.target.classList.contains("complete")) {
    completedTodo(e); // Complete action
  } else if (e.target.classList.contains("edit")) {
    handleEdit(e); // Edit action
  }
};

// Function to handle empty todo list message
const handleEmptyListMessage = () => {
  if (ul.children.length === 0) {
    alertInfo.style.display = "block"; // Show the alert message if the todo list is empty
  } else {
    alertInfo.style.display = "none"; // Hide the alert message if the todo list is not empty
  }
};

handleEmptyListMessage(); // Check if the todo list is empty on page load

btnAdd.addEventListener("click", createNewTodo); // Add event listener to the add button
ul.addEventListener("click", handleTodoTools); // Add event listener to the todo list
popupCancelBtn.addEventListener("click", closePopup); // Add event listener to the popup cancel button
