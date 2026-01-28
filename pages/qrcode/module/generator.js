
function QRCodeGenerator(){
  const text_encoder = new TextEncoder();
  
  this.encode = function encode(string){
    const codewords = text_encoder.encode(string);
  } 
}
