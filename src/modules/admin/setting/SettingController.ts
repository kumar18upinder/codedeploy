import { CONSTANT } from "../../../config";
import { EXCEPTION_HANDLER, HELPER } from "../../../lib";
import SettingManager from "./SettingManager";

class SettingController {

    async get(type: string, session: any) {

        try {

            const detail = await SettingManager.detail({
                adminId: HELPER.toObjectId(session._id),
                type: type
            });

            if(!detail) {
                throw new EXCEPTION_HANDLER.CustomException(CONSTANT.MESSAGES.ERROR.RECORD_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
            }

            return detail;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async addUpdate(data : any, session: any) {

        try {

            let jsonData: any = {};
            let type = data.type;

            switch(type) {
                case CONSTANT.SETTING.TYPE.PAYMENT:
                    delete data.type;
                    jsonData = data;
                    break;
            }

            const isSettingExist = await SettingManager.detail({
                adminId: HELPER.toObjectId(session._id),
                type: type,
            });

            if(isSettingExist) {

                await SettingManager.update({
                    _id: isSettingExist._id
                }, {
                    data: jsonData
                });
            }
            else {

                await SettingManager.add({
                    adminId: HELPER.toObjectId(session._id),
                    type: type,
                    data: jsonData
                });
            }

            return true;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
}

export default new SettingController();