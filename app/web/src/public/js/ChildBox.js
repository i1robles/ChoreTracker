
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

        

        o_child_title_wrapper.append(o_child_title, o_close_button);
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
}



customElements.define("child-box", ChildBox);


export { ChildBox }