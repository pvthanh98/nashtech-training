import Employee from "./employee";

class MobileSeller extends Employee {
    private jobTitle = 'Mobile Seller';
    private sell: number = 0;
    constructor (name: string, old: number, address: string, staffId: string){
        super(name, old, address, staffId);
    }

    public getJobTitle = (): string => {
        return this.jobTitle;
    }

    public setSell(sell: number): number {
        this.sell = sell;
        return this.sell;
    }

    public getSells = (): number => {
        return this.sell;
    }

}

export default MobileSeller;