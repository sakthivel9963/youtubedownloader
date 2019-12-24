const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const youtubedl = require('youtube-dl');

const { getinfo } = require('./src/youtube');
const { notFound, errorHandler } = require('./src/errorHandler');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || `0.0.0.0`;
const { YOUTUBE_URL } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get('/', async (req, res, next) => {
  try {
    const info = await getinfo(youtubedl, YOUTUBE_URL);
    console.log(info);
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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} -> http://${HOST}:${PORT}`);
});
