
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



customElements.define("chore-box", ChoreBox);


export { ChoreBox }