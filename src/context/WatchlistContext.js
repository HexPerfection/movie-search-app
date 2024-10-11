import React, { createContext, useState, useEffect } from 'react';

// Create context
export const WatchlistContext = createContext();

const WatchlistProvider = ({ children }) => {
  // Initialize state from local storage
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  // Sync the watchlist with local storage
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Add movie to watchlist
  const addToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => {
      // Avoid duplicates
      if (!prevWatchlist.some((m) => m.imdbID === movie.imdbID)) {
        return [...prevWatchlist, movie];
      }
      return prevWatchlist;
    });
  };

  // Remove movie from watchlist
  const removeFromWatchlist = (id) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.imdbID !== id)
    );
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export default WatchlistProvider;