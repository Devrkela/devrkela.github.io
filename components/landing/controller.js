(function(){
    function installeIllustration(target){
        const composant = ascension.fabrique("/components/landing/illustration", {html:true, css:true});
        composant.then(ascension.installe.bind(null, target));
    };

    function installeDescription(target){
        const composant = ascension.fabrique("/components/landing/description", {html:true, css:true});
        composant.then(ascension.installe.bind(null, target));
    };

    return function (model){
        installeIllustration(model.querySelector("slot[name=illustration]"));
        installeDescription(model.querySelector("slot[name=description]"));
    }
})();