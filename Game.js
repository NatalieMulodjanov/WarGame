onload = function () {
    image = document.createElement("img");
    image1 = document.createElement("img");

    image.id = "player";
    image1.id = "dealer";

    image.src = "img/back.png";
    image1.src = "img/back.png";

    var element = document.getElementById("figurePlayer");
    var element1 = document.getElementById("figureDealer");

    element.appendChild(image);
    element1.appendChild(image1);
}

class Game {
    dealer = new Dealer();
    player = new Player();

    nextRound() {
        if (this.dealer.cards.length == 0) {
            return;
        }
        this.dealer.dealCards(this.player);

        var playerImg = document.getElementById("player");
        var dealerImg = document.getElementById("dealer");

        var playerFig = document.getElementById("figurePlayer");
        var dealerFig = document.getElementById("figureDealer");

        removeCardsHelper(playerFig);
        removeCardsHelper(dealerFig);

        playerImg.src = this.player.card.image;
        dealerImg.src = this.dealer.card.image;

       
        this.checkValue();
       
        document.getElementsByClassName("playerScore")[0].firstChild.textContent = this.player.score;
        document.getElementsByClassName("dealerScore")[0].firstChild.textContent = this.dealer.score;

        if (this.dealer.cards.length == 0) {
            this.determinWinner();
            var button = document.getElementById("nextRoundButton");
            button.disabled = true;
        }
    }

    checkValue() {
        if (this.dealer.card.value > this.player.card.value) {
            this.dealer.score++;
        } else if (this.dealer.card.value < this.player.card.value) {
            this.player.score++;
        } else if (this.dealer.card.value == this.player.card.value && !this.dealer.cards.length == 0) {
            this.tieBreaker();
        }
    }

    tieBreaker() {
        while (this.player.card.value == this.dealer.card.value) {
            for (var i = 0; i < 3; i++) {
                if (this.dealer.cards.length == 0) {
                    this.checkValue();
                    return;
                }
                this.dealer.dealCards(this.player);

                var imageTB = document.createElement("img");
                var imageTB1 = document.createElement("img");

                image.style.width = image1.style.width = "100px";
                image.style.height = image1.style.height = "125px";
                imageTB.style.width = imageTB1.style.width = "100px";
                imageTB.style.height = imageTB1.style.height = "125px";

                imageTB.src = this.player.card.image;
                imageTB1.src = this.dealer.card.image;

                var element = document.getElementById("figurePlayer");
                var element1 = document.getElementById("figureDealer");

                element.appendChild(imageTB);
                element1.appendChild(imageTB1); 
            }
        }
        this.checkValue();
    }

    determinWinner() {
        
        if (this.dealer.score > this.player.score) {
            var winnerDealer = document.getElementById("dealerHeading");
            winnerDealer.textContent = "Dealer has won the hand!"
            winnerDealer.style.color = "white";
            winnerDealer.style.background = "green";
        } else if (this.dealer.score < this.player.score) {
            var winnerPlayer = document.getElementById("playerHeading");
            winnerPlayer.textContent = "Player has won the hand!";
            winnerPlayer.style.color = "white";
            winnerPlayer.style.background = "green";
        } 
    }

}

function removeCardsHelper(figureElement){
    
    while (true){
        if (figureElement.lastChild.id == "player" || figureElement.lastChild.id == "dealer"){
            break;
        }
        figureElement.removeChild(figureElement.lastChild);
    }
    image.style.width = image1.style.width = "182.98px";
    image.style.height = image1.style.height = "255px";
}

game = new Game();