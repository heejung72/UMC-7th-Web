// src/context/TodoContext.js
import React, { createContext, useState } from 'react';

// context 생성
export const TodoContext = createContext();

// provider 컴포넌트 정의
export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([
    { id: 1, task: 'html' },
    { id: 2, task: 'react' },
  ]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEdittext] = useState('');

  // 할 일 추가
  const addTodo = () => {
    if (text.trim().length === 0) {
      alert('입력해라 !');
      return;
    }
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText(''); // 할 일 추가 후 입력란 초기화
  };

  // 할 일 삭제
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  // 할 일 수정
  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId('');
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        text,
        setText,
        editingId,
        setEditingId,
        editText,
        setEdittext,
        addTodo,
        deleteTodo,
        updateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
