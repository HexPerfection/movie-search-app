import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { WatchlistContext } from '../context/WatchlistContext'; 

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [year, setYear] = useState(''); 
  const [type, setType] = useState(''); 
  const { watchlist, addToWatchlist } = useContext(WatchlistContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Build the API request URL with filters
      let url = `http://www.omdbapi.com/?s=${query}&apikey=${process.env.REACT_APP_OMDB_API_KEY}&page=1`;

      // Add year filter if provided
      if (year) {
        url += `&y=${year}`;
      }

      // Add type filter if provided (movie, series, episode)
      if (type) {
        url += `&type=${type}`;
      }

      const res = await axios.get(url);
      setMovies(res.data.Search || []);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const isMovieInWatchlist = (movie) => watchlist.some((m) => m.imdbID === movie.imdbID);

  return (
    <div>
      <Link to="/watchlist">Watchlist</Link>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for movies..." 
        />
        <input 
          type="text" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          placeholder="Year (e.g., 2022)" 
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">All</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <button type="submit">Search</button>
      </form>

      <div>
        {movies.map(movie => (
            <div>
            <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
            <button 
              onClick={() => addToWatchlist(movie)} 
              disabled={isMovieInWatchlist(movie)}
            >
              {isMovieInWatchlist(movie) ? "Already in Watchlist" : "Add to Watchlist"}
            </button>
            <br></br>
            </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;