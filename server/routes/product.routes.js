import express from "express";
import {
    addProduct,
    deleteProductById,
    getAllProducts,
    updateProductById,
    getActiveProducts,
    approvProduct,
    bulkUpload,
    getApprovedProducts,
    bulkExport,
    getUpSellingProducts,
    getproductBinding,
    changeProductBulk,
    changeProductStatusBulk,
    changeproductCategory,
    productCloning,
    approveProductsInBulk,
    unapproveProductsInBulk,
    deleteProductsInBulk,
    relatedProductsAdd,
    relatedProductsRemove,
    getRelatedProducts,
} from "../controllers/product.controller";

let router = express.Router();
import { authorizeJwt } from "../middlewares/auth.middleware";
import { upload } from "../helpers/fileUpload";

router.post("/addProduct", addProduct);
router.get("/getProducts", authorizeJwt, getAllProducts);
router.get("/getRelatedProducts", authorizeJwt, getRelatedProducts);

router.patch("/updateById/:id", authorizeJwt, updateProductById);

router.get("/getActiveProducts", getActiveProducts);

router.patch("/approveById/:id", authorizeJwt, approvProduct);
router.patch("/approveProductsInBulk", authorizeJwt, approveProductsInBulk);
router.patch("/unapproveProductsInBulk", authorizeJwt, unapproveProductsInBulk);
router.patch("/deleteProductsInBulk", authorizeJwt, deleteProductsInBulk);
router.delete("/deleteById/:id", authorizeJwt, deleteProductById);
router.get("/getApprovedProducts", getApprovedProducts);

router.post("/bulkUpload", authorizeJwt, upload.single("excel"), bulkUpload);
router.get("/bulkExport", authorizeJwt, bulkExport);

router.post("/getUpSellingProducts", /*authorizeJwt,*/ getUpSellingProducts);
router.post("/getproductBinding", /*authorizeJwt,*/ getproductBinding);

router.post("/changeProductBulk", authorizeJwt, upload.single("excel"), changeProductBulk);
router.post("/changeProductStatusBulk", authorizeJwt, upload.single("excel"), changeProductStatusBulk);
router.post("/changeproductCategory", authorizeJwt, changeproductCategory);
router.post("/productCloning", authorizeJwt, productCloning);

router.post("/relatedProductsAdd", authorizeJwt, relatedProductsAdd);
router.post("/relatedProductsRemove", authorizeJwt, relatedProductsRemove);

// router.get("/getCrossSellingProducts", /*authorizeJwt,*/ getCrossSellingProducts);

// router.get("/getPublishAndTotal", getProductsPubAndTotal);
// router.get("/getProductCategoryWise", getProductsCategoryWise);

// router.get("/getBestSellerProducts", getBestSellerProducts);
// router.get("/trendingProducts", getTrendingProducts);
// router.get("/getProductById/:id", getProductById);

export default router;
