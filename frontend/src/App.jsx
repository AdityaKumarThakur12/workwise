import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrainLoading from './Components/loading';
import Login from './Components/auth/login';
import Signup from './Components/auth/signup';
import SeatGrid from './Components/booking/seat';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); 
  }, []);

  if (loading) {
    return <TrainLoading />;
  }

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