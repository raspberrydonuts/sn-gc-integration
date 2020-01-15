// background.js
// manifest // "key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsMU2xXY7trWgnrKlUcb9qkHk8qghB9gKEL2qKjZpZUAPq4aFWOSf5IzVLQv1f6veFYK63Jh+XXXbsFCo92BXcH5+uTfvbFYubUw3yOFJe4NxD7DWC5NCs35obawR6rhwVVOfH9baSL2GbgLm4CyWX6kHQGtZFmdaXTukvHEDOLl5Vnl/O1gte7VwI3Z4HhB4qvuqaIq0INi8dY4zz3KA1fFSDzJbV5hkNy0+qBtXxW54x1UIhfpNDk9j1hpFlldlLiRWMZUIpBCSBavPEdVnMiAxK4FQ2529SxEuOYFWfPwqCBoBnlS6+tZnyLId8rshtWatH7Ec6UJutV7cEFTe3QIDAQAB"

chrome.identity.getAuthToken({ 'interactive': false }, function(token) {
    const headers = new Headers({
        'Authorization' : 'Bearer ' + token,
        'Content-Type': 'application/json'
    })
  
    const queryParams = { headers };
  
    fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', queryParams)
    .then((response) => response.json()) // Transform the data into json
    .then(function(data) {
        console.log(data);
    })
})