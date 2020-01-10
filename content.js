// content.js
// alert("Hello from your Chrome extension!");

chrome.identity.getAuthToken({ 'interactive': false }, function (token) {
    const headers = new Headers({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    })

    const queryParams = { headers };

    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
        .then((response) => response.json()) // Transform the data into json
        .then(function (data) {
            console.log(data);
        })
})
// listen for the message from background.js
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        // log url of the first external link on the page
        var firstHref = $("a[href^='http']").eq(0).attr("href");
        // console.log(firstHref);
        // console.log("weiner");
        // console.log(request.message)
    }
);