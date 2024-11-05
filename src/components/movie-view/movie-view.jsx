import './movie-view.scss';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();
  const movie = movies.find((b) => b._id === movieId);

  return (
    <Row className="justify-content-md-center mt-5">
      <Col>
        <div>
          <strong>Title: </strong>
          <br></br>
          <span>{movie.Title}</span>
        </div>
        <div>
          <strong>Director: </strong>
          <br></br>
          <span>{movie.Director.Name}</span>
        </div>
        <div>
          <strong>Genre: </strong>
          <br></br>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <strong>Description: </strong>
          <br></br>
          <span>{movie.Description}</span>
        </div>
      </Col>
      <Col md={9}>
        <img src={movie.ImagePath} className="image" />
      </Col>
      <Col>
        <Link to="/" className="btn btn-warning">
          Back
        </Link>
      </Col>
    </Row>
  );
};
