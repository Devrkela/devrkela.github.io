function Vecteur(origine, arrive){
  this.x = arrive.x - origine.x;
  this.y = arrive.y - origine.y;
  
  this.norme = Math.sqrt(
    (this.x)**2 +
    (this.y)**2
  );

  this.direction = (Math.atan2(this.y,this.x));
}

Vecteur.prototype.produitScalaire = function produitScalaire(vecteur){
  return this.norme * vecteur.norme * Math.cos(this.direction - vecteur.direction);
}