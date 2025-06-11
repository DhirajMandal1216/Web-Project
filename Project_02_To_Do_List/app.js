const taskInput = document.querySelector(".taskInput");
const form = document.querySelector(".form-container");
const TaskList = document.querySelector(".allTaskList");
const stack = document.querySelector(".stack");
const progress = document.querySelector("#progress");

const allTasks = JSON.parse(localStorage.getItem("allTask")) || [];

const updateProgress = () => {
  const totalTasks = allTasks.length;
  const completedTask = allTasks.filter((c) => c.complete).length;

  stack.textContent = totalTasks ? `${completedTask} / ${totalTasks}` : "0 / 0";
  progress.style.width = totalTasks
    ? `${(completedTask / totalTasks) * 100}%`
    : " 0 ";
};

const updateTask = () => {
  TaskList.innerHTML = "";

  allTasks.forEach((task, index) => {
    const listItem = document.createElement("li"); //li

    const listContent = document.createElement("div"); //div
    listContent.classList.add("li-content");

    const customCheckBox = document.createElement("div"); //custom checkbox
    customCheckBox.classList.add("custom-checkBox");

    const clickImg = document.createElement("img"); //img tag
    clickImg.classList.add("clickImg");
    clickImg.setAttribute("src", "./images/clickImage.svg");
    customCheckBox.append(clickImg);

    const taskText = document.createElement("p"); //p
    taskText.classList.add("task-text");
    taskText.innerText = `${task.text}`;

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("deleteBtn");
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteBtn.append(deleteIcon);

    deleteBtn.addEventListener("click", () => {
      allTasks.splice(index, 1);
      localStorage.setItem("allTask", JSON.stringify(allTasks));
      updateTask();
      updateProgress();
    });

    if (task.complete) {
      listContent.classList.add("completed");
    }

    check_box.addEventListener("click", (e) => {
      listContent.classList.toggle("completed");
      allTasks[index].complete = !allTasks[index].complete;
      updateProgress();
      localStorage.setItem("allTask", JSON.stringify(allTasks));
    });

    listContent.append(customCheckBox, taskText, deleteBtn); //div
    listItem.append(listContent); //li
    TaskList.append(listItem); //ul
  });
};


//add Task in unOrder list
const addTask = () => {
  const inputText = taskInput.value.trim();

  if (inputText) {
    allTasks.push({ text: inputText, complete: false });
  } else {
    alert("Enter Task..");
  }

  updateTask();
  updateProgress();

  taskInput.value = "";
};

//form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  addTask();
});

//call function when browser reload
updateTask();
updateProgress();
