import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const onUserUpdate = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch('https://gianflix-02d504c4ae81.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }}
        />
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Row className="justify-content-md-center">
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  </Row>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Row className="justify-content-md-center">
                    <Col md={5}>
                      <LoginView onLoggedIn={(user) => setUser(user)} />
                    </Col>
                  </Row>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <Row className="justify-content-md-center">
                    {movies.length === 0 ? (
                      <div className="no-movies">No Movies!</div>
                    ) : (
                      movies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                          <MovieCard
                            key={movie.id}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                              setSelectedMovie(newSelectedMovie);
                            }}
                            onUserUpdate={onUserUpdate}
                          />
                        </Col>
                      ))
                    )}
                    <button
                      onClick={() => {
                        setUser(null);
                      }}
                    >
                      Logout
                    </button>
                  </Row>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    movies={movies}
                    token={token}
                    onUserUpdate={(updatedUser) => {
                      setUser(updatedUser);
                      localStorage.setItem('user', JSON.stringify(updatedUser));
                    }}
                  />
                </Col>
              )
            }
          />

          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" />
                ) : (
                  <Row className="justify-content-md-center">
                    {movies.length === 0 ? (
                      <div className="no-movies">No Movies!</div>
                    ) : (
                      <MovieView
                        movies={movies}
                        onMovieClick={(newSelectedMovie) => {
                          setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    )}
                  </Row>
                )}
              </>
            }
          />
        </Routes>
      </>
    </BrowserRouter>
  );
};
