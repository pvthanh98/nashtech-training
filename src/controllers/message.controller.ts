import { Router, Response, NextFunction } from "express";
import passport from "../configs/passport.config";
import { RequestCustom } from "../interfaces/common.interface";
import MessageService from "../services/message.service";

class MessageController {
    public path: string = '/message';
    public router: Router = Router();
    public service: MessageService;

    constructor() {
        this.intializeRoutes();
        this.service = new MessageService();
    }

    /** Initialize routes */
    public intializeRoutes() {
        this.router.get(
            `${this.path}/:conversationId`,
            passport.authenticate('jwt', { session: false }),
            this.getMessages
        );
    }

    getMessages = async (req: RequestCustom, res: Response, next: NextFunction) => {
        const { err, data } = await this.service.getMessage(req.params);
        if (err) return res.status(err.statusCode).send(err);
        return res.send(data);
    }
}

export default MessageController;