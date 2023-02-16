```js
// /* query string */
xhr.open('GET', `http://localhost:9999/?${urlSearchParams.toString()}`);
xhr.send();

/* x-www-... */
xhr.open('POST', `http://localhost:9999`);
xhr.send(urlSearchParams); // stop the world!

/* multipart/form-data */
xhr.open('POST', `http://localhost:9999`, false);
xhr.send(formData); // stop the world!
```
