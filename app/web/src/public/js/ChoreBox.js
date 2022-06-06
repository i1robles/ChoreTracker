
const CONSOLE_BOOL = true;

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
        o_close_button.title = "Close Add Chore Box";
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

        //Chore Box inputs
        let o_form_wrapper = document.createElement("form");
        o_form_wrapper.classList.add("input-form");

        //Select child
        let o_child_input_wrapper = document.createElement("div");
        o_child_input_wrapper.classList.add("custom-input-wrapper");

        let o_child_label = document.createElement("label")
        o_child_label.innerText = "Assign to:";
        o_child_label.classList.add("small_message");
        o_child_label.setAttribute("for", "child-input");
        let o_child_input = document.createElement("select");
        o_child_input.classList.add("custom-input");
        o_child_input.id = "child-input";

        
        o_child_input_wrapper.append(o_child_label, o_child_input);

        //Select chore
        let o_chore_input_wrapper = document.createElement("div");
        o_chore_input_wrapper.classList.add("custom-input-wrapper");

        let o_chore_label = document.createElement("label")
        o_chore_label.innerText = "Chore:";
        o_chore_label.classList.add("small_message");
        o_chore_label.setAttribute("for", "child-input");
        let o_chore_input = document.createElement("select");
        o_chore_input.classList.add("custom-input");
        o_chore_input.id = "chore-input";

        //Select when it should be completed by
        let o_date_input_wrapper = document.createElement("div");
        o_date_input_wrapper.classList.add("custom-input-wrapper");

        let o_date_label = document.createElement("label")
        o_date_label.innerText = "Complete By:";
        o_date_label.classList.add("small_message");
        o_date_label.setAttribute("for", "date-input");
        let o_date_input = document.createElement("input");
        o_date_input.classList.add("custom-input");
        o_date_input.setAttribute("type", "date");
        o_date_input.id = "date-input";
        //Make sure chores can't be assigned before today
        let o_today = new Date().toLocaleDateString('en-ca');
        o_date_input.min = o_today;
        o_date_input.value = o_today;

        o_date_input_wrapper.append(o_date_label, o_date_input);
        //Submit button (adds to database)
        let o_submit_input_wrapper = document.createElement("div");
        o_submit_input_wrapper.classList.add("custom-input-wrapper");

        let o_submit_input = document.createElement("div");
        o_submit_input.classList.add("custom-btn");
        o_submit_input.id = "submit-chore-input";
        o_submit_input.innerHTML = "Assign";
        o_submit_input.title = "Assign Chore";

        o_submit_input_wrapper.append(o_submit_input);

        let childURL = '/child';
        if (CONSOLE_BOOL) {
            console.log("childURL to fetch: ", childURL);
        }
        // fetch is a Javascript function that sends a request to a server
        fetch(childURL)
            .then(response => response.json()) // Convert response to JSON
            // Run the anonymous function on the received JSON response
            .then(function(response) {
                for (let elem in response) {
                    let o_current_option = document.createElement("option");
                    o_current_option.classList.add("custom-input-option");
                    o_current_option.value = response[elem][0];
                    o_current_option.text = response[elem][0];
                    o_child_input.appendChild(o_current_option);
                }
                o_child_input_wrapper.append(o_child_label, o_child_input);
            });

        let choreURL = '/chore';
        if (CONSOLE_BOOL) {
            console.log("choreURL to fetch: ", choreURL);
        }
        // fetch is a Javascript function that sends a request to a server
        fetch(choreURL)
            .then(response => response.json()) // Convert response to JSON
            // Run the anonymous function on the received JSON response
            .then(function(response) {
                for (let elem in response) {
                    let o_current_option = document.createElement("option");
                    o_current_option.classList.add("custom-input-option");
                    o_current_option.value = response[elem][0];
                    o_current_option.text = response[elem][0];
                    o_chore_input.appendChild(o_current_option);
                }
                o_chore_input_wrapper.append(o_chore_label, o_chore_input);
            });


        o_form_wrapper.append(o_chore_input_wrapper, o_child_input_wrapper, o_date_input_wrapper, o_submit_input_wrapper);
        o_chore_title_wrapper.append(o_chore_title, o_close_button);
        o_wrapper_obj.append(o_chore_title_wrapper, o_form_wrapper);
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

    
    /**
     * Function to create chore and add it to database
     */
     createChore() {
        if (CONSOLE_BOOL) {
            console.log("Creating Chore");
        }
        let child_name = this.querySelector("#child-input").value;
        let chore_name = this.querySelector("#chore-input").value;
        let due_date = this.querySelector("#date-input").value;
        let theURL = '/assign/' + child_name + "." + chore_name + "." + due_date;
        if (CONSOLE_BOOL) {
            console.log("URL to fetch: ", theURL);
        }
        // fetch is a Javascript function that sends a request to a server
        fetch(theURL)
            .then(response => response.json()) // Convert response to JSON
            // Run the anonymous function on the received JSON response
            .then(function(response) {
                window.location.href=window.location.href
            });
    }



}
customElements.define("chore-box", ChoreBox);
export { ChoreBox }