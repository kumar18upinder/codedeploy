import BaseDao from "../../BaseDao";
import {CategoryModel} from "../../../models";

class CategoryManager extends BaseDao {

    constructor() {
        super(CategoryModel);
    }
}

export default new CategoryManager();