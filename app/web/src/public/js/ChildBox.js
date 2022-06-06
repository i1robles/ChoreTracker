
const CONSOLE_BOOL = false;

/**
 * Custom HTML element encapsulating all of the functionality related to the Intructions Box
 * @extends HTMLElement
 */
 class ChildBox extends HTMLElement {

    /**
     * Constructs a new Instructions Box, initializing all elements
     */
    constructor() {
        super();
        // most of this content is simply initializing the html to go in the webcomponent
        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.classList.add("add-child-section-blocker", "hidden");
        o_wrapper_obj_back.id = "add-child-blocker";
        o_wrapper_obj_back.addEventListener("click", this.closeAddChild.bind(this));

        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "add-child-section";
        o_wrapper_obj.id = "add-child";

        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close-center", "btn");
        o_close_button.title = "Close Add Child Box";
        o_close_button.innerHTML = "&times;";
        o_close_button.addEventListener("click", this.closeAddChild.bind(this));

        let o_child_title_wrapper = document.createElement("div");
        o_child_title_wrapper.className = "hidden";
        o_child_title_wrapper.id = "add-child-top";
        o_child_title_wrapper.style.display = "none";

        //Child Box header
        let o_child_title = document.createElement("h2");
        o_child_title.classList.add("add-child-header");
        o_child_title.innerText = "Add Child";



        //Chore Box inputs
        let o_form_wrapper = document.createElement("form");
        o_form_wrapper.classList.add("input-form");

        //Add child name
        let o_child_input_wrapper = document.createElement("div");
        o_child_input_wrapper.classList.add("custom-input-wrapper");

        let o_child_label = document.createElement("label")
        o_child_label.innerText = "First Name:";
        o_child_label.classList.add("medium_message");
        o_child_label.setAttribute("for", "add-child-input");
        let o_child_input = document.createElement("input");
        o_child_input.classList.add("custom-input");
        o_child_input.setAttribute("type", "type");
        o_child_input.id = "add-child-input";
        o_child_input.placeholder = "Enter Name..."

        o_child_input_wrapper.append(o_child_label, o_child_input);

        //Select child's birthday
        let o_date_input_wrapper = document.createElement("div");
        o_date_input_wrapper.classList.add("custom-input-wrapper");

        let o_date_label = document.createElement("label")
        o_date_label.innerText = "Date of Birth:";
        o_date_label.classList.add("medium_message");
        o_date_label.setAttribute("for", "birthdate-input");
        let o_date_input = document.createElement("input");
        o_date_input.classList.add("custom-input");
        o_date_input.setAttribute("type", "date");
        o_date_input.id = "birthdate-input";
        //Make sure birthday is before today
        let o_today = new Date().toLocaleDateString('en-ca');
        o_date_input.max = o_today;
        o_date_input.value = o_today;

        o_date_input_wrapper.append(o_date_label, o_date_input);

        //Submit button (adds to database)
        let o_submit_input_wrapper = document.createElement("div");
        o_submit_input_wrapper.classList.add("custom-input-wrapper");

        let o_submit_input = document.createElement("div");
        o_submit_input.classList.add("custom-btn");
        o_submit_input.id = "submit-child-input";
        o_submit_input.innerHTML = "Create";
        o_submit_input.title = "Create Child";

        o_submit_input_wrapper.append(o_submit_input);


        o_form_wrapper.append(o_child_input_wrapper, o_date_input_wrapper, o_submit_input_wrapper);
        o_child_title_wrapper.append(o_child_title, o_close_button, o_form_wrapper);
        o_wrapper_obj.append(o_child_title_wrapper);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
    }

    /** Function to determine if the add child box is currently shown */
    getIsShown() {
        return this.querySelector("#add-child").classList.contains("add-child-section-open");
    }

    /**
     * Function to show add child display from the main user screen
     */
    showAddChild() {
        this.querySelector("#add-child").classList.add("add-child-section-open");

        // Hide everything inside child box while animating to prevent sandwiching of text
        setTimeout(() => {
            this.querySelector("#add-child-top").style.display = "block";
            // this.querySelector("#instructions-para").style.display = "block";
            // document.body.focus();
        }, 290);

        this.querySelector("#add-child-blocker").style.display = "block";
        
    }

    /**
     * Function to close task list display from the main user screen
     */
    closeAddChild() {
        this.querySelector("#add-child").classList.remove("add-child-section-open");
        // this.querySelector("#instructions-title").style.display = "none";
        // this.querySelector("#instructions-para").style.display = "none";
        this.querySelector("#add-child-blocker").style.display = "none";
        this.querySelector("#add-child-top").style.display = "none";
    }

    /**
     * Function to create child and add it to database
     */
     createChild() {
        if (CONSOLE_BOOL) {
            console.log("Creating Child");
        }
        let child_name = this.querySelector("#add-child-input").value;
        let birth_date = this.querySelector("#birthdate-input").value;

        let theURL = '/create/' + child_name + "." + birth_date;
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



customElements.define("child-box", ChildBox);


export { ChildBox }