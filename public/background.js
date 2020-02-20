const baseUrl = https://fathomless-beyond-31330.herokuapp.com/api";

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  var fetch;
  if (request.requestId === 'EditProfile') {
    console.log('YEAHHH')
    sendResponse('PROFILE EDITED')
  } else if ( request.requestId === 'ListMembers' ) {
    fetch("https://fathomless-beyond-31330.herokuapp.com/api/profiles")
    .then(resp => resp.json())
    .then(res => {
      console.log(res);
      return sendResponse(res);
    });
  }

  return true;
});
