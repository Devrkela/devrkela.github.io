function showHeader(model){
    function openMenu(){
        document.body.setAttribute("menu", true);
    }

    function closeMenu(){
        document.body.setAttribute("menu", false);
    }
    
    document.querySelector("header").setAttribute("class", "show");
    model.querySelector(".scrim").addEventListener("click", closeMenu);
    model.querySelector(".close").addEventListener("click", closeMenu);
    model.querySelector("#menu").addEventListener("click", openMenu);
}