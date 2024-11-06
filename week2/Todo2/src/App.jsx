import React, { useContext } from 'react';
import { TodoContext } from './context/TodoContext';
import TodoInput from './components/input';
import TodoButton from './components/button';
import './App.css';

function App() {
  const { todos, deleteTodo, editingId, setEditingId, editText, setEdittext } = useContext(TodoContext);

  return (
    <div className="container">
      <form onSubmit={(e) => e.preventDefault()} className="todo-form">
        <TodoInput />
        <TodoButton label="할 일 등록" />
      </form>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>할 일</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>
                  {editingId === todo.id ? (
                    // editingId가 일치하면 <input>을 렌더링
                    <input
                      className="edit-input"
                      value={editText}
                      onChange={(e) => setEdittext(e.target.value)}
                    />
                  ) : (
                    // 그렇지 않으면 할 일 텍스트 표시
                    todo.task
                  )}
                </td>
                <td>
                  <TodoButton
                    label="삭제하기"
                    onClick={() => deleteTodo(todo.id)}
                  />
                  {editingId === todo.id ? (
                    <TodoButton label="수정완료" />
                  ) : (
                    <TodoButton
                      label="수정진행"
                      onClick={() => {
                        setEditingId(todo.id); // 현재 수정할 todo의 ID를 설정
                        setEdittext(todo.task); // 현재 할 일 내용을 editText에 설정
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
