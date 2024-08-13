import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlusButton from '../ui/PlusButton';
import Button from '../ui/Button';
import Todolist from './Todolist';
//import { useContext } from "react";

const Title = styled.h1`
    color: green;
`;

const Container = styled.div`
    display: flex;
    flex: 1
`;

const MainContent = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SideContent = styled.div`
`;

const InputArea = styled.div`
    flex-basis: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const TodoInput = styled.input`
    font-size: 1rem;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px #ff76c5 solid;
    color: #ff76c5;
    flex-basis: 500px;
    transition: all 0.5s ease-in-out; /* 애니메이션 추가 */

    &::placeholder {
        color: #ff76c5;
    }

    &:focus-visible {
        outline-color: greenyellow;
        color: greenyellow;
        transform: translateY(2px); /* 버튼을 아래로 살짝 이동 */

        &::placeholder {
            color: greenyellow;
        }
    }
`;

const MenuTitle = styled.p`
    font-size: 1.8rem;
    font-weight: bold;
`;


const MainTodolist = (props) => {

  const navigate = useNavigate();

  const username = localStorage.getItem('username');
  const matchingname = localStorage.getItem('matchingname');
  const isAuthorOne = localStorage.getItem('isAuthorOne');
  const isAuthorTwo = localStorage.getItem('isAuthorTwo');

//const username =useContext(UsernameContext);
//const matchingname =useContext(MatchingnameContext);
//const isAuthorOne =useContext(IsAuthorOneContext);

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/item/gettodo')
      .then((response) => setTodos(response.data))
      .catch((error) => console.error('Error fetching todos:', error));
  }, []);

  const handleAddTodo = () => {
    axios.post('http://localhost:3000/item/addtodo',
      { title: newTodo, completed: false, confirmed: false, lined: false },
    )
      .then((response) => setTodos([...todos, response.data]))
      .catch((error) => console.error('Error adding todo:', error));

    setNewTodo('');
  };

  const handleUpdateTodo = (updateTodo) => {
    setUpdateId(updateTodo.id);
    if (updateId) {
      axios.put(`http://localhost:3000/item/updatetodo/${updateId}`,
        { title: updateTodo.title, completed: false, confirmed: false, lined: false },
      )
        .then(() => {
          setUpdateId(null);
          axios.get('http://localhost:3000/item/gettodo')
            .then((response) => setTodos(response.data))
            .catch((error) => console.error('Error fetching todos:', error));
        })
        .catch((error) => console.error('Error updating todo:', error));
    }
  };

  const handleUpdateComplete = (id, completed) => {
    axios.patch(`http://localhost:3000/item/updatecomplete/${id}`, { completed: !completed })
      .then(() => {
        axios.get('http://localhost:3000/item/gettodo')
          .then((response) => setTodos(response.data))
          .catch((error) => console.error('Error fetching todos:', error));
      })
      .catch((error) => console.error('Error updating todo:', error));

  };

  const handleUpdateConfirm = (id, confirmed) => {
    axios.patch(`http://localhost:3000/item/updateconfirm/${id}`, { confirmed: !confirmed })
      .then(() => {
        axios.get('http://localhost:3000/item/gettodo')
          .then((response) => setTodos(response.data))
          .catch((error) => console.error('Error fetching todos:', error));
      })
      .catch((error) => console.error('Error updating todo:', error));

  };

  const handleUpdateLine = (id, lined) => {
    axios.patch(`http://localhost:3000/item/updateline/${id}`, { lined: !lined })
      .then(() => {
        axios.get('http://localhost:3000/item/gettodo')
          .then((response) => setTodos(response.data))
          .catch((error) => console.error('Error fetching todos:', error));
      })
      .catch((error) => console.error('Error updating todo:', error));

  };

  const handleTodoClick = (id) => {
    if (!updateId) {
      setUpdateId(id);
    }
  };

  const handleDeleteTodo = (id) => {
    axios.delete(`http://localhost:3000/item/deletetodo/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((error) => console.error('Error deleting todo:', error));
  };
// // 버튼 정보를 저장할 상태 설정
// const [buttons, setButtons] = useState([]);

// // 버튼 클릭 시 동작 함수
// const handleButtonClick = () => {
//   // 새로운 버튼 정보 생성

//   const newButton = {
//     id: buttons.length + 1, // 간단한 id 부여 (id는 고유해야 함)
//   };

//   // 새로운 버튼 정보를 기존 버튼 배열에 추가
//   setButtons([...buttons, newButton]);
// };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };


  return (
    <Container>

      <SideContent>
        <Title>메인</Title>
        <Button
          title="팀매칭"
          onClick={() => {
            navigate('/matching');
          }}
        />
        {((isAuthorOne === 'false') && (isAuthorTwo === 'false')) ? null : (
          <p>{username} {isAuthorOne === 'true' ? '튜티' : '튜터'}</p>)}
        {matchingname !== '매칭해주세요' ? (<p>{matchingname} {isAuthorOne === 'true' ? '튜터' : '튜티'}</p>) :
          <p>{username} 님 매칭해주세요</p>}
      </SideContent>

      <MainContent>
        <MenuTitle>Todo List</MenuTitle>

        <InputArea>
          <TodoInput
            type="text"
            value={newTodo}
            placeholder="Add Note"
            onChange={(e) => {
              console.log('e', e);
              setNewTodo(e.target.value);
            }}
            onKeyUp={handleKeyUp}
          />
          <PlusButton onClick={handleAddTodo}></PlusButton>
        </InputArea>

        <Todolist
          todos={todos}
          updateTodo={handleUpdateTodo}
          onComplete={handleUpdateComplete}
          onConfirm={handleUpdateConfirm}
          onLined={handleUpdateLine}
          onUpdate={handleUpdateTodo}
          onTodoClick={handleTodoClick}
          onDelete={handleDeleteTodo}
          updateId={updateId}
        />
      </MainContent>

    </Container>
  );
};

export default MainTodolist;
