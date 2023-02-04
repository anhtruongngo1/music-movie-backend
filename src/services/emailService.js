require('dotenv').config();
import nodemailer from "nodemailer";


let sendSimpleEmail =async(dataSend) => {
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Truong ngo 👻" <truong01288639596@gmail.com', // sender address
    to: dataSend.reciveEmail, // list of receivers
    subject: "Thông tin Thay đổi mật khẩu ✔", // Subject line
    html: `
     <h3> Xin chào bạn ${dataSend.userName} !</h3>
      <p>Bạn nhận được email này vì đã yêu cầu thay đổi mật khẩu </p>
      <p>    Nếu các thông tin là đúng please click vào đường link để hoàn tất </p>
      <div> <a href=${dataSend.redirectLink} target="_blank"> Click here </a> </div>
     `, // html body
  });
}

module.exports = {
  sendSimpleEmail,

}