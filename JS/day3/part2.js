const fs = require("fs");
const {UPPER_CASE_ALPHABET, LOWER_CASE_ALPHABET, upperCasePriority, lowerCasePriority, getBadge} = require("./helpers");


const rucksacks = fs.readFileSync("./js/day3/input.txt", {encoding: "utf-8"}).split("\r\n");
let totalPriority = 0;
for (let i = 0; i <= rucksacks.length-3; i += 3){
    const groupBadge = getBadge(rucksacks[i], rucksacks[i+1], rucksacks[i+2]) 
    const groupBadgePriority = UPPER_CASE_ALPHABET.includes(groupBadge)?upperCasePriority(groupBadge):lowerCasePriority(groupBadge);
    totalPriority += groupBadgePriority;
}
console.log(totalPriority)