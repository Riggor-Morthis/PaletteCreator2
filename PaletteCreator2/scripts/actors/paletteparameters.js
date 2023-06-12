var currentHueShift = 0;
var currentTemperature = 0;
var currentOthers = 0;
var currentOthersTypes = 0;

var otherTypesList;
var applyButton;

function PpInitialize(){
    otherTypesList = document.getElementById("TypesList");
    applyButton = document.getElementById("ApplyButton");
}

function ChangeHueShift(sel){
    currentHueShift = sel.selectedIndex;
    UpdateApplyButton();
}

function ChangeTemperature(sel){
    currentTemperature = sel.selectedIndex;
    UpdateApplyButton();
}

function ChangeOthers(sel){
    currentOthers = sel.selectedIndex;
    if(currentOthers != 1){
        otherTypesList.removeAttribute("disabled");
    }
    else{
        otherTypesList.selectedIndex = 0;
        currentOthersTypes = 0;
        otherTypesList.setAttribute("disabled", true);
    }
    UpdateApplyButton();
}

function ChangeOtherTypes(sel){
    currentOthersTypes = sel.selectedIndex;
    UpdateApplyButton();
}

function UpdateApplyButton(){
    if(currentHueShift != -1 && currentTemperature != -1 &&
        (currentOthers == 1 || currentOthersTypes != 0)){
            applyButton.removeAttribute("disabled");
        }
        else{
            applyButton.setAttribute("disabled", true);
        }
}