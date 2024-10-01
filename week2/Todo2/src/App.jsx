import { useState } from 'react';
import './App.css';
import TodoInput from './components/input'; // TodoInput 컴포넌트 import
import TodoButton from './components/button'; // TodoButton 컴포넌트 import

function App() {
  // 투두리스트
  const [todos, setTodos] = useState([
    { id: 1, task: 'html' },
    { id: 2, task: 'react' },
  ]);

  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState('');
  const [editText, setEdittext] = useState('');

  // 랜더링 방지
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 추가
  const addTodo = () => {
    if (text.trim().length === 0) {
      alert('입력해라 !');
      return; // 빈 입력 방지
    }
    setTodos((prev) => [
      ...prev,
      { id: Math.floor(Math.random() * 100) + 2, task: text },
    ]);
    setText('');
  };

  // 삭제
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  // 수정
  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, task: text } : item))
    );
    setEditingId('');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="todo-form">
        <TodoInput text={text} setText={setText} /> {/* TodoInput 컴포넌트 사용 */}
        <TodoButton onClick={addTodo} label="할 일 등록" /> {/* TodoButton 컴포넌트 사용 */}
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
                    <input
                      className="edit-input"
                      defaultValue={todo.task}
                      onChange={(e) => setEdittext(e.target.value)}
                    />
                  ) : (
                    todo.task
                  )}
                </td>
                <td>
                  <TodoButton onClick={() => deleteTodo(todo.id)} label="삭제하기" />
                  {editingId === todo.id ? (
                    <TodoButton
                      onClick={() => updateTodo(editingId, editText)}
                      label="수정완료"
                    />
                  ) : (
                    <TodoButton
                      onClick={() => setEditingId(todo.id)}
                      label="수정진행"
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
