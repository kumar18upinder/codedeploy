import BaseResponse from "../../BaseResponse";

class MESSAGES extends BaseResponse {

    CUSTOME_ERROR: any = {

        CODE_ALREADY_EXIST: "Code Already Exist!",
        NAME_ALREADY_EXIST: "Name Already Exist!",
    }
}

export default new MESSAGES();