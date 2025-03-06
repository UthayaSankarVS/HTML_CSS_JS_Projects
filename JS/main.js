let carousel = document.querySelector(".main");
let images = document.querySelectorAll(".main img");
let index = 0;
function autoScroll() {
  index++;
  if (index >= images.length) {
    index = 0;
  }
  const offset = -index * 100;
  carousel.style.transform = `translateX(${offset}%)`;
}
setInterval(autoScroll, 5000);

const recommendedContainer = document.querySelector(".recommendedmovies");
const recommendedLeftBtn = document.querySelector(
  ".recommendedmovies-container .scroll-btn.left"
);
const recommendedRightBtn = document.querySelector(
  ".recommendedmovies-container .scroll-btn.right"
);
function scrollRecommended(direction) {
  const scrollAmount = direction === "left" ? -300 : 300;
  recommendedContainer.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
}
recommendedLeftBtn.addEventListener("click", () => scrollRecommended("left"));
recommendedRightBtn.addEventListener("click", () => scrollRecommended("right"));
