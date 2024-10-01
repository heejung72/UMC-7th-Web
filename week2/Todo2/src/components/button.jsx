//eslint-disable react-next-line react/prop-types//
function TodoButton ({ onClick, label }) {
    return (
      <button onClick={onClick} className="button">
        {label}
      </button>
    );
  }
  
  export default TodoButton;