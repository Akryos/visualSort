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

function selectionSort(arr) {
    var arrLength = arr.length;
    var currPos;
    var currMin;
    var tmp;
    
    for(var i = 0; i < arrLength; i++) {
        currPos = i;
        currMin = $('#' + arr[i]).attr('data-value');
        
        for(var j = i; j < arrLength; j++) {
            if(currMin > $('#' + arr[j]).attr('data-value')) {
                currMin = $('#' + arr[j]).attr('data-value');
                currPos = j;
            }
        }
        
        tmp = arr[i];
        arr[i] = arr[currPos];
        arr[currPos] = tmp;
        
        if(i !== currPos) {
            hDistanceAmount = currPos - i;
            swapElements($('#' + arr[currPos]), $('#' + arr[i]));
        }
    } 
}