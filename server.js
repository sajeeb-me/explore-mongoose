const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');

const app = require('./app')

// database connection
mongoose.connect(process.env.DATABASE_LOCAL)
    .then(() => {
        console.log(`Database connected successfully.`.green.bold);
    })

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`.yellow.bold)
})