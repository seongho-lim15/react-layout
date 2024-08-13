import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: '',
    userid: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    formDataObject.append('password', formData.password);
    formDataObject.append('userid', formData.userid);

    try {
      if (formData.password !== confirmPassword) {
        setError('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
        return;
      }
        const response = await axios.post('http://localhost:3000/item/reset', formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      if (response.data === 1) {
        setResetSuccess(true);
        setError(null);
      }
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
    <form onSubmit={handleResetPassword}>
    <div>
      <h2>비밀번호 재설정</h2>
      <label>
        아이디:
        <input type="text" name="userid" value={formData.userid} onChange={handleChange} />
      </label>
      <label>
        새 비밀번호:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <label>
        확인 비밀번호:
        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
      </label>
      <button type="submit">비밀번호 재설정</button>
      {resetSuccess && <p>비밀번호가 성공적으로 재설정되었습니다.</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </form>
  );
};

export default ResetPassword;
