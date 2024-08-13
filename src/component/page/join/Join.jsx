import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Join() {
  const [formData, setFormData] = useState({
    username: '',
    userid: '',
    password: '',
    email: ''
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/login");

    const formDataObject = new FormData();
    formDataObject.append('username', formData.username);
    formDataObject.append('userid', formData.userid);
    formDataObject.append('password', formData.password);
    formDataObject.append('email', formData.email);
    
    // Axios로 POST 요청 보내기
    try {
      const response = await axios.post('http://localhost:3000/item/join', formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data'
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
    <form onSubmit={handleSubmit}>
       <h1>회원 가입</h1>
      <div>
        <label>이름:</label>
          <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          />
      </div>
      <div>
        <label>아이디:</label>
          <input
          type="text"
          name="userid"
          value={formData.userid}
          onChange={handleChange}
          />
        </div>
       <div>
        <label>비밀번호:</label>
          <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          />
      </div>
      <div>
        <label>이메일:</label>
          <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          />
      </div>
      <button type="submit">제출</button>
    </form>
  );
}

export default Join;
