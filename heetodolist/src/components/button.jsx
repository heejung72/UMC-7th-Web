// src/components/button.js

function TodoButton({ label, onClick }) {
  return (
    <button className="todo-button" onClick={onClick}>
      {label}
    </button>
  );
}

export default TodoButton;
