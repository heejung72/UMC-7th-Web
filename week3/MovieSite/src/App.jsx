import './App.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
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
import Purchase from './pages/purchase';
import Subscribe from './pages/subscribe';
import TvDetail from './pages/TvDetail'; // TvDetail 추가
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 

// 로그인 상태 확인 함수
const isLoggedIn = () => {
  return localStorage.getItem('accessToken') !== null;
};

// PrivateRoute 컴포넌트
const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

// Router 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar /> {/* 모든 페이지에 Navbar 표시 */}
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
        path: 'purchase',
        element: <Purchase />,
      },
      {
        path: 'subscribe',
        element: <Subscribe />,
      },
      {
        path: 'movies',
        element: <Movies />,
      },
      {
        path: 'movies/nowplaying',
        element: <NowPlaying />,
      },
      {
        path: 'movies/popular',
        element: <Popular />,
      },
      {
        path: 'movies/toprated',
        element: <TopRated />,
      },
      {
        path: 'movies/upcoming',
        element: <UpComing />,
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetail />, // 영화 상세 페이지
      },
      {
        path: 'tv/:tvId', // TV 상세 페이지 경로
        element: <TvDetail />,
      },
    ],
  },

  // PrivateRoute로 보호된 페이지
  {
    path: 'home',
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
]);


function App() {
  return (
    <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} /> 
      <ReactQueryDevtools initialIsOpen={false} /> 
    </QueryClientProvider>
  );
}

export default App;
