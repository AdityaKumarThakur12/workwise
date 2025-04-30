const Seat = require('../Models/seat');

module.exports.setup = async (req, res) => {
    //To  Check if there are already 80 seats in the database
    const existing = await Seat.find();
    if (existing.length >= 80) return res.json({ message: 'Seats already exist' });

    // To Create 80 seats
    const seats = [];
    for (let i = 1; i <= 80; i++) {
        seats.push({ number: i });
    }
    await Seat.insertMany(seats);
    res.json({ message: '80 seats added' });
}

module.exports.reserveSeats = async (req, res) => {
    const { count } = req.body;
    if (count < 1 || count > 7) {
        return res.status(400).json({ message: 'Invalid seat count' });
    }

    const allSeats = await Seat.find().sort('number');
    const availableSeats = allSeats.filter(seat => !seat.isBooked);

    if (availableSeats.length < count) {
        return res.status(400).json({ message: 'Not enough seats' });
    }

    let bestWindow = null;
    let minRange = Infinity;

    // Sliding window approach
    for (let i = 0; i <= availableSeats.length - count; i++) {
        const window = availableSeats.slice(i, i + count);
        const range = window[count - 1].number - window[0].number;

        if (range < minRange) {
            minRange = range;
            bestWindow = window;
        }
    }

    const selectedSeats = bestWindow;

    for (let seat of selectedSeats) {
        seat.isBooked = true;
        seat.bookedBy = req.user.id;
        await seat.save();
    }

    res.json({
        message: 'Seats reserved (closest possible)',
        seats: selectedSeats.map(s => s.number)
    });
};


module.exports.seats = async (req, res) => {
    const seats = await Seat.find().sort('number');
    res.json(seats);
}

module.exports.reset = async (req, res) => {
    await Seat.updateMany({}, { isBooked: false, bookedBy: null });
    res.json({ message: 'All seats reset' });
}