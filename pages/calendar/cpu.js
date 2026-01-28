HTMLElement.prototype.clique = function clique(action){
  const contexte = this;
  
  /*
    lancement est une fonction qui attache l'action spécifié,
    lorsque l'utilisateur a commencé à cliquer ou taper sur l'élément.
  */
  function lancement(evenement){
    /**
      On invoque l'action uniquement si l'utilisateur relache la pression
      sur le bouton.
    **/
    contexte.addEventListener("pointerup", action);
    
    /**
      On nettoie les différent événement accroché lors du lancement.
      
      L'événement window est tous le temps déclenché quand l'utilisateur relache la pression.
      
      C'est donc un moyen d'être sur que l'événement sera toujours nettoyé,
      même si l'utilisateur ne relache pas la pression sur le bouton.
    **/
    window.addEventListener("pointerup"  , nettoyage);
  }

  /*
    Cette fonction retire les événement accrochés au lancement.
  */
  function nettoyage(){
    contexte.removeEventListener("pointerup"  , action);
    window  .removeEventListener("pointerup"  , nettoyage);
  }

  /**
    Lorsque l'utilisateur applique une pression sur le bouton,
    on attache les événements gérant la relache.
  **/
  contexte.addEventListener("pointerdown", lancement);
}

function isBissextile(year){
  if(!(year % 100)){
    return !(year % 400);
  }

  return !(year % 4);
}

const lookup_month = {
  0:31,
  2:31,
  3:30,
  4:31,
  5:30,
  6:31,
  7:31,
  8:30,
  9:31,
  10:30,
  11:31,
}

const a = new EventTarget();
const b = {};
a.addEventListener("a",b)

a.dispatchEvent(new Event(a));


function getNumberOfDayInMonth(year, month){
  if(month === 1){
    return isBissextile(year) ? 29 : 28;
  }

  return lookup_month[month];
}

const cal = document.querySelector("calendrier");

function estUneFonction(fonction){
  return typeof fonction === "";
}

function Abonnement(){
  const souscriptions = {};
  
  this.souscrire = function souscrire(nom, action){
    if(action instanceof Object && !action.gereSouscription){
      throw new Error("Les souscriptions avec objet doivent avoir une méthode gereSouscription.");
    }

    if(!(action instanceof Function) || action !== null){
      throw new Error(typeof action + " n'est pas supporté comme action.")
    }
    
    let textifier = new String(nom);
    
    if(!souscriptions[textifier]){
      souscriptions[textifier] = [];
    }

    souscriptions[textifier].push(action);
  }

  this.revoque = function revoque(nom, action){
    if(action instanceof Object && !action.gereSouscription){
      throw new Error("Les souscriptions avec objet doivent avoir une méthode gereSouscription.");
    }

    if(!(action instanceof Function) || action !== null){
      throw new Error(typeof action + " n'est pas supporté comme action.")
    }
    
    if(!souscriptions[nom]){
      return;
    }
    
    let textifier = new String(nom);

    souscriptions[textifier].splice(souscriptions[textifier].indexOf(action), 1);
  }

  return function delivre(nom, valeur){
    if(!souscriptions[nom]){
      return;
    }

    souscriptions[nom].forEach(function(action){
      action(valeur);
    });
  }
}

let date_global;
function Calendrier(composant){
  const date = new Date()
  this.mois  = date.getMonth();
  this.annee = date.getFullYear();
  
  this.scheduler = {};
  
  this.racine = composant;
  
  this.racine.addEventListener("update",function(e){
    date_global = e.date;
  });

  const composants = this.racine.querySelectorAll("jour");

  composants.forEach(function(composant){
    composant.parentNode.clique(function(){

      const r = document.querySelector("calendrier").querySelector(".clique");

      if(r){
        r.classList.remove("clique")
      }
      
      const event = new Event("update",{bubbles:true});
      event.date = composant.date;

      this.classList.add("clique");
      this.dispatchEvent(event);
    });
  })
}

Calendrier.prototype.hydrate = function hydrate(){
  const composants = this.racine.querySelectorAll("jour");

  composants.forEach(function clean(element){
    element.classList.remove("dernier");
    element.classList.remove("prochain");
  });
  
  const premier_jour = new Date(this.annee, this.mois).getDay();
  const nombres_de_jour_du_mois = getNumberOfDayInMonth(this.annee, this.mois);
  /**
    On décremente et corrige l'année du mois dernier, si on est en Janvier.
  **/
  let mois_dernier       = (this.mois - 1) < 0      ? 11       : this.mois - 1;
  let annee_mois_dernier = mois_dernier === 11 ? this.annee - 1: this.annee;

  // On récupére le nombre de jours du mois dernier.
  const nombres_de_jour_du_dernier_mois = getNumberOfDayInMonth(annee_mois_dernier, mois_dernier);
  
  // On définit d'abord les jours du mois dernier, si necessaire.
  for(let iteration = 0; iteration < premier_jour; iteration++){
    const composant = composants.item(iteration);
    const jour = nombres_de_jour_du_dernier_mois - (premier_jour - 1 - iteration);

    composant.date = {annee:annee_mois_dernier, mois:mois_dernier, jour};
    
    composant.textContent = jour;
    composant.classList.add("dernier");
  }

  for(let iteration = premier_jour; iteration < (premier_jour + nombres_de_jour_du_mois); iteration++){
    const composant = composants.item(iteration);
    const jour = iteration - premier_jour + 1;
    composant.date = {annee:this.annee, mois:this.mois, jour};

    composant.textContent = jour;
  }

  for(let iteration = (premier_jour + nombres_de_jour_du_mois); iteration < 42; iteration++){
    const composant = composants.item(iteration);
    const jour = iteration - (premier_jour + nombres_de_jour_du_mois) + 1;
    const mois = (this.mois + 1) === 12 ? 0 : this.mois + 1;
    const annee = mois ? this.annee : this.annee + 1;
    composant.date = {annee:annee, mois:mois, jour};
    
    composant.textContent = jour;

    composant.classList.add("prochain");
  }

  const date = new Date(this.annee, this.mois);

  const formatter = new Intl.DateTimeFormat("fr-fr", {
    month: "long",
    year:"numeric"
  });

  const text = formatter.format(date);

  const titre = this.racine.querySelector("titre");

  titre.innerHTML = text.charAt(0).toUpperCase() + text.slice(1);
}





const inst = new Calendrier(cal);

const suivant = document.querySelector("suivant");
const precedent = document.querySelector("precedent");

function click(){
  let mois = (inst.mois + 1) > 11? 0 : inst.mois + 1;
  let annee = mois ? inst.annee : inst.annee + 1;

  inst.mois = mois;
  inst.annee = annee;
  inst.hydrate();

  if(date_global){
    const isMois = mois === date_global.mois;
    const isAnnee = annee === date_global.annee;
    if(!(isMois && isAnnee)){
      const element = document.querySelector(".box.clique");
      if(element){
        element.classList.remove("clique");      
      }
    } else{
      const list = document.querySelectorAll("jour:not(.dernier, .prochain)");
      list.item(date_global.jour - 1).parentNode.classList.add("clique");
    }
  }

}

function click2(){
  let mois = (inst.mois - 1) < 0? 11 : inst.mois - 1;
  let annee = mois === 11 ? inst.annee - 1 : inst.annee;

  inst.mois = mois;
  inst.annee = annee;

  inst.hydrate();

  if(date_global){
    const isMois = mois === date_global.mois;
    const isAnnee = annee === date_global.annee;
    if(!(isMois && isAnnee)){
      const element = document.querySelector(".box.clique");
      if(element){
        element.classList.remove("clique");      
      }
    } else{
      const list = document.querySelectorAll("jour:not(.dernier, .prochain)");
      list.item(date_global.jour - 1).parentNode.classList.add("clique");
    }
  }
}

suivant.clique(click)
precedent.clique(click2)
inst.hydrate();
