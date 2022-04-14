//Variable declaration
let flipCard = document.querySelector('#flip');
let messagePlayer1 = document.querySelector('#messagePl1');
let messagePlayer2 = document.querySelector('#messagePl2');
let messageWinner = document.querySelector('#messageWin');
let winnerGame = document.querySelector('#announceWinner');
let play1 = document.querySelector('#player1');
let play2 = document.querySelector('#player2');
let showButton = document.querySelector('#newGame');
showButton.style.display = 'none'; //Initially hide the new game button
//Card values
let cardVals = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'K', 'Q', 'A'];
let cardSuits = ['♣', '♥', '♠', '◆'];
let cardDeck = [];
let currentCard, player1Deck, player2Deck, player1Wins, player2Wins, warStack;

  /*To start game
  1. Create the deck of cards from the values and suits
  At start war will be set to 0.
  Nested for loops for card values as well as card suits
  */
  function createCardDeck() {
    cardVals.forEach(function (val) {
        cardSuits.forEach(function (suit) {
            //created an object of card values and suits and push that object in the array
            let card = {
              val: val,
              suit: suit
            };
            cardDeck.push(card);
        });
    });
}
/*
Randomly shuffle the deck of 52 cards....
(Referred to this link for logic)https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976)
@param  {array}     the array to shuffle
* @return {String}  The first item in the shuffled array
*/
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
//function to update on UI
function updateWinner(player,wins){//player is the element on UI side and wins is their number of wins
  player.textContent = wins;
}
/*
To start the game
*/
function startGame(){
    //At start of game everything set to 0
    currentCard = 0;
    player1Wins = 0;
    player2Wins = 0;
    warStack = 0;
    messagePlayer1.textContent = '';
    messagePlayer2.textContent = '';
    //start game by shuffling the deck of cards
    shuffle(cardDeck);
    //Now want to divide cards into 2 parts(each 26) for player1 and 2 by slicing array(slice())
    player1Deck = cardDeck.slice(0, cardDeck.length / 2);//To start from 0th index
    player2Deck = cardDeck.slice(cardDeck.length / 2);
    updateWinner(play1, 0);
    updateWinner(play2, 0);
}
/**Next handle flipping of cards
 */
function flipCards(){
  //When each player flips card 
  //Get values of current card each player is holding
  let p1CurrentCard = player1Deck[currentCard];
	let p2CurrentCard = player2Deck[currentCard];
  //check winner for the round
  let winner = getWinner(p1CurrentCard, p2CurrentCard);
  //Now show value of each cards on html
  messagePlayer1.textContent = `Flips a ${p1CurrentCard.val + p1CurrentCard.suit}.`;
  messagePlayer2.textContent = `Flips a ${p2CurrentCard.val + p2CurrentCard.suit}.`;
  messageWinner.textContent =  `${winner}`;
  //Increment current card
  currentCard++;

  if(winner === 'WAR'){
    flipCard.textContent = 'PREPARE FOR WAR';
  } else {
    flipCard.textContent = 'FLIP CARD';
  }
  //Check if someone wins the entire game
  winnerOftheGame();
}
/*
Function for new game to reset values
*/
function newGame(){
  winnerGame.textContent = ''
  flipCard.disabled = false; //enable Flip card button
  showButton.style.display = 'none';
  messageWinner.textContent =  '';
  startGame();
}
/*
Implement winning logic
*/
function getWinner(p1Card,p2Card){
//Get indexes of each player’s card
  let player1Index = cardVals.indexOf(p1Card.val);
	let player2Index = cardVals.indexOf(p2Card.val);
  warStack = 0;
  //higher index player wins(indexOf)
  if(player1Index > player2Index) {
    player1Wins += warStack + 1;
    warStack++;
    updateWinner(play1, player1Wins);
    return 'Player 1 wins this round';
  }
  else if(player2Index > player1Index){
    player2Wins += warStack + 1;
    warStack++;
    updateWinner(play2, player2Wins);
    return 'Player 2 wins this round';
  }
  else{
    return 'WAR';
  }
}
/*
Funtion to check winner of the entire game
*/
function winnerOftheGame(){
//check if there are cards remaining
  if (currentCard < 26) {
    return;
  }
  //check winner
  if(player1Wins > player2Wins){
    winnerGame.textContent = 'PLAYER 1 wins this game'
  }
  else if(player2Wins > player1Wins){
    winnerGame.textContent = 'PLAYER 2 wins this game'
  }
  else if(player2Wins === player1Wins){
    winnerGame.textContent = 'ITS A TIE.....'
  }
  flipCard.disabled = true; //disables flip card button
  showButton.style.display = ' inline-block'; //show the new game button
}

/*
Call all inits and event listeners
*/
createCardDeck();
startGame();
flipCard.addEventListener('click',flipCards);
showButton.addEventListener('click',newGame);