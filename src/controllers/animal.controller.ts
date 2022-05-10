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