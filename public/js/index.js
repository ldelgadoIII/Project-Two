const socket = io();

// Send Message
const adminSend = document.getElementById("admin-send");
const adminMessage = document.getElementById("admin-message");
// const messages = document.getElementById("messages");

adminSend.addEventListener("click", event => {
  event.preventDefault();

  console.log("btn clicked!");
  console.log("Text Value: ", adminMessage.value);

  socket.emit("chat message", adminMessage.value);
  adminMessage.value = "";
});

socket.on("chat message", msg => {
  const listItem = document.createElement("li");
  listItem.textContent = msg;
  messages.appendChild(listItem);
});

// UPDATE TASK COUNT
// Receive id from student click event and send the udpated count
socket.on("updated count", ({ id, count }) => {
  console.log("Task ID :", id);
  console.log("New count: ", count);

  const counter = document.getElementById(`counter-${id}`);
  counter.textContent = count;
});

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
const createTaskBtn = document.querySelectorAll(".create-task");

createTaskBtn.forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();

    const addTaskId = event.target.getAttribute("data-id");

    const newTask = {
      description: document
        .getElementById(`task-item-${addTaskId}`)
        .value.trim(),
      ListId: event.target.getAttribute("data-id")
    };

    console.log("listId assignment: ", event.target.getAttribute("data-id"));
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
      document.getElementById(`task-item-${addTaskId}`).value = "";

      console.log("New task created");

      // Reloads the page to see added task
      location.reload();
    });
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
        console.log("List Deleted!");
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
        console.log("Task Deleted!");
        location.reload();
      }
    });
  });
});
