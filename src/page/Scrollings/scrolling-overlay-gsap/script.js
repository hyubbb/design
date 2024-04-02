const container = document.querySelector(".container");
const box = document.querySelectorAll(".container .box");
let throttleTimeout = null;
let nextPage = 0;
let scrollPosY = 0;

const ovelayEffect = (scroll) => {
  // const overlay = document.querySelector(".overlay");
  // if (scroll === "up") overlay.classList.add("blind", "up");
  // if (scroll === "down") overlay.classList.add("blind", "down");

  scroll === "up" ? unreveal() : reveal();

  // setTimeout(() => {
  //   if (scroll === "up") {
  //     // down은 어차피 up 클래스가 뒤에 붙기때문에, 문제없음.
  //     overlay.classList.add("down");
  //     overlay.classList.remove("blind", "up");
  //   }
  //   if (scroll === "down") overlay.classList.remove("blind", "down");
  // }, 500);
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
  }, 700);
};

const paths = {
  step1: {
    unfilled: "M 0 100 V 100 Q 50 100 100 100 V 100 z",
    inBetween: {
      // curve1: "M 0 100 V 50 Q 50 30 100 50 V 100 z",
      curve1: "M 0 100 V 75 Q 50 50 100 75 V 100 z",
      curve2: "M 0 100 V 50 Q 50 75 100 50 V 100 z",
    },
    filled: "M 0 100 V 0 Q 50 0 100 0 V 100 z",
  },
  step2: {
    filled: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
    inBetween: {
      curve1: "M 0 0 V 50 Q 50 30 100 50 V 0 z",
      curve2: "M 0 0 V 50 Q 50 85 100 50 V 0 z",
    },
    unfilled: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
  },
};
const overlayPath = document.querySelector(".effect__path");

let isAnimating = false;

// reveals the second content view
const reveal = () => {
  console.log("");
  if (isAnimating) return;
  isAnimating = true;
  gsap
    .timeline({
      onComplete: () => (isAnimating = false),
    })
    .set(overlayPath, {
      attr: { d: paths.step1.unfilled },
    })
    .to(
      overlayPath,
      {
        duration: 0.4,
        ease: "power4.in",
        attr: { d: paths.step1.inBetween.curve1 },
      },
      0
    )
    .to(overlayPath, {
      duration: 0.2,
      ease: "power1",
      attr: { d: paths.step1.filled },
    })

    .set(overlayPath, {
      attr: { d: paths.step2.filled },
    })

    .to(overlayPath, {
      duration: 0.2,
      ease: "sine.in",
      attr: { d: paths.step2.inBetween.curve1 },
    })
    .to(overlayPath, {
      duration: 0.4,
      ease: "power4",
      attr: { d: paths.step2.unfilled },
      onComplete: () => (isAnimating = !isAnimating),
    });
};

const unreveal = () => {
  if (isAnimating) return;
  isAnimating = true;

  gsap
    .timeline({
      onComplete: () => (isAnimating = false),
    })
    .set(overlayPath, {
      attr: { d: paths.step2.unfilled },
    })
    .to(
      overlayPath,
      {
        duration: 0.2,
        ease: "power4.in",
        attr: { d: paths.step2.inBetween.curve2 },
      },
      0
    )
    .to(overlayPath, {
      duration: 0.4,
      ease: "power1",
      attr: { d: paths.step2.filled },
    })
    .set(overlayPath, {
      attr: { d: paths.step1.filled },
    })
    .to(overlayPath, {
      duration: 0.2,
      ease: "sine.in",
      attr: { d: paths.step1.inBetween.curve2 },
    })
    .to(overlayPath, {
      duration: 0.4,
      ease: "power4",
      attr: { d: paths.step1.unfilled },
      onComplete: () => (isAnimating = !isAnimating),
    });
};
