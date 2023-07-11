var row1;
var row2;
var row3;
var row4;

function FindPreviews() {
    row1 = [document.getElementById("Row1Rect1"),
    document.getElementById("Row1Rect2"),
    document.getElementById("Row1Rect3"),
    document.getElementById("Row1Rect4"),
    document.getElementById("Row1Rect5"),
    document.getElementById("Row1Rect6"),
    document.getElementById("Row1Rect7"),
    document.getElementById("Row1Rect8")];

    row2 = [document.getElementById("Row2Rect1"),
    document.getElementById("Row2Rect2"),
    document.getElementById("Row2Rect3"),
    document.getElementById("Row2Rect4"),
    document.getElementById("Row2Rect5"),
    document.getElementById("Row2Rect6"),
    document.getElementById("Row2Rect7"),
    document.getElementById("Row2Rect8")];

    row3 = [document.getElementById("Row3Rect1"),
    document.getElementById("Row3Rect2"),
    document.getElementById("Row3Rect3"),
    document.getElementById("Row3Rect4"),
    document.getElementById("Row3Rect5"),
    document.getElementById("Row3Rect6"),
    document.getElementById("Row3Rect7"),
    document.getElementById("Row3Rect8")];

    row4 = [document.getElementById("Row4Rect1"),
    document.getElementById("Row4Rect2"),
    document.getElementById("Row4Rect3"),
    document.getElementById("Row4Rect4"),
    document.getElementById("Row4Rect5"),
    document.getElementById("Row4Rect6"),
    document.getElementById("Row4Rect7"),
    document.getElementById("Row4Rect8")];
}

function ShowRows(number) {
    var rampLength = currentRampLength * 2 + 2;

    for(i = 0; i < rampLength; i++){
        row1[i].style.display = 'inline-block';
        row1[i].style.width = (180 / rampLength) + 'px';
    }
    for(i = rampLength; i< 8; i++){
        row1[i].style.display = 'none';
    }
    
    if (number >= 2){
        for(i = 0; i < rampLength; i++){
            row2[i].style.display = 'inline-block';
            row2[i].style.width = (180 / rampLength) + 'px';
        }
        for(i = rampLength; i< 8; i++){
            row2[i].style.display = 'none';
        }
    }
    else {
        for(i = 0; i< 8; i++){
            row2[i].style.display = 'none';
        }
    }

    if (number >= 3){
        for(i = 0; i < rampLength; i++){
            row3[i].style.display = 'inline-block';
            row3[i].style.width = (180 / rampLength) + 'px';
        }
        for(i = rampLength; i< 8; i++){
            row3[i].style.display = 'none';
        }
    }
    else {
        for(i = 0; i< 8; i++){
            row3[i].style.display = 'none';
        }
    }

    if (number >= 4){
        for(i = 0; i < rampLength; i++){
            row4[i].style.display = 'inline-block';
            row4[i].style.width = (180 / rampLength) + 'px';
        }
        for(i = rampLength; i< 8; i++){
            row4[i].style.display = 'none';
        }
    }
    else {
        for(i = 0; i< 8; i++){
            row4[i].style.display = 'none';
        }
    }
}

function ChangePreviewColour(number) {
    var rampLength = currentRampLength * 2 + 2;

    if (number == 1) {
        for (let i = 0; i < rampLength; i++) {
            row1[i].style.backgroundColor = mainRow[i].ToHex();
        }
    }
    else if (number == 2) {
        for (let i = 0; i < rampLength; i++) {
            row2[i].style.backgroundColor = mainRow[i].ToHex();
        }
    }
    else if (number == 3) {
        for (let i = 0; i < rampLength; i++) {
            row3[i].style.backgroundColor = mainRow[i].ToHex();
        }
    }
    else {
        for (let i = 0; i < rampLength; i++) {
            row4[i].style.backgroundColor = mainRow[i].ToHex();
        }
    }
}