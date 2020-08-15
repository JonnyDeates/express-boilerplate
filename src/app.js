require('dotenv').config();
const { NODE_ENV } = require('./config')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello, world!')
});

app.use(errorHandler);
function errorHandler(error, req, res, next) {
    const code = error.status || 500;
    if (NODE_ENV === 'production') {
        error.message = code === 500 ? 'internal server error' : error.message;
    } else {
        console.error(error);
    }
    res.status(code).json({ message: error.message });
}


module.exports = app;