function Droite(p1, p2){
  if(p2.x === p1.x){
    this.x = p1.x;
    return;
  }

  if(p2.y === p1.y){
    this.y = p2.y;
    return;
  }
  
  this.a = (p2.y - p1.y) / (p2.x - p1.x);
  this.b = p1.y - this.a * p1.x;
}

Droite.prototype.resout = function resout(x){
  return this.a * x + this.b;
}

Droite.prototype.chercheX = function chercheX(y){
  return (y - this.b) / this.a;
}

Droite.prototype.intersecte = function intersection(droite){
  /**
    Les deux droites sont parallêles à l'axe y. Les droites peuvent être ...
  **/
  if(this.x && droite.x){
    /**
      ... identiques. Il existe donc une infinité de points...
    **/
    if(this.x === droite.x) return Infinity;

    /**
      ... parallêles entre-elle. Il n'existe donc aucun point.
    **/
    return NaN
  }

  /**
    Les deux droites sont parallêles à l'axe x. Les droites peuvent être ...
  **/
  if(this.y && droite.y){
    /**
      ... identiques. Il existe donc une infinité de points...
    **/
    if(this.y === droite.y) return Infinity;

    /**
      ... parallêles entre-elle. Il n'existe donc aucun point.
    **/
    return NaN
  }
  
  /**
    La premiére droite est parallêle à l'axe y et la seconde est parallêle à l'axe x.
  **/
  if(this.x && droite.y){
    return {
      x:this.x,
      y:droite.y,
    }
  }

  /**
    La seconde droite est parallêle à l'axe y et la premiére est parallêle à l'axe x.
  **/
  if(droite.x && this.y){
    return {
      x:droite.x,
      y:this.y
    }
  }

  /**
    La premiére droite est parallêle à l'axe y. On a donc un x constant égale
    à la propriété x. Pour trouver y, on résout x pour la seconde droite.
  **/

  if(this.x){
    return {
      x:this.x,
      y:droite.resout(this.x),
    }
  }

  /**
    La premiére droite est parallêle à l'axexy. On a donc un y constant égale
    à la propriété y. Pour trouver x, on résout y pour la seconde droite.
  **/
  if(this.y){
    return {
      x:droite.chercheX(this.y),
      y:this.y
    }
  }

  /**
    Pareil que les deux conditions du dessus mais pour l'autre droite.
  **/
  if(droite.x){
    return {
      x:droite.x,
      y:this.a * droite.x + this.b
    }
  }

  if(droite.y){
    return {
      x:(droite.y - this.b) / this.a,
      y:droite.y
    }
  }

  /**
    Si les coefficients a sont égaux, on a deux droites parallêles. ...
  **/
  if(this.a === droite.a){
    /**
      Si les coefficients b sont égaux, les droites sont identiques. ...
    **/
    if(this.b === droite.b) return Infinity;

    /**
      ... Sinon, elles sont parallêles.
    **/
    return NaN;
  }

  /**
    Sinon, on cherche x:
      ---> a * x + b = ap * x + bp
      ---> (b - bp) = (ap - a) * x
      ---> (b - bp) / (ap - a) = x
  **/
  const x = (this.b - droite.b) / (droite.a - this.a);

  /**
    On résout x pour l'une des deux droites.
  **/
  const y = this.resout(x);

  return {
    x,
    y
  }
}

window.Geometrie = {
  droite : function droite(p1,p2){
    return new Droite(p1,p2);
  }
};