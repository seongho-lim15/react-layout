import React, {useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Title = styled.h1`
  color: green;
  `;

function LogoPage() {
  const navigate = useNavigate();
  // 2초 뒤 채팅 메인으로 넘어가는 함수 작성
  const timeout = () => {
    setTimeout(() => {
      navigate("/instructions");
    }, 2000);
  };
  // 컴포넌트가 화면에 다 나타나면 timeout 함수 실행
  useEffect(() => {
    timeout();
    return () => {
      // clear 해줌
      clearTimeout(timeout);
    };
  });
  
  return (

   <Title>아이템</Title>

  );
}

export default LogoPage;