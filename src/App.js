import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieSearch from './pages/MovieSearch';
import Favorites from './pages/Favorites';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieSearch />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;