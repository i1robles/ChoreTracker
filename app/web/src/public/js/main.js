import { MenuList } from "./menuList.js";
import { ChoreBox } from "./ChoreBox.js";
import { ChildBox } from "./ChildBox.js";
import { EventBus } from "./eventBus.js";

const CONSOLE_BOOL = true;

/**
 * Event handler function to change the table displayed to calendar view
 */
function showCalendarView() {
    if (CONSOLE_BOOL) {
        console.log("main.js - showCalendarView")
    }
    let o_cal_view_btn = document.getElementById("cal-view-btn");
    // if not already in calender view, display it
    if (o_cal_view_btn.classList.contains("clicked-btn") != true) {
      //make this button look clicked
      o_cal_view_btn.classList.add("clicked-btn");
      //make other buttons not clicked
      let o_child_view_btn = document.getElementById("child-view-btn");
      o_child_view_btn.classList.remove("clicked-btn");
      let o_sensor_view_btn = document.getElementById("sensor-view-btn");
      o_sensor_view_btn.classList.remove("clicked-btn");
            
      //display calendar view table, slight pause to make change obvious
      setTimeout(() => {
        let o_cal_table = document.getElementById("cal_view_table");
        o_cal_table.classList.remove("hidden");
      }, 100);
      //hide calendar table and sensor table
      let o_child_table = document.getElementById("child_view_table");
      o_child_table.classList.add("hidden");
      let o_sensor_table = document.getElementById("sensor_view_table");
      o_sensor_table.classList.add("hidden");
    } else {
      if (CONSOLE_BOOL) {
        console.log("Calendar View Already Displayed")
      }
    }
}

/**
 * Event handler function to change the table displayed to child view
 */
function showChildView() {
  if (CONSOLE_BOOL) {
      console.log("main.js - showChildView")
  }
  // if not already on child view, display it
  let o_child_view_btn = document.getElementById("child-view-btn");
  if (o_child_view_btn.classList.contains("clicked-btn") != true) {
    //make this button look clicked
    o_child_view_btn.classList.add("clicked-btn");
    //make other button not clicked
    let o_cal_view_btn = document.getElementById("cal-view-btn");
    o_cal_view_btn.classList.remove("clicked-btn");
    let o_sensor_view_btn = document.getElementById("sensor-view-btn");
    o_sensor_view_btn.classList.remove("clicked-btn");
    //display children view table, slight pause to make change obvious
    setTimeout(() => {
      let o_child_table = document.getElementById("child_view_table");
      o_child_table.classList.remove("hidden");
    }, 100);
    //hide calendar table
    let o_cal_table = document.getElementById("cal_view_table");
    o_cal_table.classList.add("hidden");
    let o_sensor_table = document.getElementById("sensor_view_table");
    o_sensor_table.classList.add("hidden");
  } else {
    if (CONSOLE_BOOL) {
      console.log("Child View Already Displayed")
    }
  }
}

/**
 * Event handler function to change the table displayed to sensor view
 */
 function showSensorView() {
  if (CONSOLE_BOOL) {
      console.log("main.js - showSensorView")
  }
  // if not already on child view, display it
  let o_sensor_view_btn = document.getElementById("sensor-view-btn");
  if (o_sensor_view_btn.classList.contains("clicked-btn") != true) {
    //make this button look clicked
    o_sensor_view_btn.classList.add("clicked-btn");
    //make other button not clicked
    let o_cal_view_btn = document.getElementById("cal-view-btn");
    o_cal_view_btn.classList.remove("clicked-btn");
    let o_child_view_btn = document.getElementById("child-view-btn");
    o_child_view_btn.classList.remove("clicked-btn");
    //display children view table, slight pause to make change obvious
    setTimeout(() => {
      let o_sensor_table = document.getElementById("sensor_view_table");
      o_sensor_table.classList.remove("hidden");
    }, 100);
    //hide calendar table
    let o_cal_table = document.getElementById("cal_view_table");
    o_cal_table.classList.add("hidden");
    let o_child_table = document.getElementById("child_view_table");
    o_child_table.classList.add("hidden");
  } else {
    if (CONSOLE_BOOL) {
      console.log("Sensor View Already Displayed")
    }
  }
}





/**
 * Event handler function to populate the chore table
 */
 function select_data_chore() {
  // Boolean to determine if anything is inserted to the tables
  let chore_empty_bool = true;
  // This URL path is the data route defined in app.py
  // send out distance and key to py file
  let theURL = '/data_chore';
  if (CONSOLE_BOOL) {
    console.log("URL to fetch: ", theURL);
  }
  // fetch is a Javascript function that sends a request to a server
  fetch(theURL)
      .then(response => response.json()) // Convert response to JSON
      // Run the anonymous function on the received JSON response
      .then(function(response) {
        // Updating Chore Table
        let chore_table = document.getElementById("cal_view_table");
        for (let elem in response) {
          let found_chore_bool = false;
          //For each response elem, iterate over my table
          //If date is in it, add row of chores
          //If date is not in it, add date header then row of chore
          for (let i = 0, iterate_row; iterate_row = chore_table.rows[i]; i++) {
            if (response[elem][3] == iterate_row.cells[0].innerHTML) {
              if (CONSOLE_BOOL) {
                console.log("Date found, adding chore");
              }
              //Indicate we found the child
              found_chore_bool = true; 
              //Add chore row directly under that child
              let row = chore_table.insertRow(i+1);
              //insert chore
              let cell = row.insertCell(-1);
              let text = document.createTextNode(response[elem][1]);
              cell.appendChild(text);
              //insert child name
              cell = row.insertCell(-1);
              text = document.createTextNode(response[elem][0]);
              cell.appendChild(text);
              //delete button
              cell = row.insertCell(-1);
              cell.classList.add("remove-btn");
              cell.title = "Delete Chore";
              cell.addEventListener("click", deleteRow);
              text = document.createElement("i");
              text.classList.add("fas", "fa-trash-alt", "fa-x", "clear-btn");
              cell.appendChild(text);
              //complete button
              cell = row.insertCell(-1);
              cell.classList.add("done-btn");
              cell.title = "Complete Chore";
              cell.addEventListener("click", deleteRow);
              text = document.createElement("i");
              text.classList.add("fas", "fa-check", "fa-x", "clear-btn");
              cell.appendChild(text);
              break;
            } 
            
          }
          //If never found, add header first then row
          if (!found_chore_bool) {
            if (CONSOLE_BOOL) {
              console.log("Date never found, adding child and chore");
            }
            //Empty Row for Spacing, except on first
            if (!chore_empty_bool) {
              let row = chore_table.insertRow(-1);
              row.classList.add("empty_row");
              let headerCell = document.createElement("th");
              headerCell.innerHTML = "";
              row.appendChild(headerCell);
            }
            //Header Row
            let row = chore_table.insertRow(-1);
            //Insert Date
            let headerCell = document.createElement("th");
            let text = document.createTextNode(response[elem][3]);
            headerCell.appendChild(text);
            row.appendChild(headerCell);
            //Insert Due Date Header
            headerCell = document.createElement("th");
            headerCell.innerHTML = "Assigned";
            row.appendChild(headerCell);
            //Insert Cancel Button Header
            headerCell = document.createElement("th");
            headerCell.innerHTML = "Cancel";
            row.appendChild(headerCell);
            //Insert Complete Button Header
            headerCell = document.createElement("th");
            headerCell.innerHTML = "Finish";
            row.appendChild(headerCell);
            //Finished adding header for that child, now add the chore row
            row = chore_table.insertRow(-1);
            //insert chore
            let cell = row.insertCell(-1);
            text = document.createTextNode(response[elem][1]);
            cell.appendChild(text);
            //insert due date
            cell = row.insertCell(-1);
            text = document.createTextNode(response[elem][0]);
            cell.appendChild(text);
            //delete button
            cell = row.insertCell(-1);
            cell.classList.add("remove-btn");
            cell.title = "Delete Chore";
            cell.addEventListener("click", deleteRow);
            text = document.createElement("i");
            text.classList.add("fas", "fa-trash-alt", "fa-x", "clear-btn");
            cell.appendChild(text);
            //complete button
            cell = row.insertCell(-1);
            cell.classList.add("done-btn");
            cell.title = "Complete Chore";
            cell.addEventListener("click", deleteRow);
            text = document.createElement("i");
            text.classList.add("fas", "fa-check", "fa-x", "clear-btn");
            cell.appendChild(text);
            //Indicate the table is no longer empty
            chore_empty_bool = false;
          }
        }
      });
}

/**
 * Event handler function to populate the child table
 */
function select_data_child() {
  // Boolean to determine if anything is inserted to the tables
  let child_empty_bool = true;
  // This URL path is the data route defined in app.py
  // send out distance and key to py file
  let theURL = '/data_child';
  if (CONSOLE_BOOL) {
    console.log("URL to fetch: ", theURL);
  }
  // fetch is a Javascript function that sends a request to a server
  fetch(theURL)
      .then(response => response.json()) // Convert response to JSON
      // Run the anonymous function on the received JSON response
      .then(function(response) {
        // Updating Child Table
        let child_table = document.getElementById("child_view_table");
        for (let elem in response) {
          let found_child_bool = false;
          //For each response elem, iterate over my table
          //If child is in it, add row of chores
          //If child is not in it, add child header then row of chore
          for (let i = 0, iterate_row; iterate_row = child_table.rows[i]; i++) {
            if (response[elem][0] == iterate_row.cells[0].innerHTML) {
              if (CONSOLE_BOOL) {
                console.log("Child name found, adding chore");
              }
              //Indicate we found the child
              found_child_bool = true; 
              //Add chore row directly under that child
              let row = child_table.insertRow(i+1);
              //insert chore
              let cell = row.insertCell(-1);
              let text = document.createTextNode(response[elem][1]);
              cell.appendChild(text);
              //insert due date
              cell = row.insertCell(-1);
              text = document.createTextNode(response[elem][3]);
              cell.appendChild(text);
              //delete button
              cell = row.insertCell(-1);
              cell.classList.add("remove-btn");
              cell.title = "Delete Chore";
              cell.addEventListener("click", deleteRow);
              text = document.createElement("i");
              text.classList.add("fas", "fa-trash-alt", "fa-x", "clear-btn");
              cell.appendChild(text);
              //complete button
              cell = row.insertCell(-1);
              cell.classList.add("done-btn");
              cell.title = "Complete Chore";
              cell.addEventListener("click", deleteRow);
              text = document.createElement("i");
              text.classList.add("fas", "fa-check", "fa-x", "clear-btn");
              cell.appendChild(text);
              break;
            } 
            
          }
          //If never found, add header and row
          if (!found_child_bool) {
            if (CONSOLE_BOOL) {
              console.log("Child name never found, adding child and chore");
            }
            //Empty Row for Spacing, except on first
            if (!child_empty_bool) {
              let row = child_table.insertRow(-1);
              row.classList.add("empty_row");
              let headerCell = document.createElement("th");
              headerCell.innerHTML = "";
              row.appendChild(headerCell);
            }
            //Header Row
            let row = child_table.insertRow(-1);
            //Insert Child Name
            let headerCell = document.createElement("th");
            let text = document.createTextNode(response[elem][0]);
            headerCell.appendChild(text);
            row.appendChild(headerCell);
            //Insert Due Date Header
            headerCell = document.createElement("th");
            headerCell.innerHTML = "Due Date";
            row.appendChild(headerCell);
            //Insert Cancel Button Header
            headerCell = document.createElement("th");
            headerCell.innerHTML = "Cancel";
            row.appendChild(headerCell);
            //Insert Complete Button Header
            headerCell = document.createElement("th");
            headerCell.innerHTML = "Finish";
            row.appendChild(headerCell);
            //Finished adding header for that child, now add the chore row
            row = child_table.insertRow(-1);
            //insert chore
            let cell = row.insertCell(-1);
            text = document.createTextNode(response[elem][1]);
            cell.appendChild(text);
            //insert due date
            cell = row.insertCell(-1);
            text = document.createTextNode(response[elem][3]);
            cell.appendChild(text);
            //delete button
            cell = row.insertCell(-1);
            cell.classList.add("remove-btn");
            cell.title = "Delete Chore";
            cell.addEventListener("click", deleteRow);
            text = document.createElement("i");
            text.classList.add("fas", "fa-trash-alt", "fa-x", "clear-btn");
            cell.appendChild(text);
            //complete button
            cell = row.insertCell(-1);
            cell.classList.add("done-btn");
            cell.title = "Complete Chore";
            cell.addEventListener("click", deleteRow);
            text = document.createElement("i");
            text.classList.add("fas", "fa-check", "fa-x", "clear-btn");
            cell.appendChild(text);
            //Indicate the table is no longer empty
            child_empty_bool = false;
          }
        }
      });
}


/**
 * Event handler function to populate the sensor table
 */
function select_sensors() {
  // Boolean to determine if anything is inserted to the tables
  let sensor_empty_bool = true;
  // This URL path is the data route defined in app.py
  // send out distance and key to py file
  let theURL = '/status';
  if (CONSOLE_BOOL) {
    console.log("URL to fetch: ", theURL);
  }
  // fetch is a Javascript function that sends a request to a server
  fetch(theURL)
      .then(response => response.json()) // Convert response to JSON
      // Run the anonymous function on the received JSON response
      .then(function(response) {
        // Updating sensor Table
        let sensor_table = document.getElementById("sensor_view_table");
        //Header Row
        let row = sensor_table.insertRow(-1);
        let headerCell = document.createElement("th");
        headerCell.innerHTML = "Sensors";
        row.appendChild(headerCell);
        headerCell = document.createElement("th");
        headerCell.innerHTML = "Current Status";
        row.appendChild(headerCell);
        // Finished adding header, now add the chores
        for (let elem in response) {
          // For each response[elem][1] holds the status value
          if (response[elem][1] != "NULL") {
            // Only add the chores with a status other than NULL
            if (CONSOLE_BOOL) {
              console.log("Chore status not null, adding chore");
            }
            //Add chore row 
            let row = sensor_table.insertRow(-1);
            // Insert chore
            let cell = row.insertCell(-1);
            let text = document.createTextNode(response[elem][0]);
            cell.appendChild(text);
            // Insert current status
            cell = row.insertCell(-1);
            text = document.createTextNode(response[elem][1]);
            cell.appendChild(text);
          } 
        }
      });
}



/**
 * Event handler function to show MenuList when menu button is pressed
 */
function showMenuList() {
    document.EventBus.fireEvent("showMenu");
}

/**
 * Event handler function to show the Add Chore Box when the add chore button is pressed
 */
 function showAddChore() {
    document.EventBus.fireEvent("showAddChore");
}

/**
 * Event handler function to show the Add Chore Box when the add chore button is pressed
 */
 function createChore() {
  document.EventBus.fireEvent("createChore");
}

/**
 * Event handler function to show the Add Child Box when the add child button is pressed
 */
 function showAddChild() {
  document.EventBus.fireEvent("showAddChild");
}

/**
 * Event handler function to show the Add Chore Box when the add chore button is pressed
 */
 function createChild() {
  document.EventBus.fireEvent("createChild");
}


/**
 * Event handler function to remove a Chore row when the delete button is pressed
 */
 function deleteRow() {
  // event.target will be the input element.
  let row = event.target.parentNode;
  // If the icon was clicked, row is the td, we want the tr
  if (row.tagName == "TD") {
    row = row.parentNode;
  }
  // Get the chore name and due date
  let chore_name = row.cells[0].innerHTML;
  let due_date = row.cells[1].innerHTML;
  let child_name = "";

  // These variables will be used to iterate backwards from the current row
  // until a child_name is found
  let name_found = false;
  let prevRow = row;

  // We need to grab the child names from the table users to look for the name
  let childURL = '/child';
  // fetch is a Javascript function that sends a request to a server
    fetch(childURL)
        .then(response => response.json()) // Convert response to JSON
        // Run the anonymous function on the received JSON response
        .then(function(response) {
          // Now response holds the child_names saved
            //This loop will keep checking the previous rows until a child name is found          
            while(!name_found) {
              prevRow = prevRow.previousElementSibling;
              let prevFirstCell = prevRow.cells[0].innerHTML;
              // Check if the current cell matches any of the names
              for (let elem in response) {
                if (prevFirstCell == response[elem][0]) {
                  name_found = true;
                  // Save the first name we find and exit loop
                  child_name = prevFirstCell;
                }
              }
            }
            let deleteURL = '/unassign/' + child_name + "." + chore_name + "." + due_date;
            // fetch is a Javascript function that sends a request to a server
            fetch(deleteURL)
                .then(response => response.json()) // Convert response to JSON
                // Run the anonymous function on the received JSON response
                .then(function(response) {
                    window.location.href=window.location.href
                });

            
        });

  // tr.parentNode.removeChild(tr); // deletes the row
}


/**
 * This event listener is used for initializing anything that isn't associated with any specific webcomponent.
 */
document.addEventListener("DOMContentLoaded", () => {

    // Code for showing / hiding MenuList functionality
    let o_menu_btn = document.getElementById("menu-btn");
    o_menu_btn.addEventListener("click", showMenuList);

    // Code for showing / hiding Add Chore Box functionality
    let o_add_chore_btn = document.getElementById("add-chore-btn");
    o_add_chore_btn.addEventListener("click", showAddChore);

    // Code for showing / hiding Add Chore Box functionality
    let o_add_child_btn = document.getElementById("add-child-btn");
    o_add_child_btn.addEventListener("click", showAddChild);

    // Code for showing / hiding Calendar View
    let o_cal_view_btn = document.getElementById("cal-view-btn");
    o_cal_view_btn.addEventListener("click", showCalendarView);

    // Code for showing / hiding Calendar View
    let o_child_view_btn = document.getElementById("child-view-btn");
    o_child_view_btn.addEventListener("click", showChildView);

    // Code for showing / hiding Calendar View
    let o_sensor_view_btn = document.getElementById("sensor-view-btn");
    o_sensor_view_btn.addEventListener("click", showSensorView);

    // Code for adding chore
    let o_submit_chore_btn = document.getElementById("submit-chore-input");
    o_submit_chore_btn.addEventListener("click", createChore);

    // Code for adding child
    let o_submit_child_btn = document.getElementById("submit-child-input");
    o_submit_child_btn.addEventListener("click", createChild);

    // let o_delete_btns = document.getElementsByClassName("remove-btn");
    // o_delete_btns.addEventListener("click", deleteRow);

    
    if (CONSOLE_BOOL) {
        console.log("main.js - DOM loaded");
    }

    select_data_chore();
    select_data_child();
    select_sensors();

    // initialize Event Bus instance
    document.EventBus = new EventBus();

});