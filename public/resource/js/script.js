const getVideoInfo = async url => {
  try {
    const responseData = await fetch(`http://localhost:5000/url?url=${url}`);
    const data = await responseData.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const saveAs = (blob, filename) => {
  // if (window.navigator.msSaveOrOpenBlob) {
  //   window.navigator.msSaveOrOpenBlob(blob, filename);
  // } else {
  //   const a = document.createElement('a');
  //   document.body.appendChild(a);
  //   const url = window.URL.createObjectURL(blob);
  //   a.href = url;
  //   a.download = filename;
  //   a.click();
  //   setTimeout(() => {
  //     window.URL.revokeObjectURL(url);
  //     document.body.removeChild(a);
  //   }, 0);
  // }
  const a = document.createElement('a');
  document.body.appendChild(a);
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  a.click();
};

const getVideo = async url => {
  try {
    const responseData = await fetch(
      `http://localhost:5000/download?url=${url}`
    );
    const filename = responseData.headers
      .get('content-disposition')
      .split(';')
      .find(n => n.includes('filename='))
      .replace('filename=', '')
      .trim();
    console.log(filename);
    const blob = await responseData.blob();
    saveAs(blob, filename);
  } catch (error) {
    console.error(error);
  }
};

const displayVideoInfo = (info, video) => {
  const { title, thumbnail, description } = info.responseJson;
  const videoImage = document.querySelector('#videoImage');
  const videoDetails = document.querySelector('#videoDetails');
  videoImage.innerHTML = `<img src=${thumbnail} alt="image"  class="img-thumbnail mx-auto d-block img-fluid" />`;
  videoDetails.innerHTML = `
  <h4>${title}</h4>
  `;
};
/* <p><span>Video Duration</span> : <span>${durationHms}</span></p>
<p><span>Video Format</span> : <span>${formatNote}</span></p>
<a class="btn btn-danger" download="${_filename}" href="http://localhost:5000/download?fileName=${_filename}" >Download Video</a> */

// <a class="btn btn-danger" download="${_filename}" href="data:video/mp4;charset:video/mp4,${url}">Download Video</a>

const getUrlInfo = async event => {
  event.preventDefault();
  const url = document.querySelector('#url');
  const { value } = url;
  // const videoInfo = await getVideoInfo(value);
  const video = await getVideo(value);
  // displayVideoInfo(videoInfo, video);
};

// https://www.youtube.com/watch?v=7wVWEJ_-BwY
