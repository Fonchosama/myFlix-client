export const ProfileView = ({ movies, user, token, onUserUpdate }) => {
  const favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie.id)
  );

  const handleUserUpdate = (updatedUser) => {
    onUserUpdate(updatedUser);
  };

  return <h2>My Profile</h2>;
};
