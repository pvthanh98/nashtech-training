import { Router, Request, Response, NextFunction } from "express";
import passport from "../configs/passport.config";
import { RequestCustom } from "../interfaces/common.interface";
import schemas from "../joi-schema/index.schema";
import validatorMiddleware from '../middlewares/validator.middleware';
import ConversationService from "../services/conversation.service";

class ConversationController {
    public path: string = '/conversation';
    public router: Router = Router();
    public service: ConversationService;

    constructor() {
        this.intializeRoutes();
        this.service = new ConversationService();
    }

    /** Initialize routes */
    public intializeRoutes() {
        /** Create animals */
        this.router.post(
            this.path,
            passport.authenticate('jwt', { session: false }),
            validatorMiddleware(schemas.createConversations),
            this.createConversation
        );
    }

    createConversation = async (req: RequestCustom, res: Response, next: NextFunction) => {
        const { err, data } = await this.service.createConversation(req.body, req.user._id);
        if (err) return res.status(err.statusCode).send(err);
        return res.send(data);
    }
}

export default ConversationController;