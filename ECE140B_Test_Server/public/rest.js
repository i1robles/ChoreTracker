function submit() {
    var theAuthor = document.querySelector('.author');
    let height_id = document.getElementById('height').value;
    let age_id = document.getElementById('age').value;

    // Get the current value from the text input box
    let photo_id = document.getElementById('textInput').value
  
    // This URL path is going to be the route defined in app.py
    let theURL='/photos/'+photo_id;
   
    // fetch is a Javascript function that sends a request to a server
    fetch(theURL)
        .then(response=>response.json()) // Convert response to JSON
        // Run the anonymous function on the received JSON response
        .then(function(response) {
            // Set the value of the img_src attribute of the img tag
            // to the value received from the server
            let img = document.getElementById('image') 
            img.src = response['img_src']
            theAuthor.innerHTML = response[0]['Author'];
        });
  }

  function select_staff() {
    let staff_id = document.getElementById('staff').value;
    if(staff_id.trim() === "") {
        console.log("No ID provided");
        document.getElementById("error").textContent = "You have not provided an ID";
    }
    else {
        let theURL = '/staff/'+staff_id;
        console.log("Starting executing single id");
        document.getElementById("error").textContent = "";
        fetch(theURL)
        .then(response=>response.json())
        .then(function(response) {
            for(var key in response) {
            document.getElementById(key).textContent 
                = key.toUpperCase() + ": " + response[key]
            }
        });
    }
} 

function age_range() {
    let age_id = document.getElementById('age').value;
    if (age_id == 20)

    let theURL = '/age/'+age_id;
    fetch(theURL)
    .then(response=>response.json())
    .then(function(response) {
        for(var key in response) {
        document.getElementById(key).textContent 
            = key.toUpperCase() + ": " + response[key]
        }
    });
}

function height_range() {
    let height_id = document.getElementById('height').value;
}
 