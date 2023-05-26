const fs = require('fs');

const ELEVATIONS = 'abcdefghijklmnopqrstuvwxyz';

const START = 'S';

const END = 'E';

const sample = fs.readFileSync('./js/day12/sample.txt', {encoding:'utf-8'}).split('').filter((repr)=>repr!='\n');
console.log(sample);

const elevations= sample.map((repr)=>{
    if(repr == START){
        return ELEVATIONS.indexOf('a');
    }else if(repr == END){
        return ELEVATIONS.indexOf('z');
    }else{
        return ELEVATIONS.indexOf(repr);
    }
});

console.log(elevations);