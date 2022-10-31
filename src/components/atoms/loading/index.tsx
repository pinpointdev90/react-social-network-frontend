import React from 'react';
import styled from "@emotion/styled";

const Loading = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  div{
    transition: .3s all;
  }
  & div:hover {
      transform: translateY(2px);
      box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
      inset 6px 6px 16px rgba(209, 217, 230, 0.8),
        inset -8px -8px 8px rgba(255, 255, 255, 0.2);
      div{
        box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
        inset 4px 4px 8px rgba(209, 217, 230, 0.2),
          inset -8px -8px 8px rgba(255, 255, 255, 0.2);
        &:hover{
          transform: unset;
        }
      }
    
  }
  div{
    position: relative;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
    inset 4px 4px 8px rgba(209, 217, 230, 0.2),
      inset -8px -8px 8px rgba(255, 255, 255, 0.2);
    div{
      display: flex;
      justify-content: center;
      border-radius: 50%;
      box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
      inset 6px 6px 16px rgba(209, 217, 230, 0.8),
        inset -8px -8px 8px rgba(255, 255, 255, 0.2);
      position: absolute;
      top: 10px;
      width: 70px;
      height: 70px;
    }
  }
  span{
    width: 70px;
    height: 70px;
    border: 10px solid rgb(232, 239, 245);
    border-radius: 50%;
    border-top: 10px solid #5F6C7C;
    animation-name: girar;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
    z-index: 100;
  }
  @keyframes girar {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(720deg);
    }
  }
`

const LoadingAtom = () => {
    return (
        <Loading>
            <div><span></span><div></div></div>
        </Loading>
    );
};

export default LoadingAtom;
