// src/context/TodoContext.js
import { createContext, useState } from 'react';

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // 할 일 추가
  const addTodo = () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 입력해주세요!');
      return;
    }
    const newTodo = {
      id: Date.now(), // 고유 id
      title,
      content,
      isChecked: false, // 기본 상태는 미완료
      createdAt: new Date().toISOString(), // 생성 날짜 기록
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTitle('');
    setContent('');
  };
  

  // 체크박스 상태 변경
  const toggleTodoChecked = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  // 할 일 수정
  const updateTodo = (id, updatedTitle, updatedContent) => {
    if (!updatedTitle.trim() || !updatedContent.trim()) {
      alert('수정할 제목과 내용을 입력해주세요!');
      return;
    }

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, title: updatedTitle, content: updatedContent }
          : todo
      )
    );

    setEditingId(null); // 수정 모드 종료
    setEditTitle(''); // 수정 제목 초기화
    setEditContent(''); // 수정 내용 초기화
  };

  // 할 일 삭제
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        title,
        setTitle,
        content,
        setContent,
        editingId,
        setEditingId,
        editTitle,
        setEditTitle,
        editContent,
        setEditContent,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodoChecked, // 체크박스 상태 변경 함수 추가
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
