const app = require('./src/app');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || `0.0.0.0`;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT} -> http://${HOST}:${PORT}`);
});
