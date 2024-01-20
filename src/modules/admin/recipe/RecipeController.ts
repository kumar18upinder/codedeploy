import { HELPER } from "../../../lib";
import { DocException } from "../../../lib/ExceptionHandler";
import RecipeManager from "./RecipeManager";
import MESSAGES from "./messages";

class RecipeController {

    async list(data: any, session: any) {

        try {

            let query: any = [
                { adminId: HELPER.toObjectId(session._id) }
            ];
    
            if(data?.searchKey) {
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

            const response = await RecipeManager.paginateData(pipeline, data)

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async add(data: any, session: any) {

        try {

            let isNameExist = await RecipeManager.detail({ productId: data.productId });

            if(isNameExist) {
                throw Error(MESSAGES.CUSTOM_ERROR.NAME_ALREADY_EXIST);
            }

            data.adminId = HELPER.toObjectId(session._id);

            const response = await RecipeManager.add(data);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async detail(data: any, session: any) {

        try {

            const detail = await RecipeManager.detail({
                _id: HELPER.toObjectId(data.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const response = await RecipeManager.detail({ _id: data.id});

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async update(data: any, session: any) {

        try {

            const detail = await RecipeManager.detail({
                _id: HELPER.toObjectId(data.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const productId = data.id;

            delete data.id;
            
            const toUpdate: any = data;
            
            const response = await RecipeManager.update({ _id: productId }, toUpdate);

            return true;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async remove(data: any, session: any) {

        try {

            const detail = await RecipeManager.detail({
                _id: HELPER.toObjectId(data.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const response = await RecipeManager.delete({ _id: data.id });

            return true;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
}

export default new RecipeController();