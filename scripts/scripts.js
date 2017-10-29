var gl = [];//gl = global array animations left
var gr = [];//gr = global array animations right
var gc = 0;//gc = global animations counter
var gs = 1000;//gs = global animations speed (in ms)
var vDistanceSmall = 150;
var vDistanceBig = 300;
var hDistance = 100;
var isRunning = false;

$(document).ready(function() {
    $('#setupButton').on('click', prepareStage);
    $('#startButton').on('click', startAlgo);
});

function prepareStage() {
    placeElements();
    setSpeed();
}

function placeElements() {
    $('#visualBox').html('');
    var arrElements = $('#elementsChooser').val().split(',');
    
    $.each(arrElements, function(index, value) {
        $('#visualBox').append(buildElement(index, value));
        $('#' + index).css({left: '+=' + ((index+1)*hDistance)});
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
        gs = parseInt(speedInput);
    }
}

function startAlgo() {
    if(isRunning) {
        return false;
    }
    
    isRunning = true;
    
    var arrBlocks = [];
    $.each($('.sortableElement'), function() {
        arrBlocks.push(parseInt($(this).attr('id')));
    });
    
    activateAlgo(arrBlocks);
    workOffAnimations(0);
}

function activateAlgo(arrBlocks) {
    var algoType = $('#algorithmChooser').val();
   
    switch(algoType) {
        case 'bubble':
            bubbleSort(arrBlocks);
            break;
            
        case 'selection':
            selectionSort(arrBlocks);
            break;
            
        default:
            break;
    }
}

function swapElements(left, right) {
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
        if(i < gc) {//do until last array element was used
            workOffAnimations(i);
        } else {//animation process has finished
            isRunning = false;
        }
    });
    
    //do the same for the right element array, but without callback
    $(gr[i]['o']).animate(gr[i]['d'], gs);
}