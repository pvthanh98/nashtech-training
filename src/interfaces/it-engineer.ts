import Employee from "./employee";

class ITEngineer extends Employee {
    private jobTitle = 'Software Engineer';
    private projectJoined: number;
    private level: number;
    constructor (name: string, old: number, address: string, staffId: string){
        super(name, old, address, staffId);
        this.projectJoined = 0;
        this.level = 0;
    }

    public getJobTitle = (): string => {
        return this.jobTitle;
    }

    public getProjectJoined = (): number => {
        return this.projectJoined;
    }

    public getLevel = () => {
        return this.level;
    }
}

export default ITEngineer;