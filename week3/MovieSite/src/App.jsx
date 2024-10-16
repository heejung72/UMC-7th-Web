import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home'
import Login from './pages/login'
import SignupPage from './pages/signup'
import Search from './pages/search'
import Movies from './pages/movies'
import RootLayout from './layout/rootlayout'
import NowPlaying from './pages/nowplaying'
import Popular from './pages/popular'
import TopRated from './pages/toprated'
import UpComing from './pages/upcoming'
import MovieDetail from './pages/MovieDetail';
// import { MOVIES } from './mocks/movies'


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'signup',
        element: <SignupPage/>
      },
      {
        path: 'search',
        element: <Search/>
      },
      {
        path: 'movies',
        element: <Movies/>
      }
    ]
  },
  {
    path: '/movies',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <Movies/>
      },
      {
        path: 'nowplaying',
        element: <NowPlaying/>
      }
      ,
      {
        path: 'popular',
        element: <Popular/>
      }
      ,
      {
        path: 'toprated',
        element: <TopRated/>
      }
      ,
      {
        path: 'upcoming',
        element: <UpComing/>
      }
      ,
      {
        path: ':movieId',
        element: <MovieDetail />
      }
    ]
  },
])

function App() {
  return( 
      <RouterProvider router={router} />
  );
}

export default App