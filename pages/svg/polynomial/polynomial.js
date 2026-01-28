import lineaire from "./lineaire.js";
import quadratique from "./quadratique.js";
import cubique from "./cubique.js";

const routeur = {
  2:lineaire,
  3:quadratique,
  4:cubique,
}

function Polynomial(_coefficients){
  /**
    On copie les valeurs pour éviter de créer des effets de bord.
  **/
  const coefficients = Array.from(_coefficients);

  coefficients.forEach((coefficient,index)=>{
    this[String.fromCharCode(0x0061 + index)] = coefficient;
  });
  /**
    On se débarasse des degrets supérieurs si ceux-ci sont égaux à 0.
  **/
  while(coefficients[0] === 0) coefficients.shift();

  /**
    On stocke les coefficients dans une propriété.
  **/
  this.coefficients = coefficients;
  
}

/**
  Résoud un polynome de type: 
    an * x^n + a(n-1) * x^(n-1) + ... + a0 === 0 
**/
Polynomial.prototype.racines = function(){
  
  /**
    On récupére la longueur du tableau.
    Elle représente le nombre de coefficients.
    Le degré de l'équation vaut "longueur" - 1.
  **/
  const coefficients = this.coefficients;
  const longueur = coefficients.length;

  /**
    Si tous les coefficients sont égales à 0, on a une infinité de possibilité.
    exemple: x^2 * 0 + x * 0 + 0 = 0
  **/
  if(!longueur){
    return [Infinity];
  }

  /**
    Si on a une droite paralléle à l'axe x ...
  **/
  if(longueur === 1){
    /**
      ...si celle-ci est actuellement l'axe x...
    **/
    if(coefficients[0] === 0){
      /**
        On a une infinité de possibilité...
      **/
      return [Infinity]
    }
    /**
      ... sinon, ...
    **/
    else {
      /**
        On a aucune possibilité.
      **/
      return [NaN];
    }
  }

  /**
    On vérifie que le degré ne dépasse pas l'équation cubique.
  **/
  if(longueur <= 4){
    
    /**
      On redirige les coefficients vers la fonction les résolvant.
      (linéaire, quadratique ...)
    **/
    
    return routeur[longueur](coefficients)
      
    /**
      On assainis les valeurs.
    **/
    .map(v => sanitize(v));
  }
    
  /**
    Sinon, on retourne une erreur.
  **/
  else {
    throw new Error("L'équation dépasse le degré 3. Impossible de la résoudre.");
  }
}

Polynomial.prototype.resout = function resout(x){
  const length = this.coefficients.length - 1;
  let resultat = 0;

  for(let n=0; n <= length; n++){
    const degre = length - n;
    resultat += this.coefficients[n] * x**degre;
  }

  return resultat;
}

Polynomial.prototype.derivative = function derivative(){
  if(this.coefficients.length > 1){
    const coefficients_derivative = [];
    const length = this.coefficients.length - 1;
    for(let n = 0; n < length; n++){
      const degre = length - n;
      coefficients_derivative.push(degre * this.coefficients[n]);
    }
  
    return new Polynomial(coefficients_derivative);
  }
}

/**
  Fonction évitant les arrondis bizarres de l'IEEE 754.
  Attention: à utilisé uniquement à la fin des calculs.
**/

function sanitize(number){
  return parseFloat(number.toPrecision(12));
}

window.Math.polynomial = function polynomial(coefficients){
  return new Polynomial(coefficients);
};