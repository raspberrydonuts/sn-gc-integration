window.onload = function () {
    document.querySelector('button').addEventListener('click', function () {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            console.log(token);
        });
    });
};


window.onload = function () {
    document.querySelector('button').addEventListener('click', function () {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            let event =
            {
                'summary': 'IT WORKED',
                'start': {
                    'dateTime': '2020-01-25T09:00:00-07:00',
                    'timeZone': 'America/Los_Angeles'
                },
                'end': {
                    'dateTime': '2020-01-25T11:00:00-07:00',
                    'timeZone': 'America/Los_Angeles'
                }
            }
            let init = {
                method: 'POST',
                async: true,
                body: JSON.stringify(event),
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                'contentType': 'json'
            };
            // alert(document.title);
            // alert(document.getElementsByClassName("form-control text-align-right-ltr element_reference_input ").length);
            fetch(
                'https://www.googleapis.com/calendar/v3/calendars/primary/events?key=AIzaSyBsH_yShZGMp3Nt6kUafyoh_S3MYK4XZpk',
                // 'https://people.googleapis.com/v1/contactGroups/all?maxMembers=20&key=AIzaSyBsH_yShZGMp3Nt6kUafyoh_S3MYK4XZpk',
                init)
                .then((response) => response.json())
                .then(function (data) {
                    console.log(data)
                });
        });
    });
};
