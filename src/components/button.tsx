import styled from "styled-components";

import Svg from "../assets/react.svg?react";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const StyledButton = styled.button`
  background-color: red;
`;

export function Button({ text, onClick }: ButtonProps) {
  return (
    <StyledButton onClick={onClick}>
      <Svg />
      {text}
    </StyledButton>
  );
}
