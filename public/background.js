chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Received message!!!");
  return fetch("https://fathomless-beyond-31330.herokuapp.com/api/profiles")
    .then(resp => resp.json())
    .then(res => {
      console.log(res);
      return sendResponse(res);
    });
});
