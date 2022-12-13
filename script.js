"use strict";

const newWorkoutInput = document.querySelector(".create-new-todo-input");
let todoArray = [];
const todosContainer = document.querySelector(".todos-container");

// TODOS CLASS
class Todo {
  constructor(todoText) {
    this.todoText = JSON.stringify(todoText).slice(3, -3);
    this.state = "active";
  }
}

function displayTodos(arr) {
  todosContainer.innerHTML = "";
  arr.forEach((e) => {
    let newTodo = `<section class="todo ${e.state}">
                      <span class="check-box">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
                      class="check-box--icon display-none">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                      </span>
                      <p class="todo-text" style="background-color: none">
                      ${e.todoText}
                      </p>
                  </section>`;
    todosContainer.innerHTML += newTodo;
  });
}

// UPDATE COUNT
const itemsLeft = document.querySelector(".items-left");

function updateItemsCount() {
  let result = 0;
  let strResult = "";
  todoArray.forEach((e) => {
    result++;
  });
  strResult = JSON.stringify(result);
  itemsLeft.innerText = strResult;
}

// LIGHT/DARK THEME EVENT LISTENER
// ICONS
const icons = document.querySelectorAll(".theme-icon");
let iconSun = document.querySelector(".sun");
let iconMoon = document.querySelector(".moon");

// theme related elements
const body = document.querySelector("body");
const createNewTodoHeader = document.querySelector(".create-new-todo-header");
const todoContainer = document.querySelector(".todos-container");
const todoFooter = document.querySelector(".todo-footer");
let themeArray = [body, createNewTodoHeader, todoContainer, todoFooter];

console.log(themeArray);

changeTheme();
function changeTheme() {
  icons.forEach((e) => {
    e.addEventListener("click", function (e) {
      // ICON STYLE CHANGE
      icons.forEach((e) => {
        if (e.classList.contains("hidden")) {
          e.classList.remove("hidden");
        } else if (!e.classList.contains("hidden")) {
          e.classList.add("hidden");
        }

        // DISPLAYING THEME CHANGE
        if (e.classList.contains("sun") && !e.classList.contains("hidden")) {
          // dark theme
          if (
            !e.classList.contains("light-theme") &&
            !e.classList.contains("dark-theme") &&
            !e.classList.contains("sun")
          ) {
            e.classList.add("dark-theme");
          }
          themeArray.forEach((e) => {
            e.classList.remove("light-theme");
            e.classList.add("dark-theme");
          });
        } else if (
          e.classList.contains("moon") &&
          !e.classList.contains("hidden")
        ) {
          // light theme
          themeArray.forEach((e) => {
            if (
              !e.classList.contains("light-theme") &&
              !e.classList.contains("dark-theme") &&
              !e.classList.contains("moon")
            ) {
              e.classList.add("light-theme");
            }
            e.classList.add("light-theme");
            e.classList.remove("dark-theme");
          });
        }
      });

      console.log("themeArray", themeArray);
    });
  });
}

// selecting theme element childs
newWorkoutInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const instance = new Todo(JSON.stringify(newWorkoutInput.value.trim()));
    const todo = Array.from(document.querySelectorAll(".todo"));

    todoArray.push(instance);
    displayTodos(todoArray);
    updateItemsCount();
    newWorkoutInput.value = "";
  }
});

// INPUT CHECKBOX EVENT LISTENER
todosContainer.addEventListener("click", function (e) {
  const arr = Array.from(e.target.closest(".todo").childNodes);
  const innerElementText = arr[3].innerText;

  console.log("innerElementText", innerElementText);
  const arrayFromInnerTextElement = Array.from(innerElementText);

  let strFinal = "";
  arrayFromInnerTextElement.forEach((e) => {
    strFinal += e;
  });

  let counter = 0;
  let index = 0;
  todoArray.forEach((e) => {
    if (e.todoText === strFinal) {
      index = counter;
    }
    counter++;
  });

  // changing state
  const selectedInstance = todoArray[index];

  if (selectedInstance.state === "active") {
    selectedInstance.state = "done";
  } else if (selectedInstance.state === "done") {
    selectedInstance.state = "active";
  }

  console.log("state", selectedInstance.state);
  console.log("text", selectedInstance.todoText);

  displayTodos(todoArray);
});

// SELECTION BUTTONS
const selectButtons = document.querySelectorAll(".show-buttons button");
// console.log("buttons", selectButtons);
selectButtons.forEach((e) => {
  e.addEventListener("click", function (e) {
    if (e.target.textContent === "All") {
      displayTodos(todoArray);
    } else if (e.target.textContent === "Active") {
      showActive(todoArray);
    } else if (e.target.textContent === "Completed") {
      showCompleted(todoArray);
    }
  });
});
function showActive(arr) {
  let protoArr = [];
  arr.forEach((e) => {
    if (e.state === "active") {
      protoArr.push(e);
    }
  });
  displayTodos(protoArr);
}
function showCompleted(arr) {
  let protoArr = [];
  arr.forEach((e) => {
    if (e.state === "done") {
      protoArr.push(e);
    }
  });
  displayTodos(protoArr);
}

// CLEAR COMPLETED BUTTON
const clearCompletedButton = document.querySelector(".clear-completed");
clearCompletedButton.addEventListener("click", function (e) {
  let activeArr = [];
  todoArray.forEach((todo) => {
    if (todo.state === "active") {
      activeArr.push(todo);
    }
  });
  todoArray = activeArr;
  displayTodos(todoArray);
  updateItemsCount();
});
