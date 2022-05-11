import { Router, Request, Response, NextFunction } from "express";
import validatorMiddleware from '../middlewares/validator.middleware';
import schemas from '../joi-schema/index.schema';
import HumanControlUtil from "../utils/human.util";
import ITEngineer from "../interfaces/it-engineer";
import MobileSeller from "../interfaces/mobile-seller";
import { JobTitle } from "../constants/job-title.constant";
import { ErrorTemplate } from "../template/error.template";

/** Example of DI (Dependency Injection) */
class HumanController {
    public path: string = '/nick-name';
    public router: Router = Router();

    constructor(){
        this.intializeRoutes();
    }

    /** Initialize routes */
    public intializeRoutes() {  
        /** Generate nick name route */
        this.router.post(
            this.path, 
            validatorMiddleware(schemas.generateNickName),
            this.generateNickName
        );
    }

    /** DI by constructor */
    generateNickName = (req: Request, res: Response, next: NextFunction) => {
        const { type, name, old, address, staffId } = req.body;
        let employee: ITEngineer | MobileSeller | null = null;

        switch(type){
            /** Check what the job title is, to create an appropriate instance */
            case JobTitle.IT_ENGINEER:
                employee = new ITEngineer(name, old, address, staffId);
                break;
            case JobTitle.MOBILE_SELLER:
                employee = new MobileSeller(name, old, address, staffId)
                break;
        }

        if(employee){
            /** Employee may be an instance of ITEngineer or MobileSeller */
            /** DI is presented in HumanControlUtil class (constructor) */
            const humanControlUtil = new HumanControlUtil(employee);
            const nickname = humanControlUtil.generateNickName();
            return res.send(nickname);
        } else 
            return res.status(400).send(ErrorTemplate.Employee.EMPLOYEE_NOT_EXIST);
    }
}

export default HumanController;