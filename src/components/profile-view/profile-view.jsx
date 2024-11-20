import moment from 'moment';
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { MovieCard } from '../movie-card/movie-card';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { AiOutlineDelete } from 'react-icons/ai';
import './profile-view.scss';

export const ProfileView = ({ movies, user, token, onUserUpdate }) => {
  // Get user data from localStorage
  const localUser = JSON.parse(localStorage.getItem('user'));
  console.log(localUser);
  const localToken = localStorage.getItem('token');

  // Set initial state to user data
  const [username, setUsername] = useState(localUser.Username || '');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(localUser.Email || '');
  const [birthday, setBirthday] = useState(localUser.Birthday);
  const deleteaccount = (id) => {
    console.log('probando');
    fetch(
      `https://gianflix-02d504c4ae81.herokuapp.com/users/${localUser.Username}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localToken}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          console.log('updated user', user);
          alert('Cuenta Borrada');
        });
      } else {
        alert('Failed to update profile');
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
    fetch(
      `https://gianflix-02d504c4ae81.herokuapp.com/users/${localUser.Username}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${localToken}`,
          'Content-Type': 'application/json',
        },
      }
    ).then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          console.log('updated user', user);
          onUserUpdate(user);
          alert('Profile updated successfully');
        });
      } else {
        alert('Failed to update profile');
      }
    });
  };

  return (
    <Row className="justify-content-md-center mt-5">
      <Col>
        <h2>My Profile</h2>
        <div>
          <strong>User: </strong>
          <span>{user.Username}</span>
          <br />
          <strong>Birthdate: </strong>
          <span>{user.Birthday}</span>
          <br />
          <strong>Email: </strong>
          <span>{user.Email}</span>
        </div>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Edit Profile</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  minLength="4"
                />
                <button onClick={() => deleteaccount(user._id)}>
                  <AiOutlineDelete />
                </button>
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formBdate">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                  type="date"
                  value={moment(birthday).format('YYYY-MM-DD')}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Edit Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>

      <Col xs="3" sm="3">
        <div className="favorite_movies">
          <h2>Favorite Movies</h2>
          {localUser.FavoriteMovies.length > 0 ? (
            movies
              .filter((movie) => movies.includes(movie))
              .map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={movie}
                  onUserUpdate={onUserUpdate}
                />
              ))
          ) : (
            <p>No favorite movies yet</p>
          )}
        </div>
      </Col>
      <br></br>
      <hr />
    </Row>
  );
};
