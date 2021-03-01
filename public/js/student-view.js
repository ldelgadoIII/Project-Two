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
    console.log(`Count Btn Clicked with data-id: ${id}`);

    socket.emit("task id", id);

    // currentCount.textContent = "Current Task Count: " + count;
  });
});
