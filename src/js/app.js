const rootEl = document.querySelector('#root');
rootEl.innerHTML = `
<button data-id="upload">Upload File</button>

<div class="file-selector">
  <input data-id="file" type="file">
  <span class="hider"></span>
</div>
`;

const fileEl = rootEl.querySelector('[data-id="file"]');

const buttonEl = rootEl.querySelector('[data-id="upload"]');
buttonEl.addEventListener('click', (evt) => {
  // 1. user activation
  fileEl.click();
});

fileEl.addEventListener('change', (evt) => {
  debugger;
});
