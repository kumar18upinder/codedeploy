import nodemailer from "nodemailer";

const mailHost: string | undefined = process.env.MAIL_HOST;
const mailPort: string | undefined = process.env.MAIL_PORT;
const mailUser: string | undefined = process.env.MAIL_USER;
const mailPass: string | undefined = process.env.MAIL_PASS;

const transport = nodemailer.createTransport({
  host: mailHost,
  port: Number(mailPort),
  auth: {
    user: mailUser,
    pass: mailPass
  }
});

export const send = async function(payload: any) {
  return transport
    .sendMail({
      from: process.env.ADMIN_EMAIL ?? "pankaj_test1@yopmail.com", /// sender address
      to: payload.to ?? "pankaj_test1@yopmail.com", // list of receivers
      subject: payload.subject, // Subject line
      // text: "Hello world?", // plain text body
      html: payload.html, // html body
    })
    .then(() => console.log("Success"))
    .catch((err: any) => console.log(`Error : ${err}`));
};

export const sendOrgOnboardRequestMail = async function(payload: any) {

  payload.subject = "Organisation Account Approval Request";
  payload.html = `
    <div>
      Organisation approval request received with following details:
      </br>
      <div>
        <div> <b> Name: </b> ${payload.orgName}</div>
        <div> <b> Type: </b> ${payload.businessType}</div>
        <div> <b> Organisation Number: </b> ${payload.orgNumber}</div>
        <div> <b> Owner Name: </b> ${payload.ownerFName} ${payload.ownerLName}</div>
      </div>
      </br>
      Thanks
    </div>
  `;

  return send(payload);
}

export const sendOrgWelcomeMail = async function(payload: any) {

  payload.subject = "Account Approved";
  payload.html = `
    <div>
      Organisation account approved. Please use following credentials to log in:
      </br>
      <div>
        <div> <b> Email: </b> ${payload.email}</div>
        <div> <b> Password: </b> ${payload.password}</div>
      </div>
      </br>
      Thanks
    </div>
  `;

  return send(payload);
}

export const sendOrgAccountRejectMail = async function(payload: any) {

  payload.subject = "Account Rejected";
  payload.html = `
    <div>
      Your account has been rejected due to application's internal policy. Please contact admin for further  details.
      </br>
      </br>
      Thanks
    </div>
  `;

  return send(payload);
}
