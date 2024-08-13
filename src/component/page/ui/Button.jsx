import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    border-width: 1px;
    border-radius: 5px;
    border-color: aliceblue;
    color: lightgrey;
    width: 100px;
    font-size: 1rem;
    background-color: aliceblue;
`;


function Button(props) {
  const { title, onClick } = props;
  return <StyledButton onClick={onClick}>{title || 'button'}</StyledButton>;
}


export default Button;
