import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { WatchlistContext } from '../context/WatchlistContext';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { addToWatchlist } = useContext(WatchlistContext);
  const placeholderImg = 'https://via.placeholder.com/300x450?text=No+Image';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await axios.get(
        `http://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
      );
      setMovie(res.data);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      {/* Movie Poster */}
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : placeholderImg}
        alt={movie.Title}
        className="movie-poster"
      />

      {/* Movie Info */}
      <div className="movie-info">
        <h1>{movie.Title} ({movie.Year})</h1>
        <p><strong>Plot:</strong> {movie.Plot || 'No plot available.'}</p>
        <p><strong>Runtime:</strong> {movie.Runtime || 'N/A'}</p>
        <p><strong>Genre:</strong> {movie.Genre || 'N/A'}</p>
        <p><strong>Director:</strong> {movie.Director || 'N/A'}</p>
        <p><strong>Actors:</strong> {movie.Actors || 'N/A'}</p>
        <p><strong>Language:</strong> {movie.Language || 'N/A'}</p>
        <p><strong>Country:</strong> {movie.Country || 'N/A'}</p>
        <p><strong>Awards:</strong> {movie.Awards || 'N/A'}</p>
        <p><strong>Box Office:</strong> {movie.BoxOffice || 'N/A'}</p>
        <p><strong>Metascore:</strong> {movie.Metascore || 'N/A'}</p>
        {movie.Type === 'series' && (
          <p><strong>Seasons:</strong> {movie.totalSeasons || 'N/A'}</p>
        )}
        <p><strong>Released:</strong> {movie.Released || 'N/A'}</p>
        <p><strong>IMDb Rating:</strong> {movie.imdbRating || 'N/A'}</p>

        {/* Add to Watchlist Button */}
        <button onClick={() => addToWatchlist(movie)}>
          Add to Watchlist
        </button>
      </div>
    </div>
  );
};

export default MovieDetails;