const fs = require("fs");
const {getMessageMarker} = require("./helpers");

const datastreams = fs.readFileSync("./js/day6/input.txt", {encoding:"utf-8"}).split("\r\n")

for(const datastream of datastreams){
    console.log(getMessageMarker(datastream));
}