const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            "mongodb+srv://mohamedmohammudahmed:mohamedmohammudahmed@cluster0.m76nfub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
        );
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
};

module.exports = connectDB;
