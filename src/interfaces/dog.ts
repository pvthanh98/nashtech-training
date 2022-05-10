import Animal from "./animal";

class Dog extends Animal {
    constructor(name: string, old: number){
        super(name, old)
    }

    public speak(): string {
        return "Gau Gau Gau";
    }
}

export default Dog;