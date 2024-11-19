import './App.css';
import { createBrowserRouter, RouterProvider, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home';
import Login from './pages/login';
import SignupPage from './pages/signup';
import Search from './pages/search';
import Movies from './pages/movies';
import RootLayout from './layout/rootlayout';
import NowPlaying from './pages/nowplaying';
import Popular from './pages/popular';
import TopRated from './pages/toprated';
import UpComing from './pages/upcoming';
import MovieDetail from './pages/MovieDetail';
import Navbar from './components/navbar'; // Navbar 추가

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
// 로그인 상태 확인
const isLoggedIn = () => {
  return localStorage.getItem('accessToken') !== null;
};

// 로그인하지 않은 사용자라면 로그인 페이지로 리디렉션
const PrivateRoute = ({ element }) => {
  return isLoggedIn() ? element : <Navigate to="/login" />;
};
// QueryClient 인스턴스 생성
const queryClient = new QueryClient();
// Router 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />  {/* 모든 페이지에 Navbar 표시 */}
        <RootLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: 'movies',
        element: <Movies />,
      },
    ],
  },
  {
    path: '/movies',
    element: (
      <>
        <Navbar />  {/* 모든 페이지에 Navbar 표시 */}
        <RootLayout />
      </>
    ),
    children: [
      {
        index: true,
        element: <Movies />,
      },
      {
        path: 'nowplaying',
        element: <NowPlaying />,
      },
      {
        path: 'popular',
        element: <Popular />,
      },
      {
        path: 'toprated',
        element: <TopRated />,
      },
      {
        path: 'upcoming',
        element: <UpComing />,
      },
      {
        path: ':movieId',
        element: <MovieDetail />,
      },
    ],
  },
  // PrivateRoute로 보호된 페이지
  {
    path: '/home',
    element: <PrivateRoute element={<HomePage />} />,
  },
]);


function App() {
  return (
    
  <RouterProvider router={router} />

  );
}

  export default App;