import styled from "styled-components";

import Svg from '../assets/react.svg?react';

const StyledButton = styled.button`
  background-color: #991a49;
`;

export function Button({ text }: { text: string }) {
  return (
    <StyledButton>
      <Svg />
      {text}
    </StyledButton>
  );
}
