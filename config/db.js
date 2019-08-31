const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('mongodb connected...');
  } catch (error) {
    console.error(error);
    process.exist(1);
  }
};

module.exports = connectDB;
