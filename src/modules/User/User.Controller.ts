import UserManager from "./User.Manager";
import AUTH from "../../lib/Auth";
import { send } from "../../lib/Mailer";
import LoginHistoryManager from "../LoginHistory/LoginHistory.Manager";

class User {
  
  async signup(data: any): Promise<any> {
    try {
      let detail = await UserManager.detail({ email: data.email });

      if (detail) {
        throw Error("Email already exists");
      }

      data.password = await AUTH.hash(data.password);

      const response = await UserManager.signup(data);

      const accessToken = await AUTH.createToken(response);

      await UserManager.login(response.email, accessToken);

      const userDetails = response.toObject();

      data.userId = userDetails._id;

      var d1 = new Date ();
      var d2 = new Date ( d1 );
      d2.setHours ( d1.getHours() + 6 );

      data.emailLinkExpiry = d2;

      await LoginHistoryManager.login({...data, "device-id": "dummy"});

      // let url = `${process.env.WEB_URL}onboarding`;
      let url = `${(data.Origin + '/') || process.env.WEB_URL}onboarding`;

      send({
        to: response.email,
        subject: "Account verification email",
        html: `
                    <div>
                        Please verify your email by clicking <a href="${url}">here</a> or refer to ${url}
                    </div>
                `,
      });

      return {
        statusCode: 200,
        message: "Verification email sent to email",
        data: {
          ...userDetails,
          accessToken,
        },
      };
    } catch (err) {
      console.log(`Error : ${err}`);

      return {
        statusCode: 400,
        message: "Error",
        data: err,
      };
    }
  }

  async login(data: any) {

    try {
      
      let response = await UserManager.detail({ email: data.email });

      if (!response) {
        throw Error("Email not found");
      }

      const isPasswordValid = await AUTH.compare(
        data.password,
        response.password
      );

      if (!isPasswordValid) {
        throw Error("Invalid Password");
      }

      response = response.toObject();

      const accessToken = await AUTH.createToken(response);

      return {
        statusCode: 200,
        message: "Login Successfull",
        data: {
          ...response,
          accessToken,
        },
      };
    } catch (err) {
      console.log(`Error : ${err}`);

      return {
        statusCode: 400,
        message: "Error",
        data: err,
      };
    }
  }

  async completeProfile(data: any) {
    try {
      const response: any = await UserManager.detail({ email: data.email });

      if (!response || !response.isEmailVerified) {
        throw Error("Email not verified");
      } else if (response.isProfileCompleted) {
        throw Error("Profile Already Completed");
      }

      if (data.phone) {
        let isPhoneExist = await UserManager.isPhoneExist(
          response._id,
          data.phone
        );

        if (isPhoneExist) {
          throw Error("Phone number already associated with another account");
        }
      }

      data.isProfileCompleted = true;

      await UserManager.update(response._id, data);

      return {
        statusCode: 200,
        message: "Success",
      };
    } catch (err) {
      console.log(`Error : ${err}`);

      return {
        statusCode: 400,
        message: "Error",
        data: err,
      };
    }
  }

  async verifyEmail(data: any) {
    try {

      const response = await UserManager.detail({ _id: data.id });

      if(!response || !response.emailLinkExpiry || new Date(response.emailLinkExpiry) < new Date()) {
        return {
          statusCode: 400,
          message: "Inavalid link"
        }
      }

      await UserManager.update(data.id, { isEmailVerified: true });

      return {
        statusCode: 200,
        message: "Email Verified",
      };
    } catch (err) {
      console.log(`Error : ${err}`);

      return {
        statusCode: 400,
        message: "Error",
        data: err,
      };
    }
  }

  async resenVerificationMail(params: any) {
    try {
      const response = await UserManager.detail({ email: params.email });

      if (!response) {
        throw Error("Email not found");
      }

      let url = `${(params.Origin + '/') || process.env.WEB_URL}onboarding`;

      var d1 = new Date ();
      var d2 = new Date ( d1 );
      d2.setHours ( d1.getHours() + 6 );

      await UserManager.update(String(response._id), {emailLinkExpiry: d2});

      send({
        to: response.email,
        subject: "Account verification email",
        html: `
                    <div>
                        Please verify your email by clicking <a href="${url}">here</a> or refer to ${url}
                    </div>
                `,
      });

      return {
        statusCode: 200,
        message: "Verification email sent to email",
      };
    } catch (err) {
      console.log(`Error : ${err}`);

      return {
        statusCode: 400,
        message: "Error",
        data: err,
      };
    }
  }

  async logout(data: any) {

    try {

      let detail: any = await UserManager.detail({email: data.email});

      if (!detail) {
        throw Error("Invalid User");
      }

      detail.userId = detail._id;

      await LoginHistoryManager.logout(data);

      return true;
    }
    catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default new User();
