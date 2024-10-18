import systemSetting from "../models/systemSetting.model";
import Users from "../models/user.model";
import { storeFileAndReturnNameBase64 } from "../helpers/fileSystem";
import RoomModel from "../models/Room.model";
import RoomAvailableModel from "../models/RoomAvailable.model";
import AmenityModel from "../models/Amenity.model";
import { getCalendarHelper } from "../helpers/calendar";
import Hotel from "../models/Hotel.model";
import moment from "moment/moment";
import HotelModel from "../models/Hotel.model";
import { searchHotelAvailabltiyByDestination } from "../services/rmsapi";

const ical = require('node-ical');
export const addRoom = async (req, res, next) => {
  try {
  
    let existsCheck = await RoomModel.findOne({ name: req.body.name }).exec();
    if (existsCheck) {
      throw new Error("A Room already exists with the same name ");
    }
    if (req.body.mainImage) {
      req.body.mainImage = await storeFileAndReturnNameBase64(req.body.mainImage);
    }
    if(req.body.imagesArr){
      for (const ele of req.body.imagesArr) {
        if (ele.imageUrl) {
          ele.imageUrl = await storeFileAndReturnNameBase64(ele.imageUrl);
        }
      }
    }
   



    if (req.body.name) {
      const slugify = req.body.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      req.body.slug = slugify;
    }

   let RommObj =  await RoomModel(req.body).save();

   console.log(RommObj,"RommObjRommObj")
  
   if(RommObj && RommObj._id && req.body.roomPriceArr && req.body.roomPriceArr.length > 0){
    let roomAvailble =req.body.roomPriceArr;
      for (let el of roomAvailble) {  
        el.name = RommObj.name;
        el.roomId = RommObj._id;
      }   

      RoomAvailableModel.insertMany(roomAvailble, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(data, "data345235")
        }
    });
  }


    res.status(201).json({ message: "Room added successfully", success: true });
  } catch (err) {
    next(err);
  }
};

export const getRoom = async (req, res, next) => {
  try {

    let query = {}


    // query = { price: { $gte: { $toInt: parseInt(req.query.min) }, $lte: req.query.max } }



    if (req.query.amenityArr && JSON.parse(req.query.amenityArr).length) {
      let tempAmenitiesArr = JSON.parse(req.query.amenityArr)
      query = { ...query, "amenitiesArr.amenityArr.amenityId": { $in: [...tempAmenitiesArr.map(el => el._id)] } }
    }
   

    if (req.query.hotelId) {
      query = { ...query, hotelId: req.query.hotelId }
    }

    console.log(req.query.price, "req.query.price++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
    let sortByCondition = {}
    if (req.query.price) {
      if (req.query.price == "asc") {
        sortByCondition = { price: 1 }
      }
      if (req.query.price == "desc") {
        sortByCondition = { price: -1 }
      }
      
  

      console.log(sortByCondition,"sortByCondition")

    }
    else {
      sortByCondition = { createdAt: 1 }
    }
    

    console.log(query, "query")

    let hotelsArr = [];
    if (req.query) {
      hotelsArr = await RoomModel.find(query).sort(sortByCondition).exec();
    } else {
      hotelsArr = await RoomModel.find().exec();
    }
    for (const hotel of hotelsArr) {
      if(hotel.amenitiesArr){

        for (const amenitiesCatArr of hotel.amenitiesArr) {
          if(amenitiesCatArr.amenityArr){
              for (const amen of amenitiesCatArr.amenityArr) {
                let amenityMdeData = await AmenityModel.findById(amen.amenityId).exec()
                if(amenityMdeData){
                  amen.amenityName = amenityMdeData.name;
                  amen.amenityImage = amenityMdeData.image;
                }
              }
          }
        }
      }

      if(req.query.startDate && req.query.endDate) {

        let query1= {};
        if(req.query.startDate){
          query1.availableDate = {
            $gte:new Date(req.query.startDate)
          }
        }
        if(req.query.endDate){
          query1.availableDate = {
          ...query1.availableDate ,$lt:new Date(req.query.endDate)
          }
        }
      
        if (hotel.hotelId) {
          query1 = { ...query1, hotelId: hotel.hotelId }
        }
    
        if (hotel._id) {
          query1 = { ...query1, roomId: hotel._id }
        }
      let rommAv =   await RoomAvailableModel.findOne(query1).sort({price:1,availableDate : 1}).lean().exec();
      console.log(JSON.stringify(rommAv, null, 2));

      if(rommAv){
        hotel.price = rommAv.price;
      }
      }

  }

    // console.log(JSON.stringify(hotelsArr, null, 2));
    res.status(200).json({ message: " Rooms ", data: hotelsArr, success: true });
  } catch (err) {
    next(err);
  }
};

export const getCalendarAvailables = async (req, res, next) => {
  try {

    let query = {}
    let extaAdultPrice = 0;
    let extaAdult = 0;
    let extaChildPrice = 0;
    let extaChild = 0;
    let offer = false;
    let offerPrice = 0;

    // query = { price: { $gte: { $toInt: parseInt(req.query.min) }, $lte: req.query.max } }

   let rateArr =[];
    let obj = {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      locationId: req.query.locationId,
      adult: 1,
      child: 0,
    };

    let tempHotelsArr = [];
    let hotelPropertyOds = await Hotel.find({
      rmsCategoryId: req.query.locationId,
      rmsPropertyId: { $exists: true },
    })
      .select({ rmsPropertyId: 1, rmsCategoryId: 1 })
      .exec();
    if (hotelPropertyOds && hotelPropertyOds?.length > 0) {
      obj.propertyId = req.query.locationId;
      obj.proprtyids = hotelPropertyOds.map((el) => el.rmsPropertyId);

       rateArr = await searchHotelAvailabltiyByDestination(obj);


    }
    // console.log(JSON.stringify(hotelsArr, null, 2));
    res.status(200).json({ message: " RoomAvailable ", data: rateArr, success: true});
  } catch (err) {
    next(err);
  }
};



export const getRoomsAvailables = async (req, res, next) => {
  try {

    let query = {}
    let extaAdultPrice = 0;
    let extaAdult = 0;
    let extaChildPrice = 0;
    let extaChild = 0;
    let offer = false;
    let offerPrice = 0;

    // query = { price: { $gte: { $toInt: parseInt(req.query.min) }, $lte: req.query.max } }

console.log(new Date(req.query.startDate),new Date(req.query.endDate))
    if(req.query.startDate){
      query.availableDate = {
        $gte:new Date(req.query.startDate)
      }
    }
    if(req.query.endDate){
      query.availableDate = {
      ...query.availableDate ,$lt:new Date(req.query.endDate)
      }
    }
  
    if (req.query.hotelId) {
      query = { ...query, hotelId: req.query.hotelId }
    }

    if (req.query.roomId) {
      query = { ...query, roomId: req.query.roomId }
    }

  
    let sortByCondition = {}
    if (req.query.sortBy) {
      if (req.query.sortBy == "Date, new to old") {
        console.log(req.query.sortBy, "req.query.sortBy")
        sortByCondition = { createdAt: 1 }
      }
      if (req.query.sortBy == "Date, old to new") {
        console.log(req.query.sortBy, "req.query.sortBy")
        sortByCondition = { createdAt: -1 }
      }
      else {
        sortByCondition = { createdAt: 1 }
      }
    }

    let totalGuest = 0;

    if(req.query.adult || req.query.child){
      totalGuest += parseInt(req.query.adult);
      totalGuest += parseInt(req.query.child);
    }

    console.log(query, "query",totalGuest)

    let hotelsArr = [];
    if (req.query) {
      hotelsArr = await RoomAvailableModel.find(query).sort(sortByCondition).lean().exec();
    } else {
      hotelsArr = await RoomAvailableModel.find().lean().exec();
    }
    let total = 0;

    let data =[]; 
    let isAvalibe = hotelsArr.some(el =>el.isAvailable == false);
    let calendar = false;
    if(req.query.calendar){
      calendar = req.query.calendar;
    }

    let hotelObj = await Hotel.findById(req.query.hotelId);
    let url = hotelObj?.calendarUrl

    if(req.query.roomId && req.query.roomId!='0'){
    let roomObj = await RoomModel.findById(req.query.roomId);
    if(roomObj?.calendarUrl){
        url = roomObj?.calendarUrl
    console.log(roomObj,"roomObjroomObj",url)

    }
    }
    let calendarData = null;
    if(url){
     calendarData = await getCalendarHelper(url);
     console.log(calendarData,"calenderObjcalenderObj",url)

     calendarData = calendarData?.length > 0 ? calendarData: null;

    }
    if(isAvalibe && calendar){

      hotelsArr = [];
    } else {

   
      if (req.query.isOffer  && hotelsArr.length == 3) {
        offer = true;
      }

      let i =0;
      for (const hotel of hotelsArr) {

        if(hotel.availableDate && calendarData){
          // console.log(new Date(moment(hotel.availableDate).format('')))
          let aDate =  hotel.availableDate.getTime()
          console.log(hotel.availableDate,"ffff")
            let calenderObj = calendarData.find(el => el.start.getTime() <= aDate && el.end.getTime() > aDate );
            if(calenderObj && calenderObj?.type){
              console.log(calenderObj,"calenderObjcalenderObj")
              hotel.isAvailable = false;
              await RoomAvailableModel.findByIdAndUpdate(hotel._id, {isAvailable:false}).exec();

            } else {
              if(!hotel?.bookingDetails){
                hotel.isAvailable = true;
                await RoomAvailableModel.findByIdAndUpdate(hotel._id, {isAvailable:true}).exec();
              }
           
            }

        }

        console.log(i,"dsfsdfsdfsd")
        i++;
        // await RoomAvailableModel.findByIdAndUpdate(hotel._id, {isAvailable:treu}).exec();
        if(hotel.maxGuest &&  totalGuest  > (parseInt(hotel.maxGuest))){
          let adlutPrice = 2000;
          let Childprice = 1200;
         
 
            total += parseInt(hotel.price)
   
            if(i == 3 && hotelsArr.length==3){
              offerPrice += parseInt(hotel.price)
              console.log(offerPrice,"offerPriceofferPriceofferPriceofferPrice")
            }
            console.log(total,"totaltotal")
            let x = hotel.maxGuest - req.query.adult;
            if(x < 0){
              let etc = Math.abs(x);
                extaAdultPrice += parseInt(etc)*parseInt(adlutPrice);
                extaChildPrice += parseInt(req.query.child)*parseInt(Childprice);
                extaAdult = parseInt(etc);
                total += parseInt(req.query.child)*parseInt(Childprice)  +  parseInt(etc)*parseInt(adlutPrice)

                if(i == 3 && hotelsArr.length==3){
                  offerPrice += parseInt(req.query.child)*parseInt(Childprice)  +  parseInt(etc)*parseInt(adlutPrice)
                  console.log(offerPrice,"offerPriceofferPriceofferPriceofferPrice", (parseInt(req.query.child)*parseInt(Childprice)  +  parseInt(etc)*parseInt(adlutPrice)))
                }
            console.log(total,"extra adult",etc);

            } else {
                let y = Math.abs(x)-req.query.child;
                if(y < 0){
                  let etc = Math.abs(y);
                    total +=  parseInt(etc)*parseInt(Childprice)
                extaChildPrice += parseInt(req.query.child)*parseInt(Childprice);
                extaChild = parseInt(etc);

                if(i == 3 && hotelsArr.length==3){
                  offerPrice += parseInt(etc)*parseInt(Childprice)
                  console.log(offerPrice,"offerPriceofferPriceofferPriceofferPrice")
                }
            console.log(total,"extra child",etc);

                }
            } 
        //   if(req.query.adult > hotel.maxGuest){
        //   total += parseInt(req.query.adult - hotel.maxGuest)*parseInt(adlutPrice) ;
        //   } else {

        //   }
        //   if(parseInt(req.query.child) >  hotel.maxGuest){
        //     total += parseInt(req.query.child -hotel.maxGuest)*parseInt(Childprice) ;
        //     } else{
              
        //     }
        } else {
          if(i == 3 && hotelsArr.length==3){
            offerPrice += parseInt(hotel.price)
            console.log(offerPrice,"offerPriceofferPriceofferPriceofferPrice")
          }
          total += parseInt(hotel.price)

        }
    }
    }
   
    // let total = hotelsArr.reduce(function (previousValue, currentValue) {
    //   return previousValue +  currentValue.price;
    // }, 0);

let  extara  = [
{
  type:"adult",
  price:2000,
  extra:extaAdultPrice,
  extaAdult
},
{
  type:"child",
  price:1500,
  extra:extaChildPrice,
  extaChild
},

]


let startDatee = new Date(req.query.startDate);
let endDatee = new Date(req.query.endDate);
let starMonth = startDatee.getMonth();
let endMMonth = endDatee.getMonth();
let from = "2023-08-12"
let to = "2023-08-15"

console.log(starMonth,starMonth)
if(offer == false || starMonth != 7 || endMMonth !=7  ||dateCheck(from,to,req.query.startDate) || dateCheck(from,to,req.query.endDate)){
  offerPrice = 0;
}


    // console.log(JSON.stringify(hotelsArr, null, 2));
    res.status(200).json({ message: " RoomAvailable ", data: hotelsArr, success: true,price:total ,extra:extara,offerPrice});
  } catch (err) {
    next(err);
  }
};

export const getRoomById = async (req, res, next) => {
  // for user
  try {
    const hotelObj = await RoomModel.findById(req.params.id).exec();
    if (!hotelObj) {
      throw new Error("Could not find hotel");
    }
    res.status(200).json({ message: "Room", data: hotelObj, success: true });
  } catch (err) {
    next(err);
  }
};
export const getRoomBySlug = async (req, res, next) => {
  // for user
  try {
    const hotelObj = await RoomModel.findOne({ slug: req.params.id }).exec();
    if (!hotelObj) {
      throw new Error("Could not find hotel");
    }
    res.status(200).json({ message: "Room", data: hotelObj, success: true });
  } catch (err) {
    next(err);
  }
};

export const updateById = async (req, res, next) => {
  try {

 

    if (req.body.mainImage && `${req.body.mainImage}`.includes("base64")) {
      req.body.mainImage = await storeFileAndReturnNameBase64(req.body.mainImage);
    }
    if (req.body.name) {
      const slugify = req.body.name.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
      req.body.slug = slugify;
    }
    if(req.body.imagesArr){
      for (const ele of req.body.imagesArr) {
        if (ele.imageUrl && ele.imageUrl != "" && `${ele.imageUrl}`.includes("base64")) {
          ele.imageUrl = await storeFileAndReturnNameBase64(ele.imageUrl);
        }
      }
    }
  

    await RoomModel.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(201).json({ message: "Update Room successfully", success: true });
  } catch (err) {
    next(err);
  }
};


 const dateCheck = (from,to,check) => {

  var fDate,lDate,cDate;
  fDate = Date.parse(from);
  lDate = Date.parse(to);
  cDate = Date.parse(check);
  
  if((cDate <= lDate && cDate >= fDate)) {
      return true;
  }
  return false;
}
export const deleteById = async (req, res, next) => {
  try {
    let validityCheck = await Users.findOne({
      $or: [
        { _id: req.user.userId, role: "ADMIN" },
        { _id: req.user.userId, role: "SUBADMIN" },
      ],
    }).exec();
    if (!validityCheck) throw new Error("you are not authorise to delete FAQ");

    let Obj = await RoomModel.findOne({ _id: req.params.id }).exec();
    if (!Obj) throw { status: 400, message: "Room not found or deleted already" };

    await RoomModel.findByIdAndDelete(req.params.id).exec();

    res.status(200).json({ message: "Room deleted successfully", success: true });
  } catch (err) {
    next(err);
  }
};


export const AddRoomDatesPrice = async (req, res, next) => {

  try {
    let hotelArr = req.body.hotelArr
    for (const hotel of hotelArr) {

      if(hotel.roomArr && hotel.roomArr?.length > 0){
        for (const room of hotel.roomArr) {
          for (const date of room.dateRange) {
            if(new Date(date.startDate).getTime() < new Date(date.endDate).getTime()){
              let loop = new Date(date.startDate);
              while (loop.getTime() < new Date(date.endDate).getTime()) {  
                loop = new Date(loop);
                loop.setDate(loop.getDate() + 1);
                console.log(loop,"Datet Daet")
            
                let obj = {
                  hotelId:room.hotelId,
                  roomId:room._id,
                  name:room.name,
                  maxGuest :parseInt(room.maxGuest),
                  price :parseInt(date.price),
                  childPrice :parseInt(date.childPrice),
                  noOfRoom :parseInt(room.noOfRoom),
                  adultPrice :parseInt(date.adultPrice),
                  isAvailable :date.isAvailable,
                  availableDate:loop
              }
            //  console.log(obj,"objobj")
                  let roomData =  await RoomAvailableModel.findOneAndUpdate({roomId:room._id,availableDate:loop},obj,{upsert:true}).exec();
              }
      
                
            }
          }
        }
      } else {
        for (const date of hotel.dateRange) {
          if(new Date(date.startDate).getTime() < new Date(date.endDate).getTime()){
            let loop = new Date(date.startDate);
            while (loop.getTime() < new Date(date.endDate).getTime()) {  
              loop = new Date(loop);
              loop.setDate(loop.getDate() + 1);
              console.log(loop,"Datet Daet")

              let hotelObj = await HotelModel.findById(hotel._id).select({_id:1,guest:1}).exec();

              console.log(hotelObj,"hotelObjhotelObj")
              let maxGuest = "4";
              if(hotelObj && hotelObj?.guest){
                  maxGuest  = hotelObj.guest;
              }
              let obj = {
                hotelId:hotel._id,
                name:hotel.name,
                roomId:0,
                maxGuest:maxGuest,
                price :parseInt(date.price),
                childPrice :parseInt(date.childPrice),
                adultPrice :parseInt(date.adultPrice),
                isAvailable :date.isAvailable,
                availableDate:loop
            }
          //  console.log(obj,"objobj")
          let roomData =  await RoomAvailableModel.findOneAndUpdate({hotelId:hotel._id,availableDate:loop},obj,{upsert:true}).exec();

                // let roomData =  await RoomAvailableModel.findOneAndUpdate({roomId:room._id,availableDate:loop},obj,{upsert:true}).exec();
            }
            
              
          }
        }
      }
     
  }
    res.status(200).json({ message: "Room" , success: true });
  } catch (error) {
    next(error);
  }
  if(!req.body.hotelArr){
    throw new Error("Could not find hotel");
  }



}


export const updateRoomDates = async (req, res, next) => {
  // for user
  try {
    let roomAvailbleArr = req.body.roomAvailbleArr;
    if(roomAvailbleArr && roomAvailbleArr.length > 0) {
      for (let room of roomAvailbleArr) {
        if(req.body.update == true){
          console.log(room._id,"room._id")
          let roomData =  await RoomAvailableModel.findById(room._id).exec();
          console.log(roomData,"roomDataroomDataroomDataroomData")
          if(roomData) {
          let obj = {
            price :parseInt(room.price),
            childPrice :parseInt(room.childPrice),
            noOfRoom :parseInt(room.noOfRoom),
            adultPrice :parseInt(room.adultPrice),
            isAvailable :room.isAvailable,
          }
            let update =   await RoomAvailableModel.findByIdAndUpdate(room._id, obj,{new:true}).exec();
        }
        } else {
          let errt =   await RoomAvailableModel.insertMany(roomAvailbleArr);
          console.log(errt,"errterrt")
        } 
      }
    }
    res.status(200).json({ message: "Room" , success: true });
  } catch (err) {
    next(err);
  }
};

export const getCalendar = async (req, res, next) => {
  // for user
  try {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let lres = [];
let url = 'https://ingoibibo-prod.s3-ap-south-1.amazonaws.com/2747e05d6263fe2a3e2452fcde438626.ics';
ical.fromURL(url, {}, function(err, data) {
  if (err) console.log(err);

  let responseData = Object.values(data)



for (let k in data) {
  if (data.hasOwnProperty(k)) {
  console.log(k,"data")

      const ev = data[k];
      if (data[k].type == 'VEVENT') {
        console.log(ev)
          // console.log(`${ev.summary} is in ${ev.start} on the ${ev.start.getDate()} of ${months[ev.start.getMonth()]} at `);
      }
  }
}
 
});
    res.status(200).json({ message: "Room", data: lres, success: true });
  } catch (err) {
    next(err);
  }
};