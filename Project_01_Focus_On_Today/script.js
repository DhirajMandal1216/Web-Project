const checkBocList = document.querySelectorAll(".coustom-checkbox");
const goalInput = document.querySelectorAll(".goal-input");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");
const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    name: "",
    completed: false,
  },
  second: {
    name: "",
    completed: false,
  },
  third: {
    name: "",
    completed: false,
  },
};
let completedGoalCount = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;
progressLabel.innerText = `${allQuotes[completedGoalCount]}`;
progressValue.style.width = `${(completedGoalCount * 100) / 3}%`;
progressValue.firstElementChild.innerText = `${completedGoalCount}/3 completed`;

checkBocList.forEach((checkBox) => {
  checkBox.addEventListener("click", (e) => {
    const allGoalsAdded = [...goalInput].every((allInput) => {
      return allInput.value;
    });

    if (allGoalsAdded) {
      checkBox.parentElement.classList.toggle("completed");

      const InputId = checkBox.nextElementSibling.id;
      allGoals[InputId].completed = !allGoals[InputId].completed;
      completedGoalCount = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;
      progressLabel.innerText = `${allQuotes[completedGoalCount]}`;

      progressValue.style.width = `${(completedGoalCount * 100) / 3}%`;
      progressValue.firstElementChild.innerText = `${completedGoalCount}/3 completed`;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

goalInput.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", (e) => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    (allGoals[e.target.id].name = e.target.value),
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
