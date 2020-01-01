const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const youtubedl = require('youtube-dl');
const fs = require('fs');
const appRoot = require('app-root-path');

const { getinfo, downloadVideo } = require('./youtube');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const winston = require('./middleware/winston');

const app = express();
require('dotenv').config();

app.use('/', express.static(path.join(__dirname, '../public')));

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
    const {
      format_note: formatNote,
      fulltitle,
      _filename,
      url,
      _duration_hms: durationHms,
      thumbnail,
      description,
    } = info;
    const fileDir = `${appRoot}/videos/${_filename}`;
    await downloadVideo(youtubedl, fs, YOUTUBE_URL, fileDir);
    res.json({
      formatNote,
      fulltitle,
      _filename,
      url,
      durationHms,
      thumbnail,
      description,
    });
  } catch (error) {
    next(error);
  }
});

app.get('/download', async (req, res, next) => {
  try {
    const { fileName } = req.query;
    const url = `${appRoot}/videos/${fileName}`;
    res.download(url);
  } catch (error) {
    next(error);
  }
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
