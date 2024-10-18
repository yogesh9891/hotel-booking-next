import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import Brand from "../models/brand.model";
import XLSX from "xlsx";
import { xlsxReader } from "../helpers/xlxsUtils";
const ExcelJs = require('exceljs')
import { generalModelStatuses } from "../helpers/Constants";

export const registerBrand = async (req, res, next) => {
    try {
        let brandCheck = await Brand.findOne({ name: new RegExp(`^${req.body.name}$`) }).exec();
        if (brandCheck) throw { status: 400, message: "Brand Already Exist With This Name" };

        if (req.body.imageStr) {
            req.body.imageUrl = await storeFileAndReturnNameBase64(req.body.imageStr);
        }
        await Brand(req.body).save();
        res.status(200).json({ message: "Brand Created Successfully", success: true });
    } catch (err) {
        next(err);
    }
};
export const getBrand = async (req, res, next) => {
    try {
        const getBrand = await Brand.find().exec();
        console.log(getBrand);
        res.status(200).json({ message: "getBrand", data: getBrand, success: true });
    } catch (err) {
        next(err);
    }
};
export const updateById = async (req, res, next) => {
    try {
        if (await Brand.findOne({ name: req.body.name })) throw { status: 400, message: " brand exist " };
        const brandObj = await Brand.findByIdAndUpdate(req.params.id, req.body).exec();
        if (!brandObj) throw { status: 400, message: "brand  Not Found" };
        res.status(200).json({ message: "brand Updated", success: true });
    } catch (err) {
        next(err);
    }
};
export const deleteById = async (req, res, next) => {
    try {
        const brandObj = await Brand.findByIdAndDelete(req.params.id).exec();
        if (!brandObj) throw { status: 400, message: "brand Not Found" };
        res.status(200).json({ message: "brand Deleted", success: true });
    } catch (err) {
        next(err);
    }
};

// import XLSX from "xlsx";
export const bulkUpload = async (req, res, next) => {
    try {
        console.log(req.file.path)

        let json_arr = xlsxReader(req.file.path);

        let finalJsonArr = json_arr.map(el => {
            let obj = {
                name: el['Name'],
                description: el['Description'],
                websiteLink: el['Website Link'],
                metaTitle: el['Meta Title'], //for seo
                metaDescription: el['Meta Description'], //for seo
                // imageUrl: el[''],
                statusInfo: generalModelStatuses.APPROVED,
                isFeatured: el['Featured'] ? true : false,
            }

            console.log(el, 'el')

            return obj
        })

        let existsCheckArr = await Brand.find({ name: { $in: [...finalJsonArr.map(el => `${el.name}`)] } }).exec();

        if (existsCheckArr.length > 0) {
            finalJsonArr = finalJsonArr.filter(el => existsCheckArr.some(ele => ele.name != el.name))
        }
        console.log(existsCheckArr)
        console.log(finalJsonArr)

        await Brand.insertMany(finalJsonArr)

        if (existsCheckArr.length > 0) {
            throw new Error("Some of the brands are not uploaded as you already have these in your database , but the rest are saved to the data base!");
        }

        // console.log(workbook, "req.filewwwwww")
        // let sheet_nameList = workbook.SheetNames;
        // // console.log(sheet_nameList[0], "sheet_nameList")
        // let x = 0;
        // sheet_nameList.forEach(element => {
        //     let xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_nameList[x]]);
        //     // for (let el of xlData) {
        //     //     Category.insertMany(el)
        //     // }
        //     Brand.insertMany(xlData, (err, data) => {
        //         if (err) {
        //             console.log(err)
        //         } else {
        //             console.log(data, "data345235")
        //         }
        //     });
        //     x++
        // });
        // let arr = await Brand.find().exec();
        res.status(200).json({ message: "successfully upload file", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
export const downloadBrandDemo = async (req, res, next) => {
    try {



        let workbook = new ExcelJs.Workbook();
        let worksheet = workbook.addWorksheet('Sheet1');
        let columnsArray = [];
        columnsArray = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Description', key: 'name', width: 30 },
            { header: 'Website Link', key: 'name', width: 30 },
            { header: 'Meta Title', key: 'name', width: 30 },
            { header: 'Meta Description', key: 'name', width: 30 },
            // { header: 'Image Url', key: 'name', width: 30 },
            { header: 'Status Info', key: 'name', width: 30 },
            { header: 'Featured', key: 'name', width: 30 },
        ];

        worksheet.columns = columnsArray

        let rows = [];

        // rows.push(columnsArray.map(el=>el.header))

        worksheet.addRows(rows);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader("Content-Disposition", "attachment; filename=Demo.xlsx");

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        next(error)
    }
}