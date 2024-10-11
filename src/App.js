import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Watchlist from './pages/Watchlist';
import MovieDetails from "./components/Movie";
import WatchlistProvider from "./context/WatchlistContext";
import HomePage from "./pages/Home";

function App() {
  return (
    <WatchlistProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movie/:id" element={<MovieDetails id="id" />} />
      </Routes>
    </Router>
    </WatchlistProvider>
  );
}

export default App;