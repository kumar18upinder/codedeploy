import mongoose from "mongoose";
import constants from "../../../config/constants";
import CharacteristicsManager from "./CharacteristicsManager";
import { HELPER } from "../../../lib";

class CategoryController {

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

            const response = await CharacteristicsManager.paginateData(pipeline, data)

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async detail(data: any, session: any) {

        try {

            const detail = await CharacteristicsManager.detail({
                _id: data.id,
                adminId: new mongoose.Types.ObjectId(session._id),
            });

            if(!detail) {
                throw Error(constants.MESSAGES.ERROR.RECORD_NOT_FOUND);
            }

            const response = await CharacteristicsManager.detail({ _id: data.id});

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async add(data: any, session: any) {

        try {

            let detail = await CharacteristicsManager.detail({ name: data.name });

            if(detail) {
                throw Error("Name already exist!");
            }

            detail = await CharacteristicsManager.detail({ code: data.code });

            if(detail) {
                throw Error("Code already exist!");
            }

            data.adminId = new mongoose.Types.ObjectId(session._id);

            const response = await CharacteristicsManager.add(data);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async updateStatus(data: any, session: any) {

        try {

            const detail = await CharacteristicsManager.detail({
                _id: data.id,
                adminId: new mongoose.Types.ObjectId(session._id),
            });

            if(!detail) {
                throw Error(constants.MESSAGES.ERROR.RECORD_NOT_FOUND);
            }

            const toUpdate = {
                status: detail.status === constants.MODEL_STATUS.ACTIVE ?
                    constants.MODEL_STATUS.BLOCKED:
                    constants.MODEL_STATUS.ACTIVE
            };

            const response = await CharacteristicsManager.update({ _id: data.id }, toUpdate);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async update(data: any, session: any) {

        try {

            let detail = await CharacteristicsManager.detail({
                _id: data.id,
                adminId: new mongoose.Types.ObjectId(session._id),
            });

            if(!detail) {
                throw Error(constants.MESSAGES.ERROR.RECORD_NOT_FOUND);
            }

            if(data.name) {

                detail = await CharacteristicsManager.detail({
                    _id: { $ne: data.id },
                    name: data.name,
                });
    
                if(detail) {
                    throw Error("Name already exist!");
                }
            }

            if(data.code) {

                detail = await CharacteristicsManager.detail({
                    _id: { $ne: data.id },
                    code: data.code,
                });
    
                if(detail) {
                    throw Error("Code already exist!");
                }
            }

            const toUpdate: any = {};

            if(data.name) {
                toUpdate.name = data.name
            }

            if(data.code) {
                toUpdate.code = data.code
            }

            const response = await CharacteristicsManager.update({ _id: data.id }, toUpdate);

            return true;

        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async remove(data: any, session: any) {

        try {

            const detail = await CharacteristicsManager.detail({
                _id: data.id,
                adminId: new mongoose.Types.ObjectId(session._id),
            });

            if(!detail) {
                throw Error(constants.MESSAGES.ERROR.RECORD_NOT_FOUND);
            }

            const response = await CharacteristicsManager.delete({ _id: data.id });

            return true;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
}

export default new CategoryController();