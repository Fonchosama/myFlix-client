import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
export const MovieCard = ({ movie, onMovieClick, onUserUpdate }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const isFav = user.FavoriteMovies.includes(movie._id);

  const addFav = (movieId) => {
    fetch(
      `https://gianflix-02d504c4ae81.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((user) => {
        onUserUpdate(user);
      });
  };

  const removeFav = (movieId) => {
    fetch(
      `https://gianflix-02d504c4ae81.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => response.json())
      .then((user) => {
        onUserUpdate(user);
      });
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Link to={`/movies/${movie._id}`}>View</Link>
        <div className="fav-icon">
          {isFav ? (
            <button onClick={() => removeFav(movie._id)}>
              <FaHeart />
            </button>
          ) : (
            <button onClick={() => addFav(movie._id)}>
              <FaRegHeart />
            </button>
          )}
        </div>
      </Card.Body>
    </Card>
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
