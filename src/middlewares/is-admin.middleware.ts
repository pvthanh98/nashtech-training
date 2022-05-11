import { ErrorTemplate } from "../template/error.template";
import { NextFunction, Request, Response } from 'express';

const isAdminMiddleware = (req: Request | any, res: Response, next: NextFunction) => { 
  if(req.user && req.user.isAdmin === true){
    next();
    return;
  }

  return res.status(ErrorTemplate.Permission.ADMIN_REQUIRED.statusCode).send(
    ErrorTemplate.Permission.ADMIN_REQUIRED
  )
}
  

export default isAdminMiddleware;