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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: winston.stream }));

app.get('/', async (req, res, next) => {
  res.json({
    status: 200,
    message: 'Successfully connected',
  });
});

app.get('/url', async (req, res, next) => {
  try {
    const { url: YOUTUBE_URL } = req.query;
    const info = await getinfo(youtubedl, YOUTUBE_URL);
    res.json(info);
  } catch (error) {
    next(error);
  }
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
