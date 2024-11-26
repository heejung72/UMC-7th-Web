import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import TodoDetail from './pages/TodoDetail'; // 상세 페이지를 위한 컴포넌트

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home 페이지 */}
        <Route path="/" element={<Home />} />
        {/* 상세 페이지 */}
        <Route path="/detail/:id" element={<TodoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
