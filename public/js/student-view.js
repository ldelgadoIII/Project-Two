// eslint-disable-next-line no-unused-vars
const socket = io();

// UPDATE TASK COUNT
// Select button that increments counter
const increaseCountBtns = document.querySelectorAll(".change-count");

increaseCountBtns.forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();

    // Grabs the id of the task clicked
    const id = e.target.getAttribute("data-id");
    console.log(`Complete Btn Clicked with data-id: ${id}`);

    // Sends task id to server
    socket.emit("task id", id);
  });
});

// Send Message
const studentSend = document.getElementById("student-send");
const studentMessage = document.getElementById("student-message");
const messageBox = document.getElementById("messages");

studentSend.addEventListener("click", event => {
  event.preventDefault();

  console.log("btn clicked!");
  console.log("Text Value: ", studentMessage.value);

  socket.emit("chat message", studentMessage.value);
  studentMessage.value = "";
});

socket.on("chat message", msg => {
  const listItem = document.createElement("li");
  listItem.textContent = msg;
  messageBox.appendChild(listItem);
});
