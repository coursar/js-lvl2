const rootEl = document.querySelector('#root');
rootEl.innerHTML = `
<div>
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
  <div data-id="drop-area" class="drop-area"></div>
  <ul data-id="failed-files"></ul>
  <div data-id="content"></div>
</div>
`;

const contentEl = document.querySelector('[data-id="content"]');

const inputEl = document.querySelector('[data-id="text-input"]');

// Solutions:
//  1. Manual Fix Error by User
// Questions:
// ->  2. Multple files
const uploadFile = async(file) => {
  const fileResponse = await fetch('http://localhost:9999', {
    method: 'POST',
    body: file,
  });

  if (!fileResponse.ok) {
    throw new Error('...');
  }

  const fileResponseData = await fileResponse.json();

  // TODO: check status === 'ok';
  const { filename } = fileResponseData;
  return filename;
};

const uploadFiles = async(files) => {
  const results = await Promise.allSettled(files.map(uploadFile));
  const failedFiles = results.map((result, index) => ({
      status: result.status,
      file: files[index],
  }))
  .filter((result) => result.status === 'rejected')
  .map((result) => result.file);

  if (failedFiles.length === 0) {
    return;
  }

  // FIXME:
  showFailedFiles(failedFiles);
  // console.log('next iteration');
  // await uploadFiles(failedFiles);
}

const failedFilesEl = document.querySelector('[data-id="failed-files"]');
const showFailedFiles = (failedFiles) => {
  failedFilesEl.append(...failedFiles.map((file) => {
    const fileEl = document.createElement('li');
    fileEl.innerHTML = `
    ${file.name} failed <button data-action="retry">Retry</button>
    `;
    fileEl.querySelector('[data-action="retry"]').addEventListener('click', async (evt) => {
      try {
        await uploadFile(file);
        fileEl.remove();
      } catch(e) {
        console.error(e);
      }
    });
    return fileEl;
  }))
};

const fileInputEl = document.querySelector('[data-id="file-input"]');
fileInputEl.addEventListener('change', async (evt) => {
  const files = Array.from(evt.target.files);
  const result = await uploadFiles(files);
  evt.target.value = ''; // clear selected files
});

const dropAreaEl = document.querySelector('[data-id="drop-area"]');
dropAreaEl.addEventListener('dragover', (evt) => {
  evt.preventDefault();
});

dropAreaEl.addEventListener('drop', async (evt) => {
  evt.preventDefault();
  const files = Array.from(evt.dataTransfer.files);
  const result = await uploadFiles(files);
});

/*
    // TODO: check error
    const objectResponse = await fetch('http://localhost:9999', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 0,
        name: 'some name',
        filename,
      }),
    });

    const objectResponseData = await objectResponse.json();
*/
