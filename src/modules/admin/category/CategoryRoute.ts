import { Request, Response, Router } from "express";
import * as VALIDATE from "./validator";
import ResponseHandler from "../../ResponseHandler";
import CategoryController from "./CategoryController";
import { isOrg } from "../../../middlewares/Auth.Middleware";
import { validateInput } from "../../BaseValidator";

const router = Router();

export default router

    .use([ isOrg ])
    
    .get("/", [ validateInput(VALIDATE.list) ], async (req: Request, res: Response) => {
        return CategoryController.list(req.query, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .get("/:id", [ validateInput(VALIDATE.detail) ], async (req: Request, res: Response) => {
        return CategoryController.detail({ ...req.query, ...req.params }, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .post("/", [ validateInput(VALIDATE.add) ], async (req: Request, res: Response) => {
        return CategoryController.add(req.body, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .patch("/update/:id", [ validateInput(VALIDATE.update) ], async (req: Request, res: Response) => {
        return CategoryController.update({ ...req.params, ...req.body }, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .patch("/status/:id", [ validateInput(VALIDATE.updateParam) ], async (req: Request, res: Response) => {
        return CategoryController.updateStatus({ ...req.params, ...req.body }, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .delete("/:id", [ validateInput(VALIDATE.remove) ], async (req: Request, res: Response) => {
        return CategoryController.remove(req.params, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })