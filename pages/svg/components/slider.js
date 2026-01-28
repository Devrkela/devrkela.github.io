import DMNMeterElement from "./meter.js";

// ATTRIBUTES

/**   attributes   **/

/***
  Un dictionnaire utilisé par le listener "attributechange".
***/

/****
  Chaque entrée crée un objet. La propiété "type" retourne une fonction permettant de
  vérifier que le type passer à l'attribut est correcte. "setter" retourne la fonction
  qui vérifie et modifie l'attribut.
****/

const attributes = {
  "aria-valuestep":{
    type: Number.isNumber,
    setter: setStep,
  }
}

/**    setStep    **/

/***
  Modifie la valeur courante.
***/

/****
  Pas de vérification à faire, on définit l'attribut "aria-valuestep".
****/

function setStep(step){
  /**
    La valeur de step étant retourné par l'attribut, on transforme le texte en nombre.
  **/
  step = parseFloat(step);

  /**
    On définit l'attribut "aria-valuestep".
  **/
  
  this.setAttribute("aria-valuestep", step);
}

// PSEUDO-CONSTRUCTOR

function DMNSliderElement(SliderElement = document.createElement("dmn-slider")){
  // Extension temporaire de l'élément.
  DMNMeterElement(SliderElement);

  /**
    On redirige l'attribut vers la fonction vérifiant si la valeur est correcte.
  **/

  /**
    "attributechange" ne fait rien si la derniére valeur de l'attribut est égale
    à la nouvelle valeur.
  **/
  SliderElement.addEventListener("attributechange", Aria.attributeChange.bind(SliderElement, attributes));

  /**
    On définit le nouveau rôle de l'élément, puis on le rend focusable.
  **/
  SliderElement.setAttribute("role","slider");
  SliderElement.setAttribute("tabindex","0");

  /**
    On définit les propriétés ici.
  **/
  Object.defineProperty(SliderElement,"step",new Step());

  /**
    On implémente les fonctionalités liées aux pointeurs (souris, toucher...).
    "pointermove" est modifiée dynamiquement par les deux autres événements.
  **/
  SliderElement.onpointerdown = onpointerdown;
  SliderElement.onpointerup = onpointerup;
  SliderElement.ontouchstart = (e)=>e.preventDefault();
  /**
    On implémente les fonctionnalités liées aux claviers.
  **/
  SliderElement.onkeydown = new KeyboarEvent(SliderElement);

  /**
    On définit les valeurs par défaut des propriétés.
  **/
  SliderElement.step = SliderElement.step || 1;

  /**
    On signe l'élément avec le pseudo-constructeur.
  **/
  Aria.signConstructor(SliderElement,DMNSliderElement);

  /**
    On retourne l'élément.
  **/

  CustomElement(SliderElement);
  return SliderElement;
}

function CustomElement(element){
  Object.defineProperty(element,Symbol.hasInstance,{ value:function(object){ return object.constructor === this.constructor; } ,writable:true });
  window.watcher.observe(element,{attributes:true, attributeOldValue:true});
}

// POINTER EVENT

function onpointerdown(event){
  /**
    On détecte les déplacement du doigt ou de la souris,
    lorsque l'utilisateur à appuyé sur l'élément.
  **/
  this.onpointermove = onpointermove;

  /**
    setPointerCapture permet de détecter le mouvement sur tous l'écran,
    pas uniquement lorsque l'utilisateur se déplace sur l'élément.
  **/
  this.setPointerCapture(event.pointerId);

  /**
    On déclenche le changement de valeur afin d'avoir une réponse immédiate,
    lorsque l'utilisateur appuie sur l'élément.
  **/
  this.onpointermove(event);
}

 const change_event = new Event("change");

function onpointerup (event) {
  /**
    On supprime la détection globale du déplacement,
  **/
  this.releasePointerCapture(event.pointerId);
  
  /**
    puis celle de l'élément.
  **/
  this.onpointermove = null;

  setTimeout(
    ()=>{
     
    
      /**
        ...on accroche la valeur à l'événement...
      **/
      change_event.value = this.value;
      
      /**
        ...et on envoie l'événement aux écouteurs.
      **/
      this.dispatchEvent(change_event);
  })
}
 const input_event = new Event("input");
function onpointermove(event){
  
  /**
    On récupére les dimensions de l'élément.
  **/
  const zone_focusable = this.getBoundingClientRect();
  /**
    On calcule la longueur séparant le début de l'élément du curseur.
    Puis, on transforme la longueur en pourcentage sur l'inervalle [0, 1].
  **/
  const percent = (event.clientX - zone_focusable.x) / zone_focusable.width;

  /**
    Ensuite, on utilise le pourcentage afin de calculer le nombre de pas.

    Math.floor arrondit au pas inférieur.
    Math.ceil  arrondit au pas superieur.
    Math.round arrondit au pas le plus proche.
  **/
  const numberOfStep = Math.round(((this.max - this.min)* percent)/this.step);

  /**
    On calcule,délimite puis modifie la valeur.
  **/

  const value = Math.clamp(this.min, this.max, (this.min + numberOfStep * this.step));

  if(value !== this.value){
    setTimeout(
    ()=>{
      /**
        Finalement, on crée un nouvel événement "input"...
      **/
     
    
      /**
        ...on accroche la valeur à l'événement...
      **/
      input_event.value = this.value;
      
      /**
        ...et on envoie l'événement aux écouteurs.
      **/
      this.dispatchEvent(input_event);
    }
  )
  this.value = value;
  }
  
  event.stopPropagation()
  
}

/// KEYBOARD EVENT

function KeyboarEvent(element){
  /**
    On définit le dictionnaire. Chaque propriété correspond au texte retourné
    par la propiété "key" de l'événement.
  **/
  this.ArrowRight = increaseValue;
  this.ArrowUp = increaseValue;
  this.ArrowLeft = decreaseValue;
  this.ArrowDown = decreaseValue;
  this.Home = setValueToMaximum;
  this.End = setValueToMinimum;
  this.PageDown = setValueToMinimum;
  this.PageUp = setValueToMaximum;

  /**
    On retourne une fonction qui redirige l'événement de la touche pressée
    vers la fonction, modifiant la valeur, correspondante.
  **/
  
  return (event)=>{
    event.preventDefault();
    this[event.key].call(element);
  }
}

function increaseValue(){
  /**
    On incrémente la valeur.
  **/
  const value = this.value + this.step;

  /**
    Si la valeur incrémentée est supérieur au maximum,
    on ne fait rien.
  **/
  if(value > this.max){
    return;
  }

  /**
    Sinon, on modifie la valeur courante.  
  **/
  this.value = value;
}

function decreaseValue(){
  /**
    On décrémente la valeur.
  **/
  const value = this.value - this.step;

  /**
    Si la valeur décrémentée est inférieur au minimum,
    on ne fait rien.
  **/
  if(value > this.max || value < this.min){
    return;
  }
  /**
    Sinon, on modifie la valeur courante.  
  **/
  this.value = value;
}

/** setValueToMaximum **/

/***
  Modifie la valeur pour qu'elle refléte la valeur maximale POSSIBLE.
  En d'autre terme, on ajoute le nombre maximal de pas depuis la valeur actuelle.
***/

function setValueToMaximum(){
  /**
    On calcule le nombre de pas maximal restant.
    Puis, on les rajoute à la valeur actuelle.
  **/
  this.value += this.step * Math.floor((this.max-this.value) / this.step);
  this.setAttribute("aria-valuetext",this.value);
}

/** setValueToMaximum **/

/***
  Modifie la valeur pour qu'elle refléte la valeur miniimale POSSIBLE.
  En d'autre terme, on soustrais le nombre maximal de pas depuis la valeur actuelle.
***/

function setValueToMinimum(){
  /**
    On calcule le nombre de pas maximal décroissant.
    Puis, on les soustrait à la valeur actuelle.
  **/
  this.value -= this.step * Math.floor((this.value-this.min) / this.step);
  this.setAttribute("aria-valuetext",this.value);
}

/** Step **/

/***
  Un objet utilisé en tant que descripteur pour la propiété "step".
***/

function Step(){
  this.get = step;
  this.set = step;
  this.enumerable = true;
}

/**   step   **/

/***
  Affecte et/ou retourne l'attribut "aria-valuestep".
***/

/****
  Mimique le comportement des propiétés des éléments du DOM.
****/

function step(){
  if(arguments[0] !== undefined) setStep.call(this,arguments[0]);

  return parseFloat(this.getAttribute("aria-valuestep"))
}

Aria.define("dmn-slider", DMNSliderElement);