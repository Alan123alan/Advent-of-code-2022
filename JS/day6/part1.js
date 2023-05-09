const fs = require("fs");
const {getMarker} = require("./helpers")

datastreams = fs.readFileSync("./js/day6/input.txt", {encoding:"utf-8"}).split("\r\n");

for(let datastream of datastreams){
    console.log(datastream);
    console.log(getMarker(datastream));
}

