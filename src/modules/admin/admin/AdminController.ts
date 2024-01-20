import  generator from "generate-password";
import AdminManager from "./AdminManager";
import AUTH from "../../../lib/Auth";
import CONSTANT from "../../../config/constants";
import LoginHistoryManager from "../../LoginHistory/LoginHistory.Manager";
import { sendOrgWelcomeMail, sendOrgAccountRejectMail, send } from "../../../lib/Mailer";
import { EXCEPTION_HANDLER } from "../../../lib";

class AdminController {

    async addAdmin(data: any) {

        try {

            const isExist = await AdminManager.findOne({ email: data.email });

            if(isExist) {
                throw Error("Email already exist")
            }

          data.password = await AUTH.hash(data.password);
          data.type = CONSTANT.USER_TYPE.ADMIN;

          const response = await AdminManager.create(data);

          return response;
        }
        catch(err) {

            console.error(err);
            throw err;
        }
    }

    async login(data: any) {

        try {
            
          let response = await AdminManager.findOne({ email: data.email });
    
          if (!response) {
            throw new EXCEPTION_HANDLER.CustomException(CONSTANT.MESSAGES.EMAIL_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
          }

          if(response.status === CONSTANT.MODEL_STATUS.PENDING) {
            throw Error(CONSTANT.MESSAGES.ORG.PENDING)
          }

          response = response.toObject();
    
          const isPasswordValid = await AUTH.compare(
            data.password,
            String(response.password) 
          );
    
          if (!isPasswordValid) {
            throw Error(CONSTANT.MESSAGES.INVALID_PASSWORD);
          }
    
          const accessToken = await AUTH.createToken({
            email: response.email,
            type: response.type,
            ts: Date.now(),
          });

          LoginHistoryManager.login({
            userId: response._id,
            type: response.type,
          });
    
          return {
              ...response,
              accessToken,
          };
        }
        catch (err) {

          console.error(err);
          throw err;
        }
    }

    async updatePassword(data : any, session: any) {
      
      try {

        let response: any = await AdminManager.findOne({ email: session.email });

        if(!response) {
          throw new EXCEPTION_HANDLER.CustomException(CONSTANT.MESSAGES.EMAIL_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
        }
        
        const isValidPassword = await AUTH.compare(
          data.oldPassword,
          response.password,
        );

        if(!isValidPassword) {
          throw Error("Invalid old password");
        }

        const hash: string = await AUTH.hash(data.password)

        response = await AdminManager.updateOne(response._id, { password: hash });

        return response;
      }
      catch(err) {

        console.log(err);
        throw err;
      }
    }

    async approveOrg(data: any, session: any) {

      try {

        let response: any = await AdminManager.details(data.orgId);

        if(!response) {
          throw Error(CONSTANT.MESSAGES.ORG.INVALID_ACCOUNT)
        }

        if(response.status !== CONSTANT.MODEL_STATUS.PENDING) {
          throw Error(CONSTANT.MESSAGES.ORG.ALREADY_APPROVED)
        }

        if(data.type === CONSTANT.MODEL_STATUS.REJECTED) {

          await AdminManager.updateOne(
            response._id,
            {
              status: CONSTANT.MODEL_STATUS.REJECTED,
            }
          );

          sendOrgAccountRejectMail({});

          return true;
        }

        const password: string = generator.generate({
            length: 8, // Password length
            numbers: true, // Include numbers
            symbols: true, // Include symbols
            uppercase: true, // Include uppercase letters
            lowercase: true, // Include lowercase letters
            excludeSimilarCharacters: true, // Exclude similar characters (e.g., 1, I, l, O, 0)
        });

        const hash = await AUTH.hash(password);

        const mailData = {
          email: response.email,
          password: password
        };
        
        response = await AdminManager.updateOne(
          response._id,
          {
            status: CONSTANT.MODEL_STATUS.ACTIVE,
            password: hash
          }
        );

        sendOrgWelcomeMail(mailData);

        return !!response;
      }
      catch(err) {
        console.log(err)
        throw err;
      }
    }

    async accountStatus(data: any) {

      try {

        let response: any = await AdminManager.details(data.id);

        if(
          !response ||
          [CONSTANT.MODEL_STATUS.PENDING, CONSTANT.MODEL_STATUS.DELETED].includes(response.status)
        ) {
          throw Error(CONSTANT.MESSAGES.ORG.INVALID_ACCOUNT)
        }

        const status: string = response.status === CONSTANT.MODEL_STATUS.ACTIVE ? CONSTANT.MODEL_STATUS.BLOCKED: CONSTANT.MODEL_STATUS.ACTIVE;

        response = await AdminManager.updateOne(
          response._id,
          { status }
        );

        return !!response;
      }
      catch(err) {
        console.log(err);
        throw err;
      }
    }

    async details(data: any) {

      try {

        let response: any = await AdminManager.details(data.id);

        if(!response) {
          throw new EXCEPTION_HANDLER.CustomException(CONSTANT.MESSAGES.EMAIL_NOT_FOUND, CONSTANT.HTTP_CODE.NOT_FOUND);
        }

        return response;
      }
      catch(err){
        console.error(err);
        throw err;
      }
    }

    async logout(data: any) {

      try {
        console.log(data, "==============12================")
        let detail: any = await AdminManager.findOne({ _id: data.userId });
  
        if (!detail) {
          throw Error(CONSTANT.MESSAGES.ERROR.INVALID_USER);
        }

        detail = await LoginHistoryManager.isLoggedIn({
          userId: data.userId,
          isLogin: true,
        });

        if (!detail) {
          throw Error(CONSTANT.MESSAGES.ERROR.INVALID_USER);
        }
  
        detail.userId = data.userId;

        await LoginHistoryManager.logout(detail);
  
        return true;
      }
      catch (err) {
        console.error(err);
        throw err;
      }
    }

    async validateResetPasswordLink(data: any) {

      try {

        const decodedValue: any = await AUTH.verifyToken(data.token);

        if(!decodedValue) {
          throw Error("Invalid link");
        }

        const response: any = await AdminManager.findOne({ email: decodedValue.email });

        if(
          !response?.emailLinkExpiry ||
          new Date(response.emailLinkExpiry) < new Date()
        ) {

          throw Error("Invalid link")
        }

        return decodedValue;
      }
      catch (err) {

        console.error(err);
        throw err;
      }
    }

    async forgetPassword(params: any) {

      try {

        const response: any = await AdminManager.findOne({ email: params.email });

        if (!response) {
          throw Error("Email not found");
        }

        const emailToken: string = await AUTH.createToken({
          email: response.email,
        })

        let url = `${process.env.WEB_URL}resetPassword/${emailToken}`;

        let d1 = new Date ();
        let d2 = new Date ( d1 );
        d2.setHours ( d1.getHours() + 6 );

        await AdminManager.updateOne(response._id, { emailLinkExpiry: d2 });

        send({ 
          to: response.email,
          subject: "Reset Password Link",
          html: `
              <div>
                  Please reset your password by clicking <a href="${url}">here</a> or refer to ${url}
              </div>
          `,
        });

        return true;
      }
      catch (err) {
        console.error(err);
        throw err;
      }
    }

    async resetPassword(data: any) {

      try {
        
        const decodedValue = await this.validateResetPasswordLink(data);

        let response: any = await AdminManager.findOne({ email: decodedValue.email });

        const hash: string = await AUTH.hash(data.password)

        response = await AdminManager.updateOne(response._id, { password: hash });

        return response;
      }
      catch(err) {

        console.log(err);
        throw err;
      }
    }
}

export default new AdminController(); 