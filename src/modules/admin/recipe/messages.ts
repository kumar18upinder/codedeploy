import BaseResponse from "../../BaseResponse";

class MESSAGES extends BaseResponse {

    CUSTOM_ERROR: any = {

        NAME_ALREADY_EXIST: "Ingredient Already Exist!",
    }
}

export default new MESSAGES();