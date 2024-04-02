import React, { useState, useEffect, useRef } from "react";
import { Section } from "./Carousel2.styles";
import { GoDotFill, GoDot } from "react-icons/go";
const Carousel2 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [1, 2, 3, 4];
  const listRef = useRef(null);

  const handleScroll = () => {
    const index = Math.round(
      listRef.current.scrollLeft / listRef.current.clientWidth
    );
    setCurrentIndex(index);
  };
  const handlerPage = (idx) => {
    const posLeft = idx * listRef.current.clientWidth;
    // listRef.current.scrollLeft = posLeft;
    listRef.current.scrollTo({
      left: posLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const list = listRef.current;
    list.addEventListener("scroll", handleScroll);
    return () => list.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Section>
        <ul className='list' ref={listRef}>
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>

        <div className='pagination'>
          {[...items.keys()].map((index) => (
            <div key={index} onClick={() => handlerPage(index)}>
              {currentIndex === index ? <GoDotFill /> : <GoDot />}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Carousel2;
