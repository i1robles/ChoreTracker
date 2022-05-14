import { MenuList } from "./menuList.js";
import { ChoreBox } from "./ChoreBox.js";
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
      //make other button not clicked
      let o_child_view_btn = document.getElementById("child-view-btn");
      o_child_view_btn.classList.remove("clicked-btn");
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
    } else {
      if (CONSOLE_BOOL) {
        console.log("Child View Already Displayed")
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
 * This event listener is used for initializing anything that isn't associated with any specific webcomponent.
 */
document.addEventListener("DOMContentLoaded", () => {

    // Code for showing / hiding MenuList functionality
    let o_menu_btn = document.getElementById("menu-btn");
    o_menu_btn.addEventListener("click", showMenuList);

    // Code for showing / hiding Add Chore Box functionality
    let o_add_chore_btn = document.getElementById("add-chore-btn");
    o_add_chore_btn.addEventListener("click", showAddChore);

    // Code for showing / hiding Calendar View
    let o_cal_view_btn = document.getElementById("cal-view-btn");
    o_cal_view_btn.addEventListener("click", showCalendarView);

    // Code for showing / hiding Calendar View
    let o_child_view_btn = document.getElementById("child-view-btn");
    o_child_view_btn.addEventListener("click", showChildView);

    
    if (CONSOLE_BOOL) {
        console.log("main.js - DOM loaded");
    }

    // initialize Event Bus instance
    document.EventBus = new EventBus();

});