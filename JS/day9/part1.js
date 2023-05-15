const fs = require("fs");
const {moveHead} = require("./helpers");

const motions = fs.readFileSync("./js/day9/input.txt", {encoding: "utf-8"})
    .split("\r\n")
    .map(motion=>motion.split(" "));

console.log(motions);
console.log(moveHead(motions));
