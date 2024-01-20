import { TransactionModel } from "../../../models";
import BaseDao from "../../BaseDao";

class TransactionManager extends BaseDao {

    constructor() {
        super(TransactionModel);
    }
}

export default new TransactionManager();