import './App.css';
import { MOVIES } from './mocks/movies';

function App() {
  const movies = MOVIES.results;

  return (
    <div className="app-container">
      <div className="movie-grid">
        {movies.slice(0, 10).map((movie, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Movie ${index + 1}`}
            className="movie-image"
          />
        ))}
      </div>
      <div className="movie-grid">
        {movies.slice(10, 20).map((movie, index) => (
          <img
            key={index}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Movie ${index + 11}`}
            className="movie-image"
          />
        ))}
      </div>
    </div>
  );
}

export default App;


