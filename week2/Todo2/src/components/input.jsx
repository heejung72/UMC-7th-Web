// src/components/input.js
import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

function TodoInput() {
  const { text, setText } = useContext(TodoContext);  // TodoContext에서 text와 setText 가져오기

  return (
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}  // 텍스트 입력 시 setText로 상태 업데이트
      placeholder="할 일을 입력하세요"
    />
  );
}

export default TodoInput;
