const fs = require("fs");
const {getOuterTreesCount, getInnerVisibleTreesCount} = require("./helpers");

const treeGrid = fs.readFileSync("./js/day8/input.txt", {encoding: "utf-8"})
    .split("\r\n")
    .map(treeRow=>treeRow.split("").map(tree=>parseInt(tree)));

// console.log(treeGrid);

const totalRows = treeGrid.length;
const totalCols = treeGrid[0].length 

const outerVisibleTrees = getOuterTreesCount(totalCols, totalRows);
const innerVisibleTrees = getInnerVisibleTreesCount(totalCols, totalRows, treeGrid);

console.log("Outer visible trees", outerVisibleTrees)
console.log("Inner visible trees", innerVisibleTrees)
console.log("Total visible trees", outerVisibleTrees+innerVisibleTrees)



