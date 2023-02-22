const state = {
  failedFiles: [],
};

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
  <div data-id="failed-files">
    <ul data-id="failed-files-list"></ul>
    <button data-action="retry" style="visibility: hidden">Retry</button>
  </div>
  <div data-id="content"></div>
</div>
`;

const contentEl = document.querySelector('[data-id="content"]');

const inputEl = document.querySelector('[data-id="text-input"]');

// Solutions:
//  1. Manual Fix Error by User + Switch to Components/state
//  2. No recursion:
//    2.1. Exit
//    2.2. Number of calls (3-5)
//    2.3. setTimeout(), 1-3-6-...-30/60 <-
//  3. XHR/fetch regular requests (WAF)
// Polling -> setTimeout()/setInterval()
// Long-Polling
// SSE - Server Sent Events (browser <- server)
// WebSockets - (browser <-> server)
// WebRTC - audio/video
// WebTransport (draft)
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

  // FIXME:
  showFailedFiles(failedFiles);
}

const failedFilesEl = document.querySelector('[data-id="failed-files"]');
const failedFilesListEl = failedFilesEl.querySelector('[data-id="failed-files-list"]');
const failedFilesRetryEl = failedFilesEl.querySelector('[data-action="retry"]');
const showFailedFiles = (failedFiles) => {
  failedFilesListEl.innerHTML = '';
  if (failedFiles.length === 0) {
    failedFilesRetryEl.style.visibility = 'hidden';
    return;
  }

  // TODO: check size
  failedFilesListEl.append(...failedFiles.map((file) => {
    const fileEl = document.createElement('li');
    fileEl.innerHTML = `
    ${file.name} failed
    `;
    return fileEl;
  }));
  failedFilesRetryEl.style.visibility = 'visible';
  failedFilesRetryEl.onclick = (evt) => {
    uploadFiles(failedFiles);
  };
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
