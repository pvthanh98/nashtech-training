import { Router, Response, NextFunction } from "express";
import passport from "../configs/passport.config";
import { RequestCustom } from "../interfaces/common.interface";
import schemas from "../joi-schema/index.schema";
import validatorMiddlewares from '../middlewares/validator.middleware';
import UploadService from "../services/upload.service";
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

class UploadController {
    public path: string = '/upload';
    public router: Router = Router();
    public service: UploadService;

    constructor() {
        this.intializeRoutes();
        this.service = new UploadService();
    }

    /** Initialize routes */
    public intializeRoutes() {
        /** Create animals */
        this.router.post(
            this.path,
            passport.authenticate('jwt', { session: false }),
            upload.single('file'),
            // validatorMiddlewares(schemas.createConversations),
            this.upload
        );
    }

    upload = async (req: any, res: Response, next: NextFunction) => {
       console.log(req.file);
       
       return res.send({
           path: `${process.env.HOST}/public/${req.file.filename}`
       })
    }
}

export default UploadController;