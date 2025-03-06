function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const totalPrice = params.get("totalPrice");
  const selectedSeats = params.get("seats");
  return {
    totalPrice,
    selectedSeats: selectedSeats ? selectedSeats.split(",") : [],
  };
}

document.addEventListener("DOMContentLoaded", function () {
  const { totalPrice, selectedSeats } = getQueryParams();

  document.getElementById("selected-seats").textContent =
    selectedSeats.length > 0 ? selectedSeats.join(", ") : "No seats selected";
  document.getElementById("subtotal").textContent = `₹${totalPrice || "0.00"}`;
  document.getElementById("total-price").textContent = `₹${
    totalPrice || "0.00"
  }`;

  selectedSeats.forEach((seatId) => {
    const seatElement = document.getElementById(seatId);
    if (seatElement) {
      seatElement.classList.add("selected");
    }
  });
});
