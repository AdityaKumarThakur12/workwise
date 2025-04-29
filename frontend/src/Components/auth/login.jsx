import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('aditya@gmail.com');
  const [password, setPassword] = useState('aditya12');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    if (!email || !password) {
      setErrorMsg('Please fill in both fields.');
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate('/'); 
    } catch (error) {
      setErrorMsg(error.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 to-black flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">Welcome Back 👋</h2>
        
        {errorMsg && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-red-700 font-semibold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-cyan-600 hover:bg-cyan-700 text-white py-3 px-4 rounded-lg font-semibold transition-all ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account? <a href="/signup" className="text-cyan-600 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
