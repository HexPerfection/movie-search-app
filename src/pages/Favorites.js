import React, { useState, useEffect } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <div>
      <h1>Your Favorite Movies</h1>
      {favorites.map(movie => (
        <div key={movie.imdbID}>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;