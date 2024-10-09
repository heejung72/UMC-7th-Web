import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home';
import Login from './pages/login';
import SignupPage from './pages/signup';
import SearchPage from './pages/search';
import Movies from './pages/movies';
import RootLayout from './layout/rootlayout';
import NowPlaying from './pages/nowplaying';
import Popular from './pages/popular';
import TopRated from './pages/topRated';
import UpComing from './pages/upcoming';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <SignupPage />
      },
      {
        path: 'search',
        element: <SearchPage />
      },
      {
        path: 'movies',
        element: <Movies />,  // 'movies' 경로는 이곳에서 정의
        children: [
          {
            path: 'now-playing',  // 경로는 'now-playing'으로 유지
            element: <NowPlaying />
          },
          {
            path: 'popular',
            element: <Popular />
          },
          {
            path: 'top-rated',  // 'toprated' -> 'top-rated'로 수정
            element: <TopRated />
          },
          {
            path: 'up-coming',  // 'upcoming' -> 'up-coming'으로 수정
            element: <UpComing />
          }
        ]
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
