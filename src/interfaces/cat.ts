import Animal from "./animal";

class Cat extends Animal {
    constructor(name: string, old: number){
        super(name, old)
    }

    public speak(): string {
        return "Meo Meo";
    }
}

export default Cat;