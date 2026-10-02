const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
};

const disconnectDB = async () => {
  await mongoose.disconnect();
  console.log('Connection closed');
}

module.exports = {
    connectDB,
    disconnectDB
};
