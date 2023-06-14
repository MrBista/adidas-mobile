const { MongoClient } = require('mongodb');
const connectionString = process.env.MONGODB_CONNECTION;
let db = null;
const mongoConnect = async () => {
  const client = new MongoClient(connectionString);
  try {
    const database = client.db('adidas-challange');
    db = database;
    return database;
  } catch (err) {
    await client.close();
  }
};

const getDatabase = () => db;

module.exports = {
  mongoConnect,
  getDatabase,
};
