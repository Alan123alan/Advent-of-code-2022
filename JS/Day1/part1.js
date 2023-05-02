const fs = require("fs");

fs.readFile("./JS/Day1/input.txt", "utf-8",(err, data)=>{
    if (err){
        console.log(err);
        return
    }
    console.log(data);
    const elfsData = data.split("\r\n\r\n");
    const elfsCalories = elfsData.map(elf_data=>elf_data.split("\r\n"));
    const elfsTotalCalories = elfsCalories.map(elfCalories=>elfCalories.map(elfCalorieStr=>parseInt(elfCalorieStr))).map(elfCalories=>elfCalories.reduce((prev, curr)=>prev+curr))
    const elfWithMaxFood = elfsTotalCalories.sort((a,b)=>b-a)[0]
    console.log(elfsCalories);
    console.log(elfsTotalCalories);
    console.log(elfWithMaxFood);
});