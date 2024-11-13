import { useEffect } from 'react';
import styled from 'styled-components';
import MovieCard from '../components/moviecards';
import { useGetInfiniteMovies } from '../hooks/queries/useGetInfiniteMovies';
import CardSkeleton from '../components/skeleton/card-skeleton';

const NowPlaying = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useGetInfiniteMovies('nowplaying');

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasNextPage) fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) {
    return (
      <MoviesContainer>
        <CardSkeleton number={20} />
        <h1>로딩 중입니다...</h1>
      </MoviesContainer>
    );
  }

  if (isError) {
    return (
      <div>
        <h1>에러가 발생했습니다: {error.message}</h1>
      </div>
    );
  }

  return (
    <MoviesContainer>
      {data?.pages.map((page) =>
        page.results.map((movie) => (
          <MovieCard
            key={movie.id}
            poster={movie.poster_path}
            title={movie.title}
            releaseDate={movie.release_date}
            movie={movie}
          />
        ))
      )}
    </MoviesContainer>
  );
};

export default NowPlaying;

const MoviesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 15px;
  padding: 20px;
`;
