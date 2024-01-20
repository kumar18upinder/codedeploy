import { Router, Request, Response } from "express";
import UserController from "./User.Controller";
import Validator from "express-joi-validation";
import * as RouteValidator from "../../validator";
import { isAuthenticated } from "../../middlewares/Auth.Middleware";
import ResponseHandler from "../ResponseHandler";

const validator = Validator.createValidator();

const router = Router();

router.get("/", (req, res) => {
  return res.send("Route Success");
});

  router.post(
    "/signup",
    [
      validator.headers(RouteValidator.headerValidate),
      validator.body(RouteValidator.signup)
    ],
    async (req: Request, res: Response) => {

      let data = await UserController.signup({...req.body, ...req.headers});

      return ResponseHandler.sendResponse(res, data);
    })

  router.post("/resend-mail", async (req, res) => {
    let data = await UserController.resenVerificationMail({...req.body.email, ...req.headers});
    return ResponseHandler.sendResponse(res, data);
  })

  router.put(
    "/completeProfile",
    [validator.body(RouteValidator.completeProfile), isAuthenticated],
    async (req: Request, res: Response) => {
      let data = await UserController.completeProfile(req.body);

      return ResponseHandler.sendResponse(res, data);
    }
  )

  router.get(
    "/verify/:id",
    validator.params(RouteValidator.verifyEmail),
    async (req, res) => {
      let data = await UserController.verifyEmail({ id: req.params.id });

      return ResponseHandler.sendResponse(res, data);
    }
  )

  router.post("/login", [validator.headers(RouteValidator.headerValidate), validator.body(RouteValidator.login)], async (req: Request, res: Response) => {
    let data = await UserController.login({...req.body, ...req.headers});

    return ResponseHandler.sendResponse(res, data);
  })

  router.get("/logout", [validator.headers(RouteValidator.headerValidate), isAuthenticated], async (req: Request, res: Response) => {
    let data = await UserController.logout({...req.body, ...req.headers});

    return ResponseHandler.sendResponse(res, data);
  });

export default router;
