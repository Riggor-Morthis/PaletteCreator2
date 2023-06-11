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
var currentTipsIndex;

function FaInitialize(){
    ButtonsDiv = document.getElementById("ColoursButtonList");
    
    currentTipsIndex = 0;

    for(var i = 0; i < familyList.length; i++){
        var but = document.createElement('button');
        but.innerHTML = familyList[i];
        but.onclick = function(){
            console.log('It worked');
        }
        ButtonsDiv.appendChild(but);
    }
}

function FaShowTips(){
    ShowTips(currentTipsIndex);
}