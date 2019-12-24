exports.getinfo = (youtubedl, youtubeUrl) =>
  new Promise((resolve, reject) => {
    youtubedl.getInfo(youtubeUrl, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(info);
    });
  });
