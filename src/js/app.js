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

const uploadFile = async(file) => {
  // 1mb-2mb, 10mb

  const partSize = 1 * 1024 * 1024;
  const parts = Math.ceil(file.size / partSize);
  let completePart = 0;
  try {
    for (let i = 0; i < parts; i++) {
      const start = i * partSize;
      const end = Math.min((i + 1) * partSize, file.size);
      const slice = await file.slice(start, end, 'image/png');
      const fileResponse = await fetch('http://localhost:9999', {
        method: 'POST',
        headers: {
          'X-Parts': parts,
          'X-TotalSize': file.size,
          'X-PartNo': i,
        },
        body: slice,
      });

      if (!fileResponse.ok) {
        throw new Error('...');
      }

      const fileResponseData = await fileResponse.json();

      // TODO: check status === 'ok';
      const { filename } = fileResponseData;
      console.log(filename);

      completePart++;
    }
  } catch (e) {
    // show controls for retry
  }

  // 1. Initial Request: parts, totalSize
  //    Response: id
  // 2. For each part Request: id, partNo, blob
  //    Response: ...
  // 3. Finish Request: id
  //    Response: URL/path of joined file

  // For first part: Header: initial request, parts, totalSize, partNo 0 -> id
  // For ...
  // For last part: Header: partNo 100, parts: 100

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

// 1. UI
// 2. Loading
// 3. Error (Sync Validation & Network) & Retry

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
