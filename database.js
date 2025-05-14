const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("☑ Conectado a MongoDB local sin autenticación");
    return client.db();
  } catch (error) {
    console.error("✗ Error al conectar a MongoDB:", error);
    process.exit(1);
  }
}

module.exports = { connectDB, client };