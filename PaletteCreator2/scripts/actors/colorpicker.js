var familyList = [
    'Reds',
    'Yellows',
    'Greens',
    'Blues',
    'Purples',
    'Grays',
    'Custom'
]
var ButtonsDiv;
var PreviewSquare;
var currentTipsIndex;

function FaInitialize() {
    ButtonsDiv = document.getElementById("ColoursButtonList");
    PreviewSquare = document.getElementById("PreviewSquare");

    ShowFamilyList();
}

function ShowFamilyList() {
    RemoveOptions();

    currentTipsIndex = 0;

    for (let i = 0; i < familyList.length; i++) {
        var but = document.createElement('button');
        but.innerHTML = familyList[i];
        but.onclick = function () {
            ShowColorList(i);
        }
        ButtonsDiv.appendChild(but);
    }
}

function ShowColorList(index) {
    RemoveOptions();

    currentTipsIndex = 1;

    var but = document.createElement('button');
    but.innerHTML = 'BACK';
    but.onclick = function () {
        ShowFamilyList();
    }
    ButtonsDiv.appendChild(but);

    var colorList = PremadeList.mainList[index];
    for(let i = 0; i < colorList.length; i++){
        but = document.createElement('button');
        but.innerHTML = colorList[i].name;
        but.onclick = function () {
            UpdateColorPreview(colorList[i].shade)
        }
        ButtonsDiv.appendChild(but);
    }
}

function UpdateColorPreview(shade){
    PreviewSquare.style.background = shade.ToRgb();
}

function RemoveOptions() {
    for (let i = ButtonsDiv.childElementCount - 1; i >= 0; i--) {
        ButtonsDiv.removeChild(ButtonsDiv.children[i]);
    }
}

function FaShowTips() {
    ShowTips(currentTipsIndex);
}