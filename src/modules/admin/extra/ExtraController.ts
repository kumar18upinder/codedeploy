import { HELPER } from "../../../lib";
import { DocException } from "../../../lib/ExceptionHandler";
import ExtraManager from "./ExtraManager";
import MESSAGES from "./messages";

class ExtraController {

    async list(data: any, session: any) {

        try {

            let query: any = [
                { adminId: HELPER.toObjectId(session._id) }
            ];
    
            if(data.searchKey) {
                query.push({
                    $or: [
                        { code: { $regex: new RegExp(data.searchKey, 'i') } },
                        { name: { $regex: new RegExp(data.searchKey, 'i') } },
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

            const response = await ExtraManager.paginateData(pipeline, data)

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async add(data: any, session: any) {

        try {

            let [isCodeExist, isNameExist] = await Promise.all([
                ExtraManager.detail({ code: data.code }),
                ExtraManager.detail({ name: data.name }),
            ]);

            if(isCodeExist) {
                throw Error(MESSAGES.CUSTOM_ERROR.CODE_ALREADY_EXIST);
            }

            if(isNameExist) {
                throw Error(MESSAGES.CUSTOM_ERROR.NAME_ALREADY_EXIST);
            }

            data.adminId = HELPER.toObjectId(session._id);

            const response = await ExtraManager.add(data);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async detail(data: any, session: any) {

        try {

            const detail = await ExtraManager.detail({
                _id: HELPER.toObjectId(data.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const response = await ExtraManager.detail({ _id: data.id});

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async update(data: any, session: any) {

        try {

            const detail = await ExtraManager.detail({
                _id: HELPER.toObjectId(data.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const toUpdate: any = {};

            if(data.code) {

                const isCodeExist = await ExtraManager.detail({
                    _id: { $ne: HELPER.toObjectId(data.id) },
                    code: data.code,
                });

                if(isCodeExist) {
                    throw Error(MESSAGES.CUSTOM_ERROR.CODE_ALREADY_EXIST)
                }

                toUpdate.code = data.code
            }

            if(data.name) {

                const isNameExist = await ExtraManager.detail({
                    _id: { $ne: HELPER.toObjectId(data.id) },
                    code: data.name,
                });

                if(isNameExist) {
                    throw Error(MESSAGES.CUSTOM_ERROR.NAME_ALREADY_EXIST)
                }

                toUpdate.name = data.name
            }

            const response = await ExtraManager.update({ _id: data.id }, toUpdate);

            return true;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async remove(data: any, session: any) {

        try {

            const detail = await ExtraManager.detail({
                _id: HELPER.toObjectId(data.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const response = await ExtraManager.delete({ _id: data.id });

            return true;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
}

export default new ExtraController();