import { CONSTANT } from "../config";

class BaseResponse {

    ERROR = {

        NOT_FOUND: {
            statusCode: CONSTANT.HTTP_CODE.NOT_FOUND,
            message: CONSTANT.MESSAGES.ERROR.RECORD_NOT_FOUND,
        },

        FORBIDDEN: {
            statusCode: CONSTANT.HTTP_CODE.FORBIDDEN,
            message: CONSTANT.MESSAGES.ERROR.FORBIDDEN,
        },
    }
}

export default BaseResponse;