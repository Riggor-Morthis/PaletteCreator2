var mainShade;
var mainIndex;
var mainRow;
var mainCanvas;
var mainContext;
var mainColors;
var upperValueLimit;

async function CreatePalette() {
    if (currentOthers == 1) await CreateSimplePalette();
    else if (currentOthers == 2) await CreateAnalogousPalette();
    else if (currentOthers == 3) await CreateComplementaryPalette();
    else if (currentOthers == 4) await CreateSplitComplementaryPalette();
    else if (currentOthers == 5) await CreateTriadicPalette();
    else if (currentOthers == 6) await CreateTetradicPalette();
}

function ExportPalette() {
    var now = new Date();
    var filename = "palette" + "-" + now.getHours() + now.getMinutes()
        + now.getSeconds() + now.getMilliseconds() + ".png";

    var anchor = document.createElement("a");
    anchor.setAttribute('download', filename);
    anchor.setAttribute('href',
        mainCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    anchor.click();

    anchor.remove();
    mainCanvas.remove();
}

async function CreateSimplePalette() {
    //On fait un canvas de la bonne taille
    await CreateCanvas(1);

    //On se recupere la couleur de l'utilisateur
    GetMainShade();
    //On fait un seul row, simple
    CreateARow();
    ChangePreviewColour(1);
    //On "imprime"
    await SetImageData(0);

    //On applique a l'image
    let imageData = new ImageData(mainColors, mainRow.length);
    mainContext.putImageData(imageData, 0, 0);
}

async function CreateAnalogousPalette() {
    //On fait un canvas de la bonne taille
    await CreateCanvas(3);

    //On se recupere la couleur de l'utilisateur
    GetMainShade();
    //On fait un premier row
    CreateARow();
    ChangePreviewColour(1);
    //On "imprime"
    await SetImageData(0);

    //On passe sur la shade suivante
    mainShade.SetHue(mainShade.hue - 30);
    CreateARow();
    ChangePreviewColour(2);
    await SetImageData(16);
    //Et la deuxieme shade
    mainShade.SetHue(mainShade.hue + 60);
    CreateARow();
    ChangePreviewColour(3);
    await SetImageData(32);

    //On applique a l'image
    let imageData = new ImageData(mainColors, mainRow.length);
    mainContext.putImageData(imageData, 0, 0);

}

async function CreateComplementaryPalette() {
    //On fait un canvas de la bonne taille
    await CreateCanvas(2);

    //On se recupere la couleur de l'utilisateur
    GetMainShade();
    //On fait un premier row
    CreateARow();
    ChangePreviewColour(1);
    //On "imprime"
    await SetImageData(0);

    //On passe sur l'autre shade
    mainShade.SetHue(mainShade.hue + 180);
    CreateARow();
    ChangePreviewColour(2);
    await SetImageData(16);

    //On applique a l'image
    let imageData = new ImageData(mainColors, mainRow.length);
    mainContext.putImageData(imageData, 0, 0);

}

async function CreateSplitComplementaryPalette() {
    //On fait un canvas de la bonne taille
    await CreateCanvas(3);

    //On se recupere la couleur de l'utilisateur
    GetMainShade();
    //On fait un premier row
    CreateARow();
    ChangePreviewColour(1);
    //On "imprime"
    await SetImageData(0);

    //On passe sur la shade suivante
    mainShade.SetHue(mainShade.hue + 150);
    CreateARow();
    ChangePreviewColour(2);
    await SetImageData(16);
    //Et la deuxieme shade
    mainShade.SetHue(mainShade.hue + 60);
    CreateARow();
    ChangePreviewColour(3);
    await SetImageData(32);

    //On applique a l'image
    let imageData = new ImageData(mainColors, mainRow.length);
    mainContext.putImageData(imageData, 0, 0);
}

async function CreateTriadicPalette() {
    //On fait un canvas de la bonne taille
    await CreateCanvas(3);

    //On se recupere la couleur de l'utilisateur
    GetMainShade();
    //On fait un premier row
    CreateARow();
    ChangePreviewColour(1);
    //On "imprime"
    await SetImageData(0);

    //On passe sur la shade suivante
    mainShade.SetHue(mainShade.hue + 120);
    CreateARow();
    ChangePreviewColour(2);
    await SetImageData(16);
    //Et la deuxieme shade
    mainShade.SetHue(mainShade.hue + 120);
    CreateARow();
    ChangePreviewColour(3);
    await SetImageData(32);

    //On applique a l'image
    let imageData = new ImageData(mainColors, mainRow.length);
    mainContext.putImageData(imageData, 0, 0);

}

async function CreateTetradicPalette() {
    //On fait un canvas de la bonne taille
    await CreateCanvas(4);

    //On se recupere la couleur de l'utilisateur
    GetMainShade();
    //On fait un premier row
    CreateARow();
    ChangePreviewColour(1);
    //On "imprime"
    await SetImageData(0);

    //On passe sur la shade suivante
    mainShade.SetHue(mainShade.hue + 90);
    CreateARow();
    ChangePreviewColour(2);
    await SetImageData(16);

    mainShade.SetHue(mainShade.hue + 90);
    CreateARow();
    ChangePreviewColour(3);
    await SetImageData(32);

    mainShade.SetHue(mainShade.hue + 90);
    CreateARow();
    ChangePreviewColour(4);
    await SetImageData(48);

    //On applique a l'image
    let imageData = new ImageData(mainColors, mainRow.length);
    mainContext.putImageData(imageData, 0, 0);

}

async function CreateCanvas(h) {
    if (mainCanvas != undefined) mainCanvas.remove();
    ShowRows(h);

    mainCanvas = document.createElement('canvas');
    mainCanvas.width = currentRampLength * 2 + 2;
    mainCanvas.height = h;
    mainContext = mainCanvas.getContext('2d');
    mainColors = new Uint8ClampedArray((mainCanvas.width * mainCanvas.height) * 4);
}

function GetMainShade() {
    var shadeHex = previewSquare.value;
    mainShade = new Shade(0, 0, 0);
    mainShade.FromHex(shadeHex);
}

function CreateARow() {
    InitializeRow();
    GetMainShadeIndex();
    SetRowHue();
    SetRowSaturation();
    SetRowValue();
}

async function SetImageData(offset) {
    for (var i = 0; i < mainRow.length * 4; i += 4) {
        var rgbCode = mainRow[i / 4].ToRGB();
        mainColors[i + offset + 0] = rgbCode[0];
        mainColors[i + offset + 1] = rgbCode[1];
        mainColors[i + offset + 2] = rgbCode[2];
        mainColors[i + offset + 3] = 255;
    }
}

function InitializeRow() {
    if (currentRampLength == 1) mainRow = [new Shade(0, 0, 0), new Shade(0, 0, 0),
    new Shade(0, 0, 0), new Shade(0, 0, 0)];
    else if (currentRampLength == 2) mainRow = [new Shade(0, 0, 0), new Shade(0, 0, 0),
    new Shade(0, 0, 0), new Shade(0, 0, 0), new Shade(0, 0, 0), new Shade(0, 0, 0)];
    else if (currentRampLength == 3) mainRow = [new Shade(0, 0, 0), new Shade(0, 0, 0),
    new Shade(0, 0, 0), new Shade(0, 0, 0), new Shade(0, 0, 0), new Shade(0, 0, 0),
    new Shade(0, 0, 0), new Shade(0, 0, 0)];
}

function GetMainShadeIndex() {
    var rampLength = currentRampLength * 2 + 2;
    upperValueLimit = ValueFormula(rampLength);
    var currentLimit;

    for (i = 0; i < rampLength; i++) {
        currentLimit = NormalizedFormula(i);
        if (mainShade.value <= currentLimit) {
            mainIndex = i;
            return;
        }
    }
    mainIndex = 4;
}

function SetRowHue() {
    var hueStep = currentHueShift * 6;
    var tempStep;
    if (currentTemperature == 1) {
        if (mainShade.hue < 180) tempStep = 1;
        else tempStep = -1;
    }
    else {
        if (mainShade.hue < 180) tempStep = -1;
        else tempStep = 1;
    }

    for (var i = 0; i < mainRow.length; i++) {
        mainRow[i].SetHue(mainShade.hue +
            (i - mainIndex) * tempStep * hueStep);
    }
}

function SetRowSaturation() {
    var halfIndex;
    if (mainIndex >= mainRow.length / 2) {
        halfIndex = (mainRow.length - 1) - mainIndex;
    }
    else halfIndex = mainIndex;

    var satStep = Math.pow(4, 1 / currentRampLength);
    var satBuffer;

    for (i = 0; i < mainRow.length / 2; i++) {
        if (i <= halfIndex) {
            satBuffer = (mainShade.saturation / satStep) * (halfIndex - i);
        }
        else {
            satBuffer = (mainShade.saturation * satStep) * (i - halfIndex);
        }
        mainRow[i].SetSaturation(satBuffer);
        mainRow[mainRow.length - 1 - i].SetSaturation(satBuffer);
    }
}

function SetRowValue() {
    var mainValueDelta = (mainShade.value - NormalizedFormula(mainIndex))
    / (NormalizedFormula(mainIndex + 1) - NormalizedFormula(mainIndex));
    var valBuffer;

    for(i = 0; i < mainRow.length; i++){
        valBuffer = mainValueDelta * (NormalizedFormula(i + 1) - NormalizedFormula(i))
        + NormalizedFormula(i);
        mainRow[i].SetValue(valBuffer);
    }
}

function ValueFormula(i) {
    return .18 * i + .3;
}

function NormalizedFormula(i) {
    return ValueFormula(i) / upperValueLimit;
}