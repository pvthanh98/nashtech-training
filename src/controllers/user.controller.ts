import { Router, Request, Response, NextFunction } from "express";
import passport from '../configs/passport.config';
import UserService from "../services/user.service";

/** Example of DI (Dependency Injection) - Property Injection */
class UserController {
    public path: string = '/user';
    public router: Router = Router();
    private service : UserService;

    constructor(){
        this.intializeRoutes();
        this.service = new UserService(); /** This Property DI  */
    }

    /** Initialize routes */
    public intializeRoutes() {  
        /** Get user */
        this.router.get(
            this.path,
            passport.authenticate('jwt', { session: false }),
            this.getUsers
        )
        
    }

    getUsers = async (req: any, res: Response, next: NextFunction) => {
        const {err, data} = await this.service.getUsers(req.query, req.user.id);
        if (err) return res.status(err.statusCode).send(err);
        return res.send(data)
    }
}

export default UserController;