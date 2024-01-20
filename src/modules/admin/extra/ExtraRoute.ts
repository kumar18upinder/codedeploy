import { Request, Response, Router } from "express";
import { isOrg } from "../../../middlewares/Auth.Middleware";
import ExtraController from "./ExtraController";
import ResponseHandler from "../../ResponseHandler";
import { validateInput } from "../../BaseValidator";
import { list, id, add, update } from "./validator";

const router = Router();

export default router

    .use([ isOrg ])
    
    .get("/", [ validateInput(list) ], async (req: Request, res: Response) => {
        return ExtraController.list(req.query, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error));
    })

    .get("/view/:id", [ validateInput(id) ], async (req: Request, res: Response) => {
        return ExtraController.detail(req.params, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error));
    })

    .post("/", [ validateInput(add) ], async (req: Request, res: Response) => {
        return ExtraController.add(req.body, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error));
    })

    .patch("/:id", [ validateInput(update) ], async (req: Request, res: Response) => {
        return ExtraController.update({...req.params, ...req.body}, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error));
    })

    .delete("/:id", [ validateInput(id) ], async (req: Request, res: Response) => {
        return ExtraController.remove(req.params, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    });