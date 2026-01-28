import lineaire from "./lineaire.js";
import quadratique from "./quadratique.js";

/**
  Résout une équation de type:
    a * x^3 + b * x^2 + c * x + d === 0
**/

function cubique(coefficients){
  /**
    On mimique les constantes mathématiques.
  **/
  const a = coefficients[0];
  const b = coefficients[1];
  const c = coefficients[2];
  const d = coefficients[3];

  /**
    Si c et d sont égales à 0, ...
  **/

  if(c === 0 && d === 0){
    
    /**
      ... on se retrouve sous une forme:
        ---> a * x^3 + b * x^2 === 0
        ---> x^2 * (a * x + b) === 0
    **/ 

    return [0]
      .concat(lineaire(coefficients));
  }
  
  /**
    Si b et d sont égales à 0, ...
  **/

  if(b === 0 && d === 0){
    
    /**
      ... on se retrouve sous une forme:
        ---> a * x^3 + c * x   === 0
        ---> x * (a * x^2 + c) === 0
    **/

    return [0]
      .concat(quadratique([a,0,c]));
  }

  /**
    Si b et c sont égales à 0, ...
  **/

  if(b === 0 && c === 0){
    
    /**
      ... on se retrouve sous une forme:
        ---> a * x^3 + d   === 0
        ---> a * x^3       === -d
        ---> x^3           === -d / a
        ---> x             === cbrt(-d / a)
    **/
    return [Math.cbrt(-d / a)];
  }

  /**
    Si b est égale à 0, ...
  **/

  if(b === 0){
    
    /**
      ... on se retrouve sous une forme:
        ---> a * x^3 + c * x + d   === 0
    **/
    
    return cubiqueDeprime([c/a,d/a]);
  }

  /**
    Si d est égale à 0, ...
  **/

  if(d === 0){
    /**
      ... on se retrouve sous une forme:
        ---> a * x^3 + b * x^2 + c * x   === 0
        ---> x * ( a * x^2 + b * x + c ) === 0
    **/
    return [0]
      .concat(quadratique(coefficients));
  }

  /** 
    Si la cubique ne peut pas être simplifié,
    on calcule les coefficients du polynome cubique déprimé
    correspondant.

    On a p et q correspondant au valeur calculé ci-dessous.
    On a  t === x + b / (3 * a)
  **/
  
  const p = (3*a*c - (b**2))/(3*(a**2));
  const q = (2*(b**3) - 9*a*b*c + 27 * (a**2) *d)/(27*(a**3)); 
  
    /**
      On calcule les racines de la cubique déprimé
    **/
  
    return cubiqueDeprime([p,q])

    /**
      On a les racines pour t.
      On a x === t - b/ (3 * a).
      On retransforme donc les valeurs de t en x.
    **/
    .map(t => t - b / (3 * a));
    ;
}

/**
  Résout une équation de type:
    a * t^3 + p * x + q === 0
**/
function cubiqueDeprime(coefficients){
  
  /**
    On mimique les constantes mathématiques.
  **/
  
  const p = coefficients[0];
  const q = coefficients[1];

  /**
    Si p et q sont égales à 0, ...
  **/
  
  if(p === 0 && q === 0){
    /**
      ... on se retrouve sous une forme:
        ---> t^3   === 0
        ---> t     === cbrt(0)
        ---> t     === 0
    **/ 
    
    return [0];
  }
  
  /**
    Si p est égale à 0, ...
  **/
  
  if(p === 0){
        console.log("p===0")

     /**
      ... on se retrouve sous une forme:
        ---> t^3 + q === 0
        ---> t^3     === -q
        ---> t       === cbrt(-q)
    **/
    
    return [Math.cbrt(-q)];
  }

  /**
    Si q est égale à 0, ...
  **/
  
  if(q === 0){
    /**
      ... on se retrouve sous une forme:
        ---> t^3 + p * t   === 0
        ---> t * (t^2 + p) === 0
    **/

    return [0]
      .concat(quadratique([1,0,p]));
  }
  
  /** 
    Si la cubique ne peut pas être simplifié,
    on calcule le discriminant.
  **/

  const discriminant = (4 * p**3 + 27 * q**2);

  /**
    Si celui-ci est supérieur à 0, ...
  **/
  
  if(discriminant  <  0){
    /**
      On a 3 racines réels.
    **/
    
    /**
      Mixin qui calcule la racine selon un k donné.
    **/
    
    function racine(k){
      const c = (3*q)/(2*p) * Math.sqrt(-3/p);
      const b = 1/3 * Math.acos(c) - (2*Math.PI * k)/3;
      
      return 2 * Math.sqrt(-p/3)*Math.cos(b);
    }

    /**
      Les racines correspondant au calcul de la mixin pour
      des valeurs de k égale à 0, 1 et 2.
    **/
  
    return [racine(0), racine(1), racine(2)];
  }

  /**
    Si le discriminant est égal à 0, ...
  **/
  
  if(discriminant === 0){
    /**
      La cubique déprimée admet 1 racine unique
      et 2 racines identiques:
      
        3 * q / p        équivaut à la racine unique.
        -3 * q / (2 * p) équivaut aux 2 racines identiques
    **/
    return [3*q/p,-3*q/(2*p)];
  }

  /**
    Si le discriminant est supérieur à 0, ...
  **/
  
  if(discriminant  >  0) {
    /**
      ... on a une racine réel.
      Selon le signe de p, le calcul différe.
    **/

    /**
      Si p est négatif:
    **/
    if(p<0){
      return [
        -2* Math.sign(q) * Math.sqrt(-p/3) * 
        Math.cosh(
          1/3 * Math.acosh(
            (-3*Math.abs(q))/(2*p) * Math.sqrt(-3/p)
          )
        ) 
      ];
    }

    /**
      Si p est positif:
    **/
    if(p>0){

      return [
        -2*Math.sqrt(p/3) * Math.sinh(
          1/3 * Math.asinh(
            (3*q)/(2*p) * Math.sqrt(3/p)
          )
        )
      ];
    }
  }
}

export default cubique;

const r = 1000;
function arrondis(number){
  return Math.round(number*r)/r
}