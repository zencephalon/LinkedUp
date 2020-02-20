const baseUrl = "https://fathomless-beyond-31330.herokuapp.com/api";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("REQUEST: " + request);

  if (request.requestId === "EditProfile") {
    // sendResponse("PROFILE EDITED");
    if (request.params.profileExists) {
      console.log("Updating", request);
      // PATCH request
      fetch(`${baseUrl}/profile/${request.params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request.payload)
      }).then(() => sendResponse("Profile updated"));
    } else {
      console.log("Creating", request);
      // Create new
      fetch(`${baseUrl}/profiles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request.payload)
      }).then(() => sendResponse("Profile created"));
    }
  } else if (request.requestId === "GetProfile") {
    console.log("FETCHING: " + request.params.id);
    fetch(`${baseUrl}/profile/${request.params.id}`)
      .then(resp => resp.json())
      .then(res => {
        console.log("Got response", res);
        if (res.detail !== "Not found.") {
          return sendResponse(res);
        } else {
          return sendResponse("");
        }
      });
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
