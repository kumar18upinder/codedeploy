import mongoose from "mongoose";
import AdminModel from "../../../models/Admin.Model";

class OrgManager {

    async exists(query: Object) {
        return AdminModel.findOne(query);
    }

    add(params: any) {
        return AdminModel.create(params)
    }

    list(params: any) {
        return AdminModel.find(params)
    }

    update(params: any) {

        const id: string = params.id;

        delete params.id;

        return AdminModel.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            { ...params }
        );
    }

    updateStatus(params: any) {

        return AdminModel.updateOne(
            { _id: new mongoose.Types.ObjectId(params.id) },
            { status: params.status }
        );
    }

    details(query: Object, projection: Object) {
        return AdminModel.findOne(
            query,
            projection
        );
    }
}

export default new OrgManager();