const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const ytdl = require('ytdl-core');
const fs = require('fs');
const appRoot = require('app-root-path');
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
    const videoId = await ytdl.getURLVideoID(YOUTUBE_URL);
    const { videoDetails } = await ytdl.getInfo(videoId);
    const responseJson = Object.freeze({
      title: videoDetails.title,
      desciription: videoDetails.description,
      thumbnail: videoDetails.thumbnails[0].url,
    });
    res.send({ responseJson });
  } catch (error) {
    next(error);
  }
});

app.get('/download', async (req, res, next) => {
  try {
    const { url: YOUTUBE_URL } = req.query;
    const videoId = await ytdl.getURLVideoID(YOUTUBE_URL);
    const { videoDetails } = await ytdl.getInfo(videoId);
    res.header(
      'Content-Disposition',
      `attachment; filename="${videoDetails.title}.mp4"`
    );
    ytdl(YOUTUBE_URL, {
      format: 'mp4',
    }).pipe(res);
  } catch (error) {
    next(error);
  }
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
