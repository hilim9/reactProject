import styled, { css } from 'styled-components';
import colorNames from '../../styles/colors';
import sizeNames from '../../styles/size';

const { big, extraBig } = sizeNames;

export const MainTitle = styled.h1`
  font-size: ${extraBig};
`;

export const SubTitle = styled.h2`
  font-size: ${big};
  margin: 0;
  padding: 0;
  text-align: ${({ align }) => align || 'left'};
  color: ${({ color }) => (color ? colorNames[color] : '#000')};
  ${({ border_Width, color }) =>
    border_Width &&
    css`
      padding-bottom: 10px;
      border-bottom: ${border_Width}px solid ${color ? color : '#000'};
    `}

  margin-bottom: 20px;
`;
