import ExtraModel from "../../../models/Extra.Model";
import BaseDao from "../../BaseDao";

class ExtraManager extends BaseDao {
    
    constructor() {
        super(ExtraModel);
    }
}

export default new ExtraManager() 