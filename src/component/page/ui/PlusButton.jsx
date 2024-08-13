import React, { useState } from 'react';
import styled from 'styled-components';


const Btn = styled.button`
    padding: 10px;
    background-color: #adff2f;
    border-color: #adff2f;
    border-style: solid;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1.1rem;
    flex-basis: 100px;
    cursor: pointer;
    transition: all 0.5s ease-in-out; /* 애니메이션 추가 */

    &:focus-visible {
        outline-color: #1ec663;
        transform: translateY(2px); /* 버튼을 아래로 살짝 이동 */
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
    }

    &:active {
        background-color: #22e271;
        border-color: #22e271;
        transform: translateY(2px); /* 버튼을 아래로 살짝 이동 */
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 그림자 효과 */
    }
`;

const PlusButton = ({ onClick }) => {
  return <Btn onClick={onClick}>Plus</Btn>;
};


export default PlusButton;
