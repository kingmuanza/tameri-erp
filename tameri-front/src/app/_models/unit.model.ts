export class Unit {
    static DISTANCE = 1;
    static VOLUME = 2;
    static MASSE = 3;

    id = '';
    symbole = '';
    label = '';
    type = 0;

    constructor(symbole: string, label: string, type: number) {
        this.id = symbole;
        this.symbole = symbole;
        this.label = label;
        this.type = type;
    }

}