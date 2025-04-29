const mongoose = require('mongoose');

const connectDB =  ()=>{
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB is Connected 🛜")
    } catch (error) {
       console.log("server connection Fail", error.message) 
    }
}
module.exports = connectDB