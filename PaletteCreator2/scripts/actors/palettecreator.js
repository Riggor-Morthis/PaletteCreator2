var mainShade;
var mainIndex;
var mainRow;
var mainCanvas;
var mainContext;
var mainColors;

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
    let imageData = new ImageData(mainColors, 4);
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
    let imageData = new ImageData(mainColors, 4);
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
    let imageData = new ImageData(mainColors, 4);
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
    let imageData = new ImageData(mainColors, 4);
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
    let imageData = new ImageData(mainColors, 4);
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
    let imageData = new ImageData(mainColors, 4);
    mainContext.putImageData(imageData, 0, 0);

}

async function CreateCanvas(h) {
    if (mainCanvas != undefined) mainCanvas.remove();
    ShowRows(h);

    mainCanvas = document.createElement('canvas');
    mainCanvas.width = 4;
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
    for (var i = 0; i < 16; i += 4) {
        var rgbCode = mainRow[i / 4].ToRGB();
        mainColors[i + offset + 0] = rgbCode[0];
        mainColors[i + offset + 1] = rgbCode[1];
        mainColors[i + offset + 2] = rgbCode[2];
        mainColors[i + offset + 3] = 255;
    }
}

function InitializeRow() {
    mainRow = [new Shade(0, 0, 0), new Shade(0, 0, 0),
    new Shade(0, 0, 0), new Shade(0, 0, 0)];
}

function GetMainShadeIndex() {
    if (mainShade.value < .45) mainIndex = 0;
    else if (mainShade.value < .7) mainIndex = 1;
    else if (mainShade.value < .88) mainIndex = 2;
    else mainIndex = 3;
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

    for (var i = 0; i < 4; i++) {
        mainRow[i].SetHue(mainShade.hue +
            (i - mainIndex) * tempStep * hueStep);
    }
}

function SetRowSaturation() {
    switch (mainIndex) {
        case 0:
        case 3:
            if (mainShade.saturation > .8) {
                mainRow[0].SetSaturation(mainShade.saturation);
                mainRow[1].SetSaturation(mainShade.saturation / 4);
                mainRow[2].SetSaturation(mainShade.saturation / 4);
                mainRow[3].SetSaturation(mainShade.saturation);
            }
            else {
                mainRow[0].SetSaturation(mainShade.saturation);
                mainRow[1].SetSaturation(mainShade.saturation * 4);
                mainRow[2].SetSaturation(mainShade.saturation * 4);
                mainRow[3].SetSaturation(mainShade.saturation);
            }

            break;
        case 1:
        case 2:
            if (mainShade.saturation < .1) {
                mainRow[0].SetSaturation(mainShade.saturation * 4);
                mainRow[1].SetSaturation(mainShade.saturation);
                mainRow[2].SetSaturation(mainShade.saturation);
                mainRow[3].SetSaturation(mainShade.saturation * 4);
            }
            else {
                mainRow[0].SetSaturation(mainShade.saturation / 4);
                mainRow[1].SetSaturation(mainShade.saturation);
                mainRow[2].SetSaturation(mainShade.saturation);
                mainRow[3].SetSaturation(mainShade.saturation / 4);
            }
            break;
    }
}

function SetRowValue() {
    switch (mainIndex) {
        case 0:
            var deltaVal = mainShade.value / .45;

            mainRow[0].SetValue(mainShade.value);
            var tempVal = deltaVal * .25 + .45;
            mainRow[1].SetValue(tempVal);
            tempVal = deltaVal * .18 + .7;
            mainRow[2].SetValue(tempVal);
            tempVal = deltaVal * .12 + .88;
            mainRow[3].SetValue(tempVal);
            break;
        case 1:
            var deltaVal = (mainShade.value - .45) / .25;

            var tempVal = deltaVal * .45;
            mainRow[0].SetValue(tempVal);
            mainRow[1].SetValue(mainShade.value);
            tempVal = deltaVal * .18 + .7;
            mainRow[2].SetValue(tempVal);
            tempVal = deltaVal * .12 + .88;
            mainRow[3].SetValue(tempVal);
            break;
        case 2:
            var deltaVal = (mainShade.value - .7) / .18;

            var tempVal = deltaVal * .45;
            mainRow[0].SetValue(tempVal);
            tempVal = deltaVal * .25 + .45;
            mainRow[1].SetValue(tempVal);
            mainRow[2].SetValue(mainShade.value);
            tempVal = deltaVal * .12 + .88;
            mainRow[3].SetValue(tempVal);
            break;
        case 3:
            var deltaVal = (mainShade.value - .88) / .12;

            var tempVal = deltaVal * .45;
            mainRow[0].SetValue(tempVal);
            tempVal = deltaVal * .25 + .45;
            mainRow[1].SetValue(tempVal);
            tempVal = deltaVal * .18 + .7;
            mainRow[2].SetValue(tempVal);
            mainRow[3].SetValue(mainShade.value);
            break;
    }
}