import React, { useState, useEffect, useRef } from "react";
import { Arrow, ArrowRight, Section } from "./Carousel3.styles";
import { GoDotFill, GoDot } from "react-icons/go";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const initialItems = [1, 2, 3, 4];
  const [items, setItems] = useState(initialItems);
  const listRef = useRef(null);

  const handlerPage = (idx) => {
    const posLeft = idx * listRef.current.clientWidth;
    listRef.current.scrollTo({
      left: posLeft,
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    const index = Math.round(
      listRef.current.scrollLeft / listRef.current.clientWidth
    );
    setCurrentIndex(index);
  };

  const handleArrow = (arrow) => {
    const arrowData = arrow === "left" ? currentIndex - 1 : currentIndex + 1;
    handlerPage(arrowData);
  };
  useEffect(() => {
    const list = listRef.current;
    list.addEventListener("scroll", handleScroll);
    return () => {
      list.removeEventListener("scroll", handleScroll);
    };
  }, [currentIndex]);

  return (
    <div>
      <Section>
        <div className='display'>
          <ul className='list' ref={listRef}>
            {items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <Arrow className='left' onClick={() => handleArrow("left")}>
            <FaChevronLeft />
          </Arrow>
          <Arrow className='right' onClick={() => handleArrow("right")}>
            <FaChevronRight />
          </Arrow>
        </div>
        <div className='pagination'>
          {[...initialItems.keys()].map((index) => (
            <div key={index} onClick={() => handlerPage(index)}>
              {currentIndex % initialItems.length == index ? (
                <GoDotFill />
              ) : (
                <GoDot />
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Carousel3;
