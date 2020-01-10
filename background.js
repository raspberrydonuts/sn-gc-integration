// background.js

var clientId = "138537118015-akqp68qqqd2611dipcm99soe65aj3r7d.apps.googleusercontent.com";
var apiKey = 'AIzaSyB5rZiq4PhWiyyoY2s-imN5Yppdk1Iq9aQ';
var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
    checkAuth();
}

function checkAuth() {
    gapi.auth.authorize({ client_id: clientId, scope: scopes, immediate: true },
        handleAuthResult);
}

function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult) {
        authorizeButton.style.visibility = 'hidden';
        makeApiCall();
    } else {
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = handleAuthClick;
    }
}

function handleAuthClick(event) {
    gapi.auth.authorize(
        { client_id: clientId, scope: scopes, immediate: false },
        handleAuthResult);
    return false;
}

var event = {
    'summary': 'Google I/O 2015',
    'location': '800 Howard St., San Francisco, CA 94103',
    'description': 'A chance to hear more about Google\'s developer products.',
    'start': {
        'dateTime': '2015-05-28T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
    },
    'end': {
        'dateTime': '2015-05-28T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
    },
    'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': [
        { 'email': 'lpage@example.com' },
        { 'email': 'sbrin@example.com' }
    ],
    'reminders': {
        'useDefault': false,
        'overrides': [
            { 'method': 'email', 'minutes': 24 * 60 },
            { 'method': 'popup', 'minutes': 10 }
        ]
    }
};

function makeApiCall() {
    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    });
    console.log(request);
    // request.execute(function (event) {
    //     appendPre('Event created: ' + event.htmlLink);
    // });
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function (tab) {
    
    // Send a message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var activeTab = tabs[0];
        //   makeApiCall();
         // (sends arbitrary JSON payload to current tab)
        chrome.tabs.sendMessage(activeTab.id, { "message": "clicked_browser_action" });
    });
});