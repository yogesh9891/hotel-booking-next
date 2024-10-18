import userCart from "../models/userCart.model";
import Product from "../models/product.model";
// import Category from "../models/category.model";

export const addToCart = async(req, res, next) => { //create cart(if-not) and add new product & increase quantity
    try {
        const userCartObj = await userCart.findOne({ userId: `${req.user.userId}` }).lean().exec();

        let cartObj = [];
        const productFound = await Product.findById(req.params.id).lean().exec();
        if (!productFound) throw ({ status: 400, message: "product  Not Found or deleted " });

        if (userCartObj) {

            let temp;
            if (userCartObj.items.some(el => `${el.productId}` == req.params.id)) {
                temp = await userCart.
                findOneAndUpdate({ userId: `${req.user.userId}`, "items.productId": req.params.id }, { $inc: { "items.$.quantity": 1 } }).exec()
            } else {
                let items = []
                items.push({
                    productId: req.params.id,
                    quantity: 1,
                });
                temp = await userCart.
                findOneAndUpdate({ userId: `${req.user.userId}`, }, { $push: { items } }).exec()
            }
            cartObj.push(temp);
        } else {
            cartObj.push({
                userId: req.user.userId,
                items: [{
                    productId: req.params.id,
                    quantity: 1,
                }],
            })
            await userCart.create(cartObj)
        }
        console.log(cartObj, "cartObj")
        res.status(200).json({ message: " add to cart details", success: true });
    } catch (err) {
        next(err);
    }
};
export const getCart = async(req, res, next) => {
    try {
        const getCart = await userCart.findOne({ userId: `${req.user.userId}` }).exec();
        if (!getCart) throw ({ status: 400, message: "cart  Not Found" });
        // console.log(getCart, "getCart")

        let data = [];

        for (let el of getCart.items) {
            let productFound = await Product.findOne({ _id: `${el.productId}` }).exec()
            data.push({
                productName: productFound.name,
                Price: productFound.sellingPrice,
                productImage: productFound.productImage,
                description: productFound.description,
                quantity: el.quantity
            });
        }
        console.log(data, "obj")
        res.status(200).json({ message: "cart details", data: data, success: true });
    } catch (err) {
        next(err);
    }
};

export const decrementProductQuantity = async(req, res, next) => {
    try {
        const userCartObj = await userCart.findOne({ userId: `${req.user.userId}` }).lean().exec();
        if (!userCartObj) throw ({ status: 400, message: "cart  Not Found" });

        const findCart = await userCart
            .findOneAndUpdate({ userId: req.user.userId, "items.productId": req.params.id }, { $inc: { "items.$.quantity": -1 } }).exec()

        for (let i = 0; i < findCart.items.length; i++) {
            if (findCart.items[i].quantity <= 1) {
                findCart.items.splice(i, 1);
                await findCart.save()
            }
        }
        // console.log(findCart, "fmnwsef")
        res.status(200).json({ message: "product quantity decrease from cart", data: findCart, success: true });
    } catch (err) {
        next(err);
    }
};

export const increaseQuantity = async(req, res, next) => {
    try {
        const userCartObj = await userCart.findOne({ userId: `${req.user.userId}` }).exec();
        if (!userCartObj) throw ({ status: 400, message: "cart  Not Found" });
        // console.log(userCartObj, "a894284209");

        if (userCartObj.items.some(el => `${el.productId}` == req.params.id)) {
            await userCart.
            findOneAndUpdate({ userId: req.user.userId, "items.productId": req.params.id }, { $inc: { "items.$.quantity": 1 } }).exec()
        } else {
            throw ({ status: 400, message: " product  Not Found" });
        };
        // console.log(temp, "temp")
        res.status(200).json({ message: " product's quantity Updated", success: true });
    } catch (err) {
        next(err);
    }
};

export const removeProduct = async(req, res, next) => {
    try {
        const findCart = await userCart
            .findOneAndUpdate({ userId: `${req.user.userId}`, "items.productId": req.params.id }, { $pull: { items: { "productId": req.params.id } } }, { new: true }).exec()
            // console.log(findCart, "findCart")

        if (!findCart) throw ({ status: 400, message: "cart or product  Not Found" });
        res.status(200).json({ message: "product removed from cart", success: true });
    } catch (err) {
        next(err);
    }
};

// for (let i = 0; i < items.length; i++) {
//     // let product = await vendorProducts.findOne({ _id: items[i].productId });
//     let productIndex = userCartObj.items.findIndex(p => p.productId == items[i].productId);
//     if (productIndex > -1) {
//         userCartObj.items[productIndex].quantity += items[i].quantity;
//         await userCartObj.save()
//     } else {
//         const cartDetail = await userCart
//             .findOneAndUpdate({ userId: req.params.id },
//                 { $addToSet: { items: { $each: items } } }, { new: true })
//     }
// }
// if (!userCartObj) throw ({ status: 400, message: "cart  Not Found" });
// }


//////////////////////////////////////

// let categoryFound = await Category.findById(productFound.categoryId).lean().exec();
// console.log(categoryFound, "categoryFound");

//////////////////////////////////////////////////////////////////////////


// console.log(temp.items, "temp")
// let quantity = {}
// if (userCartObj.items.some(el => `${el.productId}` == req.params.id)) {
//     quantity = await userCart.
//     findOne({ items.productId: `${req.params.id}` }).exec()
//         // console.log(temp, "temp")
// }
// if (userCartObj.items.some(el => `${el.productId}` == req.params.id)) {
//     let tempQuantity = await userCart.findOneAndUpdate({ "items.productId": `${req.params.id}` }).exec();
//     console.log(tempQuantity)
//     quantity = tempQuantity
//         // items: { $elemMatch: { productId: `${req.params.id}` } }
//         // console.log(temp, "temp")
// }
// console.log(quantity, "uuuuu")