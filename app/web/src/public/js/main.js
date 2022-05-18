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
 * Event handler function to show the Add Child Box when the add child button is pressed
 */
 function showAddChild() {
  document.EventBus.fireEvent("showAddChild");
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

    
    if (CONSOLE_BOOL) {
        console.log("main.js - DOM loaded");
    }

    // initialize Event Bus instance
    document.EventBus = new EventBus();

});