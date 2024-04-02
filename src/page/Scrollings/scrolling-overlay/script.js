window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  setTimeout(() => {
    overlay.classList.remove("blind");
  }, 500);
});

// document.querySelectorAll("a").forEach((link) => {
//   const overlay = document.querySelector(".overlay");
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const destination = this.getAttribute("href");
//     overlay.classList.add("blind");
//     setTimeout(() => {
//       window.location.href = destination;
//     }, 600);
//   });
// });

const container = document.querySelector(".container");
const box = document.querySelectorAll(".container .box");
let throttleTimeout = null;
let nextPage = 0;
let scrollPosY = 0;

const ovelayEffect = (scroll) => {
  const overlay = document.querySelector(".overlay");
  if (scroll === "up") overlay.classList.add("blind", "up");
  if (scroll === "down") overlay.classList.add("blind", "down");
  setTimeout(() => {
    if (scroll === "up") {
      // down은 어차피 up 클래스가 뒤에 붙기때문에, 문제없음.
      overlay.classList.add("down");
      overlay.classList.remove("blind", "up");
    }
    if (scroll === "down") overlay.classList.remove("blind", "down");
  }, 500);
};
container.addEventListener("wheel", (e) => {
  e.preventDefault();
  if (throttleTimeout === null) {
    const { deltaY } = e;
    const { scrollTop } = container;
    const pageHeight = window.innerHeight;
    if (deltaY > 0) {
      const currentPage = Math.ceil(scrollTop / pageHeight);
      if (currentPage >= box.length - 1) return;
      nextPage = Math.min(currentPage + 1, box.length - 1);
      scrollPosY = nextPage * pageHeight;
      throttle(scrollPosY, "down");
    } else {
      const currentPage = Math.ceil(scrollTop / pageHeight);
      if (currentPage <= 0) return;
      nextPage = Math.max(currentPage - 1, 0);
      scrollPosY = nextPage * pageHeight;
      throttle(scrollPosY, "up");
    }
  }
});
const throttle = (posY, scroll) => {
  ovelayEffect(scroll);
  throttleTimeout = setTimeout(() => {
    throttleTimeout = null;
    container.scrollTo(0, posY);
  }, 500);
};
