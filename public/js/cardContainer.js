const createTaskBtn = document.getElementById("create-task");

createTaskBtn.addEventListener("submit", event => {
  event.preventDefault();

  const newTask = {
    title: document.getElementById("task-item").value.trim()
  };

  console.log(newTask);

  fetch("/api/lists", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newTask)
  }).then(() => {
    // Empty the form
    document.getElementById("task-item").value = "";
    console.log("New task created");
    location.reload();
  });
});

// const btn = document.getElementById("submit");

// btn.addEventListener("click", event => {
//   event.preventDefault();
//   const txt = document.getElementById("txt").value;
//   console.log(txt);
//   document.getElementById("txt").value = "";
// });