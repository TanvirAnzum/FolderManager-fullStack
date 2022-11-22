import styled from "styled-components";

export const Button = styled.button`
  padding: 0.5em;
  font-size: 1em;
  border-radius: 0.5em;
  border: none;
  color: #f1f2f6;
  background-color: ${(props) => (props.bg ? "#218c74" : "#ff4757")};
  cursor: pointer;
`;
