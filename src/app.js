const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/users', require('./routes/userRoute'));
//product routes
app.use('/api/v1/products', require('./routes/productRoute'));
module.exports = app;