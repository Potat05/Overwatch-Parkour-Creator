

let GLOBALID = 0;
function globalID() {
    GLOBALID++;
    return GLOBALID;
}





// Yoinked from https://stackoverflow.com/questions/4011629/swapping-two-items-in-a-javascript-array#answer-4011851
Array.prototype.swapItems = function(a, b){
    this[a] = this.splice(b, 1, this[a])[0];
    return this;
}