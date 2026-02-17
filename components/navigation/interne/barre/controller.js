function NavigationInterneController(model){
    function ouvreNavigationInterne(){
        document.body.setAttribute("navigation_interne", true);
    };

    model.querySelector(".menu").addEventListener("click", ouvreNavigationInterne);
};