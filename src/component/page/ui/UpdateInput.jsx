import React, { useState, useEffect, useRef } from 'react';

function UpdateInput({todo, updateTodo}) {
    const inputRef = useRef(null);
    const [editedTodo, setEditedTodo] = useState({ id: null, title: '' });
  
    useEffect(() => {
      // 외부 클릭 시 이벤트 처리
      const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
          // 입력 필드 외부를 클릭한 경우에만 처리
          if (editedTodo.id !== null) {
          updateTodo({
            id: editedTodo.id,
            title: editedTodo.title
          });
          } else {
            updateTodo({
            id: editedTodo.id,
            title: todo.title
            });
          }
        setEditedTodo({ id: null, title: '' });
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
  
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [editedTodo, todo.title, updateTodo]);
  
    const handleChange = (event, todo) => {
      setEditedTodo({
        // ...editedTodo,
        id : todo.id,
        title: event.target.value
      });
  
      
    };
  // console.log('title : ',exceptTodo);
  
    return (
        <input
        type="text"
        ref={inputRef}
        value={editedTodo.id === todo.id ? editedTodo.title : todo.title}
        onChange={(event) => handleChange(event, todo)}
        />
    );
}
    
export default UpdateInput;