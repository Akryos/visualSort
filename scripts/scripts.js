var gl = [];//gl = global array animations left
var gr = [];//gr = global array animations right
var gc = 0;//gc = global animations counter
var gs = 1000;//gs = global animations speed (in ms)

$(document).ready(function() {
    $('#setupButton').on('click', prepareStage);
    $('#startButton').on('click', startAlgo);
});

function prepareStage() {
    placeElements();
}

function placeElements() {
    var arrElements = $('#elementsChooser').val().split(',');
    
    $.each(arrElements, function(index, value) {
        $('#visualBox').append(buildElement(index, value));
        $('#' + index).css({left: '+=' + ((index+1)*100)});
    });
}

function buildElement(index, value) {
    var elem = '<div class="sortableElement"'
                   + 'id="' + index + '"'
                   + 'data-value="' + value + '">' 
                + '<span>' + value + '</span></div>';
    
    return elem;
}

function setSpeed() {
    var speedInput = $('#speedChooser').val();
    if(speedInput.match(/^\d+$/)){//only digits and at least one
        gs = speedInput;
    }
}

function startAlgo() {
    var arrBlocks = [];
    $.each($('.sortableElement'), function() {
        arrBlocks.push(parseInt($(this).attr('data-value')));
    });
    
    console.log(arrBlocks);
    bubbleSort(arrBlocks);
    workOffAnimations(0);
}












$(document).ready(function() {
    var arrValues = [];
    
    $.each($('div'), function() {
        arrValues.push(parseInt($(this).attr('data-value')));
    });
    
    bubbleSort(arrValues);
    workOffAnimations(0);//0 to start off at the start of the array
});

function bubbleSort(arr) {
    var boolNoSwap = true;
    var arrLength = arr.length;
    
    boolNoSwap = inTheSort(arr, arrLength);
    
    if(!boolNoSwap) {
        bubbleSort(arr);
    }
}

function inTheSort(arr, arrLength) {
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

function swapElements(elemLeft, elemRight) {//actually just the value
    var vDistanceSmall = 150;
    var vDistanceBig = 300;
    var hDistance = 100;
    var left = $('div[data-value="' + elemLeft + '"]');
    var right = $('div[data-value="' + elemRight + '"]');
    
    //down
    gl[gc] = [];
    gr[gc] = [];
    gl[gc]['o'] = $(left);//o = object
    gl[gc]['d'] = { top: "+=" + vDistanceSmall };//d = direction 
    gr[gc]['o'] = $(right);
    gr[gc]['d'] = { top: "+=" + vDistanceBig};
    gc++;
    
    //sideways
    gl[gc] = [];
    gr[gc] = [];
    gl[gc]['o'] = $(left);
    gl[gc]['d'] = { left: "+=" + hDistance};
    gr[gc]['o'] = $(right);
    gr[gc]['d'] = { left: "-=" + hDistance};
    gc++;
    
    //up
    gl[gc] = [];
    gr[gc] = [];
    gl[gc]['o'] = $(left);
    gl[gc]['d'] = { top: "-=" + vDistanceSmall};
    gr[gc]['o'] = $(right);
    gr[gc]['d'] = { top: "-=" + vDistanceBig};
    gc++;
}

function workOffAnimations(i) {
    $(gl[i]['o']).animate(gl[i]['d'], gs, function(){
        i++;
        if(i < gc) { workOffAnimations(i); }//do until last array element reached
    });
    
    //do the same for the right element array, but without callback
    $(gr[i]['o']).animate(gr[i]['d'], gs);
}