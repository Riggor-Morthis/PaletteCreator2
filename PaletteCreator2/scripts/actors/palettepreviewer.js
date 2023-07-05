var row1;
var row2;
var row3;
var row4;
var shades1;
var shades2;
var shades3;
var shades4;

function FindPreviews() {
    row1 = [document.getElementById("Row1Rect1"),
    document.getElementById("Row1Rect2"),
    document.getElementById("Row1Rect3"),
    document.getElementById("Row1Rect4")];

    row2 = [document.getElementById("Row2Rect1"),
    document.getElementById("Row2Rect2"),
    document.getElementById("Row2Rect3"),
    document.getElementById("Row2Rect4")];

    row3 = [document.getElementById("Row3Rect1"),
    document.getElementById("Row3Rect2"),
    document.getElementById("Row3Rect3"),
    document.getElementById("Row3Rect4")];

    row4 = [document.getElementById("Row4Rect1"),
    document.getElementById("Row4Rect2"),
    document.getElementById("Row4Rect3"),
    document.getElementById("Row4Rect4")];

    shades1 = document.getElementById("PrevRow1");
    shades2 = document.getElementById("PrevRow2");
    shades3 = document.getElementById("PrevRow3");
    shades4 = document.getElementById("PrevRow4");
}

function ShowRows(number) {
    shades1.style.visibility = 'visible';

    if (number >= 2) shades2.style.visibility = 'visible';
    else shades2.style.visibility = 'hidden';

    if (number >= 3) shades3.style.visibility = 'visible';
    else shades3.style.visibility = 'hidden';

    if (number >= 4) shades4.style.visibility = 'visible';
    else shades4.style.visibility = 'hidden';
}

function ChangePreviewColour(number) {
    if (number == 1) {
        for (let i = 0; i < 4; i++) {
            row1[i].style.backgroundColor = mainRow[i].ToHex();
        }
    }
    else if (number == 2) {
        for (let i = 0; i < 4; i++) {
            row2[i].style.backgroundColor = mainRow[i].ToHex();
        }
    }
    else if (number == 3) {
        for (let i = 0; i < 4; i++) {
            row3[i].style.backgroundColor = mainRow[i].ToHex();
        }
    }
    else {
        for (let i = 0; i < 4; i++) {
            row4[i].style.backgroundColor = mainRow[i].ToHex();
        }
    }
}