const fs = require("fs");

let RangesContainedCounter = 0;

const checkIfRangesContainEachOther = (firstRangeMin, firstRangeMax, secondRangeMin, secondRangeMax)=>{
    if (firstRangeMin >= secondRangeMin && firstRangeMax <= secondRangeMax){
        RangesContainedCounter++
    }else if (secondRangeMin >= firstRangeMin && secondRangeMax <= firstRangeMax) {
        RangesContainedCounter++
    }
};

const assignmentsPairs = fs.readFileSync("./js/day4/input.txt", {encoding:"utf-8"})
    .split("\r\n")
    .map(assignmentsPair=>{
        return assignmentsPair
            .split(",")
            .map(assignments=>{
                return assignments.split("-")
            });
    });

for (let assignmentsPair of assignmentsPairs){
    [[firstPairMin, firstPairMax],[secondPairMin, secondPairMax]] = assignmentsPair;
    checkIfRangesContainEachOther(parseInt(firstPairMin), parseInt(firstPairMax), parseInt(secondPairMin), parseInt(secondPairMax))
}
console.log(RangesContainedCounter)