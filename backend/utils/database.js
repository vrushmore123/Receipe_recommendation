const connectDB = require('../config/dbConfig');

const initializeDB = () => {
  connectDB();
};

module.exports = initializeDB;