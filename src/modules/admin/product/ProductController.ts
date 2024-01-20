import mongoose from "mongoose";
import { HELPER } from "../../../lib";
import { DocException } from "../../../lib/ExceptionHandler";
import ProductManager from "./ProductManager";
import MESSAGES from "./messages";

class ProductController {

    async list(params: any, session: any) {

        try {
            
            let query: any = [
                { adminId: HELPER.toObjectId(session._id) }
            ];
    
            if(params.searchKey) {
                query.push({
                    $or: [
                        { name: { $regex: new RegExp(params.searchKey, 'i') } },
                        { code: { $regex: new RegExp(params.searchKey, 'i') } },
                        { type: { $regex: new RegExp(params.searchKey, 'i') } },
                        { availability: { $regex: new RegExp(params.searchKey, 'i') } },
                        { status: { $regex: new RegExp(params.searchKey, 'i') } },
                    ]
                });
            }

            const pipeline = [
                {
                    $match: {
                        $and: query
                    },
                },
                {
                    $lookup: {
                      from: "characteristics",
                      localField: "characteristicIds",
                      foreignField: "_id",
                      as: "characteristicsDetail"
                    }
                },
                {
                    $unwind: {
                        path: "$characteristicsDetail",
                        preserveNullAndEmptyArrays: true,
                    }
                },
                {
                    $lookup: {
                        from: "taxes",
                        localField: "taxCode",
                        foreignField: "_id",
                        as: "taxesDetail"
                    }
                },
                {
                    $unwind: {
                        path: "$taxesDetail",
                        preserveNullAndEmptyArrays: true,
                    }
                },
                {
                    $unwind: "$modifiers"
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "modifiers.products",
                        foreignField: "_id",
                        as: "modifiers.productsDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$modifiers.productsDetails",
                        preserveNullAndEmptyArrays: true,
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        adminId: { $first: "$adminId" },
                        imgUrl: { $first: "$imgUrl" },
                        availability: { $first: "$availability" },
                        categoryId: { $first: "$categoryId" },
                        name: { $first: "$name" },
                        type: { $first: "$type" },
                        calory: { $first: "$calory" },
                        code: { $first: "$code" },
                        description: { $first: "$description" },
                        discount: { $first: "$discount" },
                        price: { $first: "$price" },
                        finalPrice: { $first: "$finalPrice" },
                        status: { $first: "$status" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                        characteristicsDetail: { $addToSet: "$characteristicsDetail" },
                        taxesDetail: { $addToSet: "$taxesDetail" },
                        extras: { $first: "$extras" }, // Assuming extras is not an array of references
                        modifiers: {
                        $addToSet: {
                            _id: "$modifiers._id",
                            groupName: "$modifiers.groupName",
                            productsDetails: "$modifiers.productsDetails"
                        }
                        }
                    }
                }
            ];
                  
            const response = await ProductManager.paginateData(pipeline, params)

            return response;

        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }

    async detail(params: any, session: any) {

        try {

            const detail = await ProductManager.detail({
                _id: HELPER.toObjectId(params.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const pipeline: any[] = [
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(params.id)
                    }
                },
                {
                    $lookup: {
                      from: "characteristics",
                      localField: "characteristicIds",
                      foreignField: "_id",
                      as: "characteristicsDetail"
                    }
                },
                {
                    $unwind: {
                        path: "$characteristicsDetail",
                        preserveNullAndEmptyArrays: true,
                    }
                },
                {
                    $lookup: {
                        from: "taxes",
                        localField: "taxCode",
                        foreignField: "_id",
                        as: "taxesDetail"
                    }
                },
                {
                    $unwind: {
                        path: "$taxesDetail",
                        preserveNullAndEmptyArrays: true,
                    }
                },
                {
                    $unwind: "$modifiers"
                },
                {
                    $lookup: {
                        from: "products",
                        localField: "modifiers.products",
                        foreignField: "_id",
                        as: "modifiers.productsDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$modifiers.productsDetails",
                        preserveNullAndEmptyArrays: true,
                    }
                },
                {
                    $group: {
                        _id: "$_id",
                        adminId: { $first: "$adminId" },
                        imgUrl: { $first: "$imgUrl" },
                        availability: { $first: "$availability" },
                        categoryId: { $first: "$categoryId" },
                        name: { $first: "$name" },
                        type: { $first: "$type" },
                        calory: { $first: "$calory" },
                        code: { $first: "$code" },
                        description: { $first: "$description" },
                        discount: { $first: "$discount" },
                        price: { $first: "$price" },
                        finalPrice: { $first: "$finalPrice" },
                        status: { $first: "$status" },
                        createdAt: { $first: "$createdAt" },
                        updatedAt: { $first: "$updatedAt" },
                        characteristicsDetail: { $addToSet: "$characteristicsDetail" },
                        taxesDetail: { $addToSet: "$taxesDetail" },
                        extras: { $first: "$extras" }, // Assuming extras is not an array of references
                        modifiers: {
                        $addToSet: {
                            _id: "$modifiers._id",
                            groupName: "$modifiers.groupName",
                            productsDetails: "$modifiers.productsDetails"
                        }
                        }
                    }
                }
            ];

            const [response] = await ProductManager.aggregate(pipeline);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
    
    async add(params: any, session: any) {

        try {

            let [isCodeExist, isNameExist] = await Promise.all([
                ProductManager.detail({ code: params.code }),
                ProductManager.detail({ name: params.name }),
            ]);

            if(isCodeExist) {
                throw Error(MESSAGES.CUSTOME_ERROR.CODE_ALREADY_EXIST);
            }

            if(isNameExist) {
                throw Error(MESSAGES.CUSTOME_ERROR.NAME_ALREADY_EXIST);
            }

            params.adminId = HELPER.toObjectId(session._id);

            const response = await ProductManager.add(params);

            return response;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
    
    async update(params: any, session: any) {

        try {

            const detail = await ProductManager.detail({
                _id: HELPER.toObjectId(params.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            if(params.code) {

                const isCodeExist = await ProductManager.detail({
                    code: params.code,
                    _id: { $ne: HELPER.toObjectId(params.id) },
                });

                if(isCodeExist) {
                    throw Error(MESSAGES.CUSTOME_ERROR.CODE_ALREADY_EXIST);
                }
            }

            if(params.name) {

                const isNameExist = await ProductManager.detail({
                    name: params.name,
                    _id: { $ne: HELPER.toObjectId(params.id) },
                });

                if(isNameExist) {
                    throw Error(MESSAGES.CUSTOME_ERROR.NAME_ALREADY_EXIST);
                }
            }

            const productId: any = HELPER.toObjectId(params.id);

            delete params.id;

            const response = await ProductManager.update({ _id: productId }, params);

            return true;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
    
    async delete(params: any, session: any) {

        try {

            const detail = await ProductManager.detail({
                _id: HELPER.toObjectId(params.id),
                adminId: HELPER.toObjectId(session._id),
            });

            if(!detail) {
                throw new DocException(MESSAGES.ERROR.NOT_FOUND);
            }

            const response = await ProductManager.delete({ _id: params.id });

            return true;
        }
        catch(err) {
            console.error(err);
            throw err;
        }
    }
}

export default new ProductController();