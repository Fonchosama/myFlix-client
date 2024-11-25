import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import { API_ENDPOINTS } from '../API';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]); // Todas las películas
  const [filteredMovies, setFilteredMovies] = useState([]); // Películas filtradas
  const [searchQuery, setSearchQuery] = useState(''); // Término de búsqueda

  const onUserUpdate = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(API_ENDPOINTS.MOVIES, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
        setFilteredMovies(movies); // Inicialmente, mostrar todas las películas
      });
  }, [token]);

  // Actualizar películas filtradas al cambiar el término de búsqueda
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMovies(movies);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = movies.filter((movie) =>
        movie.Title.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredMovies(filtered);
    }
  }, [searchQuery, movies]);

  return (
    <BrowserRouter>
      <div>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }}
        />

        {user && (
          <input
            type="search"
            style={{
              padding: 10,
              marginTop: 20,
              marginBottom: 10,
              width: '25%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            placeholder="Search movies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Actualizar el término de búsqueda
          />
        )}

        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Row className="justify-content-md-center">
                  <Col md={5}>
                    <SignupView />
                  </Col>
                </Row>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Row className="justify-content-md-center">
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                </Row>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" />
              ) : (
                <Row className="justify-content-md-center">
                  {filteredMovies.length === 0 ? (
                    <div className="no-movies">No Movies Found!</div>
                  ) : (
                    filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
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
                </Row>
              )
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
              !user ? (
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
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
