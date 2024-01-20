import constants from "../../../config/constants";
import OrgManager from "./OrgManager";
import { sendOrgOnboardRequestMail } from "../../../lib/Mailer";

class OrgController {

    async add(params: any) {

        try {

            const org = await OrgManager.exists({ 
                $or: [
                    { email: params.email },
                    { orgName: params.orgName },
                    { orgNumber: params.orgNumber },
                    { phone: params.phone },
                ]
             });

            if(org?.email === params.email) {
                throw Error(constants.MESSAGES.ERROR.EMAIL_ALREADY_EXIST);
            }

            if(org?.orgName === params.orgName) {
                throw Error("Organisation name already exist!");
            }

            if(org?.orgNumber === params.orgNumber) {
                throw Error("Organisation number already exist!");
            }

            if(org?.phone === params.phone) {
                throw Error("Phone already exist!");
            }

            params.type = constants.USER_TYPE.ORGANISATION;
            params.status = constants.MODEL_STATUS.PENDING;

            const response = await OrgManager.add(params);

            sendOrgOnboardRequestMail(params);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async list(params: any) {

        try {

            params["type"] = constants.USER_TYPE.ORGANISATION;

            const response = await OrgManager.list(params);

            return response;
        }
        catch(err) {
            console.error(err)
            throw err;
        }
    }

    async detail(params: Object) {}

    async update(params: Object) {}

    async updateStatus(params: Object) {}

    async delete(params: Object) {}
}

export default new OrgController();