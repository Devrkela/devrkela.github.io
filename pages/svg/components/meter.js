// ATTRIBUTES

/**   attributes   **/

/***
  Un dictionnaire utilisé par le listener "attributechange".
***/

/****
  Les fonctions vérifient que la valeur utilisé est possible et la corrige si non.
****/

const attributes = {
  "aria-valuemin":{
    type:Number.isNumber,
    setter:setMinimum
  },
  "aria-valuemax":{
    type:Number.isNumber,
    setter:setMaximum
  },
  "aria-valuenow":{
    type:Number.isNumber,
    setter:setValue,
  },
};
      
/**    setMinimum    **/

/***
  Vérifie et modifie la valeur minimale.
***/

/****
   Si la propiété "value" existe, elle vérifie que celle-ci est supérieur ou égale
   à la nouvelle valeur minimale, sinon elle la modifie pour qu'elle refléte cette derniére.
****/

function setMinimum(min){
  /**
    On transforme le nouveau minimum en nombre, au cas oû on récupére la valeur de l'attribut.
  **/
  min = parseFloat(min);

  /**
    Si il existe une valeur courante et celle-ci est inférieur à la nouvelle valeur
    minimale, on l'a définit à cette derniére.
  **/
  if(Number.isNumber(this.value) && this.value < min) this.value = min;

  /**
    On définit l'attribut "aria-valuemin".
  **/
  this.setAttribute("aria-valuemin", parseFloat(min.toPrecision(12)));
}

/**    setMaximum    **/

/***
  Vérifie et modifie la valeur maximale.
***/

/****
   Si la propiété "value" existe, elle vérifie que celle-ci est inférieur ou égale
   à la nouvelle valeur maximale, sinon elle la modifie pour qu'elle refléte cette derniére.
***/

function setMaximum(max){
   /**
    On transforme le nouveau maximum en nombre, au cas oû on récupére la valeur de l'attribut.
  **/
  max = parseFloat(max);

  /**
    Si il existe une valeur courante et celle-ci est supérieur à la nouvelle valeur
    maximale, on l'a définit à cette derniére.
  **/
  if(this.value && this.value > max) this.value = max;

  this.setAttribute("aria-valuemax", parseFloat(max.toPrecision(12)));
}

/**    setValue    **/

/***
  Vérifie et modifie la valeur courante.
***/

/****
  Si la nouvelle valeur n'est pas inclue dans l'intervalle, la fonction ne fait rien.

  On définit la propiété css "--value-percent", sur l'intervalle [0,1].
  Elle représente le pourcentage.
****/

function setValue(value){
  /**
    La valeur de "value" étant retourné par l'attribut, on transforme le texte en nombre.
  **/
  value = parseFloat(value);

  if(Number.isNaN(value)){
    console.log(value)
    return;
  }
  /**
    Si la valeur dépasse l'intervalle, on définit l'attribut "aria-valuenow"
    à la valeur du bord le plus proche.
  **/
  if(Number.isNumber(this.min) && this.min > value){
    this.setAttribute("aria-valuenow", this.min);
    return;
  }

  if(Number.isNumber(this.max) && this.max < value){
    this.setAttribute("aria-valuenow", this.max);
    return;
  }
  /**
    On définit la propriété css "--value-percent". Celle-ci retourne la valeur sous forme de
    pourcentage sur l'intervalle [0, 1].

    (--value-percent) * (max - min) === value;
  **/
  this.style.setProperty("--value-percent",Math.clamp(0,1,(value-this.min)/(this.max-this.min)));

  /**
    On définit l'attribut "aria-valuenow". "toPrecision(12)" corrige les erreurs de l'IEEE 754
    oû un calcul produit un résultat légérement décalé. Finalement, on formate le nombre
    retourné par "toPrecision" (qui est formaté en texte) en nombre pour se débarassé des 0 inutiles.
  **/

  // exemple:

  /***
    console.log(`arithmétique: 0.1 + 0.2 !== ${0.1 + 0.2}`);
    console.log(`toPrecision(12): 0.1 + 0.2 === ${(0.1 + 0.2).toPrecision(12)}`);
    console.log(`parseFloat(x.toPrecision(12)): 0.1 + 0.2 === ${parseFloat((0.1 + 0.2).toPrecision(12))}`);
    console.log("");
  ***/
  
  this.setAttribute("aria-valuenow", parseFloat(value.toPrecision(12)));
}


// CONSTRUCTOR

function DMNMeterElement(MeterElement = document.createElement("dmn-meter")){
  /**
    On redirige l'attribut vers la fonction vérifiant si la valeur est correcte.
  **/

  /**
    "attributechange" ne fait rien si la derniére valeur de l'attribut est égale
    à la nouvelle valeur.
  **/
  MeterElement.addEventListener("attributechange", Aria.attributeChange.bind(MeterElement, attributes));

  /**
    On définit le nouveau rôle de l'élément, puis on le rend focusable.
  **/
  MeterElement.setAttribute("role","meter");

  /**
    On définit les propriétés ici.
  **/
  Object.defineProperty(MeterElement,"min",   new Minimum());
  Object.defineProperty(MeterElement,"max",   new Maximum());
  Object.defineProperty(MeterElement,"value", new Value  ());

  /**
    On définit les valeurs par défaut des propriétés.
  **/
  const min   = MeterElement.min   ||   0;
  const max   = MeterElement.max   || 100;
  const value = MeterElement.value ||   0;

  setMinimum.call(MeterElement, min  );
  setMaximum.call(MeterElement, max  );
  setValue  .call(MeterElement, value);

  /**
    On signe l'élément avec le pseudo-constructeur.
  **/
  Aria.signConstructor(MeterElement,DMNMeterElement);
  
  return MeterElement;
}

// PROPRIÉTÉS

/**   Minimum   **/

/***
  Un objet utilisé en tant que descripteur pour la propiété "minimum" de DMNMeterElement.
***/

function Minimum(){  
  this.get        =  min;
  this.set        =  min;
  this.enumerable = true;
}

/**    min    **/

/*** 
  Affecte et/ou retourne l'attribut "aria-valuemin".
***/

/****
  Mimique le comportement des propiétés des éléments du DOM.
****/

function min(){
  if(arguments[0] !== undefined) this.setAttribute("aria-valuemin", arguments[0]);

  return parseFloat(this.getAttribute("aria-valuemin"));
}
 
/**   Maximum   **/

/***
  Un objet utilisé en tant que descripteur pour la propiété "max" de DMNMeterElement.
***/

function Maximum(){
  this.get        =  max;
  this.set        =  max;
  this.enumerable = true;
}

/**   max   **/

/***
  Affecte et/ou retourne l'attribut "aria-valuemax".
***/

/****
  Mimique le comportement des propiétés des éléments du DOM.
****/

function max(){
  if(arguments[0] !== undefined) this.setAttribute("aria-valuemax", arguments[0]);

  return parseFloat(this.getAttribute("aria-valuemax"));
}

/**   Value   **/

/***
  Un objet utilisé en tant que descripteur pour la propiété "value" de DMNMeterElement.
***/

function Value(){
  this.get        = value;
  this.set        = value;
  this.enumerable =  true;
}

/**   value   **/

/*** 
  Affecte et/ou retourne l'attribute "aria-valuenow".
***/
 
/****
  Mimique le comportement des propiétés des éléments du DOM.
****/

function value(){
  if(arguments[0] !== undefined) this.setAttribute("aria-valuenow", arguments[0]);

  return parseFloat(this.getAttribute("aria-valuenow"));
}

export default DMNMeterElement;