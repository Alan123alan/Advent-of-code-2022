const fs = require("fs");

let gameScore = 0;

const oponentHand = {
    A:"Rock",
    B:"Paper",
    C:"Scissors",
};

const roundOutcomeScore = {
    X:0,
    Y:3,
    Z:6,
};

//Javascript object wich relation is
// key : value
// oponent selection : selection that will make me lose
const losingSelections = {
    Rock:"Scissors",
    Paper:"Rock",
    Scissors:"Paper"
}

//Javascript object wich relation is
// key : value
// oponent selection : selection that will make me win
const winningSelections = {
    Rock:"Paper",
    Paper:"Scissors",
    Scissors:"Rock"
}

const addRoundOutcomeScore = (roundOutcome)=>{
    gameScore += roundOutcomeScore[roundOutcome];
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

const getPlayerHandSelection = (oponentSelection, roundOutcome)=>{
    switch (roundOutcomeScore[roundOutcome]) {
        case 0:
            addHandSelectionScore(losingSelections[oponentHand[oponentSelection]])
            break;
        case 3:
            addHandSelectionScore(oponentHand[oponentSelection])
            break;
        case 6:    
            addHandSelectionScore(winningSelections[oponentHand[oponentSelection]])
            break;
    }
};

const inputs = fs.readFileSync("./js/day2/input.txt",{encoding: "utf-8"});
const rounds = inputs
    .split("\r\n")
    .map(input=>input.split(" "));
rounds.forEach(round=>{
    let [oponentSelection, roundOutcome] = round;
    addRoundOutcomeScore(roundOutcome);
    getPlayerHandSelection(oponentSelection, roundOutcome)
});

console.log(gameScore)