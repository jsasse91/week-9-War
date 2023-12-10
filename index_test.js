const suit = ["Hearts", "Spades", "Diamonds", "Clubs"];
const cardName = [
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
const cardValue = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
//this test is to test that a card is being created and using the correct values to build the object
describe("Create card", () => {
  it("should create an object with 3 parameters", () => {
    let cardValueTest = cardValue[0];
    let cardNameTest = cardName[0];
    let suitTest = suit[0];
    let cardTest = new Card(cardValueTest, cardNameTest, suitTest);
    console.log(cardTest);
    expect(cardTest).to.deep.equal({
      cardValue: cardValueTest,
      cardName: cardNameTest,
      suit: suitTest,
    });
  });
});
