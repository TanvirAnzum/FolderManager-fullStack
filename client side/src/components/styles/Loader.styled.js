import styled from "styled-components";
import { Spin } from "./Spin.styled";

export const Loader = styled.div`
  border: 8px solid #2d3436; /* Light grey */
  border-top: 8px solid #dfe6e9; /* Blue */
  border-radius: 50%;
  width: 60px;
  height: 60px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${Spin} 2s linear infinite;
`;
