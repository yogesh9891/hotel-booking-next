import SellerCategory from "../models/sellerCategory.model";

export const add = async (req, res, next) => {
    try {
        let existsCheck = await SellerCategory.findOne({ name: req.body.name }).exec()
        if (existsCheck) {
            throw new Error("Seller Category already exists with same name !, please change the name of the seller category");
        }

        if (req.body.name == "") {
            throw new Error("Name is mandatory")
        }
        if (req.body.commission == "") {
            throw new Error("Commission is mandatory")
        }
        if (req.body.logisticsFee == "") {
            throw new Error("Logistics Fee is mandatory")
        }
        await new SellerCategory(req.body).save();
        res.status(200).json({ message: "Seller Category Created", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const get = async (req, res, next) => {
    try {
        let sellerCategoryArr = await SellerCategory.find().exec();

        res.status(200).json({ message: "Seller Category Found", data: sellerCategoryArr, success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};


export const update = async (req, res, next) => {
    try {
        let existsCheck = await SellerCategory.findById(req.params.id).exec()
        if (!existsCheck) {
            throw new Error("Seller Category not found !!!");
        }

        if (req.body.name == "") {
            delete req.body.name
        }
        if (req.body.commission == "") {
            delete req.body.commission
        }
        if (req.body.logisticsFee == "") {
            delete req.body.logisticsFee
        }
        await SellerCategory.findByIdAndUpdate(existsCheck._id, req.body).exec();

        res.status(200).json({ message: "Seller Category Updated", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};



export const deleteById = async (req, res, next) => {
    try {
        let existsCheck = await SellerCategory.findById(req.params.id).exec()
        if (!existsCheck) {
            throw new Error("Seller Category not found !!!");
        }

        await SellerCategory.findByIdAndDelete(existsCheck._id).exec();

        res.status(200).json({ message: "Seller Category Deleted", success: true });
    } catch (error) {
        console.error(error);
        next(error);
    }
};




