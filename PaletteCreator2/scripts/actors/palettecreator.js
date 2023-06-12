var mainShade;
var mainIndex;
var mainRow;
var mainCanvas;
var mainContext;
var mainColors;

async function CreatePalette() {
    if (currentOthers == 1) await CreateSimplePalette();
    else if (currentOthersTypes == 1) await CreateAnalogousPalette();
    else if (currentOthersTypes == 2) await CreateComplementaryPalette();
    else if (currentOthersTypes == 3) await CreateSplitComplementaryPalette();
    else if (currentOthersTypes == 4) await CreateTriadicPalette();
    else if (currentOthersTypes == 5) await CreateTetradicPalette();

    ExportPalette();
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
    //On "imprime"
    await SetImageData(0);
    
    //On veut des couleurs differentes, donc on change l'index de type
    if(currentOthers == 2) currentOthers =3;
    else currentOthers = 2;
    //On passe sur la shade suivante
    mainShade.SetHue(mainShade.hue - 30);
    CreateARow();
    await SetImageData(16);
    //Et la deuxieme shade
    mainShade.SetHue(mainShade.hue + 60);
    CreateARow();
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
    //On "imprime"
    await SetImageData(0);
    
    //On veut des couleurs differentes, donc on change l'index de type
    if(currentOthers == 2) currentOthers =3;
    else currentOthers = 2;
    //On passe sur l'autre shade
    mainShade.SetHue(mainShade.hue + 180);
    CreateARow();
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
    //On "imprime"
    await SetImageData(0);
    
    //On veut des couleurs differentes, donc on change l'index de type
    if(currentOthers == 2) currentOthers =3;
    else currentOthers = 2;
    //On passe sur la shade suivante
    mainShade.SetHue(mainShade.hue + 150);
    CreateARow();
    await SetImageData(16);
    //Et la deuxieme shade
    mainShade.SetHue(mainShade.hue + 60);
    CreateARow();
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
    //On "imprime"
    await SetImageData(0);
    
    //On veut des couleurs differentes, donc on change l'index de type
    if(currentOthers == 2) currentOthers =3;
    else currentOthers = 2;
    //On passe sur la shade suivante
    mainShade.SetHue(mainShade.hue + 120);
    CreateARow();
    await SetImageData(16);
    //Et la deuxieme shade
    mainShade.SetHue(mainShade.hue + 120);
    CreateARow();
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
    //On "imprime"
    await SetImageData(0);
    
    //On veut des couleurs differentes, donc on change l'index de type
    if(currentOthers == 2) currentOthers =3;
    else currentOthers = 2;
    //On passe sur la shade suivante
    mainShade.SetHue(mainShade.hue + 90);
    CreateARow();
    await SetImageData(16);

    if(currentOthers == 2) currentOthers =3;
    else currentOthers = 2;
    mainShade.SetHue(mainShade.hue + 90);
    CreateARow();
    await SetImageData(32);

    if(currentOthers == 2) currentOthers =3;
    else currentOthers = 2;
    mainShade.SetHue(mainShade.hue + 90);
    CreateARow();
    await SetImageData(48);

    //On applique a l'image
    let imageData = new ImageData(mainColors, 4);
    mainContext.putImageData(imageData, 0, 0);

}

async function CreateCanvas(h) {
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
    if (mainShade.value <= .2 - .05 * mainShade.saturation) mainIndex = 0;
    else if (mainShade.value >= .7 &&
        mainShade.saturation <= .1 + .15 * ((mainShade.value - .7) / .3)) mainIndex = 3;
    else if (mainShade.saturation <= mainShade.value) mainIndex = 2;
    else mainIndex = 1;

    if (currentOthers == 2) {
        if (mainIndex != 3) mainIndex++;
    }
    else if (currentOthers == 3) {
        if (mainIndex != 0) mainIndex--;
    }
}

function SetRowHue() {
    var hueStep = currentHueShift * 7;
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
    var ratio = .2 +
        .15 * ((mainShade.saturation * mainShade.value) * mainShade.saturation + 1);

    switch (mainIndex) {
        case 0:
        case 3:
            if (mainShade.saturation >= .8) {
                mainRow[0].saturation = mainShade.saturation;
                mainRow[3].saturation = mainShade.saturation;
                mainRow[1].saturation = mainShade.saturation -
                    mainShade.saturation * ratio;
                mainRow[2].saturation = mainShade.saturation -
                    mainShade.saturation * ratio;
            }
            else {
                mainRow[0].saturation = mainShade.saturation;
                mainRow[3].saturation = mainShade.saturation;
                mainRow[1].saturation = mainShade.saturation +
                    mainShade.saturation * ratio;
                mainRow[2].saturation = mainShade.saturation +
                    mainShade.saturation * ratio;
            }
            break;
        case 1:
        case 2:
            if (mainShade.saturation <= .2) {
                mainRow[1].saturation = mainShade.saturation;
                mainRow[2].saturation = mainShade.saturation;
                mainRow[0].saturation = mainShade.saturation +
                    mainShade.saturation * ratio;
                mainRow[3].saturation = mainShade.saturation +
                    mainShade.saturation * ratio;
            }
            else {
                mainRow[1].saturation = mainShade.saturation;
                mainRow[2].saturation = mainShade.saturation;
                mainRow[0].saturation = mainShade.saturation -
                    mainShade.saturation * ratio;
                mainRow[3].saturation = mainShade.saturation -
                    mainShade.saturation * ratio;
            }
            break;
    }
}

function SetRowValue() {
    switch (mainIndex) {
        case 0:
            var valueStep = mainShade.value / 5;
            mainRow[0].value = mainShade.value;
            mainRow[1].value = mainShade.value + 4 * valueStep;
            mainRow[2].value = mainShade.value + 7 * valueStep;
            mainRow[3].value = mainShade.value + 9 * valueStep;
            break;
        case 1:
            var valueStep = mainShade.value / 9;
            mainRow[0].value = mainShade.value - 4 * valueStep;
            mainRow[1].value = mainShade.value;
            mainRow[2].value = mainShade.value + 3 * valueStep;
            mainRow[3].value = mainShade.value + 5 * valueStep;
            break;
        case 2:
            var valueStep = mainShade.value / 12;
            mainRow[0].value = mainShade.value - 7 * valueStep;
            mainRow[1].value = mainShade.value - 3 * valueStep;
            mainRow[2].value = mainShade.value;
            mainRow[3].value = mainShade.value + 2 * valueStep;
            break;
        case 3:
            var valueStep = mainShade.value / 14;
            mainRow[0].value = mainShade.value - 9 * valueStep;
            mainRow[1].value = mainShade.value - 5 * valueStep;
            mainRow[2].value = mainShade.value - 2 * valueStep;
            mainRow[3].value = mainShade.value;
            break;
    }
}