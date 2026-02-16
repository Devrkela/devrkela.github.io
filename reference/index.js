
const components = {};

components["header"] = ascension.fabrique("/components/header");
components["header"].then(ascension.installe.bind(null, document.querySelector("header > slot[name=header]")));

document.querySelector("#menu_secondary").addEventListener("click", openSubmenu);
document.querySelector(".scrim1").addEventListener("click", closeSubmenu);

function openSubmenu(){
    document.body.setAttribute("submenu", true)
}

function closeSubmenu(){
    document.body.removeAttribute("submenu")
}