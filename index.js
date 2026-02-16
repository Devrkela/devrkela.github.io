

const components = {};

components["header"] = ascension.fabrique("/components/header");
components["header"].then(ascension.installe.bind(null, document.querySelector("header > slot[name=header]")));


components["illustration"] = ascension.fabrique("/components/landing/");
components["illustration"].then(ascension.installe.bind(null, document.querySelector("main > slot[name=content]")));
