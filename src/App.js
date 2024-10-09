import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieSearch from './pages/MovieSearch';
import Favorites from './pages/Favorites';
import MovieDetails from "./components/MovieDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails id="id" />} />
      </Routes>
    </Router>
  );
}

export default App;