const rootEl = document.querySelector('#root');
rootEl.innerHTML = `
<form>
  <div>
    <label for="text-input">Some text</label>
    <input data-id="text-input" id="text-input" type="text">
  </div>
  <div>
    <label>
      <input data-id="checkbox-input" type="checkbox"> Check me
    </label>
  </div>
  <div>
    <input data-id="file-input" type="file">
  </div>
</form>
`;
