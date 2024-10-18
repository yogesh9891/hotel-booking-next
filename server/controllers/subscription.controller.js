import subscription from '../models/subscription.model';
// import newsLetter from '../models/newsLetter.model';/


export const create = async(req, res, next) => {
    // try {
    //     const findSubscription = await subscription
    //         .findOne({ sellerId: req.body.sellerId, newsLetterId: req.body.newsLetterId }).lean().exec();
    //     // if (findSubscription) throw { status: 400, message: 'you already subscribed' };

    //     let findNewsLetter = await newsLetter.findById(req.body.newsLetterId).exec();
    //     if (!findNewsLetter) throw { status: 400, message: 'newsLetter not found or expired' };

    //     if (!['monthly', 'quarterly', 'yearly'].includes(req.body.type)) throw ({ status: 400, message: 'not valid subscription type' })

    //     let obj = {
    //         sellerId: req.body.sellerId,
    //         newsLetterId: req.body.newsLetterId,
    //         type: req.body.type,
    //         price: req.body.price
    //     };

    //     await subscription(obj).save()
    //     res.status(201).json({ message: 'subscription create successfully', success: true });
    // } catch (err) {
    //     next(err);
    // }
};

export const getSubscription = async(req, res, next) => {
    try {
        const getSubscription = await subscription.find().exec();
        res.status(200).json({ message: "subscription", data: getSubscription, success: true });
    } catch (err) {
        next(err);
    }
};


export const subscribe = async(req, res, next) => {
    try {

        const findSubscription = await subscription
        .findOne({ email: req.body.email }).lean().exec();
    if (findSubscription) throw { status: 400, message: 'you already subscribed' };
    if (!ValidateEmail(req.body.email)) throw new Error("please fill valid email");

        let obj = {
            email:req.body.email
        };

        await subscription(obj).save()
        res.status(201).json({ message: 'Thank you for subscription', success: true });
    } catch (err) {
        next(err);
    }
};
export const updateById = async(req, res, next) => {
    // try {
    //     if (req.body.newsLetterId) {
    //         let findNewsLetter = await newsLetter.findById(req.body.newsLetterId).exec();
    //         if (!findNewsLetter) throw { status: 400, message: 'newsLetter not found or expired' };
    //     };
    //     let obj = {
    //         newsLetterId: req.body.newsLetterId,
    //         type: req.body.type,
    //         price: req.body.price
    //     };

    //     const subscriptionObj = await subscription.findByIdAndUpdate(req.params.id, obj, { new: true }).exec();
    //     if (!subscriptionObj) throw { status: 400, message: "subscription  Not Found" };
    //     res.status(200).json({ message: "subscription Update successfully", success: true });
    // } catch (err) {
    //     next(err);
    // }
};

export const deleteById = async(req, res, next) => {
    try {
        const subscriptionObj = await subscription.findByIdAndDelete(req.params.id).exec();
        if (!subscriptionObj) throw { status: 400, message: "subscription Not Found" };
        res.status(200).json({ message: "subscription Delete successfully", success: true });
    } catch (err) {
        next(err);
    }
};