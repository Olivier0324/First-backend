const app = require('./app');
const dotenv = require('dotenv');
const port = process.env.PORT || 5000;
const connectDB=require('./config/database')
dotenv.config(
    {
        path: './.env'
    }
);
//starting the server ansync function
const startServer=async ()=>{
    try {
        await connectDB();
        app.on('error', (err) => {
            console.log('error', error)
        })
        app.listen(port, () => {
            console.log(`server is running on port ${port}`)
        })
    } catch (error) {
        console.log('error', error)
    }
}

//starting the server
startServer();