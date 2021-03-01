// eslint-disable-next-line no-unused-vars
const socket = io();

// UPDATE TASK COUNT
// TO DO: Get data-count value of task from db
// TO DO: Increment count
// TO DO: Send new count as a put request
let count = 0;

const currentCount = document.getElementById("counter");
currentCount.textContent = "Current Task Count: " + count;

// Select button that increments counter
const increaseCountBtns = document.querySelectorAll(".change-count");

increaseCountBtns.forEach(button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    // Grabs the id of the btn clicked;
    const id = e.target.getAttribute("data-id");
    console.log(`Count Btn Clicked with data-id: ${id}`);

    socket.emit("task id", id);

    // Increment count
    count++;
    currentCount.textContent = "Current Task Count: " + count;
    console.log("This is the updated count: ", count);

    // Return new count as an object
    const updateCount = {
      count: count
    };
    console.log("Updated count object", updateCount);
  });
});
