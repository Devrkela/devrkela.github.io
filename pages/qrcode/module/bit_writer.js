function BitWriter(size){
  let   bit    = 0;
  const buffer = [0];

  this.move = function(bit_add){
    const new_bit = bit_add + bit;

    if(new_bit < 0){
      throw new Error("La position du bit ne peut pas être inférieur à 0.");
    }

    if(new_bit % 8 === 0){

      buffer.push(0);
    }
    
    bit = new_bit;
  }

  this.setBit = function setBit(value){
    buffer[Math.floor(bit / 8)] += value << (7 - bit % 8);
    this.move(1);
  }

  this.setBits = function setBits(value, size){
    const start = size - 1;
    for(let i = 0; i < size; i++){
      this.setBit((value >> start - i) & 0b1);
    }
  }

  this.toArray = function toArray(){
    return buffer;
  }

  
  this.slice = function slice(start, end){
    return buffer.slice(start, end);
  }
}

export default BitWriter;