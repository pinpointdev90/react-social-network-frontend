import {keyframes} from "@emotion/react";

export const fadeIn = keyframes`
    from, 0%, to {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`

export const hoverMenu = keyframes`
  from, 0% {
    transform: translate(1px) scale(1.1,1.1);
  }
  50% {
    transform: translate(-1px) scale(1.1,1.1);
  }
  to{
    transform: translate(1px) scale(1.1,1.1);
  }
`