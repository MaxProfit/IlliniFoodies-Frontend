// UTITLITY FUNCTIONS USED ACROSS FILES
const axios = require("axios").default;

/* generic axios request
  Takes a single input object with the following info:
  - type: ["get", "put" etc.]
  - url: [url to send request to]
  - data: {some object containing data}
  - onSuccess: fxn(response) to call on success
*/

export function axiosRequest(request) {
  axios[request.type](request.url, request.data)
    .then(function(response) {
      if (response.status === 200) {
        // console.log("SUCCESS: " + request.type + " to " + request.url);
        // console.log("Printing response...");
        // console.log(response);

        if (request.onSuccess != undefined) {
          request.onSuccess(response);
        }
      }
    })
    .catch(function(error) {
      // console.log("FAIL: " + request.type + " to " + request.url);
      // console.log("Printing error...");
      // console.log(error);

      if (request.onError !== undefined) {
        request.onError(error);
      }
    });
}

/* set a cookie in the document */
export function setCookie(cname, cvalue, exseconds) {
  let d = new Date();
  d.setTime(d.getTime() + exseconds * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/* get a cookie in the document */
export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
