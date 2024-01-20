import { SettingModel } from "../../../models";
import BaseDao from "../../BaseDao";

class SettingManger extends BaseDao {

    constructor() {
        super(SettingModel);
    }
}

export default new SettingManger();