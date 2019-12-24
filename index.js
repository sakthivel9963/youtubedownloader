const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const path = require('path');
// const fs = require('fs');
// const youtubedl = require('youtube-dl');

const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || `0.0.0.0`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Successfully connected',
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} -> http://${HOST}:${PORT}`);
});
