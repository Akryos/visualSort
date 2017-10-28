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
        var left = $('#' + arr[i]);
        var right = $('#' + arr[i+1]);
        var leftV = ($(left).attr('data-value')).trim();
        var rightV = (right.attr('data-value')).trim();
        
        
        if(leftV > rightV) {
            swapElements(left, right);
            var tmp = arr[i];
            arr[i] = arr[i+1];
            arr[i+1] = tmp;
            boolNoSwap = false;
        }
    }
    
    return boolNoSwap;
}