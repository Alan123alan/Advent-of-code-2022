const fs = require("fs");

let gameScore = 0;

const oponentHand = {
    A:"Rock",
    B:"Paper",
    C:"Scissors",
};

const playerHand = {
    X:"Rock",
    Y:"Paper",
    Z:"Scissors",
};

const addRoundOutcomeScore = (playerHandSelection, oponentHandSelection)=>{
    if (playerHandSelection == oponentHandSelection ){
        gameScore += 3;
    }else if (playerHandSelection == "Rock" && oponentHandSelection == "Scissors"){
        gameScore += 6 
    }else if (playerHandSelection == "Paper" && oponentHandSelection == "Rock"){
        gameScore += 6 
    }else if (playerHandSelection == "Scissors" && oponentHandSelection == "Paper"){
        gameScore += 6 
    }
};

const addHandSelectionScore = (playerHandSelection)=>{
    switch (playerHandSelection) {
        case "Rock":
            gameScore += 1;
            break;
        case "Paper":
            gameScore += 2;            
            break;
        case "Scissors":
            gameScore += 3;
            break;
    }
};

const inputs = fs.readFileSync("./js/day2/input.txt", {encoding: "utf-8"});
const games = inputs
    .split("\r\n")
    .map(input=>input.split(" "));
games.forEach(selections=>{
    let [oponentSelection, playerSelection] = selections;
    addRoundOutcomeScore(playerHand[playerSelection], oponentHand[oponentSelection]);
    addHandSelectionScore(playerHand[playerSelection])
});
console.log(gameScore);