const fs = require("fs");
const { getTreeview } = require("./helpers");


const treeGrid = fs.readFileSync("./js/day8/input.txt", {encoding:"utf-8"})
    .split("\r\n")
    .map(treeRow=>treeRow.split("").map(tree=>parseInt(tree)))

const totalRows = treeGrid.length
const totalCols = treeGrid[0].length

console.log(treeGrid)
console.log(getTreeview(totalCols, totalRows, treeGrid))