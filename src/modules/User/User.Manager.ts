import mongoose from "mongoose";
import { UserModel } from "../../models";

class User {
  async signup(data: any) {
    return UserModel.create(data);
  }

  async update(id: string, data: any) {
    return UserModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, data);
  }

  async detail(data: any) {
    return UserModel.findOne(data);
  }

  async isPhoneExist(id: string, phone: string) {
    return UserModel.findOne({
      _id: { $ne: new mongoose.Types.ObjectId(id) },
      phone,
    });
  }

  async logout(email: string) {
    return UserModel.updateOne({ email: email }, { $unset: { token: 1 } });
  }

  async login(email: string, token: string) {
    return UserModel.updateOne({ email }, { token: String(token) });
  }
}

export default new User();
