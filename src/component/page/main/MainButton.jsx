import React, { useState } from 'react';

const ButtonExample = () => {
  // 버튼의 상태를 관리하기 위한 state 설정
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // 버튼 클릭 시 호출되는 함수
  const handleButtonClick = () => {
    // 상태를 변경하여 버튼의 스타일을 변경
    setIsButtonClicked(!isButtonClicked);
  };

  // 버튼의 스타일을 동적으로 설정
  const buttonStyle = {
    padding: '10px',
    backgroundColor: isButtonClicked ? 'green' : 'blue',
    color: 'white',
    cursor: 'pointer',
  };

  return (
    <div>
      {/* 클릭 이벤트가 발생하면 handleButtonClick 함수 호출 */}
      <button style={buttonStyle} onClick={handleButtonClick}>
        {isButtonClicked ? 'Clicked!' : 'Click me'}
      </button>
    </div>
  );
};

export default ButtonExample;
