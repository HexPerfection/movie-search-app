import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { WatchlistContext } from '../context/WatchlistContext';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { addToWatchlist } = useContext(WatchlistContext);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const res = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`);
      setMovie(res.data);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <h1>{movie.Title}</h1>
      <p>{movie.Plot}</p>
      <p>Runtime: {movie.Runtime}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Director: {movie.Director}</p>
      <p>Actors: {movie.Actors}</p>
      <p>Language: {movie.Language}</p>
      <p>Country: {movie.Country}</p>
      <p>Awards: {movie.Awards}</p>
      <p>BoxOffice: {movie.BoxOffice}</p>
      <p>Metascore: {movie.Metascore}</p>
      <p>Type: {movie.Type}</p>
      <p>Season: {movie.totalSeasons}</p>
      <p>Released: {movie.Released}</p>
      <p>Rating: {movie.imdbRating}</p>
      <img src={movie.Poster} alt={movie.Title}></img>
      <button onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
    </div>
  );
};

export default MovieDetails;