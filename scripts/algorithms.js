function bubbleSort(arr) {
    var boolNoSwap = true;
    var arrLength = arr.length;
    
    boolNoSwap = bubbleSortSwap(arr, arrLength);
    
    if(!boolNoSwap) {
        bubbleSort(arr);
    }
}

function bubbleSortSwap(arr, arrLength) {
    var boolNoSwap = true;
    
    for(var i = 0; i < arrLength-1; i++) {
        if(arr[i] > arr[i+1]) {
            swapElements(arr[i], arr[i+1]);
            var tmp = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = tmp;
            boolNoSwap = false;
        }
    }
    
    return boolNoSwap;
}