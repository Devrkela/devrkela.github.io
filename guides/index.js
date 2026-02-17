
const components = {};

components["header"] = ascension.fabrique("/components/header");
components["header"].then(ascension.installe.bind(null, document.querySelector("header > slot[name=header]")));

components["navigation/interne"] = await ascension.fabrique("/components/navigation/interne");

components["navigation/interne"].data = {
    list:await ascension.fabrique("/components/pages/guides/navigation", {html:true})    
};

ascension.installe(document.querySelector("main > slot[name=navigation_interne]"), components["navigation/interne"]);

//document.querySelector("#menu_secondary").addEventListener("click", openSubmenu);

function openSubmenu(){
    document.body.setAttribute("navigation_interne", true)
}