var arrUsed = [];

$(document).ready(function(){
    setup();

    $("section.controls > button").click(function(){
        if (arrUsed.length<52){
            nextRound();
        }
        
    });
});

function nextRound(){
    var vals = dealCard();

    compare(vals[0], vals[1]);
}

function dealCard(){
    var rnd = myRandom();
    var pcard = new Card(rand);
    var dcard = new Card(rand);

    $("section.player figure").html("");
    var pImg = $("<img/>").attr("src", pcard.image);
    $("section.player figure").append(pImg)

    rnd = myRandom();
    $("section.dealer figure").html("");
    var dImg = $("<img/>").attr("src", dcard.image);
    $("section.dealer figure").append(dImg)

    return [pCard.value, dCard.value];
}

function compare(pValue, dValue){
    if (pValue > dValue){
        var score = parseInt($("div.playerScore > h1").html());
        score++;
        $("div.playerScore > h1").html(score);
    }
    else if (pValue < dValue){
        var score = parseInt($("div.dealerScore > h1").html());
        score++;
        $("div.dealerScore > h1").html(score);
    } else {
        var cvals;
        for (var i = 0; i <= 3; i++){
            cvals = dealCard();
        }
        compare(cvals[0], cvals[1]);
    }
}

function myRandom(max = 52, min = 1){
    var rand = Math.Random();
    rand = rand * (max - min  + 1);
    rand = Math.floor(rand);
    rand = rand + min;

    if (arrUsed.indexOf(rand) >= 0){
        return myRandom();
    } else {
       arrUsed.push(rand);
       return rand; 
    }

    return rand;
}

function setup(){
    var pImg = $("<img/>").attr("src","img/back.png");
    $("section.player figure").append(pImg)

    var dImg = $("<img/>").attr("src","img/back.png");
    $("section.dealer figure").append(dImg)
}

function Card(number){
    this.getValue = function(){
        var val = this.number % 13;
        
        switch (val){
            case 0: //king
            case 11://jack
            case 12://queen
                val = 10;
                break;
            default:
                val = val;
        }

        return val;
    }

    this.value = this.getValue();
    this.number = number;
    this.image = "img/" + number + ".png";
}