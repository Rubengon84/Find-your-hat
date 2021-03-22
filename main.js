const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


class Field {  // Construying the Field class

  constructor (field) {
    this._field = field;
    this._vertical = 0;    
    this._horizontal = 0;
    this._winner = 0;     // A variable checking when is wining

  }

  get field() {
    return this._field;
  }

  set field(value) {
    this._field = value;
  }

  get vertical() {
    return this._vertical;
  }

  set vertical(value) {
    this._vertical = value;
  }

  get horizontal() {
    return this._horizontal;
  }

  set horizontal(value) {
    this._horizontal = value;
  }
  
  get winner() {
    return this._winner;
  }

  set winner(value) {
    this._winner = value;
  }

  printField() {
      this.field.forEach(array => {
      console.log(array.join(''))});
  }

  evaluatePosition(ver,hor) {  // Method to evaluate the  actual position 
   try { 
   let position = this.field[ver][hor];
   if (position === hole || hor < 0 || ver < 0 || hor > this.field[this.vertical].length - 1 ||
                    ver > this.field.length ) {
     this.winner = 1;
     return -1;
   } else if (position === hat) {
     this.winner = 1;
     return 1;
   } else if (position === pathCharacter){   // If return in the same way
     return -2;
   }else{
     return 0;
   }
  }catch(e) {
    console.log('You lose! out of the Field');  // Try catch the error when is out of the field vertically
  }
  }

  moveHorizontal(value) {  // Method for moving left and right

   let lastHorizontal = this.horizontal;
   if ( value === 'r') {
    this.horizontal = this.horizontal + 1;
   } else if (value === 'l'){
   this.horizontal = this.horizontal - 1;
   }
   if (this.evaluatePosition(this.vertical, this.horizontal) === 1){
      console.log('You found the hat! You won!');
     }else if (this.evaluatePosition(this.vertical, this.horizontal) === -1) {
      console.log('You Lose! You are out of the field or in a hole!');
     }else if (this.evaluatePosition(this.vertical, this.horizontal) === -2) {  // If return in the same way change the pathCharacter for a fieldCharacter
      this.field[this.vertical][lastHorizontal] = fieldCharacter;
     } else {
      this.field[this.vertical][this.horizontal] = pathCharacter;
     } 
  }

  moveVertical(value) {  // Method for moving down or up

    let lastVertical = this.vertical;
    if ( value === 'd') {
      this.vertical = this.vertical + 1;
     } else if (value === 'u'){
      this.vertical = this.vertical - 1;
     }
    if (this.evaluatePosition(this.vertical, this.horizontal) === 1){
      console.log('You found the hat! You won!');
     }else if (this.evaluatePosition(this.vertical, this.horizontal) === -1) {
      console.log('You Lose! You are out of the field or in a hole!');
     }else if (this.evaluatePosition(this.vertical, this.horizontal) === -2) {  // If return in the same way change the pathCharacter for a fieldCharacter
      this.field[lastVertical][this.horizontal] = fieldCharacter;
     } else {
      this.field[this.vertical][this.horizontal] = pathCharacter;
     } 
  }

  static generateField(height,width,porcentage) {  // Method to create a random field
    
    let fieldNew = [];

    for(let e=0; e<height; e++){
      let rowArry = [];
      for (let i=0; i<width; i++) {
        let randomNum = Math.random();
        let porcent = porcentage / 100;
        let character = '';
       if (randomNum < porcent) {  // Make the porcentage of  holes in every array.
        character = 'O';
       }else{ 
        character = '░';
       }
      rowArry.push(character);
      }
    fieldNew.push(rowArry);
  }
 fieldNew[0][0] = '*';

 let heightRandom = 0;
 let widthRandom = 0;
 while (heightRandom === 0 && widthRandom === 0) { // Avoid the hat to be in position [0][0]
 heightRandom = Math.floor(Math.random() * height);
 widthRandom =  Math.floor(Math.random() * width);
  }
 fieldNew[heightRandom][widthRandom] = '^';

  return fieldNew;
}
};


function playGame() { // Function to play the game

  console.log("The target of this game is to find the hat '^' , you can move around the field" + 
  " using the keys 'r'(right) 'l'(left) 'd'(down) or 'u(up). You will loose if you step in a hole 'O'" +
  " or step out of the field.");
  console.log("Choose a number between 0 and 100 for the porcentage of holes in the field.");

  const difficulty = prompt('More than 40% is almost impossible!   ');

  const myField = new Field(Field.generateField(6,6,difficulty));

  console.log("The target of this game is to find the hat '^' , you can move around the field" + 
                    " using the keys 'r'(right) 'l'(left) or 'd'(down). You will loose if you step in a hole 'O'" +
                    " or step out of the field.");
  while (myField.winner === 0) {  // The winning loop
    myField.printField();
    const move = prompt('Where you would like to move? (press a key r, l, d or u)');
    
    if(move === 'r' || move === 'l') {
      myField.moveHorizontal(move);
    }else if ( move === 'd' || move === 'u') {
    myField.moveVertical(move);  
    }else {
      console.log('You Introduced the wrong key');
    }
  }
};

playGame();
