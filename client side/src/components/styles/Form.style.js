import styled from "styled-components";

export const Form = styled.form`
  width: min(20em, 96%);
  height: 10em;
  padding: 0.8em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2em;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: #bdc3c7;
  border-radius: 0.8em;
`;
