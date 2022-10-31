import React from 'react';
import styled from "@emotion/styled";
import {fadeIn} from "../../../styles/animations";

const FormError = styled.div<{ bottom?: boolean}>`
  margin-top: 0 !important;
  position: relative;
  bottom: ${({bottom}) => bottom ? "5rem" : "none"};
  div{
    margin-top: 0 !important;
    transition: .2s all;
    width: 15rem;
    height: 15rem;
    border-radius: 1rem;
    position: absolute;
    left: 20rem;
    bottom: 0;
    background-color: rgb(232, 239, 245);
    color: #333333;
    box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff, inset 4px 4px 8px rgba(209, 217, 230, 0.2), inset -8px -8px 8px rgba(255, 255, 255, 0.2);;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    animation: ${fadeIn} .1s ease-in-out;
    &:hover{
      box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
      inset 6px 6px 16px rgba(209, 217, 230, 0.8),
        inset -8px -8px 8px rgba(255, 255, 255, 0.2);
      transform: translateY(2px);
    }
    p{
      margin: 2rem;
      font-weight: bold;
      font-family: sans-serif;
      line-height: 1.125rem;
    }
  }
  @media (max-width: 1150px) {
    position: static;
    max-width: 31.25rem;
    width: calc(100% - 2rem);
    height: auto;
    div{
      width: calc(100% - 2rem);
      height: auto;
      position: static;
      padding: 1rem;
      p{
        margin: 0;
      }
    }
  }
`

interface FormErrorProps {
    message: string
    bottom?: boolean;
}

const FormErrorAtom: React.FC<FormErrorProps> = ({message, bottom}) => {
    return (
        <FormError bottom={bottom}>
            <div><p>{message}</p></div>
        </FormError>
    );
};

export default FormErrorAtom;
