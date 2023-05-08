const fs = require("fs");
const {UPPER_CASE_ALPHABET, LOWER_CASE_ALPHABET, lowerCasePriority, upperCasePriority, getRepeatedChar} = require("./helpers");

const rucksacks = fs.readFileSync("./js/day3/sample.txt", {encoding:"utf-8"}).split("\r\n");
const rucksacksWithCompartments = rucksacks
    .map(rucksack=>{
        const half = rucksack.length/2;
        const compartment1 = rucksack.slice(0, half);
        const compartment2 = rucksack.slice(half,rucksack.length);
        return [compartment1, compartment2] 
    });

const rucksacksPriorities = rucksacksWithCompartments.map(rucksackCompartments=>{
    let [rucksackCompartment1, rucksackCompartment2] = rucksackCompartments;
    const repeatedChar = getRepeatedChar(rucksackCompartment1, rucksackCompartment2);
    if (LOWER_CASE_ALPHABET.includes(repeatedChar)){
        return lowerCasePriority(repeatedChar);
    }else if (UPPER_CASE_ALPHABET.includes(repeatedChar)){
        return upperCasePriority(repeatedChar)
    }
})
const prioritiesSum = rucksacksPriorities.reduce((prev, curr)=>prev+curr);
console.log(rucksacksWithCompartments);
console.log(rucksacksPriorities);
console.log(prioritiesSum);


