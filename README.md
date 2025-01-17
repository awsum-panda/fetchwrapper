# fetchwrapper
A simple wrapper for fetch with custom error messages

## JSDoc
```
/**
*   @constructor
*   @param {string} url - Is required, must be a non-empty string.
*   @param {object} options  - Defaults to simple GET with json, otherwise takes fetch options object.
*   @param {string} custom_err_msg - Optional, defaults to null.
*/
```

## Usage
```
const response = fetchwrapper(url);
response.then((data) => console.log(data));
```
```
const options = {
    method: "GET",
    credentials: "include"
    headers: {
        "Content-Type": "application/json;odata=notmetadata",
        Accept: "application/json;odata=notmetadata",
    }
}
const response = fetchwrapper(url,options);
response.then((data) => console.log(data));
```
```
const customMsg = "Fetch to API failed"
const response = fetchwrapper(url,null,customMsg);
response.then((data) => console.log(data));
```

![GitHub Tag](https://img.shields.io/github/v/tag/awsum-panda/fetchwrapper?style=flat-square&label=npm)
