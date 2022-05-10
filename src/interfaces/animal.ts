abstract class Animal {
    private name: string; 
    private old: number; 

    constructor (name: string, old: number){
        this.name = name;
        this.old = old;
    }

    abstract speak(): string;
}

export default Animal