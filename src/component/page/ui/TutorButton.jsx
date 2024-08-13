import React ,{ useState , useEffect} from 'react';

function TutorButton(props){
const{lined, onClick}= props;
var linedValue;
  linedValue = lined;
const [isButtonClicked, setIsButtonClicked] = useState(linedValue);
const [isConditionTrue, setIsConditionTrue] = useState(false);

//line 상태 db에 저장하고 id 에따라 line 상태값 정해지기

useEffect(() => {
  const storedIsAuthorTwo = localStorage.getItem('isAuthorTwo');

  if (storedIsAuthorTwo ==='true') {
    setIsConditionTrue(!isConditionTrue)
  };
}, []);

// const showLined = (lined) => {
//   // var linedValue;
//   linedValue = lined;
//   setIsButtonClicked(isButtonClicked);
//   console.log('lined : ', lined);
// };

const handleButtonClick = () => {
    setIsButtonClicked(!isButtonClicked);
  };

const buttonStyle = {
    padding: '10px',
    backgroundColor: isButtonClicked ? 'blue' : 'white',
    color: 'black',
    cursor: 'pointer',
  };

  return (
  
  <button style={buttonStyle} onClick={() => {handleButtonClick(); onClick(); }} disabled={!isConditionTrue}>GOOD
  </button>

  );
}


export default TutorButton;