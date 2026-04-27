import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "task manager",
      link: "https://taskmanagerlink.com",
    },
  });

 const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
 const emailHTML = mailGenerator.generate(options.mailgenContent);

 const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS
    }
 })

 const mail = {
    from: "mail.taskmanager@gmail.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHTML
 }

 try {
        await transporter.sendMail(mail);
    } catch (error) {
        
    }

};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "Welcome! to our app! We are excited to have you on board",
      action: {
        instructions: "To verify your email please click on the button",
        button: {
          color: "#22bc66 ",
          text: "Verify you email",
          link: verificationUrl,
        },
      },
      outro:
        "Need Help, or have any questions? Just replay to this email, we would love to help",
    },
  };
};

const forgotPasswordMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      intro: "we got a request to reset the password of  your account",
      action: {
        instructions:
          "To reset your password click on the following button or link",
        button: {
          color: "#22bc66",
          text: "Reset your password",
          link: passwordResetUrl,
        },
      },
      outro:
        "Need Help, or have any questions? Just replay to this email, we would love to help",
    },
  };
};

export { emailVerificationMailgenContent, forgotPasswordMailgenContent, sendEmail };
