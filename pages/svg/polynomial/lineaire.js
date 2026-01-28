/**
  Résoud une équation de type:
    a * x + b === 0
**/

function lineaire(coefficients){
  /**
    On mimique les constantes mathématiques.
  **/
  const a = coefficients[0];
  const b = coefficients[1];

  /**
    Si b est égale à 0, ...
  **/
  if(b===0){
    /**
      On retourne 0.
           x * a = 0
      ---> x = 0/a 
      ---> x = 0
    **/
    return [0];
  }

  /**
    Sinon, on retourne le cas général.
  **/
  return [-b / a];
}

export default lineaire;