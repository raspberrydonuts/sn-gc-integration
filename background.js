// background.js

var clientId = "138537118015-akqp68qqqd2611dipcm99soe65aj3r7d.apps.googleusercontent.com";
var apiKey = 'AIzaSyB5rZiq4PhWiyyoY2s-imN5Yppdk1Iq9aQ';
var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
}
  
function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
    handleAuthResult);
}
var currentdate = new Date(); 
var today = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
var oneHourLater = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + 1 + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
var resource = {
    "summary": "My Event",
    "start": {
        "dateTime": today
    },
    "end": {
        "dateTime": oneHourLater
    },
    "description":"We are organizing events",
    "location":"US",
    "attendees":[
    {
            "email":"attendee1@gmail.com",
            "displayName":"Jhon",
            "organizer":true,
            "self":false,
            "resource":false,
            "optional":false,
            "responseStatus":"needsAction",
            "comment":"This is my demo event",
            "additionalGuests":3
            
    },
    {    
        "email":"attendee2@gmail.com",
            "displayName":"Marry",
            "organizer":true,
            "self":false,
            "resource":false,
            "optional":false,
            "responseStatus":"needsAction",
            "comment":"This is an official event",
            "additionalGuests":3
    }
    ],
};

function makeApiCall() {
    gapi.client.load('calendar', 'v3', function () { // load the calendar api (version 3)
        var request = gapi.client.calendar.events.insert
        ({
            'calendarId': '24tn4fht2tr6m86efdiqqlsedk@group.calendar.google.com', 
        // calendar ID which id of Google Calendar where you are creating events. this can be copied from your Google Calendar user view.

            "resource": resource 	// above resource will be passed here
        });                
    })
}

function handleAuthClick(event) {
    gapi.auth.authorize(
    {client_id: clientId, scope: scopes, immediate: false},
    handleAuthResult);
    return false;
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    // (sends arbitrary JSON payload to current tab)
    console.log("Weiner");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      makeApiCall();
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
  });