var tipsTextElement;

function HTInitialize() {
    tipsTextElement = document.getElementById("TipsText");
}

function ShowTips(index) {
    if (index == -1) tipsTextElement.innerHTML = '';
    else tipsTextElement.innerHTML = Tips.tips[index];
}