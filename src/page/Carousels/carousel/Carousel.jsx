import React from "react";
import { Section } from "./Carousel.styles";

const Carousel = () => {
  return (
    <>
      <div>
        <Section>
          <ul className='list'>
            <li className='item'>1</li>
            <li className='item'>2</li>
            <li className='item'>3</li>
            <li className='item'>4</li>
          </ul>
        </Section>
      </div>
    </>
  );
};

export default Carousel;
