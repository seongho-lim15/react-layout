import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-width: 1px;
  padding: 10px;
  backgroundColor: black;
  color: white;
  cursor: pointer;
  `;


function DeleteButton(props){
  
  const{onClick}= props;


  return (

  <StyledButton onClick={onClick}>DELETE</StyledButton>
  
  );

};


export default DeleteButton;