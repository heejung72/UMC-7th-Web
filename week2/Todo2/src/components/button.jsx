import React, { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

function TodoButton({ label, onClick }) {
  const { addTodo, updateTodo, editingId, editText } = useContext(TodoContext);

  const handleClick = () => {
    if (label === '할 일 등록') {
      addTodo();
    } else if (label === '삭제하기' && onClick) {
      onClick();
    } else if (label === '수정완료' && editingId !== '') {
      updateTodo(editingId, editText);
    } else if (label === '수정진행' && onClick) {
      onClick();
    }
  };

  return (
    <button onClick={handleClick}>
      {label}
    </button>
  );
}

export default TodoButton;
