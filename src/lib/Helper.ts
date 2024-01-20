import mongoose from "mongoose";

class Helper {

    toObjectId(id: string) {
        return new mongoose.Types.ObjectId(id);
    }

}

export default new Helper();