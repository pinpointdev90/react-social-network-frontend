import styled from '@emotion/styled';
import React from 'react';

type ButtomStyleProps = {
    size: 'xl' | 'l';
    stetic: 'auth' | "warning" | "soft"
};

interface ButtomProps extends ButtomStyleProps {
    children: any;
    type: 'button' | 'submit' | 'reset';
    onSubmit?: any;
    onClick?: any;
}

const Button = styled.button<ButtomStyleProps>`
  max-width: ${({size}) => (size === 'xl' ? '31.25rem' : '7.5rem')};
  width: calc(100% - 1.5rem);
  height: auto;
  background-color: ${({stetic}) => {
    switch (stetic) {
      case "auth":
        return "#834FE3"
      case "warning":
        return "#EE1B24"
      case "soft":
          return "rgb(232, 239, 245)"
    }
  }};
  border-radius: 10px;
  outline: none;
  border: none;
  transition: .2s all;
  cursor: pointer;
  color: ${({stetic}) => {
    switch (stetic) {
      case "soft":
        return "#333333"
      default: 
          return "#f6f6f6"
  }}};
  font-weight: bold;
  font-size: 1rem;
  margin: .75rem;
  box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff, inset 4px 4px 8px rgba(209, 217, 230, 0.2), inset -8px -8px 8px rgba(255, 255, 255, 0.2);

  &:hover {
    background-color: ${({stetic}) => {
      switch (stetic) {
        case "auth":
          return "#6f30e2"
        case "warning":
          return "#D91E29"
      }
    }};
    box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
    inset 6px 6px 16px rgba(209, 217, 230, 0.8),
      inset -8px -8px 8px rgba(255, 255, 255, 0.2);
    transform: translateY(2px);
  }
`;

const ButtomAtom: React.FC<ButtomProps> = ({children, type, size, stetic, onSubmit, onClick}) => {
    return <Button onSubmit={onSubmit} onClick={onClick} type={type} size={size} stetic={stetic}>{children}</Button>;
};

export default ButtomAtom;
