import styled from '@emotion/styled';

export const ButtonStyled = styled.button`
  width: fit-content;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);

  :active {
    box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.8);
  }
`;
