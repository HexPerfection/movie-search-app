import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { WatchlistContext } from '../context/WatchlistContext'; 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [year, setYear] = useState(''); 
  const [type, setType] = useState('');
  const [error, setError] = useState(null); 
  const { watchlist, addToWatchlist } = useContext(WatchlistContext);

  const placeholderImg = 'https://placehold.co/200x300?text=No%20image%20available';


  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);

    // Handle empty query
    if (!query.trim()) {
      setError('Please enter a movie title to search.');
      return;
    }

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
      if (res.data.Response === 'False') {
        // Check for specific errors from OMDb
        if (res.data.Error === 'Too many results.') {
          setError('Too many results. Please be more specific.');
        } else if (res.data.Error === 'Movie not found!') {
          setError('No movies found. Please try a different search.');
        } else {
          setError('An unknown error occurred.');
        }
        setMovies([]); // Clear previous movie results
      } else {
        // Successfully fetched movies
        setMovies(res.data.Search || []);
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const isMovieInWatchlist = (movie) => watchlist.some((m) => m.imdbID === movie.imdbID);

  return (
    <div className="container">
      <Link to="/watchlist" className='watchlist-link'>Watchlist</Link>
      <form className="search-form" onSubmit={handleSearch}>
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

      {/* Display error messages */}
      {error && <div style={{ color: 'red', marginTop: '10px', textAlign: 'center'}}>{error}</div>}

      <div className="movie-grid">
        {movies.map(movie => (
            <div className='movie-card'>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : placeholderImg} alt={movie.Title}/>
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

export default SearchBar;