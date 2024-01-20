import mongoose from "mongoose";
import MESSAGES from "./messages";
import { CustomException, DocException } from "../../../lib/ExceptionHandler";
import { CONSTANT } from "../../../config";
import TransactionManager from "./TransactionManager";

class TransactionController {

    async list(data: any, session: any) {

        try {

            let query: any = [
                { adminId: new mongoose.Types.ObjectId(session._id) }
            ];
    
            if(data.searchKey) {
                query.push({
                    $or: [
                        { name: { $regex: new RegExp(data.searchKey, 'i') } },
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

            const response = await TransactionManager.paginateData(pipeline, data)

            return response;
        }
        catch(err) {
            throw err;
        }
    }

    async detail(data: any, session: any) {

        try {

            const doc = await TransactionManager.detail({
                _id: data.id,
                adminId: new mongoose.Types.ObjectId(session._id),
            });

            if(!doc) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            return doc;
        }
        catch(err) {
            throw err;
        }
    }

    async add(data: any, session: any) {

        try {

            const [isNameExist, isCodeExist] = await Promise.all([
                TransactionManager.detail({ name: data.name }),
                TransactionManager.detail({ code: data.code }),
            ]);

            if(isNameExist) {
                throw new CustomException(MESSAGES.NAME_ALREADY_EXIST)
            }

            if(isCodeExist) {
                throw new CustomException(MESSAGES.CODE_ALREADY_EXIST)
            }

            data.adminId = new mongoose.Types.ObjectId(session._id);

            await TransactionManager.add(data);

            return true;
        }
        catch(err) {
            throw err;
        }
    }

    async update(data: any, session: any) {

        try {

            const doc = await TransactionManager.detail({
                _id: new mongoose.Types.ObjectId(data.id),
                adminId: new mongoose.Types.ObjectId(session._id)
            });

            if(!doc) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const updateData: any = {};

            if(data.name) {
                const isNameExist = await TransactionManager.detail({ name: data.name });
    
                if(isNameExist) {
                    throw new CustomException(MESSAGES.NAME_ALREADY_EXIST)
                }

                updateData.name = data.name;
            }

            if(data.code) {
                const isCodeExist = await TransactionManager.detail({ code: data.code });
    
                if(isCodeExist) {
                    throw new CustomException(MESSAGES.CODE_ALREADY_EXIST)
                }

                updateData.code = data.code;
            }

            if(data.description) {
                updateData.description = data.description;
            }

            await TransactionManager.update({_id: new mongoose.Types.ObjectId(data.id)}, updateData);

            return true;
        }
        catch(err) {
            throw err;
        }
    }

    async remove(data: any, session: any) {

        try {

            const doc = await TransactionManager.detail({
                _id: new mongoose.Types.ObjectId(data.id),
                adminId: new mongoose.Types.ObjectId(session._id)
            });

            if(!doc) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            await TransactionManager.delete({ _id: new mongoose.Types.ObjectId(data.id) });

            return true;
        }
        catch(err) {
            throw err;
        }
    }

}

export default new TransactionController();