import { Router, Response, Request } from "express";
import ResponseHandler from "../../ResponseHandler";
import AdminController from "./AdminController";
import { validateApproveOrg, validateLoginOrg, validateOrgStatus, add, validateApproveOrgBody } from "./validator";
import { isAdmin, isAuthenticated, isOrg } from "../../../middlewares/Auth.Middleware";
import { validateInput } from "../../BaseValidator";

const router = Router();

router.post("/signup", [ validateInput(add) ], async (req: Request, res: Response) => {
    return AdminController.addAdmin(req.body)
        .then(response => ResponseHandler.sendResponse(res, response))
        .catch(error => ResponseHandler.sendErrorResponse(res, error))
});

router.post("/login", [ validateInput(validateLoginOrg) ], async (req: Request, res: Response) => {
    return AdminController.login(req.body)
        .then(response => ResponseHandler.sendResponse(res, response))
        .catch(error => ResponseHandler.sendErrorResponse(res, error));
});

router.post("/logout", [ isAuthenticated ], async (req: Request, res: Response) => {
    return AdminController.logout((req as any).auth)
        .then(response => ResponseHandler.sendResponse(res, response))
        .catch(error => ResponseHandler.sendErrorResponse(res, error));
});

router.patch("/updatePassword", [ isOrg ], async (req: Request, res: Response) => {
    return AdminController.updatePassword(req.body, (req as any).auth)
        .then(response => ResponseHandler.sendResponse(res, response))
        .catch(error => ResponseHandler.sendErrorResponse(res, error));
});

router.patch("/organisation/approval/:orgId", [ isAdmin, validateInput(validateApproveOrg), validateInput(validateApproveOrgBody) ], async (req: Request, res: Response) => {
    return AdminController.approveOrg({ ...req.params, ...req.body }, (req as any).auth)
        .then(response => ResponseHandler.sendResponse(res, response))
        .catch(error => ResponseHandler.sendErrorResponse(res, error));
});

router.patch("/organisation/status/:id", [ isAdmin, validateInput(validateOrgStatus) ], async (req: Request, res: Response) => {
    return AdminController.accountStatus(req.params)
        .then(response => ResponseHandler.sendResponse(res, response))
        .catch(error => ResponseHandler.sendErrorResponse(res, error));
});

router.get("/organisation/detail/:id", [ isAdmin, validateInput(validateOrgStatus) ], async (req: Request, res: Response) => {
    return AdminController.details(req.params)
        .then(response => ResponseHandler.sendResponse(res, response))
        .catch(error => ResponseHandler.sendErrorResponse(res, error));
});

export default router;