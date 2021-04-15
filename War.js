class Card{
    constructor(number, suite, value, image){
        this.number = number;
        this.suite = suite;
        this.value = value;
        this.image = image;
    }
} 

class Player{    
    card;

    constructor(){
        this.score = 0;
    }
}
function createDeck(){
    var suites = ["spades", "diamonds", "hearts", "clubs"];
    var numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
    var counter = 1;
    var cards = [];
    for (var i = 0; i < suites.length; i++){
        for (var j = 0; j < numbers.length; j++){
            if (numbers[j] == "J" || numbers[j] == "Q" || numbers[j] == "K"){
                var value = 10;
            } else if (numbers[j] == "A"){
                var value = 1;
            } else {
                var value = numbers[j];
            }
            var card = new Card(numbers[j], suites[i], value, `img/${counter++}.png`);
            
            cards.push(card);
        }
    }

    return cards;
}

class Dealer{

    constructor() {
        this.cards = createDeck();
        this.score = 0;
    }

    dealCards(player){
        var randomIndex = Math.floor(Math.random() * this.cards.length);

        this.card = this.cards[randomIndex];
        this.cards.splice(randomIndex, 1);     

        randomIndex = Math.floor(Math.random() * this.cards.length);
        player.card = this.cards[randomIndex];
        this.cards.splice(randomIndex, 1);     
    }
}

