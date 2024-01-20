import constants from "../../../config/constants";
import { DocException } from "../../../lib/ExceptionHandler";
import TaxManager from "./TaxManager";
import MESSAGES from "./messages";
import { HELPER } from "../../../lib";

class TaxController {

    async list(data: any, session: any) {

        try {

            let query: any = [
                { adminId: HELPER.toObjectId(session._id) }
            ];
    
            if(data.searchKey) {
                query.push({
                    $or: [
                        { code: { $regex: new RegExp(data.searchKey, 'i') } },
                        { description: { $regex: new RegExp(data.searchKey, 'i') } },
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

            const response = await TaxManager.paginateData(pipeline, data)

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async detail(data: any, session: any) {

        try {

            const detail = await TaxManager.detail({
                _id: HELPER.toObjectId(data.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const response = await TaxManager.detail({ _id: data.id});

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async add(data: any, session: any) {

        try {

            let detail = await TaxManager.detail({ code: data.code });

            if(detail) {
                throw Error("Code already exist!");
            }

            data.adminId = HELPER.toObjectId(session._id);

            const response = await TaxManager.add(data);

            return response;

        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async update(data: any, session: any) {

        try {

            const detail = await TaxManager.detail({
                _id: HELPER.toObjectId(data.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const toUpdate: any = {};

            if(data.code) {
                toUpdate.name = data.code
            }

            if(data.description) {
                toUpdate.code = data.description
            }

            if(data.value) {
                toUpdate.code = data.value
            }

            const response = await TaxManager.update({ _id: data.id }, toUpdate);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    /* async updateStatus(params: any, session: any) {

        try {

            const detail = await TaxManager.detail({
                _id: HELPER.toObjectId(params.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const toUpdate = {
                status: detail.status === constants.MODEL_STATUS.ACTIVE ?
                    constants.MODEL_STATUS.BLOCKED:
                    constants.MODEL_STATUS.ACTIVE
            };

            const response = await TaxManager.update({ _id: params.id }, toUpdate);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    } */
    
    async remove(params: any, session: any) {

        try {

            const detail = await TaxManager.detail({
                _id: HELPER.toObjectId(params.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const response = await TaxManager.remove({ _id: params.id });

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
}

export default new TaxController();