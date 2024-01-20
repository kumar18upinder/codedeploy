import constants from "../../../config/constants";
import RawManager from "./RawManager";
import { EXCEPTION_HANDLER, HELPER } from "../../../lib";
import { CONSTANT } from "../../../config";
import messages from "./messages";

class RawController {

    async list(data: any, session?: any) {

        try {

            let query: any = [
                { adminId: HELPER.toObjectId(session._id) }
            ];
    
            if(data.searchKey) {
                query.push({
                    $or: [
                        { code: { $regex: new RegExp(data.searchKey, 'i') } },
                        { name: { $regex: new RegExp(data.searchKey, 'i') } },
                        { uom: { $regex: new RegExp(data.searchKey, 'i') } },
                        { cost: { $regex: new RegExp(data.searchKey, 'i') } },
                        { status: { $regex: new RegExp(data.searchKey, 'i') } },
                    ]
                });
            }

            const pipeline = [
                {
                    $match: {
                        $and: query
                    }
                }
            ];

            const response = await RawManager.paginateData(pipeline, data)

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async detail(data: any, session?: any) {

        try {

            const detail = await RawManager.detail({
                _id: data.id,
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new EXCEPTION_HANDLER.CustomException(constants.MESSAGES.ERROR.RECORD_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
            }

            const response = await RawManager.detail({ _id: data.id});

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async add(data: any, session: any) {

        try {

            let detail = await RawManager.detail({ name: data.name });

            if(detail) {
                throw Error(messages.CUSTOM_ERROR.NAME_ALREADY_EXIST);
            }

            detail = await RawManager.detail({ code: data.code });

            if(detail) {
                throw Error(messages.CUSTOM_ERROR.CODE_ALREADY_EXIST);
            }

            data.adminId = HELPER.toObjectId(session._id);

            const response = await RawManager.add(data);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    /** Not in use */
    async updateStatus(data: any, session: any) {

        try {

            let detail = await RawManager.detail({
                _id: data.id,
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new EXCEPTION_HANDLER.CustomException(constants.MESSAGES.ERROR.RECORD_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
            }

            const toUpdate = {
                status: detail.status === constants.MODEL_STATUS.ACTIVE ?
                    constants.MODEL_STATUS.BLOCKED:
                    constants.MODEL_STATUS.ACTIVE
            };

            const response = await RawManager.update({ _id: data.id }, toUpdate);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async update(data: any, session: any) {

        try {

            let detail = await RawManager.detail({
                _id: data.id,
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new EXCEPTION_HANDLER.CustomException(constants.MESSAGES.ERROR.RECORD_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
            }

            if(data.name) {

                detail = await RawManager.detail({
                    _id: { $ne: data.id },
                    name: data.name,
                });
    
                if(detail) {
                    throw Error(messages.CUSTOM_ERROR.NAME_ALREADY_EXIST);
                }
            }

            if(data.code) {

                detail = await RawManager.detail({
                    _id: { $ne: data.id },
                    code: data.code,
                });
    
                if(detail) {
                    throw Error(messages.CUSTOM_ERROR.CODE_ALREADY_EXIST);
                }
            }

            const rawId = HELPER.toObjectId(data.id);
            
            delete data.id;

            const response = await RawManager.update({ _id: rawId }, data);

            return true;

        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async remove(data: any, session: any) {

        try {

            const detail = await RawManager.detail({
                _id: data.id,
                adminId: HELPER.toObjectId(session._id)
            });

            if(!detail) {
                throw new EXCEPTION_HANDLER.CustomException(constants.MESSAGES.ERROR.RECORD_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
            }

            const response = await RawManager.delete({ _id: data.id });

            return true;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
}

export default new RawController();