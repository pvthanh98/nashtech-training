abstract class Employee {
    private name: string; 
    private old: number; 
    private address: string;
    private staffId: string;
    private timeKeeping: number;
   
    constructor (name: string, old: number, address: string, staffId: string){
        this.name = name;
        this.old = old;
        this.address = address;
        this.staffId = staffId;
        this.timeKeeping = 0;
    }

    abstract getJobTitle(): string;


    /** getter and setter... */
    public setStaffId = (staffId: string): string => {
        this.staffId = staffId;
        return staffId;
    }

    public getStaffId = (): string => {
        return this.staffId;
    }

    public setTimeKeeping = (): number => {
        this.timeKeeping += 1;
        return this.timeKeeping;
    }

    public getTimeKeeping = (): number => {
        return this.timeKeeping;
    }

    public setName = (name: string): string => {
        this.name = name;
        return name;
    }

    public getName = (): string => {
        return this.name;
    }

    public getOld = (): number => {
        return this.old;
    }

    public setOld = (old: number): number => {
        this.old = old;
        return old;
    }

    public getAddress = (): string => {
        return this.address;
    }

    public setAddress = (address: string): string => {
        this.address = address;
        return address;
    }
    /** ... end getter and setter */
}

export default Employee