const mongoose = require('mongoose');

const connect = async () => {
  try {
   const connectInstance= await mongoose.connect(process.env.MONGO_DB_URI);
      console.log('Connected to MongoDB');
      //logging the connection instance hostname and port
      console.log(`Connected to MongoDB: ${connectInstance.connection.host}:${connectInstance.connection.port}`);
  } catch (error) {
      console.error('Error connecting to MongoDB', error);
      process.exit(1);//exiting the process with status code 1
  } 
}

//exporting connect function
module.exports = connect;