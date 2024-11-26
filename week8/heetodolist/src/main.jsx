import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TodoProvider } from './context/TodoContext';

ReactDOM.createRoot(document.getElementById('root')).render(
    <TodoProvider> {/* App 컴포넌트를 TodoProvider로 감싸기 */}
      <App />
    </TodoProvider>
  );
