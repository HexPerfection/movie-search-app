import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieSearch from './pages/MovieSearch';
import Favorites from './pages/Favorites';
import Watchlist from './pages/Watchlist';
import MovieDetails from "./components/MovieDetails";
import WatchlistProvider from "./context/WatchlistContext";

function App() {
  return (
    <WatchlistProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails id="id" />} />
      </Routes>
    </Router>
    </WatchlistProvider>
  );
}

export default App;