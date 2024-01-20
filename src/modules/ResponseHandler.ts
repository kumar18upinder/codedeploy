import { Response } from "express";
import constants from "../config/constants";

class ResponseHandler {

    OK = constants.HTTP_CODE.OK;
    ERROR = constants.HTTP_CODE.ERROR;

    sendResponse(res: Response, data: any) {

        return res
            .status(constants.HTTP_CODE.OK)
            .json({
                statusCode: constants.HTTP_CODE.OK,
                message: "Success",
                data
            });
    }

    sendErrorResponse(res: Response, error: Error, statusCode: number = constants.HTTP_CODE.ERROR) {

        console.error(error.stack);
        
        return res
            .status(statusCode)
            .json({
                statusCode: statusCode,
                message: error.message,
            });
    }

}

export default new ResponseHandler();