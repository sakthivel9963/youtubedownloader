const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const youtubedl = require('youtube-dl');

const { getinfo } = require('./youtube');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const winston = require('./middleware/winston');

const app = express();
require('dotenv').config();

const { YOUTUBE_URL } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: winston.stream }));

app.get('/', async (req, res, next) => {
  try {
    const info = await getinfo(youtubedl, YOUTUBE_URL);
  } catch (error) {
    next(error);
  }
  res.json({
    status: 200,
    message: 'Successfully connected',
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
