
const CONSOLE_BOOL = true;

/**
 * Custom HTML element encapsulating all of the functionality related to the Menu List
 * @extends HTMLElement
 */
class MenuList extends HTMLElement {
    /**
     * Constructs a new Menu Display, initializing all elements and adding handlers
     */
    constructor() {
        super();
        this.o_menu = {};

        // background mask
        let o_wrapper_obj_back = document.createElement("div");
        o_wrapper_obj_back.classList.add("sidenav-blocker", "hidden");
        o_wrapper_obj_back.id = "side-menu-blocker";
        //event to close the menu if you click outside of it
        o_wrapper_obj_back.addEventListener("click", this.closeMenuList.bind(this));

        // side menu
        let o_wrapper_obj = document.createElement("div");
        o_wrapper_obj.className = "sidenav";
        o_wrapper_obj.id = "side-menu";

        // close button
        let o_close_button = document.createElement("a");
        o_close_button.classList.add("close-side", "btn", "hidden");
        o_close_button.id = "close-menu";
        o_close_button.innerHTML = "&times;";
        // event to close the menu if you click the x
        o_close_button.addEventListener("click", this.closeMenuList.bind(this));

        // nav to hold the links to other pages
        let o_nav_list = document.createElement("nav");
        o_nav_list.id = "nav_list";
        o_nav_list.classList.add("menu_list_links");
        
        let o_link_one = document.createElement("a");
        o_link_one.setAttribute('href', "main");
        o_link_one.innerHTML = "Main Page";

        let o_link_two = document.createElement("a");
        o_link_two.setAttribute('href', "points");
        o_link_two.innerHTML = "Points";

        let o_link_three = document.createElement("a");
        o_link_three.setAttribute('href', "backlog");
        o_link_three.innerHTML = "Backlog";

        let o_link_four = document.createElement("a");
        o_link_four.setAttribute('href', "account");
        o_link_four.innerHTML = "Account";
        
        let o_link_five = document.createElement("a");
        o_link_four.setAttribute('href', "/");
        o_link_four.innerHTML = "Sign Out";
        
        // footer link at bottom of menu
        let o_menu_footer = document.createElement("footer");
        o_menu_footer.classList.add("menu_footer");

        

        o_nav_list.append(o_link_one, o_link_two, o_link_three, o_link_four);
        o_wrapper_obj.append(o_close_button, o_nav_list);
        this.append(o_wrapper_obj_back);
        this.append(o_wrapper_obj);
    }


    /**
     * Function to show menu list display from the main user screen
     */
    showMenuList() {
        if (CONSOLE_BOOL) {
            console.log("menuList.js - showMenuList");
        }

        // Don't show the text in the menu right away
        this.querySelector("#nav_list").style.display = "none";
        let o_menu = this.querySelector("#side-menu");
        o_menu.style.display = "block";
        this.querySelector("#side-menu-blocker").style.display = "block";

        if (window.screen.width <= 500) {
            o_menu.classList.add("sidenav-small");
        } else {
            o_menu.classList.add("sidenav-open");
        }

        // Show text after animation to prevent sandwiching
        setTimeout(() => {
            this.querySelector("#nav_list").style.display = "block";
            this.querySelector("#close-menu").style.display = "block";
        }, 290);

    }

    /**
     * Function to close menu list display from the main user screen
     */
    closeMenuList() {
        this.querySelector("#close-menu").style.display = "none";
        let o_menu = this.querySelector("#side-menu");

        o_menu.classList.remove("sidenav-small");
        o_menu.classList.remove("sidenav-open");
        //this.querySelector("#menu-title").style.display = "none";
        //this.querySelector("#all-menu").style.display = "none";
        this.querySelector("#side-menu-blocker").style.display = "none";
        this.querySelector("#nav_list").style.display = "none";
    }

}


customElements.define("menu-list", MenuList);
export { MenuList }