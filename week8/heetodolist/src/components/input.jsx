// src/components/TodoInput.js
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

function TodoInput() {
  const { title, setTitle, content, setContent } = useContext(TodoContext);

  return (
    <>
      <div className="title-container">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // 제목 업데이트
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="content-container">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)} // 내용 업데이트
          placeholder="내용을 입력하세요"
        />
      </div>
    </>
  );
}

export default TodoInput;
