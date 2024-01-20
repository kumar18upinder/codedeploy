import { Request, Response, Router } from "express";
import * as VALIDATE from "./validator";
import ResponseHandler from "../../ResponseHandler";
import CharacteristicsController from "./CharacteristicsController";
import { isOrg } from "../../../middlewares/Auth.Middleware";
import { validateInput } from "../../BaseValidator";

const router = Router();

export default router

    .use([ isOrg ])
    
    .get("/", [ validateInput(VALIDATE.list) ], async (req: Request, res: Response) => {
        return CharacteristicsController.list(req.query, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .get("/view/:id", [ validateInput(VALIDATE.detail) ], async (req: Request, res: Response) => {
        return CharacteristicsController.detail(req.params, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .post("/", [ validateInput(VALIDATE.add) ], async (req: Request, res: Response) => {
        return CharacteristicsController.add(req.body, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .patch("/:id", [ validateInput(VALIDATE.update) ], async (req: Request, res: Response) => {
        return CharacteristicsController.update({ ...req.params, ...req.body }, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    // .patch("/status/:id", [ validateInput(VALIDATE.updateParam) ], async (req: Request, res: Response) => {
    //     return CharacteristicsController.updateStatus({ ...req.params, ...req.body }, (req as any).auth)
    //         .then(response => ResponseHandler.sendResponse(res, response))
    //         .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    // })

    .delete("/:id", [ validateInput(VALIDATE.remove) ], async (req: Request, res: Response) => {
        return CharacteristicsController.remove(req.params, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })
