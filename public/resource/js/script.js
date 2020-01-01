const getVideoInfo = async url => {
  try {
    const responseData = await fetch(`http://localhost:5000/url?url=${url}`);
    const data = await responseData.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const displayVideoInfo = info => {
  const {
    formatNote,
    fulltitle,
    _filename,
    url,
    durationHms,
    thumbnail,
    description,
  } = info;
  const videoImage = document.querySelector('#videoImage');
  const videoDetails = document.querySelector('#videoDetails');
  videoImage.innerHTML = `<img src=${thumbnail} alt="image"  class="img-thumbnail mx-auto d-block img-fluid" />`;
  videoDetails.innerHTML = `
  <h4>${fulltitle}</h4>
  <p><span>Video Duration</span> : <span>${durationHms}</span></p>
  <p><span>Video Format</span> : <span>${formatNote}</span></p>
  <a class="btn btn-danger" download="${_filename}" href="http://localhost:5000/download?fileName=${_filename}" >Download Video</a>
  `;
};
// <a class="btn btn-danger" download="${_filename}" href="data:video/mp4;charset:video/mp4,${url}">Download Video</a>

const getUrlInfo = async event => {
  event.preventDefault();
  const url = document.querySelector('#url');
  const { value } = url;
  const videoInfo = await getVideoInfo(value);
  displayVideoInfo(videoInfo);
};

// https://www.youtube.com/watch?v=7wVWEJ_-BwY
