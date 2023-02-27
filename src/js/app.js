const rootEl = document.querySelector('#root');
rootEl.innerHTML = `
<button data-id="upload">Upload File</button>

<label for="file">Click me</label>

<div class="file-selector">
  <input id="file" data-id="file" type="file">
  <span class="hider">Click to choose file</span>
</div>
`;

// const fileEl = rootEl.querySelector('[data-id="file"]');

// const buttonEl = rootEl.querySelector('[data-id="upload"]');
// buttonEl.addEventListener('click', (evt) => {
//   // 1. user activation
//   fileEl.click();
// });

// fileEl.addEventListener('change', (evt) => {
//   debugger;
// });
