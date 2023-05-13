const getOuterTreesCount = (totalCols, totalRows)=>(totalCols*2)+(2*(totalRows-2));

const getInnerVisibleTreesCount = (totalCols, totalRows, treeGrid)=>{
    let innerVisibleTrees = 0
    let [row] = treeGrid;
    const transposedTreeGrid = row.map((value,col)=>treeGrid.map(row=>row[col]))
    for(let row=1; row<totalRows-1; row++){
        for(let col=1; col<totalCols-1; col++){
            const isVisibleFromLeft = treeGrid[row]
                .map((treeHeight, index)=>{
                    if(index < col){
                        return treeHeight-treeGrid[row][col];
                    }
                }).filter(treeHeight=>treeHeight>=0).length < 1;
            const isVisibleFromRight = treeGrid[row]
                .map((treeHeight, index)=>{
                    if(index > col){
                        return treeHeight-treeGrid[row][col];
                    }
                })
                .filter(treeHeight=>treeHeight>=0).length < 1;
            const isVisibleFromTop = transposedTreeGrid[col]
                .map((treeHeight, index)=>{
                    if(index<row){
                        return treeHeight-transposedTreeGrid[col][row]
                    }
                })
                .filter(treeHeight=>treeHeight>=0).length < 1;
            const isVisibleFromBottom = transposedTreeGrid[col]
                .map((treeHeight, index)=>{
                    if(index>row){
                        return treeHeight-transposedTreeGrid[col][row]
                    }
                })
                .filter(treeHeight=>treeHeight>=0).length < 1;
            if(isVisibleFromLeft || isVisibleFromRight || isVisibleFromTop || isVisibleFromBottom){
                innerVisibleTrees++
            }
            // console.log(treeGrid[row][col], transposedTreeGrid[col][row], isVisibleFromLeft, isVisibleFromRight, isVisibleFromTop, isVisibleFromBottom);
        }
    }
    return innerVisibleTrees
};

const getTreeview = (totalCols, totalRows, treeGrid)=>{
    let scenicScores = [];
    let [row] = treeGrid;
    const transposedTreeGrid = row.map((value,col)=>treeGrid.map(row=>row[col]))
    for(let row=0; row<totalRows; row++){
        for(let col=0; col<totalCols; col++){
            let currentTreeHeight = treeGrid[row][col];
            let currentTransposedTreeHeight = transposedTreeGrid[col][row];
            const visibleTreesFromLeft = getLeftVisibleTrees(treeGrid[row],col,currentTreeHeight);
            const visibleTreesFromRight = getRightVisibleTrees(treeGrid[row],col,currentTreeHeight);
            const visibleTreesFromTop = getTopVisibleTrees(transposedTreeGrid[col],row,currentTransposedTreeHeight);
            const visibleTreesFromBottom = getBottomVisibleTrees(transposedTreeGrid[col],row,currentTransposedTreeHeight);
            const scenicScore = visibleTreesFromTop*visibleTreesFromBottom*visibleTreesFromLeft*visibleTreesFromRight;
            scenicScores.push(scenicScore);
            console.log(treeGrid[row][col], transposedTreeGrid[col][row],scenicScore);
            // visibleTrees += scanAllDirectionsForVisibleTrees([visibleTreesFromLeft, visibleTreesFromRight], currentTreeHeight);
            // visibleTrees += scanAllDirectionsForVisibleTrees([visibleTreesFromTop, visibleTreesFromBottom], currentTransposedTreeHeight);
        }
    }
    return Math.max(...scenicScores)
}

const getLeftVisibleTrees = (treeRow=[], currentTreeCol=0, currentTreeHeight=0)=>{
    let notVisibleTrees = 0
    return treeRow
                .map((treeHeight, index)=>{
                    if(index < currentTreeCol){
                        return treeHeight;
                    }
                })
                .filter(treeHeight=>treeHeight != undefined)
                .reverse()
                .reduce((leftVisibleTrees, treeHeight)=>{
                    if(currentTreeHeight > treeHeight && notVisibleTrees<1){
                        return leftVisibleTrees+1
                    }else if(currentTreeHeight <= treeHeight && notVisibleTrees<1){
                        notVisibleTrees++
                        return leftVisibleTrees+1
                    }else{
                        return leftVisibleTrees
                    }
                }, 0);
}

const getRightVisibleTrees = (treeRow=[], currentTreeCol=0, currentTreeHeight=0)=>{
    let notVisibleTrees = 0;
    return treeRow
                .map((treeHeight, index)=>{
                    if(index > currentTreeCol){
                        return treeHeight;
                    }
                })
                .filter(treeHeight=>treeHeight != undefined)
                .reduce((rightVisibleTrees, treeHeight)=>{
                    if(currentTreeHeight > treeHeight && notVisibleTrees<1){
                        return rightVisibleTrees+1
                    }else if(currentTreeHeight <= treeHeight && notVisibleTrees<1){
                        notVisibleTrees++
                        return rightVisibleTrees+1
                    }else{
                        return rightVisibleTrees
                    }
                }, 0);
}

const getTopVisibleTrees = (transposedTreeRow=[], currentTreeRow=0, currentTreeHeight=0)=>{
    let notVisibleTrees = 0;
    return  transposedTreeRow
                .map((treeHeight, index)=>{
                    if(index<currentTreeRow){
                        return treeHeight
                    }
                })
                .filter(treeHeight=>treeHeight!=undefined)
                .reverse()
                .reduce((topVisibleTrees, treeHeight)=>{
                    if(currentTreeHeight > treeHeight && notVisibleTrees<1){
                        return topVisibleTrees+1
                    }else if(currentTreeHeight <= treeHeight && notVisibleTrees<1){
                        notVisibleTrees++
                        return topVisibleTrees+1
                    }else{
                        return topVisibleTrees
                    }
                }, 0);
}

const getBottomVisibleTrees = (transposedTreeRow=[], currentTreeRow=0, currentTreeHeight=0)=>{
    let notVisibleTrees = 0;
    return  transposedTreeRow
                .map((treeHeight, index)=>{
                    if(index>currentTreeRow){
                        return treeHeight
                    }
                })
                .filter(treeHeight=>treeHeight!=undefined)
                .reduce((bottomVisibleTrees, treeHeight)=>{
                    if(currentTreeHeight > treeHeight && notVisibleTrees<1){
                        return bottomVisibleTrees+1
                    }else if(currentTreeHeight <= treeHeight && notVisibleTrees<1){
                        notVisibleTrees++
                        return bottomVisibleTrees+1
                    }else{
                        return bottomVisibleTrees
                    }
                }, 0);
};

const scanAllDirectionsForVisibleTrees = (directions=[], currentTreeHeight)=>{
    let totalVisibleTrees = 0;
    for(const direction of directions){
        for(const treeHeight of direction){
            if(currentTreeHeight > treeHeight){
                totalVisibleTrees++
            }else{
                break
            }
        }

    }
    return totalVisibleTrees
};


module.exports = {getOuterTreesCount, getInnerVisibleTreesCount, getTreeview}