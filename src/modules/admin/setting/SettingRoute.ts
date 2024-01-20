import { Response, Request, Router } from "express";
import { isOrg } from "../../../middlewares/Auth.Middleware";
import SettingController from "./SettingController";
import ResponseHandler from "../../ResponseHandler";
import { CONSTANT } from "../../../config";
import { validateInput } from "../../BaseValidator";
import { add } from "./validator";

const router = Router();

export default router

    .use([ isOrg ])

    .get("/payment", async (req: Request, res: Response) => {

        const type = CONSTANT.SETTING.TYPE.PAYMENT;

        return SettingController.get(type, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error));
    })

    .put("/payment", [validateInput(add)], async (req: Request, res: Response) => {

        const type = CONSTANT.SETTING.TYPE.PAYMENT;

        return SettingController.addUpdate({ ...req.body, type }, (req as any).auth)
            .then(response => ResponseHandler.sendResponse(res, response))
            .catch(error => ResponseHandler.sendErrorResponse(res, error));
    });