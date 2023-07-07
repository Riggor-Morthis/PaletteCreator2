var familyList = [
    'Reds',
    'Yellows',
    'Greens',
    'Blues',
    'Purples',
    'Grays'
]
var buttonsDiv;
var previewSquare;
var currentTipsIndex;

function FaInitialize() {
    buttonsDiv = document.getElementById("ColoursButtonList");
    previewSquare = document.getElementById("PreviewSquare");
    previewSquare.value = "#000000";

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
        buttonsDiv.appendChild(but);
    }
}

function RemoveOptions() {
    for (let i = buttonsDiv.childElementCount - 1; i >= 0; i--) {
        buttonsDiv.removeChild(buttonsDiv.children[i]);
    }
}

function ShowColorList(index) {
    RemoveOptions();
    currentTipsIndex = 1;
    CreateBackButton();
    
    var colorList = PremadeList.mainList[index];
    for (let i = 0; i < colorList.length; i++) {
        but = document.createElement('button');
        but.innerHTML = colorList[i].name;
        but.onclick = function () {
            UpdateColorPreview(colorList[i].shade)
        }
        buttonsDiv.appendChild(but);
    }
}

function CreateBackButton(){
    var but = document.createElement('button');
    but.innerHTML = 'BACK';
    but.onclick = function () {
        ShowFamilyList();
    }
    buttonsDiv.appendChild(but);
}

function UpdateColorPreview(shade) {
    previewSquare.value = shade.ToHex();
    UpdateApplyButton()
}

function FaShowTips() {
    ShowTips(currentTipsIndex);
}