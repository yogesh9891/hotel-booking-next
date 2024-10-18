import nodemailer from "nodemailer";
// const fs = require('fs')
import fs from "fs";
import path from "path";
import ejs from "ejs";
export const sendMail = async (
  emailArr,
  title,
  obj,
  order = false,
  dispatchId,
  newsletter = false
) => {
  try {
    console.log(emailArr);
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "yogesh@ebslon.com", // generated ethereal user
        pass: "jvmlbduwnwllaqgl", // generated ethereal password
        // pass: "dnlnvzkyrcjfxned", // generated ethereal password
      },
    });

    if (order) {
      let template = fs.readFileSync(
        path.join(__dirname, "../public", "order.ejs"),
        // path.join(__dirname, "../public", "order.html"),
        "utf-8"
      );

      // console.log(template,"===============Template===================================")
      // console.log(obj.createdAtDate2,"obj.createdAtDateobj.createdAtDateobj.createdAtDateobj.createdAtDateobj.createdAtDate")
      // let renderedTemplate = Mustache.render(template, obj);
      let renderedTemplate = ejs.render(template, obj);

      let temp = await transporter.sendMail({
        from: {
          name: "Wabisabi",
          address: "wabisabi@gmail.com",
        },
        to: emailArr, // list of receivers
        subject: title, // Subject line
        html: renderedTemplate,
      });
    } else if (newsletter) {
      const attachment = {
        filename: "welcome to SundaysForever.jpg", // Specify the name of the image file
        path: path.join(
          __dirname,
          "../public/uploads/welcome to SundaysForever.jpg"
        ), // Specify the path of the image file
        cid: "unique@nodemailer.com", // Specify a unique content ID for the image
      };

      const mailOptions = {
        from: {
          name: "wabisabi",
          address: "wabisabi@gmail.com",
        },
        to: emailArr, // list of receivers
        subject: title,
        html: `<img src="cid:${attachment.cid}" alt="Image">`, // Embed the image in the HTML body
        attachments: [attachment], // Attach the image to the email
      };

      await transporter.sendMail(mailOptions);
      console.log("=============================", mailOptions);
    } else {
      let templateOf = fs.readFileSync(
        path.join(__dirname, "../public", "status.ejs"),
        "utf-8"
      );
      let obj2 = {
        obj: obj,
        orderDispatchId: dispatchId,
      };
      console.log(obj2, "==============obj");
      // console.log(title, "==============title");
      let renderedTemplate = ejs.render(templateOf, obj2);
      await transporter.sendMail({
        from: {
          name: "wabisabi",
          address: "wabisabi@gmail.com",
        },
        // from: "wabisabi@gmail.com", // sender address
        to: emailArr, // list of receivers
        subject: title,
        text: obj,
        html: renderedTemplate,
      });
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// fzxnmovdsjasvgmd

// razorPayApiKey=rzp_test_jOl57g4TNamtFW
// razorPayApiSecret=18K0ZpbXb8CYO4e2Ou3v1zHW

// razorPayApiKey=rzp_live_lNmAu9zX0OX2eZ
// razorPayApiSecret=ONn3xxLQHvGECIV1wzgI4x5M
