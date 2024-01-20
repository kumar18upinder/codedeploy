import { Request, Response, Router } from "express";
import { isOrg } from "../../../middlewares/Auth.Middleware";
import ComboController from "./ComboController";
import ResponseHandler from "../../ResponseHandler";
import { validateInput } from "../../BaseValidator";
import { list, id, add, update } from "./validator";

const router = Router();

export default router

    .use([ isOrg ])
    
    .get("/", [ validateInput(list) ], async (req: Request, res: Response) => {
        return ComboController.list(req.query, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error));
    })

    .get("/view/:id", [ validateInput(id) ], async (req: Request, res: Response) => {
        return ComboController.detail(req.params, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error));
    })

    .post("/", [ validateInput(add) ], async (req: Request, res: Response) => {
        return ComboController.add(req.body, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error));
    })

    .patch("/:id", [ validateInput(update) ], async (req: Request, res: Response) => {
        return ComboController.update({...req.params, ...req.body}, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error));
    })

    .delete("/:id", [ validateInput(id) ], async (req: Request, res: Response) => {
        return ComboController.remove(req.params, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    });