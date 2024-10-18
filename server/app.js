import bodyParser from "body-parser"; //
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import logger from "morgan";
import path from "path";
import { CONFIG } from "./helpers/Config";
import { errorHandler } from "./helpers/ErrorHandler";
import amenityRouter from "./routes/Amenity.routes";
import amenityCategoryRouter from "./routes/AmenityCategory.routes";
import banner from "./routes/banner.routes";
import brand from "./routes/brand.routes";
import categoryRouter from "./routes/category.routes";
import cityRouter from "./routes/City.routes";
import countryRouter from "./routes/Country.routes";
import locationRouter from "./routes/Location.routes";
import hotelRouter from "./routes/Hotel.routes";
import roomRouter from "./routes/Room.routes";
import indexRouter from "./routes/index.routes";
import stateRouter from "./routes/states.routes";
import userRouter from "./routes/users.routes";
import collectionRouter from "./routes/Collection.routes";
import testimonialRouter from "./routes/testimonial.routes";
import blogRouter from "./routes/blog.routes";
import blogCategoryRoutes from "./routes/blogCategory.routes";
import homepageRouter from "./routes/Homepage.routes";
import couponRouter from "./routes/coupon.routes";
import FAQRoutes from "./routes/FAQ.routes";
import galleryRouter from "./routes/gallery.routes";
import seoRouter from "./routes/Seo.routes";
import paymentGatewayRouter from "./routes/paymentGateway.routes";
import OrderRouter from "./routes/order.routes";
import reviewRouter from "./routes/review.routes";
import dashboardRouter from "./routes/dashboard.routes";
import systemSettingRouter from "./routes/systemSetting.routes";
// import TaxRouter from "./routes/Tax.routes";
// import userAddress from "./routes/userAddress.routes";
import cron from "node-cron";
import mailRouter from "./routes/contactMail.routes";
import propertiyRoutes from "./routes/property.routes";
// import wishlist from "./routes/wishlist.routes";
import subscriptionRoutes from "./routes/subscription.routes";
import { generateSiteMapFile } from "./helpers/SiteMapGenerator";
import { seederData } from "./seeder/seeder";
import { dailyPriceProprtyPriceUpdate } from "./seeder/rmsApiSeeder";
import { cancelUnconfirmedOrder } from "./controllers/Order.controller";

const app = express();
app.set("view engine", "ejs"); /// set template engine //
app.use(bodyParser.urlencoded({ extended: false })); //

app.use(cors());
mongoose.connect(
  CONFIG.MONGOURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      // seederData();
      console.log("connected to db at " + CONFIG.MONGOURI);
    }
  }
);
mongoose.set("debug", true);

app.use(logger("dev"));

app.use(express.json({ limit: "100mb" })); // parses the incoming json requests
app.use(
  express.urlencoded({
    extended: false,
    limit: "100mb",
    parameterLimit: 10000000,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); //join=>resolve

app.use("/", indexRouter);
// app.use("/seller", sellerRouter);

// app.use("/sellerCategory", sellerCategoryRouter);

app.use("/amenityCategory", amenityCategoryRouter);
app.use("/amenity", amenityRouter);
app.use("/hotel", hotelRouter);
app.use("/room", roomRouter);
app.use("/coupon", couponRouter);

app.use("/users", userRouter);
app.use("/category", categoryRouter);

app.use("/banner", banner);

app.use("/FAQ", FAQRoutes);

app.use("/state", stateRouter);
app.use("/city", cityRouter);
app.use("/location", locationRouter);
app.use("/collection", collectionRouter);
app.use("/testimonial", testimonialRouter);
app.use("/gallery", galleryRouter);
app.use("/blog", blogRouter);
app.use("/homepage", homepageRouter);
app.use("/brand", brand); //**

app.use("/blogCategory", blogCategoryRoutes); //**

app.use("/subscription", subscriptionRoutes); //**
app.use("/contact", mailRouter); //**
app.use("/seo", seoRouter); //**
app.use("/property", propertiyRoutes); //**
app.use("/paymentGateway", paymentGatewayRouter); //**
app.use("/Order", OrderRouter);
// app.use("/sellerNotification", sellerNotificationRoutes); //**
// app.use("/userNotification", userNotificationRoutes); //**
app.use("/review", reviewRouter); //**
app.use("/dashboard", dashboardRouter); //**
app.use("/systemSetting", systemSettingRouter); //**
// app.use("/adminCommission", adminCommissionRoutes); //**
// app.use("/newsLetter", newsLetterRoutes); //**
// app.use("/notification", notificationRoutes); //**
// app.use("/permission", permissionRoutes); //**

// cron.schedule('1 * * * *', () => {
cron.schedule("0 */8 * * *", () => {
  dailyPriceProprtyPriceUpdate();
  console.log("running a task every minute");
});
cron.schedule("*/15 * * * *", () => {
  cancelUnconfirmedOrder();
  console.log("running a task every minute");
});

app.use(errorHandler);

export default app;
