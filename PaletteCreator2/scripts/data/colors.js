class Shade{
    //Entre 0 et 359
    #hue;

    //Entre 0 et 1
    #saturation;

    //Entre 0 et 1
    #value;
    
    constructor(h, s, v){
        this.#hue = (h + 720) % 360;
        this.#saturation = s;
        this.#value = v;
    }
}

class PremadeColor{
    #name;
    #shade;

    constructor(n, h, s, v){
        this.#name = n;
        this.#shade = new Shade(h, s, v);
    }
}

class PremadeList{

}