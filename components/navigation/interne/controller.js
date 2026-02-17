async function NavigationInterneController(model, data){
    const cible_pour_barre = model.querySelector("slot[name=barre]");
    
    function fermeNavigationInterne(){
        document.body.removeAttribute("navigation_interne");
    };

    model.querySelector(".close").addEventListener("click", fermeNavigationInterne);
    model.querySelector(".scrim_navigation_interne").addEventListener("click", fermeNavigationInterne);
    
    ascension.installe(model.querySelector("slot[name=list]"), data.list);
    await ascension.fabrique("/components/navigation/interne/barre").then(ascension.installe.bind(null, cible_pour_barre));
};