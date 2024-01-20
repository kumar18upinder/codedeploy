import { CouponModel } from "../../../models";
import BaseDao from "../../BaseDao";

class CouponManager extends BaseDao {

    constructor() {
        super(CouponModel);
    }

    test(params: any) {
        throw new Error("Hi from HERE")
    }
}

export default new CouponManager();