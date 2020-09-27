require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.BACKEND_PORT || 5000, () => {
    console.log(`Sever running on port ${process.env.BACKEND_PORT}`);
});