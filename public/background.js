const baseUrl = "https://fathomless-beyond-31330.herokuapp.com/api";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("REQUEST: " + request);

  if (request.requestId === "EditProfile") {
    sendResponse("PROFILE EDITED");
    if (request.params.profileExists) {
      // PATCH request
      fetch(`${baseUrl}/profile/${request.params.id}`, {
        method: "PATCH",
        body: JSON.stringify(request.payload)
      });
    } else {
      // Create new
      fetch(`${baseUrl}/profiles/`, {
        method: "POST",
        body: JSON.stringify(request.payload)
      });
    }
  } else if (request.requestId === "GetProfile") {
    console.log("FETCHING: " + request.params.id);
    fetch(`${baseUrl}/profiles/${request.params.id}`)
      .then(resp => resp.json())
      .then(res => {
        console.log(res);
        return sendResponse(res);
      })
      .catch(e => sendResponse(null));
  } else if (request.requestId === "ListMembers") {
    fetch(`${baseUrl}/profiles`)
      .then(resp => resp.json())
      .then(res => {
        console.log(res);
        return sendResponse(res);
      });
  }

  return true;
});
