import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Learn from './components/Learn';
import Leaderboard from './components/Leaderboard';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/learn" />} /> {/* Default route */}
        <Route path="/learn" element={<Learn />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
