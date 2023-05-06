const fs = require("fs");

const UPPER_CASE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const lowerCasePriority = (lowerCaseChar)=>{
    let lowerCaseAlphabet = LOWER_CASE_ALPHABET.split('');
    let lowerCasePriorities = {};
    for (let index = 0; index<lowerCaseAlphabet.length; index++){
        lowerCasePriorities[lowerCaseAlphabet[index]] = index+1; 
    }
    return lowerCasePriorities[lowerCaseChar];
};
const upperCasePriority = (upperCaseChar)=>{
    let upperCaseAlphabet = UPPER_CASE_ALPHABET.split('');
    let upperCasePriorities = {};
    for (let index = 0; index<upperCaseAlphabet.length; index++){
        upperCasePriorities[upperCaseAlphabet[index]] = index+27; 
    }
    return upperCasePriorities[upperCaseChar];
}

const getBadge = (str1, str2, str3)=>{
    let isRepeated = false;
    for (let i = 0; i<str1.length; i++){
        isRepeated = str2.includes(str1[i]) && str3.includes(str1[i]);
        if (isRepeated){
            return str1[i]
        }
    }
};

rucksacks = fs.readFileSync("./js/day3/input.txt", {encoding: "utf-8"}).split("\r\n");
let totalPriority = 0;
for (let i = 0; i <= rucksacks.length-3; i += 3){
    const groupBadge = getBadge(rucksacks[i], rucksacks[i+1], rucksacks[i+2]) 
    const groupBadgePriority = UPPER_CASE_ALPHABET.includes(groupBadge)?upperCasePriority(groupBadge):lowerCasePriority(groupBadge);
    totalPriority += groupBadgePriority;
}
console.log(totalPriority)