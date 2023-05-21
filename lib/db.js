const mongoose = require('mongoose');

export const dbConnection = async () => {
  if (mongoose.connections[0].readyState) {
    return mongoose.connections[0];
  } else {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
    });
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
    mongoose.connection.on('error', (err) => {
      console.log('Error connecting to MongoDB', err);
    });
    return mongoose.connections[0];
  }
};
