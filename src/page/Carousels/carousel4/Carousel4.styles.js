import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  border: 1px dotted white;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  ul {
    display: flex;
    /* transition: all 0.3s ease; */
    /* overflow-x: scroll; */
    /* scroll-snap-type: x mandatory; */
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100%;
      height: 400px;
      padding: 30px;
      border: 1px solid white;
      border-radius: 20px;
      box-sizing: border-box;
      /* scroll-snap-stop: always; */
      /* scroll-snap-align: center; */
    }
  }

  .display {
    position: relative;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin: 10px;
    font-size: 30px;
  }
`;

export const Arrow = styled.div`
  display: grid;
  position: absolute;
  top: calc((100% - 2rem) / 2);

  font-size: 2rem;
  &.left {
    left: 0;
  }

  &.right {
    right: 0;
  }
`;
export const ArrowRight = styled.div``;
