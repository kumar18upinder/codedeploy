import { CONSTANT } from "../config";

class CustomException extends Error {

    statusCode: number = CONSTANT.HTTP_CODE.ERROR;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.statusCode = statusCode ?? this.statusCode;
    }
}

class DocException extends Error {

    statusCode: number = CONSTANT.HTTP_CODE.ERROR;

    constructor(params: {message: string, statusCode: number}) {
        super(params.message);
        this.statusCode = params.statusCode ?? this.statusCode;
    }
}

class GqlException extends Error {

    statusCode: number = CONSTANT.HTTP_CODE.ERROR;

    constructor(params: {message: string, statusCode: number}) {
        super(params.message);
        this.statusCode = params.statusCode ?? this.statusCode;
    }
}

export {
    CustomException,
    DocException,
    GqlException
}