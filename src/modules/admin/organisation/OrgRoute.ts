import { Router, Request, Response } from "express";
import Validator from "express-joi-validation";
import OrgController from "./OrgController";
import ResponseHandler from "../../ResponseHandler";
import { isAdmin } from "../../../middlewares/Auth.Middleware";
import { add as AddOrgValidate } from "./validator";
import { validateInput } from "../../BaseValidator";

const validator = Validator.createValidator();

const router = Router();

router.get("/", [isAdmin], (req: Request, res: Response) => {
    return OrgController.list(req.query)
        .then(response => ResponseHandler.sendResponse(res, response))
        .catch(error => ResponseHandler.sendErrorResponse(res, error));
});

router.post("/", [ validateInput(AddOrgValidate) ], (req: Request, res: Response) => {
    return OrgController.add(req.body)
        .then(response => ResponseHandler.sendResponse(res, response))
        .catch(err => ResponseHandler.sendErrorResponse(res, err))
});

router.patch("/update/:id", (req: Request, res: Response) => {
    return OrgController.update({ ...req.query, ...req.body })
        .then(resp => ResponseHandler.sendResponse(res, resp))
        .catch(err => ResponseHandler.sendErrorResponse(res, err));
});

router.patch("/status/:id", (req: Request, res: Response) => {
    return OrgController.updateStatus(req.query)
        .then(resp => ResponseHandler.sendResponse(res, resp))
        .catch(err => ResponseHandler.sendErrorResponse(res, err));
});

router.delete("/:id", (req: Request, res: Response) => {
    return OrgController.delete(req.query)
        .then(resp => ResponseHandler.sendResponse(res, resp))
        .catch(err => ResponseHandler.sendErrorResponse(res, err));
});

export default router;