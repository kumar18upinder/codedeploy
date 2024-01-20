import { RecipeModel } from "../../../models";
import BaseDao from "../../BaseDao";

class RecipeManager extends BaseDao {

    constructor() {
        super(RecipeModel)
    }
}

export default new RecipeManager();