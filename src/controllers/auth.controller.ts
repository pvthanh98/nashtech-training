import { Router, Request, Response, NextFunction } from "express";
import validatorMiddleware from '../middlewares/validator.middleware';
import schemas from '../joi-schema/index.schema';
import AuthService from '../services/auth.service';
import passport from '../configs/passport.config';
import { RequestCustom } from "../interfaces/common.interface";
 
/** Example of DI (Dependency Injection) - Property Injection */
class AuthController {
    public path = {
        signin: '/auth/sign-in',
        signup: '/auth/register',
        privateRouteTesting: '/auth/private/'
    };
    public router: Router = Router();
    private service : AuthService;

    constructor(){
        this.intializeRoutes();
        this.service = new AuthService();
    }

    /** Initialize routes */
    public intializeRoutes() {  
        /** Signup Path */
        this.router.post(
            this.path.signup, 
            validatorMiddleware(schemas.userRegister),
            this.userRegister
        );

        this.router.post(
            this.path.signin, 
            validatorMiddleware(schemas.signIn),
            this.userSignIn
        );

        this.router.get(
            this.path.privateRouteTesting, 
            passport.authenticate('jwt', { session: false }),
            this.privateRouteTesting
        );
    }

    userRegister = async (req: Request, res: Response, next: NextFunction) => {
        const {err, data} = await this.service.userRegister(req.body);
        if (err) return res.status(400).send(err);
        return res.send(data);
    }

    userSignIn = async (req: Request, res: Response, next: NextFunction) => {
        const {err, data} = await this.service.userSignIn(req.body);
        if (err) return res.status(err.statusCode).send(err);
        return res.send(data);
    }

    privateRouteTesting = (req: RequestCustom, res: Response, next: NextFunction) => {
        return res.send(req.user);
    }
}

export default AuthController;