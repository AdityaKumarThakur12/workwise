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

    const allSeats = await Seat.find().sort('number'); // seat 0 to 79
    const availableSeats = allSeats.filter(seat => !seat.isBooked);

    if (availableSeats.length < count) {
        return res.status(400).json({ message: 'Not enough seats' });
    }

    // Organize seats into rows (first 11 rows of 7 seats, last one of 3 seats)
    const rows = [];
    for (let i = 0; i < 11; i++) {
        rows.push(allSeats.slice(i * 7, i * 7 + 7));
    }
    rows.push(allSeats.slice(77)); // last row (3 seats)

    let selectedSeats = [];

    // Step 1: Try finding contiguous unbooked seats in the same row
    for (let row of rows) {
        let group = [];
        for (let seat of row) {
            if (!seat.isBooked) {
                group.push(seat);
            } else {
                group = [];
            }

            if (group.length === count) {
                selectedSeats = group;
                break;
            }
        }
        if (selectedSeats.length) break; // found in one row, break out
    }

    // Step 2: Fallback if no single-row group found → pick nearest available seats
    if (!selectedSeats.length) {
        // Find the smallest "range" of count seats in the available list
        let minSpread = Infinity;
        for (let i = 0; i <= availableSeats.length - count; i++) {
            const group = availableSeats.slice(i, i + count);
            const spread = group[group.length - 1].number - group[0].number;
            if (spread < minSpread) {
                minSpread = spread;
                selectedSeats = group;
            }
        }
    }

    // Step 3: Book the selected seats
    for (let seat of selectedSeats) {
        seat.isBooked = true;
        seat.bookedBy = req.user.id;
        await seat.save(); // atomic per-seat save (you could batch with transaction too)
    }

    res.json({
        message: 'Seats reserved',
        seats: selectedSeats.map(s => s.number),
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