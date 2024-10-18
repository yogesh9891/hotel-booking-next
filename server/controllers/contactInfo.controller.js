import excel from "exceljs";
import contactInfo from "../models/contactInfo.model";
import { isValid, ValidateEmail } from "../helpers/Validators";
// import QRCode from 'qrcode';
// import qr from "qr-image";
import Users from "../models/user.model";

export const addMail = async(req, res, next) => {
    try {
        let obj = {};

        // let existsCheck = await contactInfo.findOne().exec()
        // console.log(existsCheck)
        // if (existsCheck) {
        //     console.log(existsCheck)

        if (!ValidateEmail(req.body.email)) throw new Error("please fill valid email");
           obj.email = req.body.email
           obj.name = req.body.name
           obj.phone = req.body.phone
           obj.title = req.body.title
           obj.message = req.body.message
           obj.bookingDate = req.body.bookingDate
           obj.bookingGuest = req.body.bookingGuest
           obj.bookingPrice = req.body.bookingPrice
           obj.propertyName = req.body.propertyName
           obj.isBook = req.body.isBook
        let newMail = await new contactInfo(obj).save();

        //     obj.email = req.body.email != "" ? req.body.email : existsCheck.email
        //     obj.phone = req.body.phone != "" ? req.body.phone : existsCheck.phone
        //     obj.alternatePhone = req.body.alternatePhone != "" ? req.body.alternatePhone : existsCheck.alternatePhone
        //     obj.facebookLink = req.body.facebookLink != "" ? req.body.facebookLink : existsCheck.facebookLink
        //     obj.twitterLink = req.body.twitterLink != "" ? req.body.twitterLink : existsCheck.twitterLink
        //     obj.instagramLink = req.body.instagramLink != "" ? req.body.instagramLink : existsCheck.instagramLink

        //     await contactInfo.findByIdAndUpdate(existsCheck._id, obj).exec();

        // } else {
        //     let newMail = await new contactInfo(req.body).save();
        
        res.status(200).json({ message: "Thank you for contact us. We will contact you soon.", success: true });
    } catch (err) {
        next(err);
    }
};

export const getMail = async(req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [
        //         { _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" },
        //         // { _id: req.user.userId, role: "SELLER" },
        //     ]
        // }).exec()
        // if (!validityCheck) throw new Error("you are not authorise to view mail");

        let query = {};
        if(req.query.isBook){
            query.isBook = req.query.isBook
        }
        let arr = await contactInfo.find(query).sort({createdAt:-1}).lean().exec();
        res.status(200).json({ message: "getcontactInfo", data: arr, success: true });
    } catch (err) {
        next(err);
    }
};

export const getById = async(req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [
        //         { _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" },
        //         // { _id: req.user.userId, role: "SELLER" },
        //     ]
        // }).exec()
        // if (!validityCheck) throw new Error("you are not authorise to view mail");

        let arr = await contactInfo.findById(req.params.id).lean().exec();
        res.status(200).json({ message: "getcontactInfo", data: arr, success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async(req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [
        //         { _id: req.user.userId, role: "ADMIN" },
        //         { _id: req.user.userId, role: "SUBADMIN" },
        //         // { _id: req.user.userId, role: "SELLER" },
        //     ]
        // }).exec()
        // if (!validityCheck) throw new Error("you are not authorise to delete mail");
        const obj = await contactInfo.findByIdAndDelete(req.params.id).exec();
        if (!obj) throw { status: 400, message: "contactInfo Not Found" };
        res.status(200).json({ message: "contactInfo Deleted successfully", success: true });
    } catch (err) {
        next(err);
    }
};

// export const downloadQrCode = async(req, res, next) => {
//     try {
//         var code = qr.image(req.params.text, { type: 'png', ec_level: 'H', size: 10, margin: 0 });
//         res.setHeader('Content-type', 'image/png')
//         code.pipe(res);
//     } catch (err) {
//         next(err);
//     }
// };

// export const downloadQrCode = async(req, res, next) => {
//     try {
//         let data = JSON.stringify(req.params.text)
//             // Print the QR code to terminal
//         QRCode.toString(data, function(err, QRcode) {
//                 // Printing the generated code
//                 console.log(QRcode, "pppppp")
//                 res.send(QRCode)
//             })
//             // Converting into base64
//         QRCode.toDataURL(data, function(err, code) {
//             // Printing the code
//             console.log(code)
//         })

//     } catch (err) {
//         next(err);
//     }
// };

// import excel from "exceljs";
export const downloadExcelFile = async(req, res, next) => {
    try {
        let sheetData = [{
            id: "A1",
            title: "mr",
            name: "ramji",
            age: 20,
            published: true
        }];
        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("excelSheet");
        worksheet.columns = [
            { header: "Name", key: "name", width: 10 },
            { header: "Email.", key: "email", width: 15 },
            { header: "Phone", key: "phone", width: 15 },
            { header: "Date", key: "date", width: 10 },
            { header: "Query", key: "query", width: 30 },
      
 
        ];
        // Add Array Rows
        let arr = await contactInfo.find().sort({createdAt:-1}).lean().exec();
      
        for (const order of arr) {
          let row = {
            date: new Date(order.createdAt).toDateString(),
            name:order.name,
            email:order.email,
            phone:order.phone,
            query:order.message,
          }
          
            sheetData.push(row)
          
         

        }

        worksheet.addRows(sheetData);
        // res is a Stream object
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "excelSheet.xlsx"
        );
        return workbook.xlsx.write(res).then(function() {
            res.status(200).end();
        });
    } catch (err) {
        next(err);
    }
};