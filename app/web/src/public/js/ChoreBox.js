
/**
 * Custom HTML element encapsulating all of the functionality related to the Intructions Box
 * @extends HTMLElement
 */
 class ChoreBox extends HTMLElement {

    /**
     * Constructs a new Instructions Box, initializing all elements
     */
    constructor() {
        super();
        // most of this content is simply initializing the html to go in the webcomponent
        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.classList.add("add-chore-section-blocker", "hidden");
        o_wrapper_obj_back.id = "add-chore-blocker";
        o_wrapper_obj_back.addEventListener("click", this.closeAddChore.bind(this));

        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "add-chore-section";
        o_wrapper_obj.id = "add-chore";

        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close-center", "btn");
        o_close_button.innerHTML = "&times;";
        o_close_button.addEventListener("click", this.closeAddChore.bind(this));

        let o_chore_title_wrapper = document.createElement("div");
        o_chore_title_wrapper.className = "hidden";
        o_chore_title_wrapper.id = "add-chore-top";
        o_chore_title_wrapper.style.display = "none";

        //Chore Box header
        let o_chore_title = document.createElement("h2");
        o_chore_title.classList.add("add-chore-header");
        o_chore_title.innerText = "Add Chore";

        

        o_chore_title_wrapper.append(o_chore_title, o_close_button);
        o_wrapper_obj.append(o_chore_title_wrapper);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
    }

    /** Function to determine if the add chore box is currently shown */
    getIsShown() {
        return this.querySelector("#add-chore").classList.contains("add-chore-section-open");
    }

    /**
     * Function to show add chore display from the main user screen
     */
    showAddChore() {
        this.querySelector("#add-chore").classList.add("add-chore-section-open");

        // Hide everything inside chore box while animating to prevent sandwiching of text
        setTimeout(() => {
            this.querySelector("#add-chore-top").style.display = "block";
            // this.querySelector("#instructions-para").style.display = "block";
            // document.body.focus();
        }, 290);

        this.querySelector("#add-chore-blocker").style.display = "block";
        
    }

    /**
     * Function to close task list display from the main user screen
     */
    closeAddChore() {
        this.querySelector("#add-chore").classList.remove("add-chore-section-open");
        // this.querySelector("#instructions-title").style.display = "none";
        // this.querySelector("#instructions-para").style.display = "none";
        this.querySelector("#add-chore-blocker").style.display = "none";
        this.querySelector("#add-chore-top").style.display = "none";
    }
}

/**
 * Array storing  related to the task-list
 * @static
 * @type {string[]}
 */
ChoreBox.A_TASK_INST = ["Click on the task list button and add all tasks you want to do",
    "Tasks can only be added before starting the Pomodoro session to limit distractions while you work",
    "Once the session begins, you can see the current and the next tasks",
    "If you are done with a task, hit the 'check' button"];

/**
 * Array storing  related to the work-break cycle
 * @static
 * @type {string[]}
 */
ChoreBox.A_CYCLE_INST = ["One Pomodoro = 25 minutes of work/studying",
    "Once you start, the timer won’t stop until you finish!",
    "Take a 5-minute break after every Pomo and a 30-minute break after every 4 Pomos",
    "If you get distracted, click “Restart” to restart the current interval",
    "Have other things to do? Hit “End Session” to log out"];

/**
 * String describing the Pomodoro Technique
 * @static
 * @type {String}
 */
ChoreBox.S_POMO_INST = "The Pomodoro technique is a scientifically proven way to help increase productivity. Ultimately, people are more productive by taking small mental breaks. PomoHero automates the process for you, making it easier for you to reduce distractions and focus on your work.";

/**
 * String describing the site's hotkeys
 * @static
 * @type {String}
 */
ChoreBox.S_HOTKEYS_INST = "c - color change, t - tasklist, esc - close pop-up, space - start/end session, n - next task";

customElements.define("chore-box", ChoreBox);


export { ChoreBox }