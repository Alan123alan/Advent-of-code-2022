const fs = require("fs");
const {getTopCrates, executeInstructions, executeInstructions9001, parseCrates, parseInstructions} = require("./helpers");


const file = fs.readFileSync("./js/day5/input.txt", {encoding:"utf-8"}).split("\r\n");

const separationIndex = file.indexOf("");

const crates = parseCrates(file.slice(0,separationIndex));
const instructions = parseInstructions(file.slice(separationIndex+1,file.length));

const movedCrates = executeInstructions(instructions, crates)

console.log(movedCrates)

const topCrates = getTopCrates(movedCrates);

console.log(topCrates);