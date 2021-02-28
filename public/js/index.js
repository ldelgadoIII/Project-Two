// CREATE LIST
const createListBtn = document.getElementById("create-list");

createListBtn.addEventListener("submit", event => {
  event.preventDefault();

  const newList = {
    title: document.getElementById("list-item").value.trim()
  };

  console.log(newList);

  fetch("/api/lists", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newList)
  }).then(() => {
    // Empty the form
    document.getElementById("list-item").value = "";

    console.log("New task created");

    // Reloads the page to see added task
    location.reload();
  });
});

// CREATE TASK
const createTaskBtn = document.getElementById("create-task");

createTaskBtn.addEventListener("submit", event => {
  event.preventDefault();

  const newTask = {
    description: document.getElementById("task-item").value.trim(),
    // TO DO: Replace "1" with - event.target.getAttribute("data-id");
    // data-id needs to be assigned to submit button
    // data-id value will come from an #each that grabs the value of the list
    ListId: 1
  };

  console.log(newTask);

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

    // Reloads the page to see added task
    // location.reload();
  });
});

// DELETE LIST
const deleteListBtns = document.querySelectorAll(".remove-list");

deleteListBtns.forEach(button => {
  button.addEventListener("click", e => {
    const id = e.target.getAttribute("data-id");
    console.log("Delete List at ID: ", id);

    fetch(`/api/lists/${id}`, {
      method: "DELETE"
    }).then(res => {
      console.log(res);
      console.log(`Deleted List ID: ${id}`);

      // Reload the page
      if (res.ok) {
        location.reload();
      }
    });
  });
});

// DELETE TASK
const deleteTaskBtns = document.querySelectorAll(".remove-task");

deleteTaskBtns.forEach(button => {
  button.addEventListener("click", e => {
    const id = e.target.getAttribute("data-id");
    console.log("Delete Task at ID: ", id);

    fetch(`/api/tasks/${id}`, {
      method: "DELETE"
    }).then(res => {
      console.log(res);
      console.log(`Deleted Task ID: ${id}`);

      // Reload the page
      if (res.ok) {
        location.reload();
      }
    });
  });
});
