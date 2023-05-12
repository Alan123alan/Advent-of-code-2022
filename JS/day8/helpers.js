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

module.exports = {getOuterTreesCount, getInnerVisibleTreesCount}