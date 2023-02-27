const rootEl = document.querySelector('#root');
rootEl.innerHTML = `
<a data-id="download" href="http://localhost:9999">Download file</a>
<img data-id="preview">
<a data-id="ghost" class="hidden"></a>
`;

const imgEl = rootEl.querySelector('[data-id="preview"]');

const linkEl = rootEl.querySelector('[data-id="download"]');
linkEl.addEventListener('click', (evt) => {
  evt.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:9999');
  xhr.responseType = 'blob'; // fetch.blob()
  xhr.send();

  xhr.onload = (evt) => {
    const url = URL.createObjectURL(evt.target.response); // blob
    imgEl.src = url;
    imgEl.onload = (evt) => {
      URL.revokeObjectURL(url);
    };
    debugger;
  };

});
