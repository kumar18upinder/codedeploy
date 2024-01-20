import mongoose from "mongoose";
import constants from "../../../config/constants";
import CategoryManager from "./CategoryManager";
import { EXCEPTION_HANDLER } from "../../../lib";
import { CONSTANT } from "../../../config";

class CategoryController {

    async list(data: any, session?: any) {

        try {
console.log(data, "=============")
            const query: any = {
                adminId: new mongoose.Types.ObjectId(session._id),
            };

            if(data?.searchKey) {
                query["$or"] = [
                    { name: { $regex: new RegExp(data?.searchKey, 'i') } },
                    { code: { $regex: new RegExp(data?.searchKey, 'i') } },
                ];
            }

            const response = await CategoryManager.list(query);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async detail(data: any, session?: any) {

        try {

            const detail = await CategoryManager.detail({
                _id: data.id,
                adminId: new mongoose.Types.ObjectId(session._id),
            });

            if(!detail) {
                throw new EXCEPTION_HANDLER.CustomException(constants.MESSAGES.ERROR.RECORD_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
            }

            const response = await CategoryManager.detail({ _id: data.id});

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async add(data: any, session: any) {

        try {

            let detail = await CategoryManager.detail({ name: data.name });

            if(detail) {
                throw Error("Name already exist!");
            }

            detail = await CategoryManager.detail({ code: data.code });

            if(detail) {
                throw Error("Code already exist!");
            }

            data.adminId = new mongoose.Types.ObjectId(session._id);

            const response = await CategoryManager.add(data);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async updateStatus(data: any, session: any) {

        try {

            let detail = await CategoryManager.detail({
                _id: data.id,
                adminId: new mongoose.Types.ObjectId(session._id),
            });

            if(!detail) {
                throw new EXCEPTION_HANDLER.CustomException(constants.MESSAGES.ERROR.RECORD_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
            }

            const toUpdate = {
                status: detail.status === constants.MODEL_STATUS.ACTIVE ?
                    constants.MODEL_STATUS.BLOCKED:
                    constants.MODEL_STATUS.ACTIVE
            };

            const response = await CategoryManager.update({ _id: data.id }, toUpdate);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async update(data: any, session: any) {

        try {

            let detail = await CategoryManager.detail({
                _id: data.id,
                adminId: new mongoose.Types.ObjectId(session._id),
            });

            if(!detail) {
                throw new EXCEPTION_HANDLER.CustomException(constants.MESSAGES.ERROR.RECORD_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
            }

            detail = await CategoryManager.detail({
                _id: { $ne: data.id },
                name: data.name,
            });

            if(!detail) {
                throw Error("Name already exist!");
            }

            detail = await CategoryManager.detail({
                _id: { $ne: data.id },
                code: data.code,
            });

            if(!detail) {
                throw Error("Code already exist!");
            }

            const toUpdate: any = {};

            if(data.name) {
                toUpdate.name = data.name
            }

            if(data.code) {
                toUpdate.code = data.code
            }

            const response = await CategoryManager.update({ _id: data.id }, toUpdate);

            return response;

        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async remove(data: any, session: any) {

        try {

            const detail = await CategoryManager.detail({
                _id: data.id,
                adminId: new mongoose.Types.ObjectId(session._id)
            });

            if(!detail) {
                throw new EXCEPTION_HANDLER.CustomException(constants.MESSAGES.ERROR.RECORD_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
            }

            const response = await CategoryManager.remove({ _id: data.id });

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
}

export default new CategoryController();