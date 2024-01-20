import BaseDao from "../../BaseDao";
import {CharacteristicModel} from "../../../models";

class CharacteristicManager extends BaseDao {

    constructor() {
        super(CharacteristicModel);
    }
}

export default new CharacteristicManager();