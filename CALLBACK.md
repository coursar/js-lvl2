Process:

1. Send Form <- Object
2. Request Data (id) -> ...

File: 10mb
1. Part1 ->

new XHR();
xhr.onloadend = (ev) => {
  part2: new XHR();
  xhr.send();
  xhr.onloadend = (ev) => {
    part3: new XHR();
    xhr.send();
    xhr.onloadend = (ev) => {

    }
  }
}

const parts = [...];
for (const part of parts) {
  const response = send(part);
  if (!response.ok) {
    break; // throw new Error
  }
}
