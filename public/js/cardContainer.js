const createTaskBtn = document.getElementById("create-task");

if (createTaskBtn) {
  createTaskBtn.addEventListener("submit", event => {
    event.preventDefault();

    const newTask = {
      title: document.getElementById("task-item").value.trim()
    };

    console.log(JSON.stringify(newTask));

    fetch("/api/tasks", {
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
}
