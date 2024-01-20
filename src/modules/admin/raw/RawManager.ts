import BaseDao from "../../BaseDao";
import { RawModel } from "../../../models";

class RawManager extends BaseDao {

    constructor() {
        super(RawModel)
    }
}

export default new RawManager();