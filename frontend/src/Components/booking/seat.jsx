import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../navbar';
import { useAuth } from '../../contexts/authContext';

const SeatGrid = () => {
    const { user } = useAuth();
    const [seats, setSeats] = useState([]);
    const [seatCount, setSeatCount] = useState('');
    const [reservedSeats, setReservedSeats] = useState([]);
    const [error, setError] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchSeats();
    }, []);

    const fetchSeats = async () => {
        const res = await axios.get('https://workwise-i0gg.onrender.com/api/booking/seats');
        setSeats(res.data);
    };

    const handleReserve = async () => {
        if (!user) {
            setShowLoginModal(true);
            return;
        }

        const count = parseInt(seatCount);
        if (!count || count < 1 || count > 7) {
            setError('Enter a seat count between 1 and 7');
            return;
        }

        try {
            const res = await axios.post(
                'https://workwise-i0gg.onrender.com/api/booking/reserve',
                { count },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReservedSeats(res.data.seats);
            setError('');
            setSeatCount('');
            fetchSeats();
        } catch (err) {
            setError(err.response?.data?.message || 'Reservation failed');
        }
    };

    const handleReset = async () => {
        await axios.post('https://workwise-i0gg.onrender.com/api/booking/reset');
        setReservedSeats([]);
        setSeatCount('');
        fetchSeats();
    };

    const renderSeat = (seat) => {
        const isReserved = reservedSeats.includes(seat.number);
        const status = seat.isBooked ? 'booked' : 'available';

        return (
            <div
                key={seat.number}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all
        ${status === 'booked' ? 'bg-red-600 text-white' :
                        isReserved ? 'bg-green-500 text-white animate-pulse' :
                            'bg-gray-800 text-white hover:bg-blue-600 cursor-pointer shadow-lg'}`}
            >
                {seat.number}
            </div>
        );
    };

    const totalSeats = seats.length;
    const bookedSeats = seats.filter(seat => seat.isBooked).length;
    const availableSeats = totalSeats - bookedSeats;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 text-white p-6 px-30">
                <h2 className="text-4xl font-bold text-cyan-400 text-center mb-10 drop-shadow-xl">
                    🎭 Seat Reservation System
                </h2>

                <div className="flex justify-around gap-5">
                    {/* Left Side */}
                    <div className="flex flex-row gap-20 items-start">


                        <div className="mt-8 flex-col text-lg font-semibold">
                            <div className="bg-slate-800 text-white p-4 rounded-2xl mb-8 shadow-lg hover:scale-[1.02] transition duration-300">
                                <p className="text-slate-400">Total Seats</p>
                                <p className="text-cyan-400 text-2xl">{totalSeats}</p>
                            </div>
                            <div className="bg-slate-800 text-white p-4 rounded-2xl shadow-lg mb-8 hover:scale-[1.02] transition duration-300">
                                <p className="text-slate-400">Booked Seats</p>
                                <p className="text-red-400 text-2xl">{bookedSeats}</p>
                            </div>
                            <div className="bg-slate-800 text-white p-4 rounded-2xl shadow-lg hover:scale-[1.02] transition duration-300">
                                <p className="text-slate-400">Available Seats</p>
                                <p className="text-green-400 text-2xl">{availableSeats}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {seats.map(renderSeat)}
                        </div>
                    </div>

                    {/* Right Side*/}
                    <div className="flex flex-col gap-6 justify-start items-center bg-slate-800 p-4 rounded-3xl shadow-lg w-full max-w-md mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center tracking-wide animate-fade-in-up">
                            🎟️ Let’s Reserve Your Seats
                        </h2>

                        <input
                            type="number"
                            min={1}
                            max={7}
                            value={seatCount}
                            onChange={(e) => setSeatCount(e.target.value)}
                            placeholder="Enter seat count (1–7)"
                            className="p-4 w-full max-w-xs rounded-lg border border-amber-500 bg-slate-700 text-white font-semibold text-lg focus:outline-none focus:ring-4 ring-cyan-400 transition duration-300 ease-in-out"
                        />

                       
                        <button
                            onClick={handleReserve}
                            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg w-full max-w-xs transition duration-300 transform hover:scale-105 active:scale-95"
                        >
                            Reserve Seats
                        </button>

                        
                        <button
                            onClick={handleReset}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg w-full max-w-xs transition duration-300 transform hover:scale-105 active:scale-95"
                        >
                            Reset All Seats
                        </button>

                        
                        {error && <div className="text-red-300 font-semibold mt-4 text-center">{error}</div>}
                    </div>

                </div>
            </div>

            {/* Login Modal */}
            {showLoginModal && (
                <div className="fixed inset-0 backdrop-blur-2xl bg-opacity-10 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full text-center text-black shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">Login Required</h2>
                        <p className="mb-6 text-gray-700">You need to log in to book seats.</p>
                        <button
                            onClick={() => setShowLoginModal(false)}
                            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 font-semibold"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SeatGrid;
