//import { TimerContainer } from "./timerContainer.js";
const CONSOLE_BOOL = true;

/**
 * Class representing an Event Hub to centralize all event logic
 */
class EventBus {

    /**
     * Constructs a new EventBus, by obtaining references to all major webcomponents
     * and registering events
     */
    constructor() {
        this.o_bus = document.createElement("div");
        this.o_menu_list = document.querySelector("menu-list");
        this.o_add_chore_box = document.querySelector("chore-box");
        this.registerEvents();
    }

    /**
     * Registers all of the events that will be fired
     */
    registerEvents() {
        this.registerEvent("closeWindows", this.handleCloseWindows.bind(this));
        this.registerEvent("showMenu", this.handleShowMenu.bind(this));
        this.registerEvent("showAddChore", this.handleShowAddChore.bind(this));
    }


    /**
     * Registers the event of the specified name
     * @param {String} s_event_name name to fire off
     * @param {Function} f_callback callback function to call
     */
    registerEvent(s_event_name, f_callback) {
        this.o_bus.addEventListener(s_event_name, f_callback);
    }

    /**
     * Fires the specified event
     * @param {String} s_event_name 
     */
    fireEvent(s_event_name) {
        this.o_bus.dispatchEvent(new CustomEvent(s_event_name));
    }


    /**
     * Event Handler function for the 'closeWindows' event
     */
    handleCloseWindows() {
        this.o_menu_list.closeMenuList();
        this.o_add_chore_box.closeAddChore();
    }

    /**
     * Event Handler function for the 'showMenu' event
     */
    handleShowMenu() {
        // if (this.o_add_chore_box.getIsShown()) {
        //     this.o_add_chore_box.closeAddChore();
        // }
        this.o_menu_list.showMenuList();
        if (CONSOLE_BOOL) {
            console.log("eventBus.js - handleShowMenu");
        }
    }

    /**
     * Event Handler function for the 'showAddChore' event
     */
     handleShowAddChore() {
        // if (this.o_menu_list.getIsShown()) {
        //     this.o_menu_list.closeMenuList();
        // }
        this.o_add_chore_box.showAddChore();
        if (CONSOLE_BOOL) {
            console.log("eventBus.js - handleShowAddChore");
        }
    }

    
}

export { EventBus };