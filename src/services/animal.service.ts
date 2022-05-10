import Animal from "../types/animal";

class AnimalService {
    animals : Array<Animal> = [];
    public createAnimal = (animalData: Animal) => {
        this.animals.push(animalData)
        return {
            err: null,
            data: animalData
        };
    }

    public getAnimals = () => {
        return {
            err: null,
            data: this.animals
        };
    }
}

export default AnimalService