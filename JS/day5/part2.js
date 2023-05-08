const fs = require("fs");
const {getTopCrates, executeInstructions9001, parseInstructions, parseCrates} = require("./helpers");

const file = fs.readFileSync("./js/day5/input.txt", {encoding:"utf-8"}).split("\r\n");

const separationIndex = file.indexOf("");

const crates = parseCrates(file.slice(0, separationIndex));
const instructions = parseInstructions(file.slice(separationIndex+1, file.length));

const movedCrates = executeInstructions9001(instructions, crates);

const topCrates = getTopCrates(movedCrates);

console.log(movedCrates);
console.log(topCrates);