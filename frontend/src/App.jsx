import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/auth/login';
import Signup from './Components/auth/signup';
import SeatGrid from './Components/booking/seat';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeatGrid />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;