// domain.com/verifytoken/assasdasgj  -> better to use with server side components
// domain.com/verifytoken?token=afsdjgs  -> better to use with client side components -> the choice will be on our what should we use.

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user,
        pass: process.env.pass,
      },
    });

    // var transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: process.env.user,
    //     pass: process.env.pass,
    //   },
    // });
    console.log(transport);

    const mailOptions = {
      from: process.env.user,
      to: email,
      subject: "Dushyant Website",
      text:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href = "${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpass"
      }?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "Verify your email" : "reset your password"
      }
        or copy and paste the link below in your browser. <br/> ${
          process.env.DOMAIN
        }/${
        emailType === "VERIFY" ? "verifyemail" : "resetpass"
      }?token=${hashedToken}
      </p>`,
    };

    const mailresponse = await transport.sendMail(
      mailOptions,
      (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      }
    );
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
