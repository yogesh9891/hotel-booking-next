import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import productReview from "../models/productReview.model";
import reviewSetting from "../models/reviewSetting.model";
import Users from "../models/user.model";


export const addReviewSetting = async (req, res, next) => {
    try {
        // let validityCheck = await Users.findOne({
        //     $or: [{ _id: req.user.userId, role: "ADMIN" },
        //     { _id: req.user.userId, role: "SUBADMIN" }
        //     ]
        // }).exec()
        // if (!validityCheck) throw new Error("you are not authorise to add Review Setting");
        console.log(req.body, "req.body")
        let findReview = await reviewSetting.findOne({ userId: req.body.userId }).exec();
        // console.log(findReview, "findReview");
        if (findReview) {
            await reviewSetting.findOneAndUpdate({ userId: req.body.userId }, {
                $set: {
                    autoApproveProductReview: req.body.autoApproveProductReview,
                    autoApproveCompanyReview: req.body.autoApproveCompanyReview
                }
            }).exec();
        } else {
            const obj = {
                userId: req.body.userId,
                autoApproveProductReview: req.body.autoApproveProductReview,
                autoApproveCompanyReview: req.body.autoApproveCompanyReview
            };
            await new reviewSetting(obj).save();
        };
        res.status(200).json({ message: `Review Settings Successfully ${findReview ? "Updated" : "Created"}`, success: true });
    } catch (err) {
        next(err);
    }
};

export const
    getReviewSetting = async (req, res, next) => { //for admin
        try {
            let validityCheck = await Users.findOne({
                $or: [{ _id: req.user.userId, role: "ADMIN" },
                { _id: req.user.userId, role: "SUBADMIN" },
                { _id: req.user.userId, role: "SELLER" }
                ]
            }).exec();
            console.log(req.params);




            if (!validityCheck) throw new Error("you are not authorise to check review");
            let reviewObj = await reviewSetting.findOne({ userId: req.params.id }).lean().exec();
            res.status(200).json({ message: "Found Review Setting", data: reviewObj, success: true });
        } catch (err) {
            next(err);
        }
    };

