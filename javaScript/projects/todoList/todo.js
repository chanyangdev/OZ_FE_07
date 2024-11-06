// selecting elements and initializing an array
const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
let todoArr = [];

// todoList and todoForm are HTML elements selected using getElementById 
// todoArr is an empty array to store our to-do items 

// display function (displayTodos)
function displayTodos(){
  todoList.innerHTML = ""; // clear the existing to-do items
  todoArr.forEach((aTodo) => {
    const todoItem = document.createElement('li');
    const todoDelBtn = document.createElement('span');
    todoDelBtn.innerText = 'x';
    todoDelBtn.title ='Click to delete';
    todoItem.innerText = aTodo.todoText;
    todoItem.title = 'Click to mark as done';
    todoItem.classList.add(aTodo.todoDone ? 'done' : 'yet');
    todoItem.appendChild(todoDelBtn);

    // delete button click event
    todoDelBtn.addEventListener('click', function() {
      handleTodoDelBtnClick(aTodo.todoId);
    });

    // to-do item click event
    todoItem.addEventListener('click', function() {
      handleTodoItemClick(aTodo, todoId);
    });
    
    todoList.appendChild(todoItem); // add the item to the HTML list
  });
}

// this function displays each to-do item in the todoList element
// for each to-do, it creates a <li> element with a delete button (<span>)
// the item's class reflects its completion status: either done or yet

// delete function
function handleTodoDelBtnClick(clickedId) {
  todoArr = todoArr.filter(aTodo => aTodo.todoId !== clickedId);
  displayTodos(); // refresh the displayed list
  saveTodos(); // save changes to local storage
}

// when the delete button is clicked, this function filters out the to-do item with the matching clickedId and updates the list

// toggle completion function 
function handleTodoItemClick(clickedId) {
  todoArr = todoArr.map(aTodo => aTodo.todoId !== clickedId ? aTodo : { ...aTodo, todoDone: !aTodo.todoDone });
  displayTodos(); // refresh the list to show the updated status
  saveTodos(); // save changes to local storage
}

// when an item is clicked, this function toggles its completion status by updating the todoDone value

// save and load functions
function saveTodos() {
  const todoString = JSON.stringify(todoArr);
  localStorage.setItem('myTodos', todoString); // save to local storage
}

function loadTodos() {
  const myTodos = localStorage.getItem('myTodos');
  todoArr = myTodos !== null ? JSON.parse(myTodos) : todoArr;
  displayTodos(); // display loaded to-do items
}

// saveTodos stores the todoArr array as a string in the browser's localStorage
// loadTodos retrieves the stored data, if any, and updates todoArr before displaying the items

// form submission handling
todoForm.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent form from refreshing the page
  const toBeAdded = {
    todoText: todoForm.todo.value,
    todoId: new Date().getTime(), // Unique ID based on time
    todoDone: false
  };
  todoForm.todo.value = ""; // clear input
  todoArr.push(toBeAdded); // add new item to array
  displayTodos();
  saveTodos();
});

// when the form is submittedd, this function prevents the page from refreshing, creates a new to-do object, adds it to todoArr and then saves and displays the updated list

// initial load
loadTodos(); // this line loads any saved to-dos from localStorage when the page starts


