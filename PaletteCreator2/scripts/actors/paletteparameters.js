var currentRampLength = 0;
var currentHueShift = 0;
var currentTemperature = 0;
var currentOthers = 0;

var otherTypesList;
var applyButton;

function PpInitialize() {
    otherTypesList = document.getElementById("TypesList");
    applyButton = document.getElementById("ApplyButton");
}

function ChangeRampLength(sel){
    currentRampLength = sel.selectedIndex;
    UpdateApplyButton();
}

function ChangeHueShift(sel) {
    currentHueShift = sel.selectedIndex;
    UpdateApplyButton();
}

function ChangeTemperature(sel) {
    currentTemperature = sel.selectedIndex;
    UpdateApplyButton();
}

function ChangeOthers(sel) {
    currentOthers = sel.selectedIndex;
    UpdateApplyButton();
}

function UpdateApplyButton() {
    if (currentRampLength != 0 && currentHueShift != 0 && currentTemperature != 0 && currentOthers != 0) {
        applyButton.removeAttribute("disabled");
        CreatePalette();
    }
    else {
        applyButton.setAttribute("disabled", true);
    }
}