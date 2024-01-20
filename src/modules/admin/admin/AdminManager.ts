import mongoose from "mongoose";
import { AdminModel } from "../../../models";

class AdminManager {

    findOne(query = {}) {
        return AdminModel.findOne(query);
    }

    create(data: any) {
        return AdminModel.create(data);
    }

    updateOne(adminId: string, data: any) {
        return AdminModel.updateOne(
            { _id: new mongoose.Types.ObjectId(adminId) },
            data,
        );
    }

    details(id: string) {
        return AdminModel.findOne({ _id: new mongoose.Types.ObjectId(id) });
    }
}

export default new AdminManager();