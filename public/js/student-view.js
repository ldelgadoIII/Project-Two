// UPDATE TASK COUNT
// Select button that increments counter
const increaseCountBtns = document.querySelectorAll(".change-count");

increaseCountBtns.forEach(button => {
  button.addEventListener("click", e => {
    // Grabs the id of the btn clicked;
    const id = e.target.getAttribute("data-id");
    console.log(`Count Btn Clicked with data-id: ${id}`);

    // Grab current count
    let newCount = document.getElementById("task").value;
    console.log("Current count of Task: ", newCount);

    // Increment count
    Number(newCount);
    newCount++;
    console.log("This is the newCount: ", newCount);

    // Return new count as an object
    const updateCount = {
      count: newCount
    };
    console.log("Updated count object", updateCount);

    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      body: JSON.stringify(updateCount)
    }).then(response => {
      if (response.ok) {
        location.reload();
      } else {
        alert("Count was not changed.");
      }
    });
  });
});
