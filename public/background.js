const baseUrl = "https://fathomless-beyond-31330.herokuapp.com/api";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  console.log("REQUEST: " + request)

  if (request.requestId === "EditProfile") {
    sendResponse("PROFILE EDITED");
  } else if (request.requestId === "GetProfile") {
    console.log('FETCHING: ' + request.params.id)
      fetch(baseUrl + '/profiles/' + request.params.id)
        .then(resp => resp.json())
        .then(res => {
          console.log(res);
          return sendResponse(res);
        });    
  } else if (request.requestId === "ListMembers") {
    fetch("https://fathomless-beyond-31330.herokuapp.com/api/profiles")
      .then(resp => resp.json())
      .then(res => {
        console.log(res);
        return sendResponse(res);
      });
  }

  return true;
});
