const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

let currentDate = new Date();

const updateDateSelector = () => {
  const container = document.querySelector(".date-container");
  container.innerHTML = "";
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const isToday = date.toDateString() === today.toDateString();

    container.innerHTML += `
      <div class="date ${isToday ? "active" : ""}">
        <div class="day">${days[date.getDay()]}</div>
        <div class="month">${date.getDate()} <br /> ${
      months[date.getMonth()]
    }</div>
      </div>
    `;
  }
};

document.getElementById("prev").addEventListener("click", () => {
  currentDate.setDate(currentDate.getDate() - 7);
  updateDateSelector();
});

document.getElementById("next").addEventListener("click", () => {
  currentDate.setDate(currentDate.getDate() + 7);
  updateDateSelector();
});

updateDateSelector();
