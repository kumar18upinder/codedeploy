import mongoose from "mongoose";
import LoginHstoryModel from "../../models/LoginHistory.Model";

class LoginHistoryManager {

    async isLoggedIn(data: any) {
        return LoginHstoryModel.findOne({...data});
    }

    async login(data: any) {
        return LoginHstoryModel.create(data);
    }

    async logout(data: any) {

        return LoginHstoryModel.updateMany(
            { userId: new mongoose.Types.ObjectId(data.userId) },
            { isLogin: false }
        );
    }
}

export default new LoginHistoryManager();