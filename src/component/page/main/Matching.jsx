import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex: 1
`;

const SideContent = styled.div`
`;

const Title = styled.h1`
    color: green;
`;

const MainContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MenuTitle = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
`;

const InputArea = styled.div`
    margin-bottom: 20px;
    display: flex;
    flex-basis: 30px;
    justify-content: end;
`;

const InfoInput = styled.input`
    margin-left: 10px;
    border-radius: 5px;
    border: 1px #ff76c5 solid;
    font-size: 1rem;

    transition: all 0.5s ease-in-out; /* 애니메이션 추가 */

    &:focus-visible {
        outline-color: greenyellow;
    }
`;


const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InfoLabel = styled.label`
    font-size: 1.3rem;
`;

const IntoBtnDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    flex-basis: 30px;
`;

const InfoBtn = styled.button`
    flex-basis: 80px;

    background-color: #adff2f;
    border-color: #adff2f;
    border-style: solid;
    border-radius: 5px;
    font-weight: bold;
    font-size: 1rem;
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


function Matching() {
  const [formData, setFormData] = useState({
    tutorid: '',
    tuteeid: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/main');

    const formDataObject = new FormData();
    formDataObject.append('tutorid', formData.tutorid);
    formDataObject.append('tuteeid', formData.tuteeid);

    // Axios로 POST 요청 보내기
    try {
      const response = await axios.post('http://localhost:3000/item/matching', formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('서버 응답:', response.data);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <SideContent>
        <Title>팀매칭</Title>
      </SideContent>

      <MainContent>
        <Form onSubmit={handleSubmit}>
          <MenuTitle>튜터 튜티 매칭</MenuTitle>
          <InputArea>
            <InfoLabel for="tutorid">🧑‍🏫 튜터‍</InfoLabel>
            <InfoInput
              type="text"
              name="tutorid"
              id="tutorid"
              placeholder="아이디를 입력해주세요."
              value={formData.tutorid}
              onChange={handleChange}
            />
          </InputArea>
          <InputArea>
            <InfoLabel for="tuteeid">🧑‍💻 튜티</InfoLabel>
            <InfoInput
              type="text"
              name="tuteeid"
              id="tuteeid"
              placeholder="아이디를 입력해주세요."
              value={formData.tuteeid}
              onChange={handleChange}
            />
          </InputArea>
          <IntoBtnDiv>
            <InfoBtn type="submit">완료</InfoBtn>
          </IntoBtnDiv>
        </Form>
      </MainContent>
    </Container>
  );
}

export default Matching;
