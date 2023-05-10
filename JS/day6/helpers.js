const getMarker = (datastream="")=>{
    let temp = -1
    for(let i=0; i<datastream.length-3; i++){
        if(!checkIfRepeatedChars(datastream.slice(i, i+4))){
            console.log(datastream.slice(i,i+4))
            return datastream.indexOf(datastream.slice(i,i+4))+4;
        }
    }
    return temp
};

const getMessageMarker = (datastream="")=>{
    let temp = -1
    for(let i=0; i<datastream.length-13; i++){
        if(!checkIfRepeatedChars(datastream.slice(i,i+14))){
            console.log(datastream.slice(i,i+14))
            return datastream.indexOf(datastream.slice(i,i+14))+14;
        }
    }
    return temp

}

const checkIfRepeatedChars = (charArgs=[])=>{
    // console.log(charArgs)
    for(let i=0; i<charArgs.length; i++){
        if(charArgs.includes(charArgs[i],i+1)){
            return true
        }
    }
    return false
};

module.exports = {getMarker, getMessageMarker};