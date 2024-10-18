import systemSetting from "../models/systemSetting.model";
import Users from "../models/user.model";
import Hotel from "../models/Hotel.model";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import {
  searchHotelByDestination,
  searchHotelByHotelId,
} from "../services/rezliveapi";
import RoomModel from "../models/Room.model";
import LocationModel from "../models/Location.model";
import { generalHoteType, generalModelStatuses } from "../helpers/Constants";
import RoomAvailableModel from "../models/RoomAvailable.model";
import ical from "ical-generator";
import { Collection } from "mongoose";
import orderModel from "../models/order.model";
import { searchHotelAvailabltiyByDestination } from "../services/rmsapi";
import propertyTypeModel from "../models/propertyType.model";
const { writeFileSync } = require("fs");
const ics = require("ics");

export const addHotel = async (req, res, next) => {
  try {
    // let validityCheck = await Users.findOne({
    //     $or: [
    //         { _id: req.user.userId, role: "ADMIN" },
    //         { _id: req.user.userId, role: "SUBADMIN" },
    //     ]
    // }).exec();

    // if (!validityCheck) throw new Error("you are not authorise to add FAQ");
    let existsCheck = await Hotel.findOne({ name: req.body.name }).exec();
    if (existsCheck) {
      throw new Error("A Hotel already exists with the same name ");
    }
    if (req.body.mainImage) {
      req.body.mainImage = await storeFileAndReturnNameBase64(
        req.body.mainImage
      );
    }
    if (req.body.imagesArr) {
      for (const ele of req.body.imagesArr) {
        if (ele.imageUrl) {
          ele.imageUrl = await storeFileAndReturnNameBase64(ele.imageUrl);
        }
      }
    }

    console.log(req.body.roomsArr, "req.body.roomsArrreq.body.roomsArr");
    if (req.body.roomsArr) {
      for (const el of req.body.roomsArr) {
        if (el.name != "") {
          if (el.image) {
            el.image = await storeFileAndReturnNameBase64(el.image);
          }
          for (const ele of el.imagesArr) {
            if (ele.imageUrl && el.imageUrl != "") {
              ele.imageUrl = await storeFileAndReturnNameBase64(ele.imageUrl);
            }
          }
        }
      }
    }
    console.log(
      req.body.spotlightArr,
      "req.body.spotlightArr.body.spotlightArr"
    );

    if (req.body.spotlightArr) {
      for (const el of req.body.spotlightArr) {
        // for (const ele of el.imagesArr) {
        if (el.imageUrl) {
          el.imageUrl = await storeFileAndReturnNameBase64(el.imageUrl);
        }
        // }
      }
    }
    if (req.body.galleryArr) {
      for (const el of req.body.galleryArr) {
        for (const ele of el.imagesArr) {
          if (ele.imageUrl && el.imageUrl != "") {
            ele.imageUrl = await storeFileAndReturnNameBase64(ele.imageUrl);
          }
        }
      }
    }

    if (req.body.name) {
      const slugify = req.body.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      req.body.slug = slugify;
    }

    await Hotel(req.body).save();
    res
      .status(201)
      .json({ message: "Hotel added successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const getHotel = async (req, res, next) => {
  try {
    let query = [];
    let page = 1;
    let limit = 10;
    if (req.query.min && req.query.max) {
      query = [
        ...query,
        {
          price: {
            $gte: parseInt(req.query.min),
            $lte: parseInt(req.query.max),
          },
        },
      ];
    }

    let select = {
      _id: 1,
      name: 1,
      slug: 1,
      location: 1,
      mainImage: 1,
      price: 1,
      hotelType: 1,
      guest: 1,
      bedroom: 1,
      bathroom: 1,
      meal: 1,
      order: 1,
      roomAndAmenitiesServiceArr: 1,
      foodAndDiningArr: 1,
      isActive: 1,
    };

    if (req.query.amenityArr && JSON.parse(req.query.amenityArr).length) {
      let tempAmenitiesArr = JSON.parse(req.query.amenityArr);
      query = [
        ...query,
        {
          "amenitiesArr.amenityArr.amenityId": {
            $in: [...tempAmenitiesArr.map((el) => el._id)],
          },
        },
      ];
    }
    if (req.query.locationArr && JSON.parse(req.query.locationArr).length) {
      let tempLocationArr = JSON.parse(req.query.locationArr);
      query = [
        ...query,
        { location: { $in: [...tempLocationArr.map((el) => el)] } },
      ];
    }

    if (req.query.collectionArr && JSON.parse(req.query.collectionArr).length) {
      let tempcollectionArr = JSON.parse(req.query.collectionArr);
      query = [
        ...query,
        {
          "hotelCollection.id": {
            $in: [...tempcollectionArr.map((el) => el)],
          },
        },
      ];
    }

    if (req.query.status) {
      query = [...query, { isActive: req.query.status }];
    }

       if (req.query.locationId) {
         query = [...query, { location: req.query.locationId }];
       }
    if (req.query.q) {
      query = [...query, { name: new RegExp(`^${req.query.q}$`) }];
    }

    if (req.query.propertyType && JSON.parse(req.query.propertyType).length) {
      let temppropertyType = JSON.parse(req.query.propertyType);

      console.log(
        [...temppropertyType.map((el) => el.name)],
        "[...temppropertyType.map(el => el.name)]"
      );
      query = [
        ...query,
        { hotelType: { $in: [...temppropertyType.map((el) => el.name)] } },
      ];
    }


    if (req.query.hotelType) {
      query = [...query, { hotelType: req.query.hotelType }];
    }
    let sortByCondition = {};
    if (req.query.sortBy) {
      if (req.query.sortBy == "Date, new to old") {
        console.log(req.query.sortBy, "req.query.sortBy");
        sortByCondition = { createdAt: 1 };
      }
      if (req.query.sortBy == "Date, old to new") {
        console.log(req.query.sortBy, "req.query.sortBy");
        sortByCondition = { createdAt: -1 };
      } else {
        sortByCondition = { createdAt: 1 };
      }
    }

    if (req.query.sortByPrice) {
      console.log(req.query.sortByPrice, "req.query.sortBy");
      if (req.query.sortByPrice === "high") {
        sortByCondition = { price: -1 };
      }
      if (req.query.sortByPrice === "low") {
        sortByCondition = { price: 1 };
      }
      if (req.query.sortByPrice === "Relevant") {
        sortByCondition = {};
      }
    }
    if (req.query.order) {
      sortByCondition = { ...sortByCondition, order: 1 };
    }

    console.log(
      query,
      "queryqueryqueryqueryqueryqueryqueryquery-----------------------------------------------------------",
      sortByCondition
    );

    let hotelsArr = [];
    if (query && query.length > 0) {
      hotelsArr = await Hotel.find({ $and: query })
        .select(select)
        .sort(sortByCondition)
        .lean()
        .exec();
      if (req.query.limit && req.query.page) {
        limit = req.query.limit;
        page = req.query.page;
        hotelsArr = await Hotel.find({ $and: query })
          .select(select)
          .sort(sortByCondition)
          .limit(limit)
          .skip(limit * page)
          .lean()
          .exec();
      }
    } else {
      hotelsArr = await Hotel.find()
        .select(select)
        .sort(sortByCondition)
        .lean()
        .exec();
    }

    for (const hotel of hotelsArr) {
      if (hotel.location) {
        hotel.locationObj = await LocationModel.findById(hotel.location);
      }

      let que = [];

      // if (hotel._id) {
      //   que = [ ...que,{ hotelId : hotel._id,availableDate :new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate())}]
      //   // que = [ ...que,{ availableDate :new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate())}]
      //   let hotelRoom = await RoomModel.findOne({hotelId:hotel._id}).sort({price:1}).lean().exec();

      //   if(req.query.min && req.query.max){
      //     que = [...que, { price: { $gte: parseInt(req.query.min) , $lte: parseInt(req.query.max) } }]
      //    hotelRoom = await RoomModel.findOne({hotelId:hotel._id,price: { $gte: parseInt(req.query.min) , $lte: parseInt(req.query.max) }}).sort({price:1}).lean().exec();

      //   }

      //   if(hotelRoom){
      //     que = [ ...que,{roomId:hotelRoom._id}];
      //     hotel.price = hotelRoom.price;
      //   }
      // }
      //    let roomA  = await RoomAvailableModel.findOne({ $and: que }).sort({price:1,createdAt:-1}).lean().exec();
      //    if(roomA){
      //      console.log("roomAroomAroomA",roomA)
      //     //  hotel.price = roomA.price;
      //    }
    }

    // console.log(JSON.stringify(hotelsArr, null, 2));
    res
      .status(200)
      .json({ message: " Hotels ", data: hotelsArr, success: true });
  } catch (err) {
    next(err);
  }
};

export const getHotelWithRoom = async (req, res, next) => {
  // for user
  try {
    const hotelsArr = await Hotel.find()
      .select("_id name hotelId hotelType roomAndAmenitiesServiceArr")
      .lean()
      .exec();
    for (let hotel of hotelsArr) {
      hotel.roomArr = await RoomModel.find({ hotelId: `${hotel._id}` })
        .select()
        .lean()
        .exec();
    }
    res
      .status(200)
      .json({ message: "Hotel Arr", data: hotelsArr, success: true });
  } catch (err) {
    next(err);
  }
};

export const getHotelType = async (req, res, next) => {
  // for user
  try {
    const hotelsArr = await propertyTypeModel.find({});

    res
      .status(200)
      .json({ message: "Hotel Arr", data: hotelsArr, success: true });
  } catch (err) {
    next(err);
  }
};

export const saveHotelposition = async (req, res, next) => {
  // getTrending products
  try {
    // console.log(req.body,"idsaveCategoryposition")
    // let categoryArray = await Category.find({ specialEdition: true ,isDeleted: false }).select({ _id: 1, name: 1, categoryImage: 1 }).lean().exec();
    // console.log(categoryArray, "categoryArray")
    if (req.body.hotel && req.body.hotel.length > 0) {
      for (let hotel of req.body.hotel) {
        if (hotel?.hotelId && hotel.order) {
          let hotelObj = await Hotel.findByIdAndUpdate(
            hotel?.hotelId,
            { order: hotel.order },
            { new: true }
          )
            .lean()
            .exec();
          // console.log(categoryObj,"categoryObjcategoryObj")
        }
      }
    }

    res.status(200).json({ message: "specialEdition", success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
export const getHotelById = async (req, res, next) => {
  // for user
  try {
    const hotelObj = await Hotel.findById(req.params.id).lean().exec();

    if (!hotelObj) {
      throw new Error("Could not find hotel");
    }
    let que = [];
    que = [
      ...que,
      {
        hotelId: hotelObj?._id,
        availableDate: {
          $gte: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          ),
        },
      },
    ];
    // que = [ ...que,{ availableDate :new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate())}]
    let roomA = await RoomAvailableModel.findOne({ $and: que }).lean().exec();
    if (roomA) {
      console.log(roomA, "roomAroomA");

      hotelObj.price = roomA.price;
    }
    if (hotelObj.location) {
      hotelObj.locationObj = await LocationModel.findById(hotelObj.location);
    }

    res.status(200).json({ message: "Hotel", data: hotelObj, success: true });
  } catch (err) {
    next(err);
  }
};
export const getHotelBySlug = async (req, res, next) => {
  // for user
  try {
    const hotelObj = await Hotel.findOne({ slug: req.params.id }).lean().exec();
    if (!hotelObj) {
      throw new Error("Could not find hotel");
    }
    let que = [];
    que = [
      ...que,
      {
        hotelId: hotelObj?._id,
        availableDate: {
          $gte: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          ),
        },
      },
    ];
    // que = [ ...que,{ availableDate :new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate())}]
    let roomA = await RoomAvailableModel.findOne({ $and: que }).lean().exec();
    if (roomA) {
      console.log(roomA, "roomAroomA");

      // hotelObj.price = roomA.price;
    }
    if (hotelObj.location) {
      hotelObj.locationObj = await LocationModel.findById(hotelObj.location);
    }
    res.status(200).json({ message: "Hotel", data: hotelObj, success: true });
  } catch (err) {
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  try {
    if (req.body.roomsArr) {
      for (let el of req.body.roomsArr) {
        if (el.image && el.image != "" && `${el.image}`.includes("base64")) {
          el.image = await storeFileAndReturnNameBase64(el.image);
        }
        if (el.imagesArr) {
          for (const ele of el.imagesArr) {
            if (
              ele.imageUrl &&
              ele.imageUrl != "" &&
              `${ele.imageUrl}`.includes("base64")
            ) {
              ele.imageUrl = await storeFileAndReturnNameBase64(ele.imageUrl);
            }
          }
        }
        console.log(el, " console.log()");
      }
    }

    if (req.body.mainImage && `${req.body.mainImage}`.includes("base64")) {
      req.body.mainImage = await storeFileAndReturnNameBase64(
        req.body.mainImage
      );
    }
    if (req.body.name) {
      const slugify = req.body.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      req.body.slug = slugify;
    }
    if (req.body.imagesArr) {
      for (const ele of req.body.imagesArr) {
        if (
          ele.imageUrl &&
          ele.imageUrl != "" &&
          `${ele.imageUrl}`.includes("base64")
        ) {
          ele.imageUrl = await storeFileAndReturnNameBase64(ele.imageUrl);
        }
      }
    }
    if (req.body.spotlightArr) {
      for (const ele of req.body.spotlightArr) {
        if (
          ele.imageUrl &&
          ele.imageUrl != "" &&
          `${ele.imageUrl}`.includes("base64")
        ) {
          ele.imageUrl = await storeFileAndReturnNameBase64(ele.imageUrl);
        }
      }
    }
    if (req.body.galleryArr) {
      for (const ele of req.body.galleryArr) {
        if (ele.imagesArr) {
          for (const elex of ele.imagesArr) {
            if (
              elex.imageUrl &&
              elex.imageUrl != "" &&
              `${elex.imageUrl}`.includes("base64")
            ) {
              elex.imageUrl = await storeFileAndReturnNameBase64(elex.imageUrl);
            }
          }
        }
      }
    }
    await Hotel.findByIdAndUpdate(req.params.id, req.body).exec();
    res
      .status(201)
      .json({ message: "Update Hotel successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    // let validityCheck = await Users.findOne({
    //   $or: [
    //     { _id: req.user.userId, role: "ADMIN" },
    //     { _id: req.user.userId, role: "SUBADMIN" },
    //   ],
    // }).exec();
    // if (!validityCheck) throw new Error("you are not authorise to delete FAQ");

    let Obj = await Hotel.findOne({ _id: req.params.id }).exec();
    if (!Obj)
      throw { status: 400, message: "Hotel not found or deleted already" };

    await Hotel.findByIdAndDelete(req.params.id).exec();

    res
      .status(200)
      .json({ message: "Hotel deleted successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const updateDocumentStatus = async (req, res, next) => {
  //admin wants to update the 'isdeleted' false from true
  try {
    // let validityCheck = await Users.findOne({
    //     $or: [{ _id: req.user.userId, role: "ADMIN" },
    //     { _id: req.user.userId, role: "SUBADMIN" }
    //     ]
    // }).exec();
    // if (!validityCheck) throw new Error("you are not authorise to update the document status");

    let Obj = await Hotel.findByIdAndUpdate(req.params.id, {
      isActive: req.body.status,
    }).exec();
    if (!Obj) throw { status: 400, message: "Hotel not found" };

    res
      .status(200)
      .json({ msg: "Hotel status update successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const searchHotelFromApiByDestination = async (req, res, next) => {
  try {
    let obj = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      locationId: req.body.locationId,
      adult: req.body.adult,
      child: req.body.child,
      rooms: req.body.rooms,
      roomsArr: req.body?.roomsArr,
    };

    let select = {
      _id: 1,
      name: 1,
      slug: 1,
      location: 1,
      mainImage: 1,
      price: 1,
      hotelType: 1,
      guest: 1,
      bedroom: 1,
      bathroom: 1,
      meal: 1,
      order: 1,
      roomAndAmenitiesServiceArr: 1,
      foodAndDiningArr: 1,
      isActive: 1,
    };
    let tempHotelsArr = [];

    
    let qury = [{
      rmsPropertyId: { $exists: true },
    }];
    
   if (req.body.locationId) {
         qury = [...qury, { location: req.body.locationId }];
    }
    if (req.body.hotelType) {
      qury = [...qury, { hotelType: req.body.hotelType }];
    }
    
    let hotelPropertyOds = await Hotel.find({ $and: qury })
      .select({ rmsPropertyId: 1, rmsCategoryId: 1 })
      .exec();
    
    console.log(
      hotelPropertyOds,
      "hotelPropertyOdshotelPropertyOdshotelPropertyOds"
    );
    
    if (hotelPropertyOds && hotelPropertyOds?.length > 0) {
      if (hotelPropertyOds.some((el) => el.rmsCategoryId == "5")) {
        obj.propertyId = 5;
        obj.proprtyids = hotelPropertyOds
          .filter((el) => el.rmsCategoryId == '5')
          .map((el) => el.rmsPropertyId);

        let rateArr = await searchHotelAvailabltiyByDestination(obj);

        if (rateArr && rateArr?.categories && rateArr?.categories?.length > 0) {
          // let hotelPropertyOds = rateArr?.categories.filter((el) => el.rates[0].dayBreakdown.every(elx =>elx.availableAreas > 0)).map(el => el.categoryId);

          let hotelPropertyOds = rateArr?.categories.map((el) => {
            console.log(el, "categoriescategoriescategoriescategories");
            if (el.rates && el.rates?.length > 0) {
              return el.categoryId;
            }
            return 0;
          });

          console.log(
            hotelPropertyOds,
            "hotelPropertyOdshotelPropertyOdshotelPropertyOds"
          );

         let tempHotelsArr1 = await Hotel.find({
            rmsPropertyId: { $in: hotelPropertyOds },
          })
            .select(select)
            .lean()
            .exec();

          for (const hotel of tempHotelsArr1) {
            if (hotel.location) {
              hotel.locationObj = await LocationModel.findById(hotel.location);
            }
            hotel.isAvailable = false;
            let categoryObj = rateArr?.categories.find(
              (el) => el.categoryId == hotel.rmsPropertyId
            );
            if (categoryObj && categoryObj?.rates?.length > 0) {
              console.log(JSON.stringify(categoryObj.rates), null, 2);
              hotel.isAvailable = categoryObj.rates.every((el) =>
                el.dayBreakdown.every((elx) => elx.availableAreas > 0)
              );
              if (
                categoryObj.rates[0]?.dayBreakdown &&
                categoryObj.rates[0]?.dayBreakdown[0]?.dailyRate
              ) {
                hotel.price = categoryObj.rates[0]?.dayBreakdown[0]?.dailyRate;
              }
            }
          }

          if (tempHotelsArr1?.length > 0) {
             tempHotelsArr = [...tempHotelsArr, ...tempHotelsArr1];

          }
        }
      } 

        obj.propertyId = hotelPropertyOds[0].rmsCategoryId;
        obj.proprtyids = hotelPropertyOds.map((el) => el.rmsPropertyId);

        let rateArr = await searchHotelAvailabltiyByDestination(obj);

        if (rateArr && rateArr?.categories && rateArr?.categories?.length > 0) {
          // let hotelPropertyOds = rateArr?.categories.filter((el) => el.rates[0].dayBreakdown.every(elx =>elx.availableAreas > 0)).map(el => el.categoryId);

          let hotelPropertyOds = rateArr?.categories.map((el) => {
            console.log(el, "categoriescategoriescategoriescategories");
            if (el.rates && el.rates?.length > 0) {
              return el.categoryId;
            }
            return 0;
          });

          console.log(
            hotelPropertyOds,
            "hotelPropertyOdshotelPropertyOdshotelPropertyOds"
          );

         let tempHotelsArr2 = await Hotel.find({
            rmsPropertyId: { $in: hotelPropertyOds },
          })
            .select(select)
            .lean()
            .exec();

          for (const hotel of tempHotelsArr2) {
            if (hotel.location) {
              hotel.locationObj = await LocationModel.findById(hotel.location);
            }
            hotel.isAvailable = false;
            let categoryObj = rateArr?.categories.find(
              (el) => el.categoryId == hotel.rmsPropertyId
            );
            if (categoryObj && categoryObj?.rates?.length > 0) {
              console.log(JSON.stringify(categoryObj.rates), null, 2);
              hotel.isAvailable = categoryObj.rates.every((el) =>
                el.dayBreakdown.every((elx) => elx.availableAreas > 0)
              );
              if (
                categoryObj.rates[0]?.dayBreakdown &&
                categoryObj.rates[0]?.dayBreakdown[0]?.dailyRate
              ) {
                hotel.price = categoryObj.rates[0]?.dayBreakdown[0]?.dailyRate;
              }
            }
          }

          if (tempHotelsArr2?.length > 0) {
             tempHotelsArr = [...tempHotelsArr, ...tempHotelsArr2];
            //  tempHotelsArr.push(tempHotelsArr2);
           }
        }
     
    }
    // console.log(JSON.stringify(JSON.parse(otherobj), null, 2));

    // console.log(otherobj);
    res
      .status(200)
      .json({ message: "Result", data: tempHotelsArr, success: true });
  } catch (error) {
    next(error);
  }
};

export const getHotelByIdAndRates = async (req, res, next) => {
  // for user
  try {
    let hotelObj = await Hotel.findById(req.body.propertyId).lean().exec();

    if (!hotelObj) {
      throw new Error("Could not find hotel");
    }


    if (hotelObj?.hotelType == 'Hotels') {
      if (req?.body?.roomsArr && req?.body?.roomsArr?.length > 0) {
        // let roomObj = await RoomModel.findById(req.body.roomId).lean().exec();

        // hotelObj.guest = roomObj?.guest;
        hotelObj.rmsPropertyId = req?.body?.roomsArr.map(
          (el) => el?.rmsPropertyId
        );

        //   if (
        //     req.body?.rooms &&
        //     Number(req.body?.rooms) > Number(roomObj?.noOfRoom)
        //   ) {
        //     throw new Error(
        //       "Maxmium room for this property is " + Number(hotelObj?.noOfRoom)
        //     );
        //   }
      } else {

        
        let roomArr = await RoomModel.find({ hotelId: `${hotelObj?._id}` }).select("rmsPropertyId").lean().exec();
        
        console.log(roomArr, "roomArrroomArrroomArrroomArr");
        hotelObj.rmsPropertyId = roomArr.map((el) => el?.rmsPropertyId);
      }
    }


      if (!hotelObj.rmsPropertyId) {
      throw new Error("rmsPropertyId not found hotel");
    }

    let totalGuest = Number(req.body.adult) + Number(req.body.child);
    if (hotelObj.guest && totalGuest > Number(hotelObj?.guest)) {
      throw new Error(
        "Maxmium people for this property is " + Number(hotelObj?.guest)
      );
    }

    let obj = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      locationId: req.body.locationId,
      adult: req.body.adult,
      child: req.body.child,
      rooms: req.body.rooms,
      propertyId: hotelObj?.rmsCategoryId,
    };
    obj.proprtyids =
      typeof hotelObj.rmsPropertyId == "string"
        ? [hotelObj.rmsPropertyId]
        : hotelObj.rmsPropertyId;

    let rateArr = await searchHotelAvailabltiyByDestination(obj);

    let tempArr = [];
    if (rateArr && rateArr?.categories && rateArr?.categories?.length > 0) {
      for (const category of rateArr?.categories) {
        console.log(JSON.stringify(category));
        let rates = category.rates;
        if (rates && rates?.length > 0) {
          console.log(`Rate Data from RMS : ${JSON.stringify(rates)}`);

          let isAvailable = category.rates.every((el) => el.dayBreakdown.every((elx) => elx.availableAreas > 0));

            tempArr.push({
              rates: category.rates,
              name: category.name,
              categoryId: category.categoryId,
              isAvailable
            });
          }
          // if (rates[0].dayBreakdown.every((elx) => elx.availableAreas > 0)) {
          //   console.log(
          //     `Rate Data from rates[0].dayBreakdown. : ${JSON.stringify(
          //       rates[0].dayBreakdown
          //     )}`
          //   );

          //   tempArr.push({
          //     rates: category.rates,
          //     name: category.name,
          //     categoryId:category.categoryId });
          // }
        }
      }


    if (hotelObj.location) {
      hotelObj.locationObj = await LocationModel.findById(hotelObj.location);
    }

    res.status(200).json({
      message: "Hotel",
      data: hotelObj,
      rateArr: tempArr,
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

export const searchHotelFromApiByHotelId = async (req, res, next) => {
  try {
    let obj = {
      hotelId: req.params.id,
    };
    let otherobj = await searchHotelByHotelId(obj);

    let parsedObject = JSON.parse(otherobj);
    console.log(parsedObject);

    let HotelFindResponseElements = parsedObject?.elements?.find(
      (el) => el.name == "HotelDetailsResponse"
    );
    console.log(HotelFindResponseElements, "RES");
    let tempHotelsArr = [];
    let tempHotelObj = {};
    if (
      HotelFindResponseElements &&
      HotelFindResponseElements?.elements &&
      HotelFindResponseElements?.elements.length > 0
    ) {
      let HotelsArr = HotelFindResponseElements?.elements?.find(
        (el) => el.name == "Hotels"
      );
      // console.log(HotelsArr.elements, "HOTELS ARRRR");

      for (let elx of HotelsArr.elements) {
        console.log(elx, "ELX DATA");
        if (elx.name == "HotelId") {
          if (elx?.elements && elx?.elements.length > 0)
            tempHotelObj.rezLiveHotelId = elx?.elements[0]?.text;
        }
        if (elx.name == "HotelName") {
          if (elx?.elements && elx?.elements.length > 0)
            tempHotelObj.name = elx?.elements[0]?.cdata;
        }
        if (elx.name == "Rating") {
          if (elx?.elements && elx?.elements.length > 0)
            tempHotelObj.rating = elx.elements[0]?.text;
        }
        if (elx.name == "MainImage") {
          if (elx?.elements && elx?.elements.length > 0)
            tempHotelObj.imageUrl = elx.elements[0]?.text;
        }
        if (elx.name == "Description") {
          if (elx?.elements && elx?.elements.length > 0)
            tempHotelObj.description = elx.elements[0]?.cdata;
        }
        if (elx.name == "HotelAddress") {
          if (elx?.elements && elx?.elements.length > 0)
            tempHotelObj.hotelAddress = elx.elements[0]?.cdata;
        }
        if (elx.name == "HotelAmenities") {
          if (elx?.elements && elx?.elements.length > 0)
            tempHotelObj.HotelAmenities = elx.elements[0]?.cdata;
        }
        if (elx.name == "RoomAmenities") {
          if (elx?.elements && elx?.elements.length > 0)
            tempHotelObj.RoomAmenities = elx.elements[0]?.cdata;
        }
        // if (elx.name == "Price") {
        //   tempHotelObj.price = elx.elements[0]?.text;
        // }
        // if (elx.name == "Hotelwiseroomcount") {
        //   tempHotelObj.Hotelwiseroomcount = elx.elements[0]?.text;
        // }

        console.log(tempHotelObj, "OBJ");
        // let currentHotelEl = elx.elements.find((elz) => elz?.name == "Name");
        // console.log(currentHotelEl, "NAME EL");
      }
    }
    console.log(tempHotelObj, "ARR");

    res
      .status(200)
      .json({ message: "Result", data: tempHotelObj, success: true });
  } catch (error) {
    next(error);
  }
};
export const updateHotel = async (req, res, next) => {
  //admin wants to update the 'isdeleted' false from true
  try {
    // await RoomModel.deleteMany();

    let hotelsArr = await Hotel.find().lean().exec();
    for (let hotel of hotelsArr) {
      let roomAndAmenitiesServiceArr = hotel.roomAndAmenitiesServiceArr;
      let guestObj = roomAndAmenitiesServiceArr.find(
        (ele) => ele.name == "people"
      );
      let mealObj = roomAndAmenitiesServiceArr.find(
        (ele) => ele.name == "meals"
      );
      let bathroomObj = roomAndAmenitiesServiceArr.find(
        (ele) => ele.name == "bathroom"
      );
      let bedroomObj = roomAndAmenitiesServiceArr.find(
        (ele) => ele.name == "bedroom"
      );
      let guest = guestObj?.no;
      let bathroom = bathroomObj?.no;
      let bedroom = bedroomObj?.no;
      let meal = mealObj?.no;
      let obj = {
        guest,
        bathroom,
        bedroom,
        meal,
        maxAdult: 2,
        maxChild: 2,
      };
      console.log(obj);

      await Hotel.findByIdAndUpdate(hotel._id, obj).exec();
      //       obj.amenitiesArr = hotel.amenitiesArr;
      //       obj.hotelId = hotel._id;
      //       obj.imagesArr = hotel.imagesArr;
      //       obj.mainImage = hotel.imagesArr[0].imageUrl;
      //       obj.opionsArr =   [
      //         {
      //             name:  'Deluxe room 1',
      //             price: 4000,
      //             maxGuest: 2,
      //             adultPrice: 4500,
      //             childPrice: 200,
      //         }
      //     ];

      //     obj.pointDescription =   [
      //       { name: "Lorem Ipsum is simply dummy text of the printing and typesetting" },
      //       { name: "Lorem Ipsum is simply dummy text of the printing and typesetting" },
      //       { name: "Lorem Ipsum is simply dummy text of the printing and typesetting" },
      //       { name: "Lorem Ipsum is simply dummy text of the printing and typesetting" },
      //       { name: "Lorem Ipsum is simply dummy text of the printing and typesetting" },
      //       { name: "Lorem Ipsum is simply dummy text of the printing and typesetting" },
      //       { name: "Lorem Ipsum is simply dummy text of the printing and typesetting" },
      //       { name: "Lorem Ipsum is simply dummy text of the printing and typesetting" },
      //       { name: "Lorem Ipsum is simply dummy text of the printing and typesetting" },
      //       { name: "Lorem Ipsum is simply dummy text of the printing and typesetting" },
      //   ];

      //     await RoomModel(obj).save();
    }

    //  let RoomArr =    await RoomModel.find().exec();
    res.status(200).json({
      msg: "Hotel status update successfully",
      success: true,
      data: hotelsArr,
    });
  } catch (err) {
    next(err);
  }
};

export const customCalendar = async (req, res, next) => {
  //admin wants to update the 'isdeleted' false from true
  try {
    // await RoomModel.deleteMany();

    let hotel = await hotel.findById(req.params.id).lean().exec();

    // let today = new Date();
    const calendar = ical();
    console.log(startTime, "startTimestartTime");
    const event = {
      start: [
        new Date(hotel.startDate).getFullYear(),
        new Date(hotel.startDate).getMonth() + 1,
        new Date(hotel.startDate).getDate(),
      ],
      end: [
        new Date(hotel.endDate).getFullYear(),
        new Date(hotel.endDate).getMonth() + 1,
        new Date(hotel.endDate).getDate(),
      ],
      title: "Airbnb (Not available)",
      description: "Airbnb (Not available)",
    };

    console.log(event, "eventeventevent");
    let { error, value } = ics.createEvent(event);

    // or, in ESM: import * as ics from 'ics'

    console.log("./public/uploads/");
    let filename = new Date().getTime();
    let file = `./public/uploads/${filename}.ics`;
    writeFileSync(file, value);
    res.setHeader("Content-Type", "text/calendar");
    res.download(file);
  } catch (err) {
    next(err);
  }
};
