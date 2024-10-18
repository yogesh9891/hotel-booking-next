import Country from "../models/Country.model";
import State from "../models/State.model";
import City from "../models/City.model";
import { isValid } from "../helpers/Validators";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import XLSX from "xlsx";
import HotelModel from "../models/Hotel.model";
import Homepage from "../models/Homepage.model";
import HomepageModel from "../models/Homepage.model";
import LocationModel from "../models/Location.model";
import RoomAvailableModel from "../models/RoomAvailable.model";
import { generateSiteMapFile } from "../helpers/SiteMapGenerator";

export const addNew = async (req, res, next) => {
  //for user
  try {
    let Arr = await HomepageModel.find().lean().exec();

    if (Arr && Arr.length > 0) {
      let homwpage = Arr[0];
      await Homepage.findByIdAndUpdate(homwpage._id, req.body).exec();
    } else {
      Homepage(req.body).save();
    }

    res
      .status(200)
      .json({ message: "Homepage Successfully Created", success: true });
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  //for admin
  try {
    // let validityCheck = await Users.findOne({
    //     $or: [{ _id: req.user.userId, role: "ADMIN" },
    //     { _id: req.user.userId, role: "SUBADMIN" },
    //     { _id: req.user.userId, role: "SELLER" },
    //     ]
    // }).exec();
    // if (!validityCheck) throw new Error("you are not authorise to check review");
    let Arr = await HomepageModel.find().lean().exec();

    console.log(Arr, "letletletletletletletlet");
    // if (req.query.stateId) {

    // } else {
    //   Arr = await City.find().lean().exec();
    // }
    for (const el of Arr) {
      for (let location of el.location) {
        let locationObj = await LocationModel.findById(location._id).exec();
        if (locationObj) {
          location.name = locationObj.name;
          location.imageUrl = locationObj.imageUrl;
          location.slug = locationObj.slug
            ? locationObj.slug
            : locationObj.name;
        }
        // location.locationObj = locationObj;
      }

      for (let properties of el.mostViewProperties) {
        let propertiesObj = await HotelModel.findById(properties._id).exec();

        console.log(
          propertiesObj,
          "propertiesObjpropertiesObjpropertiesObjpropertiesObjpropertiesObj"
        );
        if (propertiesObj) {
          properties.name = propertiesObj.name;
          properties.mainImage = propertiesObj.mainImage;
          properties.imagesArr = propertiesObj.imagesArr;
          properties.slug = propertiesObj.slug;
          properties.hotelType = propertiesObj.hotelType;
          properties.roomAndAmenitiesServiceArr =
            propertiesObj.roomAndAmenitiesServiceArr;
          (properties.guest = propertiesObj.guest),
            (properties.bedroom = propertiesObj.bedroom),
            (properties.bathroom = propertiesObj.bathroom),
            (properties.meal = propertiesObj.meal),
            (properties.location = propertiesObj.location);
          properties.tagline = propertiesObj.tagline;
          properties.price = propertiesObj.price;

          if (properties.location) {
            properties.locationObj = await LocationModel.findById(
              properties.location
            );
          }
          let que = [];
          que = [
            ...que,
            {
              hotelId: propertiesObj._id,
              availableDate: new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()
              ),
            },
          ];

          // que = [ ...que,{ availableDate :new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate())}]
          let roomA = await RoomAvailableModel.findOne({ $and: que })
            .lean()
            .sort({ price: 1 })
            .exec();
          if (roomA) {
            console.log(roomA, "roomAroomA");
            // properties.price = roomA.price;
          }
        }
        // properties.roomAndAmenitiesServiceArr = propertiesObj;
      }
      if (el.preminumCollection) {
        for (let preminum of el.preminumCollection) {
          let preminumObj = await HotelModel.findById(preminum._id).exec();
          if (preminumObj) {
            preminum.name = preminumObj.name;
            preminum.mainImage = preminumObj.mainImage;
            preminum.imagesArr = preminumObj.imagesArr;
            preminum.slug = preminumObj.slug;
            preminum.hotelType = preminumObj.hotelType;
            preminum.roomAndAmenitiesServiceArr =
              preminumObj.roomAndAmenitiesServiceArr;
            (preminum.guest = preminumObj.guest),
              (preminum.bedroom = preminumObj.bedroom),
              (preminum.bathroom = preminumObj.bathroom),
              (preminum.meal = preminumObj.meal),
              (preminum.location = preminumObj.location);
            preminum.tagline = preminumObj.tagline;
            preminum.price = preminumObj.price;
            if (preminum.location) {
              preminum.locationObj = await LocationModel.findById(
                preminum.location
              );
            }
            let que = [];
            que = [
              ...que,
              {
                hotelId: preminumObj._id,
                availableDate: new Date(
                  new Date().getFullYear(),
                  new Date().getMonth(),
                  new Date().getDate()
                ),
              },
            ];
            // que = [ ...que,{ availableDate :new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate())}]
            let roomA = await RoomAvailableModel.findOne({ $and: que })
              .lean()
              .sort({ price: 1 })
              .exec();
            if (roomA) {
              console.log(roomA, "roomAroomA");

              // preminum.price = roomA.price;
            }
          }
        }
      }
      // if (el.budgetFriendly) {
      //   for (let budget of el.budgetFriendly) {
      //     let budgetObj = await HotelModel.findById(budget._id).exec();
      //     if (budgetObj) {
      //       budget.name = budgetObj.name;
      //       budget.mainImage = budgetObj.mainImage;
      //       budget.imagesArr = budgetObj.imagesArr;
      //       budget.slug = budgetObj.slug;
      //       budget.roomAndAmenitiesServiceArr =
      //         budgetObj.roomAndAmenitiesServiceArr;
      //       (budget.guest = budgetObj.guest),
      //         (budget.bedroom = budgetObj.bedroom),
      //         (budget.bathroom = budgetObj.bathroom),
      //         (budget.meal = budgetObj.meal),
      //         (budget.location = budgetObj.location);
      //       budget.tagline = budgetObj.tagline;
      //       budget.price = budgetObj.price;
      //       if (budget.location) {
      //         budget.locationObj = await LocationModel.findById(
      //           budget.location
      //         );
      //       }
      //       let que = [];
      //       que = [
      //         ...que,
      //         {
      //           hotelId: budgetObj._id,
      //           availableDate: new Date(
      //             new Date().getFullYear(),
      //             new Date().getMonth(),
      //             new Date().getDate()
      //           ),
      //         },
      //       ];

      //       // que = [ ...que,{ availableDate :new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate())}]
      //       let roomA = await RoomAvailableModel.findOne({ $and: que })
      //         .lean()
      //         .sort({ price: 1 })
      //         .exec();
      //       if (roomA) {
      //         console.log(roomA, "roomAroomA");

      //         // budget.price = roomA.price;
      //       }
      //     }
      //     // preminum.preminumObj = preminumObj;
      //   }
      // }
    }
    res.status(200).json({ message: "found Items", data: Arr, success: true });
  } catch (err) {
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  //for user
  try {
    if (!req.body.name) throw new Error("name is mandatory");
    if (!isValid(req.body.name)) throw new Error("Name cant be empty");

    let existsCheck = await Homepage.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("Homepage does not exist !");
    }

    await Homepage.findByIdAndUpdate(existsCheck._id, req.body).exec();
    res.status(200).json({ message: "Updated Successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const generateSiteMap = async (req, res, next) => {
  //for user
  try {
    await generateSiteMapFile();

    res.status(200).json({ message: "Genrated Successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  //for admin ,subadmin
  try {
    // if (!req.user || !req.user.role || req.user.role != "ADMIN" && req.user.role != "SUBADMIN") throw new Error("you are not authorise to delete review");
    let existsCheck = await City.findById(req.params.id).exec();
    if (!existsCheck) {
      throw new Error("City does not exist !");
    }
    await City.findByIdAndDelete(existsCheck._id).exec();

    res.status(200).json({ msg: "Deleted successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const bulkUploadCity = async (req, res, next) => {
  try {
    // console.log(req.file, "req.file");
    let workbook = XLSX.readFile(req.file.path);
    // console.log(workbook, "req.filewwwwww")
    let sheet_nameList = workbook.SheetNames;
    // console.log(sheet_nameList[0], "sheet_nameList")
    let x = 0;

    let xlData = [];
    console.log(sheet_nameList);
    sheet_nameList.forEach((element) => {
      console.log(element);
      xlData.push(
        ...XLSX.utils.sheet_to_json(workbook.Sheets[sheet_nameList[x]])
      );
      x++;
    });

    let errorArr = [];

    console.log(xlData, "xlData xlData xlData"); //done

    // console.log(xlData.map(el => el["PRIMARY CATEGORY"]), "xlData xlData xlData"); //done
    let tempArr = [];
    for (let index = 0; index < xlData.length; index++) {
      console.log(xlData[index]);
      let existObj = await Country.findOne({
        countryCode: xlData[index]["country_code"],
      }).exec();
      console.log(existObj);
      if (existObj) {
        let tempObj = {
          name: xlData[index]["name"],
          cityCode: xlData[index]["city_code"],
          cityRezId: xlData[index]["id"],
          countryCode: xlData[index]["country_code"],
          countryId: existObj?._id,
        };
        await new City(tempObj).save();
      } else {
      }
    }

    res
      .status(200)
      .json({ message: "Successfully Uploaded file", success: true });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
