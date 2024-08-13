import React from 'react';
import CompleteButton from "../ui/CompleteButton";
import ConfirmButton from "../ui/ConfirmButton";
import TutorButton from "../ui/TutorButton";
import DeleteButton from "../ui/DeleteButton"
import UpdateInput from "../ui/UpdateInput"


function TodoList({ todos, updateTodo, onTodoClick, onComplete, updateId, onConfirm, onLined, onDelete}) {

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {updateId === todo.id ? (
            <UpdateInput todo={todo} updateTodo={updateTodo}/>
          ) : (
            todo.lined ? (<s>{todo.title}</s>) : (<span onClick={() => onTodoClick(todo.id)}>{todo.title}</span>)
          )}
          <CompleteButton completed={todo.completed} onClick={() => onComplete(todo.id, todo.completed)}></CompleteButton>
          <ConfirmButton todo={todo} confirmed={todo.confirmed} onClick={() => onConfirm(todo.id, todo.confirmed)}></ConfirmButton>
          <TutorButton lined={todo.lined} onClick={() => onLined(todo.id, todo.lined)}></TutorButton>
          <DeleteButton onClick={() => onDelete(todo.id)}></DeleteButton>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;