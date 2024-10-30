import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.Title}
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    directors: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
