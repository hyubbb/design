import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Arrow, Section } from "./Carousel4.styles";
import { GoDotFill, GoDot } from "react-icons/go";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel4 = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const initialItems = useMemo(() => [1, 2, 3, 4], []);
  const firstItem = initialItems[0];
  const lastItem = initialItems[initialItems.length - 1];
  const [transitionState, setTransitionState] = useState(false);
  const infiniteItems = useMemo(
    () => [lastItem, ...initialItems, firstItem],
    [firstItem, initialItems, lastItem]
  );

  let touchStartX;
  let touchEndX;
  const listRef = useRef(null);

  const moveToPage = useCallback(
    (idx = currentIndex) => {
      if (listRef.current) {
        // listRef.current.style.transition = "all 0.3s ease";
        listRef.current.style.transform = `translateX(-${idx}00%)`;
      }
    },
    [currentIndex]
  );

  const handlerPage = useCallback((idx) => {
    console.log("dlfkjskl");
    if (!transitionState) {
      moveToPage();
      setCurrentIndex((prev) => prev + idx);
      setTransitionState(true);
    }
  }, []);

  const handlePagination = useCallback(
    (idx) => {
      setCurrentIndex(idx);
      moveToPage(idx);
    },
    [moveToPage]
  );

  // useEffect(() => {
  //   listRef.current.style.transition = "none";
  //   moveToPage(currentIndex);
  // }, []);

  useEffect(() => {
    const itemLength = initialItems.length;
    const transitionEnd = () => {
      if (currentIndex >= itemLength + 1) {
        listRef.current.style.transition = "none";
        listRef.current.style.transform = `translateX(-100%)`;
        setCurrentIndex(1);
      } else if (currentIndex <= 0) {
        listRef.current.style.transition = "none";
        listRef.current.style.transform = `translateX(-${itemLength}00%)`;
        setCurrentIndex(itemLength);
      }
      console.log("end : ", transitionState);
      setTransitionState(false);
    };
    moveToPage();

    const list = listRef.current;
    list.addEventListener("transitionend", transitionEnd);

    return () => list.removeEventListener("transitionend", transitionEnd);
  }, [currentIndex, transitionState, moveToPage, initialItems.length]);

  const handleTouchStart = (e) => {
    listRef.current.style.transition = "all 0.3s ease";
    touchStartX = e.nativeEvent.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const currTouchX = e.nativeEvent.changedTouches[0].clientX;
    if (listRef.current !== null) {
      if (Math.abs(touchStartX - currTouchX) < listRef.current.clientWidth) {
        listRef.current.style.transform = `translateX(calc(-${currentIndex}00% - ${
          touchStartX - currTouchX || 0
        }px))`;
      }
    }
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;
    const minPos = listRef.current.clientWidth / 5;
    if (touchStartX - touchEndX >= minPos) return handlerPage(1);
    if (touchEndX - touchStartX >= minPos) return handlerPage(-1);
    return handlerPage(0);
  };

  return (
    <div>
      <Section>
        <div className='display'>
          <ul
            className='list'
            ref={listRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {infiniteItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <Arrow className='left' onClick={() => handlerPage(-1)}>
            <FaChevronLeft />
          </Arrow>
          <Arrow className='right' onClick={() => handlerPage(+1)}>
            <FaChevronRight />
          </Arrow>
        </div>
        <div className='pagination'>
          {initialItems.map((item, index) => {
            return (
              <div
                key={index}
                className={index}
                onClick={() => handlePagination(index + 1)}
              >
                {currentIndex % (initialItems.length + 1) == index + 1 ? (
                  <GoDotFill />
                ) : (
                  <GoDot />
                )}
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
};

export default Carousel4;
