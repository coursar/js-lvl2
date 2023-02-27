const rootEl = document.querySelector('#root');
rootEl.innerHTML = `
<a data-id="download" href="http://localhost:9999">Download file</a>
<img data-id="preview">
<a data-id="ghost" class="hidden"></a>
`;

const imgEl = rootEl.querySelector('[data-id="preview"]');

const linkEl = rootEl.querySelector('[data-id="download"]');
const ghostEl = rootEl.querySelector('[data-id="ghost"]');

linkEl.addEventListener('click', (evt) => {
  evt.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://localhost:9999');
  xhr.responseType = 'blob'; // fetch.blob()
  xhr.send();

  xhr.onload = (evt) => {
    const url = URL.createObjectURL(evt.target.response); // blob
    ghostEl.href = url;
    ghostEl.download = 'image.png';
    // v1
    // ghostEl.click();
    // v2
    ghostEl.dispatchEvent(new PointerEvent('click', {}));

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 60000);
  };
});

ghostEl.addEventListener('click', (evt) => {
});
