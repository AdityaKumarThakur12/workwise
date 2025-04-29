import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom'; 

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate(); 

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 

    try {
      await signup(name, email, password);
      navigate('/login'); 
    } catch (err) {
      setError('Failed to sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  bg-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-indigo-600 mb-6">Create Your Account</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        
        <form onSubmit={handleSignup} className="space-y-4">
    
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
         
          <div>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
       
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-bold shadow-md hover:bg-indigo-700 transition duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-gray-600">
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-indigo-600 font-semibold hover:underline">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
