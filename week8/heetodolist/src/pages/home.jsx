import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import TodoInput from '../components/input';
import TodoButton from '../components/button';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가
import './Home.css';

function Home() {
  const {
    todos,
    deleteTodo,
    editingId,
    setEditingId,
    editTitle,
    setEditTitle,
    editContent,
    setEditContent,
    addTodo,
    updateTodo,
    toggleTodoChecked,
  } = useContext(TodoContext);

  const navigate = useNavigate(); // 네비게이션 훅

  return (
    <div className="container">
      <div className="header">
        <h1>HEE ToDoList</h1>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="todo-form">
        <div className="input-container">
          <TodoInput />
        </div>
        <div className="button-container">
          <TodoButton label="ToDo 생성" onClick={addTodo} />
        </div>
      </form>

      <div className="table-container">
        <table className="table">
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                {/* 체크박스 */}
                <td>
                  <input
                    type="checkbox"
                    checked={todo.isChecked}
                    onChange={() => toggleTodoChecked(todo.id)}
                  />
                </td>
                <td>
  <span
    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
    onClick={() => navigate(`/detail/${todo.id}`)} // "detail" 클릭 시 상세 페이지로 이동
  >
    detail
  </span>
</td>
                <td>
  {editingId === todo.id ? (
    <input
      className="edit-input"
      value={editTitle}
      onChange={(e) => setEditTitle(e.target.value)} // 제목 입력 필드
    />
  ) : (
    todo.title
  )}
</td>



<td>
  {editingId === todo.id ? (
    <input
      className="edit-input"
      value={editContent}
      onChange={(e) => setEditContent(e.target.value)} // 내용 입력 필드
    />
  ) : (
    todo.content
  )}
</td>
<td>
  {editingId === todo.id ? (
    <TodoButton
      label="수정완료"
      onClick={() => updateTodo(todo.id, editTitle, editContent)} // 제목과 내용 업데이트
    />
  ) : (
    <TodoButton
      label="수정"
      onClick={() => {
        setEditingId(todo.id);
        setEditTitle(todo.title); // 제목 초기화
        setEditContent(todo.content); // 내용 초기화
      }}
    />
  )}
</td>
<td>
  <TodoButton label="삭제" onClick={() => deleteTodo(todo.id)} />
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
