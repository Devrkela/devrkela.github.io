import lineaire from "./lineaire.js";

/**
  Résoud une équation de type:
    a * x^2 + b * x + c === 0
**/

function quadratique(coefficients){
  /**
    On mimique les constantes mathématiques.
  **/
  
  const a = coefficients[0];
  const b = coefficients[1];
  const c = coefficients[2];

  /**
    On simplifie si possible le calcul.
  **/

  /**
    Si b et c sont égales à 0, ...
  **/

  if(b === 0 && c === 0){
     /**
      ... on retourne 0.
      
      ---> x^2 * a = 0
      ---> x^2 = 0/a 
      ---> x = sqrt(0)
      ---> x = 0
      
    **/
    return [0];
  }

  /**
    Si c est égale à 0, ...
  **/
  if(c === 0){
    /**
      On se retrouve sous une forme:
        ---> a * x^2 + b * x   === 0
        ---> x * ( a * x + b ) === 0
    **/

    /**
      0 est donc une racine.
    **/
    
    return [0]

      /**
        Les parenthéses décrivent une équation linéaire.
        On la résouds et on retourne les deux racines.
      **/
      .concat(lineaire(coefficients));
  }

  if(b === 0){
    /**
      On se retrouve sous une forme:
        ---> x^2 * a + c === 0
        ---> x^2         === -c / a 
        ---> x           === sqrt(-c / a)
    **/

    /**
      On calcule la racine positive.
    **/
    const d = -c / a;

    /**
      Si d n'est pas un nombre. Les racines sont complexes.
      On retourne donc NaN.
    **/

    if(Number.isNaN(d)) return [NaN]

    /**
      Sinon, les racines valent sqrt(d) et -sqrt(d)

      d * d === -d * -d === d^2
    **/
    
    return [-d, d];
  }

  /**
    On calcule le cas général si tous les coefficients
    sont différents de 0.
  **/

  /**
    On calcule le discriminant.
  **/
  const discriminant = b**2 - 4*a*c;

  /**
    Si il est positif, ...
  **/
  if(discriminant > 0){
    /**
      ... on a é racines réels. On les calcule,
      puis on les retournes.
    **/
    const A = Math.sqrt(discriminant);
    const B = 2*a;
    return [
      (-b + A)/B,
      (-b - A)/B
    ]
  }
  /**
    Si il est égal à 0, ...
  **/
  if(discriminant === 0){
    /**
      On a une racine réel. On la calcule,
      puis on la retourne.
    **/
    return [-b / 2*a];
  }

  /**
    sinon, il est négatif. ...
  **/
  if(discriminant < 0){
    /**
      On a donc deux racines complexes. On retourne NaN.
    **/
    return [NaN];
  }
}

export default quadratique;