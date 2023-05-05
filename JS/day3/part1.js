const fs = require("fs");

const UPPER_CASE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const lowerCasePriority = (lowerCaseChar)=>{
    let lowerCaseAlphabet = LOWER_CASE_ALPHABET.split('');
    let lowerCasePriorities = {};
    for (let index = 0; index<lowerCaseAlphabet.length; index++){
        lowerCasePriorities[lowerCaseAlphabet[index]] = index+1; 
    }
    console.log(lowerCasePriorities)
    return lowerCasePriorities[lowerCaseChar];
};
const upperCasePriority = (upperCaseChar)=>{
    let upperCaseAlphabet = UPPER_CASE_ALPHABET.split('');
    let upperCasePriorities = {};
    for (let index = 0; index<upperCaseAlphabet.length; index++){
        upperCasePriorities[upperCaseAlphabet[index]] = index+27; 
    }
    console.log(upperCasePriorities)
    return upperCasePriorities[upperCaseChar];
}

const getRepeatedChar = (str1, str2)=>{
    let isRepeated = false;
    for (let i = 0; i<str1.length; i++){
        isRepeated = str2.includes(str1[i]);
        if (isRepeated){
            return str1[i]
        }
    }
};

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


