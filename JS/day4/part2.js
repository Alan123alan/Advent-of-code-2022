const fs = require("fs");

let RangesContainedCounter = 0;

const checkIfRangesOverlap = (firstRangeMin, firstRangeMax, secondRangeMin, secondRangeMax)=>{
    if (firstRangeMax <= secondRangeMax && firstRangeMax >= secondRangeMin){
        RangesContainedCounter++
    }else if (secondRangeMin >= firstRangeMin && secondRangeMin <= firstRangeMax) {
        RangesContainedCounter++
    }else if (secondRangeMax >= firstRangeMin && secondRangeMax <= firstRangeMax) {
        RangesContainedCounter++
    }else if (firstRangeMin >= secondRangeMin && firstRangeMin <= secondRangeMax) {
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
    checkIfRangesOverlap(parseInt(firstPairMin), parseInt(firstPairMax), parseInt(secondPairMin), parseInt(secondPairMax))
}
console.log(RangesContainedCounter)
