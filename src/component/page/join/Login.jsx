import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";


//const UsernameContext = React.createContext();
//const MatchingnameContext = React.createContext();
//const IsAuthorOneContext = React.createContext();

function Login() {
  const [formData, setFormData] = useState({
    userid: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 // const [username, setUsername] = useState('');
 // const [isAuthorOne, setIsAuthorOne] = useState(false);
 // const [isAuthorTwo, setIsAuthorTwo] = useState(false);
 // const [matchingname, setMatchingname] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    localStorage.setItem('userid', formData.userid);

    const formDataObject = new FormData();

    formDataObject.append('userid', formData.userid);
    formDataObject.append('password', formData.password);
    
    // Axios로 POST 요청 보내기
    try {
      const response = await axios.post('http://localhost:3000/item/login', formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log('서버 응답:', response.data);
      //setUsername(response.data.USER_NAME);
      //setMatchingname(response.data.matchingname);
      localStorage.setItem('username', response.data.USER_NAME);
      localStorage.setItem('matchingname', response.data.matchingname);
      //console.log('서버 응답:', {username});
      //console.log('서버 응답:', {matchingname});
      //console.log('서버 응답:', {isAuthorOne});
      if (response.data.except === 1) {
        // 로그인 실패
        setIsLoggedIn(false);
        alert('로그인 실패. 사용자 이름과 비밀번호를 확인하세요.');
        } else {
        // 로그인 성공
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1시간 후 만료
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('expirationTime', expirationTime);
        setIsLoggedIn(true);
      }

      if (response.data.AUTHOR === '1') {
        localStorage.setItem('isAuthorOne', 'true');
        localStorage.setItem('isAuthorTwo', 'false');
        //setIsAuthorOne(true);
      } else if (response.data.AUTHOR === '2'){
        localStorage.setItem('isAuthorTwo', 'true');
        localStorage.setItem('isAuthorOne', 'false');
        //setIsAuthorTwo(true);
      } else {
        localStorage.setItem('isAuthorOne', 'false');
        localStorage.setItem('isAuthorTwo', 'false');
        //setIsAuthorOne(false);
        //setIsAuthorTwo(false);
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  const storedUserid = localStorage.getItem('userid');
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('isAuthorOne');
    localStorage.removeItem('isAuthorTwo');
    localStorage.removeItem('username');
    localStorage.removeItem('matchingname');
    localStorage.removeItem('userid');
    
    
    setIsLoggedIn(false);
    //setIsAuthorOne(false);
    //setIsAuthorTwo(false);
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    const expirationTime = localStorage.getItem('expirationTime');

    if (storedIsLoggedIn === 'true' && expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > parseInt(expirationTime)) {
        // 세션이 만료되었을 때 로그아웃
        handleLogout();
      } else {
        setIsLoggedIn(true);
        //setIsAuthorOne(true);
        //setIsAuthorTwo(true);
      }
    }
  }, []);

  const navigate = useNavigate();
      //<UsernameContext.Provider value={username}/>
      //<MatchingnameContext.Provider value={matchingname}/>
      //<IsAuthorOneContext.Provider value={isAuthorOne}/>
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>로그인 성공!</h1>
          <p>환영합니다, {storedUserid}님.</p>
          <Button title="HOME"
            onClick={() => {
                navigate("/main");
        }}/>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
        <div>
          <h1>로그인</h1>
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
          <button type="submit">로그인</button>
        </div>
        </form>
      )}
    </div>
  );
}

export default Login;
