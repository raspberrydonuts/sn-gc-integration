// content.js
// alert("Hello from your Chrome extension!");


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