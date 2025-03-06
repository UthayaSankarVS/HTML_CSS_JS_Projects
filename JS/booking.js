let selectedSeats = [];

document.querySelectorAll(".seat-btn").forEach((button) => {
  button.addEventListener("click", function () {
    let seatNumber = parseInt(button.getAttribute("data-seat"));

    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
      selectedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
    } else {
      document.querySelectorAll(".seat-btn.selected").forEach((btn) => {
        btn.classList.remove("selected");
      });
      button.classList.add("selected");
      selectedSeats = [seatNumber];
    }

    document.querySelector(".select-btn").textContent = `Select Seats (${
      selectedSeats[0] || 0
    })`;

    seats(selectedSeats[0] || 0);
  });
});

document.querySelector(".select-btn").addEventListener("click", function () {
  if (selectedSeats.length === 0) {
    alert("Please select at least one seat.");
  } else {
    const selectedSeatsParam = selectedSeats.join(",");
    window.location.href = `seats.html?seats=${selectedSeatsParam}`;
  }
});

function seats(seatNumber) {
  console.log(`Number of Seats: ${seatNumber}`);
}
