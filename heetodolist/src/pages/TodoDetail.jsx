import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

function TodoDetail() {
  const { id } = useParams(); // URL에서 id 추출
  const { todos } = useContext(TodoContext);

  // 현재 id와 일치하는 todo 찾기
  const todo = todos.find((item) => item.id === Number(id));

  if (!todo) {
    return <p>할 일을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="container">
      <h1>HEE ToDoList</h1>
      <div className="detail-box">
        <p><strong>ID:</strong> {todo.id}</p>
        <p><strong>제목:</strong> {todo.title}</p>
        <p><strong>내용:</strong> {todo.content}</p>
        <p><strong>생성 날짜:</strong> {new Date(todo.createdAt).toLocaleString()}</p>
        <p><strong>상태:</strong> {todo.isChecked ? '완료' : '미완료'}</p>
      </div>
    </div>
  );
}

export default TodoDetail;
