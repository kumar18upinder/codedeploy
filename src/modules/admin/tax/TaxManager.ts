import {TaxModel} from "../../../models";
import BaseDao from "../../BaseDao";

class TaxManager extends BaseDao {

    constructor() {
        super(TaxModel)
    }
}

export default new TaxManager();