import ITEmployee from "../interfaces/it-engineer";
import MobileSellerEmployee from "../interfaces/mobile-seller";

/** Classs example for DI */
class HumanControlUtil {
    someone: ITEmployee | MobileSellerEmployee;

    /** Dependency Injection by constructor */
    constructor(someone: ITEmployee | MobileSellerEmployee){
        this.someone = someone;
    }

    /** Dependency Inject by setter */
    public setHuman = (someone: ITEmployee | MobileSellerEmployee): void => {
        this.someone = someone;
    }

    public isHeOrSheOver18 = (): boolean => {
        return (this.someone.getOld() > 18);
    }

    public generateNickName = (): string => {
        return `${this.someone.getJobTitle()} ${Math.floor(Math.random()*10000)}`
    }
}

export default HumanControlUtil;