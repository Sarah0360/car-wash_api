import { createTransport } from "nodemailer";

export const mailTransport = createTransport({
    //CREATE A TRANSPORTER
    //service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,  // TRUE IF THE PORT IS 465, FALSE FOR OTHER PORTS 
    auth: {
        user: process.env.EMAIL_USER, //SENDER GMAIL ADDRESS
        pass: process.env.EMAIL_PASSWORD, //APP PASSWORD FROM GMAIL
    },
    from: process.env.FROM_EMAIL,
});