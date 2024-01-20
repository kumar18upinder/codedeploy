import { Request, Response, NextFunction } from "express";
import { AUTH, EXCEPTION_HANDLER } from "../lib";
import { CONSTANT } from "../config";
import { AdminModel } from "../models";
import LoginHistoryManager from "../modules/LoginHistory/LoginHistory.Manager";

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const payload = await verifyAuth(req, next);
    
    if(payload.type !== CONSTANT.USER_TYPE.ADMIN) {
      throw new EXCEPTION_HANDLER.CustomException(CONSTANT.MESSAGES.FORBIDDEN, CONSTANT.HTTP_CODE.FORBIDDEN);
    }
    
    // req.body.auth = payload;
    (req as any).auth = payload;
  
    next();
  }
  catch(err) {
    next(err);
  }
}

export const isOrg = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const payload = await verifyAuth(req, next);
    
    if(payload.type !== CONSTANT.USER_TYPE.ORGANISATION) {
      throw new EXCEPTION_HANDLER.CustomException(CONSTANT.MESSAGES.FORBIDDEN, CONSTANT.HTTP_CODE.FORBIDDEN)
    }
  
    // req.body.auth = payload;

    (req as any).auth = payload;

    next();
  }
  catch(err) {
    next(err);
  }
}

export const gqIsOrg = async (headers: any) => {

  try {

    const payload = await verifyAuth({headers});
    
    if(payload.type !== CONSTANT.USER_TYPE.ORGANISATION) {
      throw new EXCEPTION_HANDLER.CustomException(CONSTANT.MESSAGES.FORBIDDEN, CONSTANT.HTTP_CODE.FORBIDDEN)
    }
    
    return payload
  }
  catch(err) {
    throw err;
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const payload = await verifyAuth(req, next);

    // req.body.auth = payload;

    (req as any).auth = payload;

    next();
  }
  catch(err) {
    next(err);
  }
};

const verifyAuth = async (req: any, next?: NextFunction) => {

  try {

    if (!req.headers.authorization) {
      throw new EXCEPTION_HANDLER.CustomException(CONSTANT.MESSAGES.UNAUTHORIZED_USER, CONSTANT.HTTP_CODE.NOT_AUTHORIZED)
    }

    let token = req.headers.authorization.split(" ").pop();

    let payload: any = await AUTH.verifyToken(String(token));

    if (!payload) {
      throw new EXCEPTION_HANDLER.CustomException(CONSTANT.MESSAGES.UNAUTHORIZED_USER, CONSTANT.HTTP_CODE.NOT_AUTHORIZED)
    }

    let userDetails: any = await AdminModel.findOne({ email: payload.email });
    
    userDetails = await LoginHistoryManager.isLoggedIn({
      userId: userDetails._id,
      type: userDetails.type,
      isLogin: true,
    });

    if (!userDetails) {
      throw new EXCEPTION_HANDLER.CustomException(CONSTANT.MESSAGES.UNAUTHORIZED_USER, CONSTANT.HTTP_CODE.NOT_AUTHORIZED)
    }

    return userDetails;
  }
  catch(err) {

    if(next) {
      next(err);
    }

    throw err;
  }
}
