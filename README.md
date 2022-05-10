# DI Example Project
DI is presented at :
- src/utils.human.util
- src/controller/animal.controller.ts
- src/controller/human.controller.ts

## src/utils.human.util
```typescript
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
```

## src/controller/animal.controller.ts
```typescript
import { Router, Request, Response, NextFunction } from "express";
import validatorMiddleware from '../middlewares/validator.middleware';
import schemas from '../joi-schema/index.schema';
import AnimalService from '../services/animal.service';

/** Example of DI (Dependency Injection) - Property Injection */
class AnimalController {
    public path: string = '/animal';
    public router: Router = Router();
    private service : AnimalService;

    constructor(){
        this.intializeRoutes();
        this.service = new AnimalService(); /** This Property DI  */
    }

    /** Initialize routes */
    public intializeRoutes() {  
        /** Create animals */
        this.router.post(
            this.path, 
            validatorMiddleware(schemas.createAnimal),
            this.createAnimal
        );

        /** Get animal */
        this.router.get(
            this.path,
            this.getAnimal
        )
    }

    createAnimal = (req: Request, res: Response, next: NextFunction) => {
        const {err, data} = this.service.createAnimal(req.body);
        if (!err) {
            return res.send(data)
        }
        return res.send(err)
    }

    getAnimal = (req: Request, res: Response, next: NextFunction) => {
        const {err, data} = this.service.getAnimals()
        if (!err) {
            return res.send(data)
        }
        return res.send(err)
    }
}

export default AnimalController;

```

## src/controller/human.controller.ts
```typescript
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
            return res.send(humanControlUtil.generateNickName());
        } else 
            return res.status(400).send(ErrorTemplate.Employee.EMPLOYEE_NOT_EXIST);
    }
}

export default HumanController;
```