import styled from "styled-components";

export const Img = styled.img`
  width: 2em;
  height: 2em;
  cursor: pointer;
  transform: ${(props) => (props.isExpand ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.5s ease-in-out;
`;
