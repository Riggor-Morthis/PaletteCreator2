class Shade {
    //Entre 0 et 359
    hue;

    //Entre 0 et 1
    saturation;

    //Entre 0 et 1
    value;

    constructor(h, s, v) {
        this.hue = (h + 720) % 360;
        this.saturation = s;
        this.value = v;
    }

    ToHex() {
        var rgb = [0, 0, 0];

        var C = this.value * this.saturation;
        var X = C * (1 - Math.abs((this.hue / 60) % 2 - 1));
        var m = this.value - C;

        if (this.hue < 60) rgb = [C, X, 0];
        else if (this.hue < 120) rgb = [X, C, 0];
        else if (this.hue < 180) rgb = [0, C, X];
        else if (this.hue < 240) rgb = [0, X, C];
        else if (this.hue < 300) rgb = [X, 0, C];
        else rgb = [C, 0, X];

        var RGB = [(rgb[0] + m) * 255, (rgb[1] + m) * 255, (rgb[2] + m) * 255];
        RGB = [this.Clamp(Math.round(RGB[0]), 0, 255),
        this.Clamp(Math.round(RGB[1]), 0, 255),
        this.Clamp(Math.round(RGB[2]), 0, 255)];

        var rString = RGB[0].toString(16);
        if (rString.length < 2) rString = "0" + rString;
        var gString = RGB[1].toString(16);
        if (gString.length < 2) gString = "0" + gString;
        var bString = RGB[2].toString(16);
        if (bString.length < 2) bString = "0" + bString;


        return "#" + rString + gString + bString;
    }

    ToRGB(){
        var rgb = [0, 0, 0];

        var C = this.value * this.saturation;
        var X = C * (1 - Math.abs((this.hue / 60) % 2 - 1));
        var m = this.value - C;

        if (this.hue < 60) rgb = [C, X, 0];
        else if (this.hue < 120) rgb = [X, C, 0];
        else if (this.hue < 180) rgb = [0, C, X];
        else if (this.hue < 240) rgb = [0, X, C];
        else if (this.hue < 300) rgb = [X, 0, C];
        else rgb = [C, 0, X];

        var RGB = [(rgb[0] + m) * 255, (rgb[1] + m) * 255, (rgb[2] + m) * 255];

        return RGB;
    }

    FromHex(hex) {
        var r1 = hex[1] + hex[2];
        var g1 = hex[3] + hex[4];
        var b1 = hex[5] + hex[6];
        var r = parseInt(r1, 16);
        var g = parseInt(g1, 16);
        var b = parseInt(b1, 16);

        this.FromRgb(r, g, b);
    }

    FromRgb(r, g, b) {
        var r1 = this.Clamp(r, 0, 255) / 255;
        var g1 = this.Clamp(g, 0, 255) / 255;
        var b1 = this.Clamp(b, 0, 255) / 255;

        var cMax = Math.max(r1, g1, b1);
        var cMin = Math.min(r1, g1, b1);
        var delta = cMax - cMin;

        if (delta == 0) this.hue = 0;
        else if (cMax == r1)
            this.hue = 60 * (((g1 - b1) / delta) % 6);
        else if (cMax == b1)
            this.hue = 60 * (((b1 - r1) / delta) + 2);
        else if (cMax == g1)
            this.hue = 60 * (((r1 - g1) / delta) + 4);
            
        this.hue = (this.hue + 720) % 360;

        if (cMax == 0) this.saturation = 0;
        else this.saturation = delta / cMax;

        this.value = cMax;
    }

    Clamp(num, min, max) {
        if (num < min) return min;
        else if (num > max) return max;
        else return num;
    }

    SetHue(h){
        this.hue = (h + 720) % 360;
    }
}

class PremadeColor {
    name;
    shade;

    constructor(n, h, s, v) {
        this.name = n;
        this.shade = new Shade(h, s, v);
    }
}

class PremadeList {
    static reds = [
        new PremadeColor('Apple', 344, 1.0, 0.74),
        new PremadeColor('Bittersweetshimmer', 358, 0.58, 0.07),
        new PremadeColor('Blood', 0, 1.0, 0.4),
        new PremadeColor('Carmine', 350, 1.0, 0.58),
        new PremadeColor('ChocolateCosmos', 352, 0.8, 0.34),
        new PremadeColor('Cordovan', 355, 0.54, 0.53),
        new PremadeColor('Indian', 0, 0.55, 0.8),
        new PremadeColor('LightRed', 0, 0.5, 1.0),
        new PremadeColor('Munsell', 345, 1.0, 0.94),
        new PremadeColor('Oldrose', 359, 0.33, 0.75),
        new PremadeColor('Red', 0, 1.0, 1.0),
        new PremadeColor('Redwood', 4, 0.49, 0.64),
        new PremadeColor('Rosewood', 353, 1.0, 0.39)
    ];
    static yellows = [
        new PremadeColor('Beige', 60, 0.1, 0.96),
        new PremadeColor('Burnt', 27, 1.0, 0.74),
        new PremadeColor('Crayola', 18, 0.78, 1.0),
        new PremadeColor('GreenishYellow', 58, 0.58, 0.93),
        new PremadeColor('Khaki', 37, 0.25, 0.76),
        new PremadeColor('Kobicha', 27, 0.67, 0.41),
        new PremadeColor('RedBrown', 0, 0.74, 0.64),
        new PremadeColor('Taupe', 27, 0.3, 0.28),
        new PremadeColor('Yellow', 60, 1.0, 1.0)
    ];
    static greens = [
        new PremadeColor('Celadon', 123, 0.23, 0.88),
        new PremadeColor('Dark', 120, 1.0, 0.39),
        new PremadeColor('Fern', 105, 0.45, 0.47),
        new PremadeColor('Green', 120, 1.0, 1.0),
        new PremadeColor('Honeydew', 120, 0.05, 1.0),
        new PremadeColor('Islamic', 120, 1.0, 0.56),
        new PremadeColor('Kombu', 103, 0.27, 0.25),
        new PremadeColor('Light', 120, 0.39, 0.93),
        new PremadeColor('MSU', 166, 0.65, 0.27),
        new PremadeColor('Mantis', 110, 0.48, 0.76),
        new PremadeColor('Olive', 60, 1.0, 0.5),
        new PremadeColor('SGBUS', 107, 0.76, 0.86),
        new PremadeColor('Sap', 92, 0.66, 0.49)
    ];
    static blues = [
        new PremadeColor('Aqua', 180, 1.0, 1.0),
        new PremadeColor('Blue', 240, 1.0, 1.0),
        new PremadeColor('Celeste', 180, 0.3, 1.0),
        new PremadeColor('Charlestongreen', 180, 0.18, 0.16),
        new PremadeColor('DarkCyan', 180, 1.0, 0.54),
        new PremadeColor('Electric', 182, 0.5, 1.0),
        new PremadeColor('InternationalKleinBlue', 243, 0.93, 0.56),
        new PremadeColor('LightSeaGreen', 176, 0.82, 0.69),
        new PremadeColor('Neon', 240, 0.69, 1.0),
        new PremadeColor('Periwinkle', 240, 0.2, 1.0),
        new PremadeColor('Savoy', 230, 0.64, 0.81),
        new PremadeColor('SpaceCadet', 227, 0.63, 0.32),
        new PremadeColor('Spanish', 204, 1.0, 0.73),
        new PremadeColor('Teal', 193, 0.6, 0.53),
        new PremadeColor('Turquoise', 174, 0.71, 0.87),
        new PremadeColor('Web', 180, 0.05, 1.0)
    ];
    static purples = [
        new PremadeColor('AfricanViolet', 287, 0.3, 0.74),
        new PremadeColor('Amaranth', 341, 0.77, 0.67),
        new PremadeColor('AmericanPink', 359, 0.4, 1.0),
        new PremadeColor('ChineseViolet', 295, 0.29, 0.53),
        new PremadeColor('Dark', 291, 0.51, 0.2),
        new PremadeColor('EnglishViolet', 288, 0.34, 0.36),
        new PremadeColor('Finn', 300, 0.53, 0.4),
        new PremadeColor('LightDeepPink', 318, 0.63, 1.0),
        new PremadeColor('LustyGallant', 0, 0.2, 1.0),
        new PremadeColor('Munsell', 288, 1.0, 0.77),
        new PremadeColor('Pink', 349, 0.24, 1.0),
        new PremadeColor('Purple', 300, 1.0, 1.0),
        new PremadeColor('Razzledazzlerose', 315, 0.8, 1.0),
        new PremadeColor('Rebecca', 270, 0.66, 0.6),
        new PremadeColor('Thistle', 300, 0.11, 0.84),
        new PremadeColor('Violet', 300, 0.45, 0.93)
    ];
    static grays = [
        new PremadeColor('Ash', 135, 0.06, 0.74),
        new PremadeColor('Battleship', 60, 0.01, 0.51),
        new PremadeColor('Cadet', 205, 0.17, 0.69),
        new PremadeColor('Cinereous', 12, 0.19, 0.59),
        new PremadeColor('Davy\'s', 0, 0.0, 0.33),
        new PremadeColor('Glaucous', 216, 0.47, 0.71),
        new PremadeColor('Grey', 0, 0.0, 0.5),
        new PremadeColor('Marengo', 212, 0.25, 0.4),
        new PremadeColor('RoseQuartz', 303, 0.1, 0.66),
        new PremadeColor('Silver', 0, 0.0, 0.75),
        new PremadeColor('Xanadu', 135, 0.14, 0.52)
    ];

    static mainList = [this.reds, this.yellows, this.greens,
    this.blues, this.purples, this.grays];
}