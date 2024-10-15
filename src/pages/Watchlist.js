import React, { useContext } from 'react';
import { WatchlistContext } from '../context/WatchlistContext';

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useContext(WatchlistContext);

  return (
    <div className="watchlist-grid">
      <h1>Your Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>No movies in your watchlist.</p>
      ) : (
        <div className='watchlist-item'>
          {watchlist.map(movie => (
            <div key={movie.imdbID}>
              <h3>{movie.Title} ({movie.Year})</h3>
              <button onClick={() => removeFromWatchlist(movie.imdbID)}>Remove from Watchlist</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;