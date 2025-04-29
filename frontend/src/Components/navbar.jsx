import React from 'react';
import { useAuth } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex items-center justify-between">
      <div
        onClick={() => navigate('/')}
        className="text-2xl font-bold text-cyan-400 cursor-pointer tracking-wide"
      >
        🎟️ SeatMaster
      </div>

      <div className="flex items-center gap-6 text-lg font-medium">
        {user ? (
          <>
            <span className="text-green-400">Hi, {user.name || 'User'} 👋</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white font-semibold transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-md font-semibold transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="border border-cyan-600 hover:bg-cyan-800 px-4 py-2 rounded-md font-semibold transition"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
