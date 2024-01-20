import { ComboModel } from "../../../models";
import BaseDao from "../../BaseDao";

class ComboManager extends BaseDao {

    constructor() {
        super(ComboModel);
    }
}

export default new ComboManager();