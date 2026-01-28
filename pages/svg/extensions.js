/**
  "clamp" empéche qu'une valeur dépasse les bords de l'intervalle [min, max].
**/

Math.clamp = function(min,max,value){
  return this.min(max,this.max(min,value));
}

/**
  Fonction vérifiant que la valeur passée en paramêtre est bien un nombre.
**/
Number.isNumber = function(x){
  return !Number.isNaN(parseFloat(x));
}

/**
  Lorsque un élément souscris au MutationObserver, la callback redirige la mutation vers la
  fonction gérant son "type".
  Les fonction, gérant les types, crée un événement correspondant à la mutation, y insére les
  propriétés utiles puis envoie les événements aux écouteurs.
**/

window.watcher = new MutationObserver(
  /**
    La callback prend en paramêtre une liste de changement.
  **/
  function(list){
    /**
      On boucle la liste et on redirige les mutations vers la fonction qui les gére.
    **/
    list.forEach((mutation)=>{
      dictionary[mutation.type](mutation);
    });
  }
);

/**
  Fonction qui signale l'élément que l'un de ses attributs à changer.
  En d'autre terme, lorsque l'attribut d'un élément change, un événement "attributechange"
  est envoyé à l'élément.
**/
function attributes(mutation){
  /**
    On crée un événement "attributechange"
  **/
  const event = new Event("attributechange");

  /**
    On accroche divers propriété qui peuvent être utiles
    pour les écouteurs de l'événement "attributechange".
  **/
  event.attributeName = mutation.attributeName;
  event.oldValue      = mutation.oldValue;
  event.newValue      = mutation.target.getAttribute(mutation.attributeName);

  /**
    On envoie l'événement aux écouteurs.
  **/
  mutation.target.dispatchEvent(event);
}

/**
  Un dictionnaire permettant de rediriger le "type" de mutation vers la fonction correspondante.

**/

/*** Ne gére pour l'instant que les attributs. ***/

const dictionary = {
   attributes
}

/**
  Crée un objet global qui stockeront les fonctions utiles pour mettre en place les éléments
  ARIA-friendly.
**/

window.Aria = {};

/**
  Fonction utilitaire permettant de "signer" un élément.
  
  element.toString retournera le nom du constructeur.
  
  La fonction définit également le constructeur de l'élément.
  Utile pour les cas d'utilisation de instanceof.
**/

Aria.signConstructor =
  function signConstructor(element, constructor){
      /**
        On définit le constructeur.
      **/
      Object.defineProperty(element,"constructor",
        { value:constructor, writable:true }
      );

      /**
        On fait en sorte que toString retourne le nom du constructeur.
      **/
      Object.defineProperty(element,Symbol.toStringTag,
        { value:constructor.name, writable:true }
      );
  };

/**
  Fonction d'aide permettant de vérifier et redirigé un attribut vers son setter correspondant.
  Elle empéche également un attribute de boucler si le setter définis l'attribut.
**/
Aria.attributeChange =
  function attributeChange(attributes,event){
    /**
      On essaye de récupérer l'objet stocker dans attributes, correspondant
      à l'attribut modifié.
    **/
    const _setter = attributes[event.attributeName];
    if(
      /**
        Si l'on ne gére pas l'attribut, ...
      **/
      !_setter ||
      
      /**
        ...ou si l'ancien attribut correspond au nouvel attribut.
        (utile pour éviter que le setter boucle)
      **/
      event.oldValue === event.newValue
      
    ){
      /**
        On ne fait rien.
      **/
      return;
    }

    /**
      Si l'attribut doit correspondre à un type précis
      et l'attribut spécifié ne peut pas être convertis...
    **/
    if(_setter.type && !_setter.type(event.newValue)){
      /**
        ...on envoie l'ancienne valeur à la fonction gérant la valeur.
      **/
      console.log(event.oldValue, event.newValue)
      _setter.setter.call(this, event.oldValue);

      /**
        On affiche un message pour faciliter le déboggage.
      **/
      console.warn(`La valeur ${event.newValue} définis sur l'attribut ${event.attributeName} n'est pas de type ${_setter.type.name}`);

      return;
    }
    
    /**
      Sinon, on envoie la nouvelle valeur à la fonction gérant la valeur.
    **/
    _setter.setter.call(this, event.newValue);
  };

const customElements = new Map();

Aria.define = function define(tag, constructor){
  if(customElements.has(tag)){
    throw new Error(`Le CustomElement avec le tag ${tag} existe déjà !`)
  }
  customElements.set(tag, constructor);

  document.querySelectorAll(tag).forEach(constructor);
}

const _createElement = document.createElement;

document.createElement = function createElement(tag){
  if(customElements[tag]){
    return customElements[tag]();
  }

  return _createElement.call(document, tag);
}