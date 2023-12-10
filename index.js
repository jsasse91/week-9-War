// Coding Steps:
// For the final project you will be creating an automated version of the classic card game WAR! There are many versions of the game WAR. In this version there are only 2 players.
// You do not need to do anything special when there is a tie in a round.
// Think about how you would build this project and write your plan down. Consider classes such as: Card, Deck, Player, as well as what properties and methods they may include.
// You do not need to accept any user input, when you run your code, the entire game should play out instantly without any user input inside of your browser's console.
// The completed project should, when executed, do the following:
// Deal 26 Cards to each Player from a Deck of 52 cards.
// Iterate through the turns where each Player plays a Card.
// The Player who played the higher card is awarded a point.
// Ties result in zero points for both Players.
// After all cards have been played, display the score and declare the winner.
// The following is extra credit (10pts)
// Write a Unit Test using Mocha and Chai for at least one of the functions you write.

class Card {
  /**
   * Building the class that defines a card, builds an object with 3 properties: cardValue, cardName, and suit
   * @param {Int} cardValue the integer values that represent the point worth of each card.
   * @param {*} cardName the string values that represent the face of each card.
   * @param {*} suit the string values that represent the suits of each card.
   */
  constructor(cardValue, cardName, suit) {
    this.cardValue = cardValue;
    this.cardName = cardName;
    this.suit = suit;
  }
}

class Deck {
  /**
   * Building the call that defines a Deck, a deck is comprised of 52 cards and built at the start of each game
   */
  constructor() {
    this.deck = []; //creating the deck as an empty array, values will be pushed later
    this.suit = ["Hearts", "Spades", "Diamonds", "Clubs"]; //defining the suit, used to build the card object
    this.cardName = [
      //defining the reader friendly version of the card values, used to build the card object
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];
    this.cardValue = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]; //defining the value of each card, used to build the card object
  }
  //defining the createDeck method, this method will build a fresh deck using a for loop within a for loop
  createDeck() {
    //show alert to show something funny to indicate a new deck is being used, after a brief delay
    setTimeout(
      alert("The dealer is unwrapping the celophane off a new deck."),
      3000
    );
    //first for loop, loops through the suits
    for (let s = 0; s < this.suit.length; s++) {
      //second for loop, loops through the suits
      for (let c = 0; c < this.cardValue.length; c++) {
        //after each loop, the new object is pushed to the deck array
        this.deck.push(
          new Card(this.cardValue[c], this.cardName[c], this.suit[s])
        );
      }
    }
    return this.deck;
  }
  //defining the shuffleDeck method, this method will simulate the shuffling of the deck using a for loop and random number generator
  shuffleDeck() {
    //show alert to indicate that the deck is being shuffled, after a brief delay
    setTimeout(alert("The dealer is shuffling the deck."), 3000);
    let shuffledDeck = []; //creating a new empty array to push the shuffled cards to
    //this for loop, loops 52 times, each time it loops it grabs a random card from the deck and pushes it to the new array
    for (let s = 0; s < 52; s++) {
      //defining the randomIndex, which is rerun during each loop to determine which card in the array to move out of the array and into the new array
      let randomIndex = Math.floor(Math.random() * (this.deck.length - 1));
      //defining a tempCard as a place holder for which ever card is being moved, using the splice function
      let tempCard = this.deck.splice(randomIndex, 1);
      //taking that temp card that has been spliced from the array and pushing to the new array
      shuffledDeck.push(...tempCard);
    }
    return shuffledDeck;
  }
  //defining the dealCards method which takes in two parameters, a players array and the cards each player will use
  dealCards(players, cards) {
    //show alert indicating that the cards are being dealt, after a brief delay
    setTimeout(alert("The dealer is dealing the cards."), 3000);
    //defining a variable to hold player ones hand, using the splice function to pull 26 cards from the deck
    let playerOneHand = cards.splice(0, 26);
    //using push to place the spliced cards into player ones cards array
    players[0].cards.push(...playerOneHand);
    //defining a variable to hold player twos hand, using the splice function to pull 26 cards from the deck
    let playerTwoHand = cards.splice(0, 26);
    //using push to place the spliced cards into player twos cards array
    players[1].cards.push(...playerTwoHand);
  }
}

class Player {
  /**
   * Building a Player which is an object that has 3 properties: Name, Cards, and Points
   * @param {String} name the string value that represents a name of a player
   */
  constructor(name) {
    this.name = name; //the name is passed in when called
    this.cards = []; //defining an empty cards array to hold the cards pushed to the Player
    this.points = 0; //setting the players default points to 0
  }
}

class Game {
  /**
   * Building a class of game which holds most of the actual game logic
   */
  constructor() {
    this.players = []; //defining an empty array to hold the players, this version it is passed in code but could be modified easily to use prompts
  }
  //Defining the startGame method which creates the players, creates and shuffles the deck, deals the cards, starts, and stops the game
  startGame() {
    this.players.push(new Player("Iron Man")); //I'm original I promise
    this.players.push(new Player("Captain America")); //Still super original

    let gameDeck = new Deck(); //creating a variable to hold the new deck
    gameDeck.createDeck(); //creating the new deck

    let shuffledGameDeck = gameDeck.shuffleDeck(); //shuffling the cards in the new deck

    gameDeck.dealCards(this.players, shuffledGameDeck); //dealing the cards to the new players

    this.declareWar(); //invoking the declareWar method created below

    this.declareWinner(); //invoking the declareWinner method created below
  }
  //defining the declareWar method, this method is the meat and potatoes of the game logic
  declareWar() {
    let playerOne = this.players[0]; //setting player one to the first object in the players array
    let playerTwo = this.players[1]; //setting player two to the second object in the players array
    //show alert to indicate that player one has declared war on player two, after brief delay
    setTimeout(
      alert(`${playerOne.name} has declared war on ${playerTwo.name}`),
      3000
    );
    let battle = 0; //setting the turn ('Battle') counter to 0
    let battleWinner = ""; //setting the winner of the turn to an empty string
    //creating a loop that will continue as long as both players have cards
    while (playerOne.cards.length !== 0 && playerTwo.cards.length !== 0) {
      let playerOneCard = playerOne.cards.pop(); //using pop to pull the last card in the cards array
      let playerTwoCard = playerTwo.cards.pop(); //using pop to pull the last card in the cards array
      let turn = (battle += 1); //incrementing the turn/battle count by one
      //determing the turn winner based on cardValue, whomever has the highest card wins
      if (playerOneCard.cardValue > playerTwoCard.cardValue) {
        battleWinner = playerOne.name; //if Player One is higher, declare them the winner and update the string
        playerOne.points += 1; //if Player one is higher, increment their point counter by 1
        //log the results of each battle to the console, using a template literal
        console.log(`Battle: ${turn}
        ${playerOne.name}'s card: ${playerOneCard.cardName} of ${playerOneCard.suit}
        ${playerTwo.name}'s card: ${playerTwoCard.cardName} of ${playerTwoCard.suit}
        ${playerOne.name} has won the Battle!`);
      } else if (playerTwoCard.cardValue > playerOneCard.cardValue) {
        battleWinner = playerTwo.name; //if Player Two is higher, declare them the winner and update the string
        playerTwo.points += 1; //if Player one is higher, increment their point counter by 1
        //log the results of each battle to the console, using a template literal
        console.log(`Battle: ${turn}
        ${playerOne.name}'s card: ${playerOneCard.cardName} of ${playerOneCard.suit}
        ${playerTwo.name}'s card: ${playerTwoCard.cardName} of ${playerTwoCard.suit}
        ${playerTwo.name} has won the Battle!`);
      } else {
        //if it's a tie, log to the console using a template literal
        console.log(`Battle: ${turn}
        ${playerOne.name}'s card: ${playerOneCard.cardName} of ${playerOneCard.suit}
        ${playerTwo.name}'s card: ${playerTwoCard.cardName} of ${playerTwoCard.suit}
        No one has won the Battle!`);
      }
    }
  }
  //defining the declareWinner method, this method determines the points of each player declaring a winner or a tie
  declareWinner() {
    let winner = ""; //create a place holder for the game winner as an empty string
    let playerOne = this.players[0]; //setting player one to the first object in the players array
    let playerTwo = this.players[1]; //setting player two to the second object in the players array
    let winningPoints = 0; //setting the winning points to 0 to be updated later

    if (playerOne.points > playerTwo.points) {
      winner = playerOne.name; //if Player One has more points than Player Two, update winner to their name
      winningPoints = playerOne.points; //if Player One has more points than Player Two, update points to their points
      //show alert to indicate that the game is over declaring the winner and a points summary, after brief delay
      setTimeout(
        alert(`      Cease fire has been declared! 
      ${playerOne.name} has won the War!

      Final Scores: 
      ---------------------------------------
      ${playerOne.name} - ${playerOne.points}
      ${playerTwo.name} - ${playerTwo.points}
      To the victor goes the spoils!`),
        3000
      );
    } else if (playerTwo.points > playerOne.points) {
      winner = playerTwo.name; //if Player Two has more points than Player One, update winner to their name
      winningPoints = playerTwo.points; //if Player Two has more points than Player One, update points to their points
      //show alert to indicate that the game is over declaring the winner and a points summary, after brief delay
      setTimeout(
        alert(`      Cease fire has been declared! 
      ${playerTwo.name} has won the War!

      Final Scores: 
      ---------------------------------------
      ${playerTwo.name} - ${playerTwo.points}
      ${playerOne.name} - ${playerOne.points}
      To the victor goes the spoils!`),
        3000
      );
    } else {
      //show alert to indicate that the game is over declaring a tie and a points summary, after brief delay
      setTimeout(
        alert(`      Cease fire has been declared! 
      No one has won the game.

      Final Scores:
      ---------------------------------------
      ${playerTwo.name} - ${playerTwo.points}
      ${playerOne.name} - ${playerOne.points}
      `),
        3000
      );
    }
  }
}

let thisIsWar = new Game(); //creating a variable to create a new game
thisIsWar.startGame(); //invoking the startGame method to start it up
