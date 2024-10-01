//eslint-disable react-next-line react/prop-types//
function TodoInput ({ text, setText })  {
    return (
      <input
        type="text"
        className="todo-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    );
  };
  
  export default TodoInput;