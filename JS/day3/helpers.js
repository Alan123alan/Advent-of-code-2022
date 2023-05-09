const UPPER_CASE_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER_CASE_ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const UPPER_CASE_REGEX = /[A-Z]/;
const LOWER_CASE_REGEX = /[a-z]/;

const lowerCasePriority = (lowerCaseChar)=>{
    return LOWER_CASE_ALPHABET.indexOf(lowerCaseChar)+1;
};

const upperCasePriority = (upperCaseChar)=>{
    return UPPER_CASE_ALPHABET.indexOf(upperCaseChar)+27;
};

const getRepeatedChar = (str1, str2)=>{
    let isRepeated = false;
    for (let char of str1){
        isRepeated = str2.includes(char);
        if (isRepeated){
            return char
        }
    }
};

const getBadge = (str1, str2, str3)=>{
    let isRepeated = false;
    for (let char of str1){
        isRepeated = str2.includes(char) && str3.includes(char);
        if (isRepeated){
            return char
        }
    }
};

module.exports = {UPPER_CASE_ALPHABET, LOWER_CASE_ALPHABET, getRepeatedChar, getBadge, lowerCasePriority, upperCasePriority};
