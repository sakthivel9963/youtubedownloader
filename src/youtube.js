exports.getinfo = (youtubedl, youtubeUrl) =>
  new Promise((resolve, reject) => {
    youtubedl.getInfo(youtubeUrl, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(info);
    });
  });

exports.downloadVideo = (youtubedl, fs, url, output) =>
  new Promise((resolve, reject) => {
    let downloaded = 0;

    if (fs.existsSync(output)) {
      downloaded = fs.statSync(output).size;
    }
    // format option should be choosen
    const video = youtubedl(url, ['--format=18'], {
      start: downloaded,
      cwd: __dirname,
    });

    // Will be called when the download starts.
    video.on('info', function(info) {
      console.log('Download started');
      console.log(`filename: ${info._filename}`);

      // info.size will be the amount to download, add
      const total = info.size + downloaded;
      console.log(`size: ${total}`);

      if (downloaded > 0) {
        // size will be the amount already downloaded
        console.log(`resuming from: ${downloaded}`);

        // display the remaining bytes to download
        console.log(`remaining bytes: ${info.size}`);
      }
    });

    video.pipe(fs.createWriteStream(output, { flags: 'a' }));

    // Will be called if download was already completed and there is nothing more to download.
    video.on('complete', function complete(info) {
      console.log(`filename: ${info._filename} already downloaded.`);
      resolve('success');
    });

    video.on('end', function() {
      console.log('finished downloading!');
      resolve('success');
    });
  });
