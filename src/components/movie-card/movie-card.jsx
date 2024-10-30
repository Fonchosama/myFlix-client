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

// return (
//   <Card>
//     <Card.Img variant="top" src={movie.ImagePath} />
//     <Card.Body>
//     <Card.Title>{movie.title}</Card.Title>
//     <Card.Text>{movie.description}</Card.Text>
//       <Button onClick={() => onBookClick(book)} variant="link">
//         Open
//       </Button>
//     </Card.Body>
//   </Card>
// );
// };
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    directors: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
