window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector(".overlay");
  console.log("first");
  // overlay.classList.add("close");

  // overlay.style.height = "100%";
  setTimeout(() => {
    // overlay.style.height = "0";
    overlay.classList.remove("blind");
  }, 500);
});

document.querySelectorAll("a").forEach((link) => {
  const overlay = document.querySelector(".overlay");
  link.addEventListener("click", function (e) {
    e.preventDefault(); // 기본 행동(링크 이동)을 막습니다.
    const destination = this.getAttribute("href"); // 목적지 URL을 가져옵니다.

    overlay.classList.add("blind");
    setTimeout(() => {
      window.location.href = destination;
    }, 600);
  });
});

const container = document.querySelector(".container");
const box = document.querySelectorAll(".container .box");
let throttleTimeout = null;
let nextPage = 0;
let scrollPosY = 0;

const ovelayEffect = () => {
  const overlay = document.querySelector(".overlay");
  overlay.classList.add("blind");
  setTimeout(() => {
    overlay.classList.remove("blind");
  }, 1000);
};
container.addEventListener("wheel", (e) => {
  e.preventDefault();
  if (throttleTimeout === null) {
    const { deltaY } = e;
    const { scrollTop } = container;
    const pageHeight = window.innerHeight;
    const currentPage = Math.ceil(scrollTop / pageHeight);
    if (deltaY > 0) {
      if (currentPage >= box.length - 1) return;
      nextPage = Math.min(currentPage + 1, box.length - 1);
      scrollPosY = nextPage * pageHeight;
      throttle(scrollPosY);
    } else if (deltaY < 0) {
      if (currentPage <= 0) return;
      nextPage = Math.max(currentPage - 1, 0);
      scrollPosY = nextPage * pageHeight;
      throttle(scrollPosY);
    }
  }
});
const throttle = (posY) => {
  ovelayEffect();
  throttleTimeout = setTimeout(() => {
    throttleTimeout = null;
    container.scrollTo(0, posY);
  }, 1000);
};
