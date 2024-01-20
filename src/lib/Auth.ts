import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

class Auth {

    salt = 10;

    async hash(password: any) {
        return bcrypt.hash(password, this.salt);
    }

    async compare(password: any, hash: string) {
        return bcrypt.compare(password, hash);
    }

    async createToken(payload: any) {

        return JWT.sign(
            JSON.stringify(payload),
            String(process.env.SECRET_KEY)
        )
    }

    async verifyToken(token: string) {

        return JWT.verify(
            token,
            String(process.env.SECRET_KEY)
        )
    }
}

export default new Auth();