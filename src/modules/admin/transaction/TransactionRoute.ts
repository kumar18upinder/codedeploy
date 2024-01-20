import { Request, Response, Router } from "express";
import Validator from "express-joi-validation";
import * as VALIDATE from "./validator";
import ResponseHandler from "../../ResponseHandler";
import TransactionController from "./TransactionController";
import { isOrg } from "../../../middlewares/Auth.Middleware";
import { validateInput } from "../../BaseValidator";

const router = Router();

export default router

    .use([ isOrg ])
    
    .get("/", [ validateInput(VALIDATE.list) ], async (req: Request, res: Response) => {
        return TransactionController.list({ ...req.query, ...req.params }, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .get("/:id", [ validateInput(VALIDATE.detail) ], async (req: Request, res: Response) => {
        return TransactionController.detail({ ...req.query, ...req.params }, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .post("/", [ validateInput(VALIDATE.add) ], async (req: Request, res: Response) => {
        return TransactionController.add(req.body, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .patch("/:id", [ validateInput(VALIDATE.updateParam) ], async (req: Request, res: Response) => {
        return TransactionController.update({...req.params, ...req.body}, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .delete("/:id", [ validateInput(VALIDATE.remove) ], async (req: Request, res: Response) => {
        return TransactionController.remove(req.params, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })
