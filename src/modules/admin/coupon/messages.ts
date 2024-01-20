import BaseResponse from "../../BaseResponse";

class MESSAGES extends BaseResponse {

    CUSTOM_ERROR: any = {

        CODE_ALREADY_EXIST: "Code Already Exist!",
        NAME_ALREADY_EXIST: "Title Already Exist!",
    }
}

export default new MESSAGES();