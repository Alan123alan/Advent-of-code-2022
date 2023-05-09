const getMarker = (datastream="")=>{
    let temp = -1
    for(let i=0; i<datastream.length-3; i++){
        if(!checkIfRepeatedChars(datastream[i],datastream[i+1],datastream[i+2],datastream[i+3])){
            console.log(datastream.slice(i,i+4))
            return datastream.indexOf(datastream.slice(i,i+4))+4;
        }
    }
    return temp
};

const checkIfRepeatedChars = (...charArgs)=>{
    console.log(charArgs)
    for(let i=0; i<charArgs.length; i++){
        if(charArgs.includes(charArgs[i],i+1)){
            return true
        }
    }
    // for(const char of charArgs){
    //     if(charArgs.includes(char)){
    //         return true
    //     }
    // }
    return false
};

module.exports = {getMarker};