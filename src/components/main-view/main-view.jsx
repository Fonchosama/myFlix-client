import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Interstellar',
      image:
        'https://m.media-amazon.com/images/I/A1JVqNMI7UL._AC_UF894,1000_QL80_.jpg',
      director: 'Christopher Nolan',
      genre: 'Sci-fi',
      description:
        'A genre that explores imaginative and futuristic concepts, often involving advanced technology, space exploration, time travel, and extraterrestrial life.',
    },
    {
      id: 2,
      title: 'Inception',
      image:
        'https://m.media-amazon.com/images/I/51oAya-AtgL._SX300_SY300_QL70_ML2_.jpg',
      director: 'Christopher Nolan',
      genre: 'Sci-fi',
      description:
        'A skilled thief, the absolute best in the dangerous art of extraction, steals secrets from deep within the subconscious during the dream state.',
    },
    {
      id: 3,
      title: 'The Dark Knight',
      image:
        'https://m.media-amazon.com/images/I/81rGCm0PyHL.__AC_SX300_SY300_QL70_ML2_.jpg',
      director: 'Christopher Nolan',
      genre: 'Action',
      description:
        'Batman sets out to dismantle the remaining criminal organizations that plague Gotham, but the Joker thrusts him into a personal conflict.',
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
