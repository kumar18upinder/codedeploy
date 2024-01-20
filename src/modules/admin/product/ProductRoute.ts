import { Request, Response, Router } from "express";
import { validateInput } from "../../BaseValidator";
import ResponseHandler from "../../ResponseHandler";
import { AUTH } from "../../../middlewares";
import ProductController from "./ProductController";
import * as VALIDATE from "./validator";

const router = Router();

export default router

    .use([ AUTH.isOrg ])
        
    .get("/", [ validateInput(VALIDATE.list) ], async (req: Request, res: Response) => {
        return ProductController.list(req.query, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .get("/view/:id", [ validateInput(VALIDATE.detail) ], async (req: Request, res: Response) => {
        return ProductController.detail(req.params, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .post("/", [ validateInput(VALIDATE.add) ], async (req: Request, res: Response) => {
        return ProductController.add(req.body, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .patch("/:id", [ validateInput(VALIDATE.update) ], async (req: Request, res: Response) => {
        return ProductController.update({...req.params, ...req.body}, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    })

    .delete("/:id", [ validateInput(VALIDATE.remove) ], async (req: Request, res: Response) => {
        return ProductController.delete(req.params, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error)); 
    });