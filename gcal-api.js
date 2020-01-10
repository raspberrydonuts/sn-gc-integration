var creds = JSON.parse(credentials)
var clientId = creds["web"]["client_id"]
var apiKey = 'AIzaSyB5rZiq4PhWiyyoY2s-imN5Yppdk1Iq9aQ';
var scopes = 'https://www.googleapis.com/auth/calendar';

function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth,1);
    checkAuth();
}
  
function checkAuth() {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
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

function makeApiCall() {
    gapi.client.load('calendar', 'v3', function() {
      var request = gapi.client.calendar.events.list({
        'calendarId': 'primary'
      });
            
      request.execute(function(resp) {
        for (var i = 0; i < resp.items.length; i++) {
          var li = document.createElement('li');
          console.log(resp.items[i].summary);
          li.appendChild(document.createTextNode(resp.items[i].summary));
          document.getElementById('events').appendChild(li);
        }
      });
    });
  }

function handleAuthClick(event) {
    gapi.auth.authorize(
    {client_id: clientId, scope: scopes, immediate: false},
    handleAuthResult);
    return false;
}