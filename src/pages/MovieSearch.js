import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=YOUR_API_KEY`);
    setMovies(res.data.Search || []);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search for movies..." 
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {movies.map(movie => (
            <Link to={`/movie/${movie.imdbID}`}>{movie.Title}</Link>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;