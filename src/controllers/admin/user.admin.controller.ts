import { Router, Request, Response, NextFunction } from "express";
import passport from '../../configs/passport.config';
import UserAdminService from "../../services/admin/user.admin.service";
import IsAdminMiddleware from '../../middlewares/is-admin.middleware';

/** Example of DI (Dependency Injection) - Property Injection */
class UserAdminController {
    public path: string = '/admin/user';
    public router: Router = Router();
    private service : UserAdminService;

    constructor(){
        this.intializeRoutes();
        this.service = new UserAdminService(); /** This Property DI  */
    }

    /** Initialize routes */
    public intializeRoutes() {  
        /** Get user */
        this.router.get(
            this.path,
            passport.authenticate('jwt', { session: false }),
            IsAdminMiddleware,
            this.getUsers
        ),
        
        /** BLock Unblock */
        this.router.put(
            `${this.path}/block-unblock/:userId`,
            passport.authenticate('jwt', { session: false }),
            IsAdminMiddleware,
            this.blockUnblockUser
        )
    }

    getUsers = async (req: Request, res: Response, next: NextFunction) => {
        const {err, data} = await this.service.getUsers(req.query);
        if (err) return res.status(err.statusCode).send(err);
        return res.send(data)
    }

    blockUnblockUser = async (req: Request, res: Response, next: NextFunction) => {
        const {err, data} = await this.service.blockUnblockUser(req.params.userId);
        if (err) return res.status(err.statusCode).send(err);
        return res.send(data)
    }
}

export default UserAdminController;