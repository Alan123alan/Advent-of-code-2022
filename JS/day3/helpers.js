const UPPER_CASE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const lowerCasePriority = (lowerCaseChar)=>{
    let lowerCasePriorities = {};
    for (let index = 0; index<LOWER_CASE_ALPHABET.length; index++){
        lowerCasePriorities[LOWER_CASE_ALPHABET[index]] = index+1; 
    }
    return lowerCasePriorities[lowerCaseChar];
};

const upperCasePriority = (upperCaseChar)=>{
    let upperCasePriorities = {};
    for (let index = 0; index<UPPER_CASE_ALPHABET.length; index++){
        upperCasePriorities[UPPER_CASE_ALPHABET[index]] = index+27; 
    }
    return upperCasePriorities[upperCaseChar];
};

const getRepeatedChar = (str1, str2)=>{
    let isRepeated = false;
    for (let i = 0; i<str1.length; i++){
        isRepeated = str2.includes(str1[i]);
        if (isRepeated){
            return str1[i]
        }
    }
};

const getBadge = (str1, str2, str3)=>{
    let isRepeated = false;
    for (let i = 0; i<str1.length; i++){
        isRepeated = str2.includes(str1[i]) && str3.includes(str1[i]);
        if (isRepeated){
            return str1[i]
        }
    }
};

module.exports = {UPPER_CASE_ALPHABET, LOWER_CASE_ALPHABET, getRepeatedChar, getBadge, lowerCasePriority, upperCasePriority};
