import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/home'
import Login from './pages/login'
import SignUp from './pages/signup'
import Search from './pages/search'
import Movies from './pages/movies'
import RootLayout from './layout/rootlayout'
import NowPlaying from './pages/nowplaying'
import Popular from './pages/popular'
import TopRated from './pages/topRated'
import UpComing from './pages/upcoming'
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
        path: 'sign-up',
        element: <SignUp/>
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
        path: 'now-playing',
        element: <NowPlaying/>
      }
      ,
      {
        path: 'popular',
        element: <Popular/>
      }
      ,
      {
        path: 'top-rated',
        element: <TopRated/>
      }
      ,
      {
        path: 'up-coming',
        element: <UpComing/>
      }
      ,
      {
        path: ':movieId'
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