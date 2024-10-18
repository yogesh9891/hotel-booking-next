import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import Coupon from "../models/Coupon.model";

export const createDiscount = async (req, res, next) => {
    try {
        let nameExist = await Coupon.findOne({ discountCode: new RegExp(`^${req.body.discountCode}$`, "i") }).exec();
        if (nameExist) throw { status: 400, message: `Already created discount with this name ${req.body.name}` };

        if (req.body.image) {
            req.body.image = await storeFileAndReturnNameBase64(req.body.image);
        }



        await Coupon(req.body).save();
        res.status(200).json({ message: "Discount code created successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const checkValidCoupon = async (req, res, next) => {
    try {
        let discountCodeObj = await Coupon.findOne({ discountCode: new RegExp(`^${req.body.discountCode}$`, "i"),isActive:true }).lean().exec();
        if (!discountCodeObj) throw { status: 400, message: `Invalid discount code` };
        let today = new Date()
        let endDate = new Date(discountCodeObj?.expiryDate)
        endDate.setHours(23, 59, 59)

        let couponIsValid;
        let message = ""
        if ((endDate.getTime() < today.getTime())) {
            couponIsValid = false
            message = "Invalid coupon"
        }
        // else if ((discountCodeObj.usedBy >= discountCodeObj?.validFor)) {
        //     couponIsValid = false
        //     message = "Cannot be used further, used maximun number of times allowed"
        // }
        else if (discountCodeObj?.minimumCartValue > req.body.total) {
            couponIsValid = false
            message = "Insufficient cart Value"
        }
        else {
            couponIsValid = true
            message = "Coupon Applied"
            let amount = req.body.amount;
            if(discountCodeObj.type == 'PERCENTAGE'){
                let discoutAmount = Math.round((+amount*discountCodeObj.value)/100);
                discountCodeObj.amount = discoutAmount;
                let discountedAmount = parseInt(+amount) - parseInt(discoutAmount)
                discountCodeObj.discoutAmount = discountedAmount;
            }
    
            if(discountCodeObj.type == 'FLATOFF'){
                let discoutAmount = discountCodeObj.value;
                discountCodeObj.amount = discoutAmount;
                let discountedAmount = parseInt(+amount) - parseInt(discoutAmount)
                discountCodeObj.discoutAmount = discountedAmount;
            }

            if (discountCodeObj.amount > discountCodeObj?.maxDiscount) {
                let discoutAmount = discountCodeObj?.maxDiscount;
                    discountCodeObj.amount = discoutAmount;
                    let discountedAmount =
                      parseInt(+amount) - parseInt(discoutAmount);
                    discountCodeObj.discoutAmount = discountedAmount;
                
            }
        }




        res.status(200).json({ message: message, couponIsValid: couponIsValid, data: discountCodeObj, success: true });
    } catch (err) {
        next(err);
    }
}

export const get = async (req, res, next) => {
    try {
        let query = {}
        let todayStart = new Date()
        todayStart.setHours(0, 0, 0)

        if (req.query.active) {
            query = { ...query, expiryDate: { $gte: todayStart.getTime() }, isActive: true }
        }
        let discountFoundArr =[];
        if(req.query.limit){
              discountFoundArr = await Coupon.find(query).limit(req.query.limit).exec();
        } else {
           discountFoundArr = await Coupon.find(query).exec();
        }
        res.status(200).json({ message: "Discount codes found", data: discountFoundArr, success: true });
    } catch (err) {
        next(err);
    }
};

export const updateById = async (req, res, next) => {
    try {

        if (req.body.name) {
            let nameExist = await Coupon.findOne({ name: req.body.name, _id: { $ne: req.params.id } }).exec();
            if (nameExist) throw { status: 400, message: `Already created discount with this name ${req.body.name}` };
        }

        if (req.body.image && req.body.image.includes("base64")) {
            req.body.image = await storeFileAndReturnNameBase64(req.body.image);
        }
        else {
            delete req.body.image
        }

        console.log(req.body, "body")
        let obj = await Coupon.findByIdAndUpdate(req.params.id, req.body).lean().exec();
        res.status(200).json({ message: "Discount Code Updated Successfully", success: true });
    } catch (err) {
        next(err);
    }
};

export const deleteById = async (req, res, next) => {
    try {
        const obj = await Coupon.findByIdAndDelete(req.params.id).exec();
        if (!obj) throw { status: 400, message: "discount Not Found" };
        res.status(200).json({ message: "Discount Code Deleted Successfully", success: true });
    } catch (err) {
        next(err);
    }
};
