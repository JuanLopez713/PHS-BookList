
var textfield;


function setup(){
    noCanvas();
   textfield = createInput();
    
    
 //  textfield.changed(newText); 
    textfield.input(newTyping);
}

function newText() {
   // createP(textfield.value());
    
  //  console.log(textfield.value());
}

function newTyping() {
    createP(textfield.value());
    
  //  console.log(textfield
    .value());
}