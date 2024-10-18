import e from "express";
import { encryptPassword } from "../helpers/Bcrypt";
import { rolesObj } from "../helpers/Constants";
import propertyTypeModel from "../models/propertyType.model";
import Users from "../models/user.model";
import {
  listofPropertiesAreaByCategory,
  listofPropertiesByCategory,
  listofPropertyType,
  rmsrmsAuthLogin,
  searchHotelAvailabltiyByDestination,
} from "../services/rmsapi";
import HotelModel from "../models/Hotel.model";
import moment from "moment";
import { token } from "morgan";
import RoomModel from "../models/Room.model";

export const proprtyTypeSeeder = async () => {
  try {
    let oldProprtyTypeArr = await propertyTypeModel.countDocuments({});
    console.log(oldProprtyTypeArr);
    if (oldProprtyTypeArr && oldProprtyTypeArr > 0) {
      return 0;
    }

    let rmsAuthData = await rmsrmsAuthLogin();
    console.log(rmsAuthData, "rmsAuthDatarmsAuthData");
    if (!rmsAuthData.token) {
      throw new Error("Unable to authorize");
    }
    let propertiesArr = await listofPropertyType(rmsAuthData.token);
    if (propertiesArr && propertiesArr?.length > 0) {
      let proprtyTypeArr = propertiesArr;

      for (const el of proprtyTypeArr) {
        let obj = {
          clientId: el.clientId,
          proprteyId: el.proprteyId,
          clientName: el.name,
          propertyId: el.id,
        };
        if (`${obj.clientName}`.includes("Apartments")) {
          obj.name = "Apartments";
        } else {
          obj.name = "Hotels";
        }
        let proprtyTypeObj = await propertyTypeModel.findOne({ name: el.name });
        if (!proprtyTypeObj) {
          await propertyTypeModel(obj).save();
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const proprtySeeder = async () => {
  try {
    let oldPropertyArr = await HotelModel.countDocuments({});
    console.log(oldPropertyArr);
    if (oldPropertyArr && oldPropertyArr > 0) {
      return 0;
    }
    let rmsAuthData = await rmsrmsAuthLogin();
    console.log(rmsAuthData, "rmsAuthDatarmsAuthData");
    if (!rmsAuthData.token) {
      throw new Error("Unable to authorize");
    }

    let proprtyTypeArr = await propertyTypeModel.find({});
    for (const proprtyType of proprtyTypeArr) {
      let propertiesArr = await listofPropertiesByCategory(
        rmsAuthData.token,
        proprtyType?.propertyId
      );
      if (propertiesArr && propertiesArr?.length > 0) {
        let propertyArr = propertiesArr;
        for (const el of propertyArr) {
          console.log(el, "elelelel");
          let obj = {
            rmsCategoryId: el.propertyId,
            rmsPropertyName: el.name,
            name: el.name,
            rmsPropertyId: el.id,
            description: el.longDescription,
          };

          let propertyObj = await HotelModel.findOne({
            rmsCategoryId: el.propertyId,
            rmsPropertyName: el.name,
            rmsPropertyId: el.id,
          });
          if (!propertyObj) {
            await HotelModel(obj).save();
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const proprtyRoomSeeder = async () => {
  try {
    let oldPropertyArr = await RoomModel.countDocuments({});
    console.log(oldPropertyArr);
    if (oldPropertyArr && oldPropertyArr > 0) {
      return 0;
    }
    let rmsAuthData = await rmsrmsAuthLogin();
    console.log(rmsAuthData, "rmsAuthDatarmsAuthData");
    if (!rmsAuthData.token) {
      throw new Error("Unable to authorize");
    }

    let proprtyTypeArr = await HotelModel.find({ hotelType: "Hotels" });
    for (const proprtyType of proprtyTypeArr) {
      let propertiesArr = await listofPropertiesByCategory(
        rmsAuthData.token,
        proprtyType?.rmsCategoryId
      );
      if (propertiesArr && propertiesArr?.length > 0) {
        let propertyArr = propertiesArr;
        for (const el of propertyArr) {
          console.log(el, "elelelel");
          let obj = {
            rmsCategoryId: el.propertyId,
            rmsPropertyName: el.name,
            name: el.name,
            rmsPropertyId: el.id,
            description: el.longDescription,
            noOfRoom: el.numberOfAreas,
            hotelId: proprtyType._id,
          };

          let propertyObj = await RoomModel.findOne({
            rmsCategoryId: el.propertyId,
            rmsPropertyName: el.name,
            rmsPropertyId: el.id,
          });
          if (!propertyObj) {
            await RoomModel(obj).save();
          } else {
              let hotelObj = await RoomModel.findByIdAndUpdate(
                `${propertyObj?._id}`,
                {
                  name: el.guestDescription,
                  noOfRoom: el.numberOfAreas,
                }
              )
                .lean()
                .exec();
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const proprtyAreaSeeder = async () => {
  try {
    let oldPropertyArr = await HotelModel.countDocuments({});
    if (oldPropertyArr == 0) {
      return 0;
    }
    console.log("proprtyAreaSeeder");
    let rmsAuthData = await rmsrmsAuthLogin();
    console.log(rmsAuthData, "rmsAuthDatarmsAuthData");
    if (!rmsAuthData.token) {
      throw new Error("Unable to authorize");
    }

    let proprtyTypeArr = await propertyTypeModel.find({});
    for (const proprtyType of proprtyTypeArr) {
      let propertiesArr = await listofPropertiesAreaByCategory(
        rmsAuthData.token,
        proprtyType?.propertyId
      );
      if (propertiesArr && propertiesArr?.length > 0) {
        let propertyArr = propertiesArr;
        for (const el of propertyArr) {
          let propertieObj = await HotelModel.findOne({
            rmsCategoryId: el.propertyId,
            rmsPropertyId: el.categoryId,
          });

          console.log(propertieObj?.name, "propertieObj?.name");
          if (propertieObj && el.propertyId == 4) {
            let hotelObj = await HotelModel.findByIdAndUpdate(
              `${propertieObj?._id}`,
              {
                areaId: el.id,
                guest: el.maxOccupants,
              }
            )
              .lean()
              .exec();
          } else {
            let roomObj = await RoomModel.findOne({
              rmsCategoryId: el.propertyId,
              rmsPropertyId: el.categoryId,
            });

            if (roomObj) {
              let hotelObj = await RoomModel.findByIdAndUpdate(
                `${roomObj?._id}`,
                {
                  areaId: el.id,
                  guest: el.maxOccupants,
                }
              )
                .lean()
                .exec();
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const dailyPriceProprtyPriceUpdate = async () => {
  try {
    let rmsAuthData = await rmsrmsAuthLogin();
    if (!rmsAuthData.token) {
      throw new Error("Unable to authorize");
    }
    console.log("dailyPriceProprtyPriceUpdate");
    let hotelTypeArr = await propertyTypeModel.find({});

    for (const hoteType of hotelTypeArr) {
      if (hoteType?.propertyId == 4) {
        let hotelPropertyOds = await HotelModel.find({
          rmsCategoryId: hoteType?.propertyId,
          rmsPropertyId: { $exists: true },
        })
          .select({ rmsPropertyId: 1, rmsCategoryId: 1 })
          .exec();

        let obj = {
          startDate: moment().format("YYYY-MM-DD"),
          endDate: moment().add(1, "days").format("YYYY-MM-DD"),
          token: rmsAuthData.token,
          adult: 1,
          child: 0,
        };
        if (hotelPropertyOds && hotelPropertyOds?.length > 0) {
          obj.propertyId = hoteType?.propertyId;
          obj.proprtyids = hotelPropertyOds.map((el) => el.rmsPropertyId);

          let res = await searchHotelAvailabltiyByDestination(obj);
          if (res?.categories && res.categories?.length > 0) {
            for (const category of res?.categories) {
              if (category?.rates && category.rates?.length > 0) {
                let rates = category?.rates[0];
                console.log(rates, "ratesrates");
                if (rates?.dayBreakdown && rates.dayBreakdown?.length > 0) {
                  let dayBreakdown = rates?.dayBreakdown[0];
                  if (
                    dayBreakdown.availableAreas > 0
                  ) {
                    let hotelObj = await HotelModel.findOneAndUpdate(
                      { rmsPropertyId: `${category?.categoryId}` },
                      {
                        price: Math.round(dayBreakdown.dailyRate),
                        // guest: el.maxOccupants,
                      }
                    )
                      .lean()
                      .exec();
                  }
                }
              }
            }
          }
        }
      } else {
        let hotelPropertyOds = await RoomModel.find({
          rmsCategoryId: hoteType?.propertyId,
          rmsPropertyId: { $exists: true },
        })
          .select({ rmsPropertyId: 1, rmsCategoryId: 1 })
          .exec();

        let hoteld = "";
        let obj = {
          startDate: moment().format("YYYY-MM-DD"),
          endDate: moment().add(1, "days").format("YYYY-MM-DD"),
          token: rmsAuthData.token,
          adult: 1,
          child: 0,
        };
        if (hotelPropertyOds && hotelPropertyOds?.length > 0) {
          obj.propertyId = hoteType?.propertyId;

          obj.proprtyids = hotelPropertyOds.map((el) => el.rmsPropertyId);

          let res = await searchHotelAvailabltiyByDestination(obj);
          if (res?.categories && res.categories?.length > 0) {
            for (const category of res?.categories) {
              if (category?.rates && category.rates?.length > 0) {
                  console.log(category?.rates, "dayBreakdowndayBreakdown");

                let ratesarr = category?.rates.sort((el) =>
                  el.rates?.sort(
                    (a, b) =>
                      a.dayBreakdown[0].dailyRate - b.dayBreakdown[0].dailyRate
                  )
                );
                let rates = ratesarr[0];
                if (rates?.dayBreakdown && rates.dayBreakdown?.length > 0) {
                  let dayBreakdown = rates?.dayBreakdown[0];
             
                  console.log(rates, "dayBreakdowndayBreakdown");

                  if (
                    dayBreakdown.availableAreas > 0
                  ) {
                    let hotelObj = await RoomModel.findOneAndUpdate(
                      { rmsPropertyId: `${category?.categoryId}` },
                      {
                        price: Number(Math.round(dayBreakdown.dailyRate)),
                        // guest: el.maxOccupants,
                      }
                    )
                      .lean()
                      .exec();
          console.log(hotelObj, "hoteldhoteldhoteldhoteldhoteldhoteld");
                    
                    if (hotelObj) {
                      hoteld = hotelObj?.hotelId;
                    }
                  }
                }
              }
            }
          }
          console.log(hoteld, "hoteldhoteldhoteldhoteldhoteldhoteld");

          if (hoteld) {
            let hotel = await RoomModel.findOne({
              hotelId: hoteld,
            }).sort({ price: 1 });

            if (hotel) {
              let hotelObj = await HotelModel.findOneAndUpdate(
                { _id: `${hotel?.hotelId}` },
                {
                  price: Math.round(hotel.price),
                  // guest: el.maxOccupants,
                }
              )
                .lean()
                .exec();
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
