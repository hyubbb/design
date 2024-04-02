import styled from "styled-components";

export const Section = styled.section`
  width: 80%;
  border: 1px dotted white;
  margin: 0 auto;
  ul {
    display: flex;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
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
      scroll-snap-align: center;
    }
  }
`;
