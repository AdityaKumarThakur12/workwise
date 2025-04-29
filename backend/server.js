require('dotenv').config();
const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db');
const authRoutes = require('./Routes/auth');
const bookingRoutes = require('./Routes/booking')
const app = express();

app.use(express.json());
app.use(cors())
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes)

connectDB();


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`server is conncted on ${PORT}`)
})