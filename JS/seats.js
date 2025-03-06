document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const seatCount = parseInt(params.get("seats"), 10);

  const ticketButton = document.querySelector(".ticket-button");
  if (seatCount && seatCount > 0) {
    ticketButton.textContent = `${seatCount} Tickets`;
    initializeSeats(seatCount);
  } else {
    ticketButton.textContent = "No Seats Selected";
    initializeSeats(0);
  }
});

let selectedSeats = [];
let totalPrice = 0;
let seatLimit = 0;

function initializeSeats(seatCount) {
  seatLimit = seatCount;
  const availableSeats = document.querySelectorAll(".seat.available");

  availableSeats.forEach((seat) => {
    seat.addEventListener("click", () => handleSeatClick(seat));
  });
}

function handleSeatClick(startSeat) {
  const allSeats = Array.from(document.querySelectorAll(".seat"));
  const startIndex = allSeats.indexOf(startSeat);

  if (startIndex === -1) return;

  if (selectedSeats.length < seatLimit) {
    autoSelectSeats(startSeat, allSeats, startIndex);
  } else {
    deselectSeats();
    autoSelectSeats(startSeat, allSeats, startIndex);
  }

  updateUI();
}

function autoSelectSeats(startSeat, allSeats, startIndex) {
  let count = selectedSeats.length;

  for (let i = startIndex; i < allSeats.length && count < seatLimit; i++) {
    const seat = allSeats[i];

    if (seat.classList.contains("available")) {
      const seatId = seat.getAttribute("data-seat-number");
      const rowLabel = seat
        .closest(".row")
        .querySelector(".row-label").textContent;
      const fullSeatId = `${rowLabel}${seatId}`;
      const seatPrice = parseInt(seat.getAttribute("data-price"), 10);

      seat.classList.add("selected");
      selectedSeats.push({ id: fullSeatId, price: seatPrice, element: seat });
      totalPrice += seatPrice;
      count++;
    } else {
      break;
    }
  }
}

function deselectSeats() {
  selectedSeats.forEach((seat) => {
    seat.element.classList.remove("selected");
  });
  selectedSeats = [];
  totalPrice = 0;
}

function updateUI() {
  updateTotalPrice();
}

function updateTotalPrice() {
  const proceedButton = document.getElementById("proceed-to-pay");
  proceedButton.textContent = `Proceed to Pay - Rs. ${totalPrice}`;
  proceedButton.style.display =
    selectedSeats.length === seatLimit ? "block" : "none";
}

document
  .getElementById("proceed-to-pay")
  .addEventListener("click", function () {
    if (selectedSeats.length < seatLimit) {
      alert(
        `${
          seatLimit - selectedSeats.length
        } seats not yet selected. Please select the remaining seats.`
      );
      return;
    }

    const selectedSeatsStr = selectedSeats.map((seat) => seat.id).join(",");
    window.location.href = `payment.html?totalPrice=${totalPrice}&seats=${selectedSeatsStr}`;
  });
