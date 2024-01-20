import { ProductModel } from "../../../models";
import BaseDao from "../../BaseDao";

class ProductManager extends BaseDao {

    constructor() {
        super(ProductModel)
    }
}

export default new ProductManager();