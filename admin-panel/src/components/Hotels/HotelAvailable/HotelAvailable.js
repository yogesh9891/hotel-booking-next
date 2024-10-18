import { async } from "@firebase/util";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { getHotelTypeApi, getHotelWithRoomApi } from "../../../services/Hotels.service";
import { getCalendarAvailablesApi, getRoomsAvailablesApi } from "../../../services/Room.service";
import { getMonthName, getWeekDay } from "../../../utils/DateUtils";
import CustomButton from "../../Utility/Button";
import { DashboardBox } from "../../Utility/DashboardBox";
import { toastError } from "../../Utility/ToastUtils";

function HotelAvailable() {

    const [startDate, setstartDate] = useState(new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()));
    const [endDate, setendDate] = useState(new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+7));
    const [currenDate, setcurrenDate] = useState(new Date());
    const [dateRangeArr, setdateRangeArr] = useState([]);
    const [hotelArr, sethotelArr] = useState([]);
    const [locationId, setLocationId] = useState("");
  
    const [hotelTypeArr, sethotelTypeArr] = useState([]);
    const [roomAvailabilArr, setroomAvailabilArr] = useState([]);
    const [loading, setloading] = useState(false);

    
    
    const getHotelWithRoom = async () => {
      try {
        let {data:res} = await getHotelWithRoomApi();
        if(res.data){
          sethotelArr(res.data)
        }
      } catch (error) {
        toastError(error)
      }
    }

    const getHotelType = async () => {
      try {
        let {data:res} = await getHotelTypeApi();
        if(res.data && res.data?.length > 0){
          sethotelTypeArr(res.data)
          setLocationId(res.data[0].propertyId)
        }
      } catch (error) {
        toastError(error)
      }
    }
    const  getRoomsAvailables = async () => {
      try {
        setloading(true)
        let query = ``;
        if(startDate){
          query += `startDate=${moment(startDate).format('YYYY-MM-DD')}`;
        }
        if(endDate){
          query += `&endDate=${moment(endDate).format('YYYY-MM-DD')}`;
        }
        if(locationId){
          query += `&locationId=${locationId}`;
        }
        let {data:res} = await getCalendarAvailablesApi(query);
        if(res.data){
          setroomAvailabilArr(res.data)
          setdateRangeArr(prev => [...prev])
        }
        setloading(false)

      } catch (error) {
        toastError(error)
        setloading(false)

      }
    }
    
    const refreshDate = () => {
      setstartDate(new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()))
      setendDate(new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+7))
      setcurrenDate(new Date())
    }

    // Add One Week in currndate

    const handleAddWeek = (week) => {

        const newDate = calculateWeeks(currenDate, week,'+');
        setcurrenDate(newDate)
        setstartDate(newDate)
        const endDate = calculateWeeks(newDate, week,'+');
        setendDate(endDate)
    }

    const handleSubWeek = (week) => {
        const newDate = calculateWeeks(currenDate, week,'-');
        setcurrenDate(newDate)
        setstartDate(newDate)

    }

    const  calculateWeeks = (date, weeks, action)  => {
       let  pointdate = new Date(date)
 
        if(action == '+') {
             pointdate.setDate(pointdate.getDate() + 7 * weeks);
        } else if (action == '-') {
          setendDate(date)
             pointdate.setDate(pointdate.getDate() - 7 * weeks);
        }   
       
       return pointdate;

      }


    
const  getdateRangeArr  = () => {

  let loop = new Date(startDate);

  console.log(loop,"looploop")
  const dateArray = [];
  while (loop.getTime() < endDate.getTime()) {  
    dateArray.push(loop)
    loop = new Date(loop);
    loop.setDate(loop.getDate() + 1);
  }

console.log(dateArray,"dateArraydateArray")
setdateRangeArr(dateArray)
}




useEffect(() => {
console.log(startDate,"startDatestartDatestartDate")
console.log(endDate,"endDateendDateendDateendDate")
    getdateRangeArr()
    if(locationId!=""){
      getRoomsAvailables(); 
    }

}, [startDate,endDate,locationId])

useEffect(() => {
  getHotelType();
  // getHotelWithRoom();
},[])


const getAvailabilty  = (hotelId,roomId,date) => {
  

let testDate = new Date( new Date(date).getFullYear(), new Date(date).getMonth(), new Date(date).getDate())

  let dateObj = roomAvailabilArr.find((el) =>new Date(testDate).getTime() == new Date(el.availableDate).getTime() && el.hotelId == hotelId && roomId == el.roomId)
  if(dateObj){

    return <div style={{fontSize:12}}><p>{dateObj.isAvailable == true?1:0}</p><p className="text-success">{dateObj.price}</p></div>
  } else {
    return <div style={{fontSize:12}}><p className="text-success">&nbsp;</p></div>
  }
}

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">
          Property Availability{" "}
          <select name="locationId" value={locationId} onChange={
            (e)=>setLocationId(e.target.value)
          }>
          { hotelTypeArr.map((el) =>(
            <option value={el.propertyId}>{el.clientName}</option>
          ))}
          </select>
            {/* <CustomButton
              isLink
              iconName="fa-solid fa-plus"
              btnName="Add Property Available "
              path="/Propertys/AddPropertyAvailable"
            /> */}
          </h5>
          <DashboardBox>
            <main>
              <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                   
                        <div className="col-md-12">
                        <table class="table">
                      <thead>
                        <tr>
                         <td className=" calender-date" style={{marginTop:'15px'}}>
                           <button style={{border:'none',background:'none'}} onClick={() =>refreshDate()} ><i class="fa fa-refresh" ></i>  </button>
                           <button style={{border:'none',background:'none'}} onClick={() =>handleSubWeek(2)} ><i class="fa fa-angle-double-left" ></i>  </button>
                           <button style={{border:'none',background:'none'}} >  <i class="fa fa-angle-left" onClick={() =>handleSubWeek(1)}  ></i> </button> 
                               {currenDate.toDateString()}
                               <button style={{border:'none',background:'none'}} onClick={() =>handleAddWeek(1)}   >   <i class="fa fa-angle-right" ></i>   </button>
                                
                               <button style={{border:'none',background:'none'}} onClick={() =>handleAddWeek(2)}  >    <i class="fa fa-angle-double-right" ></i> </button>

                         </td>
                          {
                            dateRangeArr.map((date,dateLey) => (
                            <td className="calender-date" key={dateLey}>
                               <p className="day-of-week"> {getWeekDay(date.getDay())}</p>
                               <p className="day-of-day">{date.getDate()}</p> 
                               <p className="day-of-month"> {getMonthName(date.getMonth()+1)}</p>
                              </td>
                            ))
                          }
                        </tr>
                      </thead>
                      <tbody>

                           
                            {
                             !loading ? roomAvailabilArr && roomAvailabilArr?.categories && roomAvailabilArr?.categories.map((room) => (
                                <tr>
                                    <td> <b style={{fontSize:12}}>{room.name} </b>
                                    {/* <p style={{fontSize:12}}>{hotel.name}</p> */}
                                    </td>
                                    {
                                        room.rates?.length > 0 && room.rates[0].dayBreakdown.map((date,dateKey) => (
                                        <td  className="calender-date"  key={dateKey}>
                                          {
                                             date && date?.theDate && (
                                             <div style={{fontSize:12}}><p>{date.availableAreas == true?1:0}</p><p className="text-success">{date.dailyRate}</p></div>
                                             )
                                             }
                                          </td>
                                        ))
                                      }
                                    </tr>
                              ))
                    :(<tr><td></td><td></td><td><h3>Please wait ....</h3></td></tr>)
                            }
                      {/* {
                                hotelArr.map((hotel) => (

                                  hotel.roomArr && hotel?.roomArr.length > 0 ?  (  
                                    hotel.roomArr && hotel.roomArr.length > 0 && hotel.roomArr.map((room) =>(
                                      <tr>
                                       <td> <b style={{fontSize:12}}>{hotel.name} </b>
                                       <p style={{fontSize:12}}>{room.name}</p>
                                       </td>
                                      {
                                          dateRangeArr.map((date,dateKey) => (
                                          <td  className="calender-date"  key={dateKey}>
                                            {
                                              getAvailabilty(hotel._id,room._id,date)
                                            }
                                  
                                            </td>
                                          ))
                                        }
                                      </tr>
                                 )
                         ) ) : (   <tr>
                          <td> <b style={{fontSize:12}}>{hotel.name} </b>
                          <p style={{fontSize:12}}>{hotel.name}</p>
                          </td>
                          {
                              dateRangeArr.map((date,dateKey) => (
                              <td  className="calender-date"  key={dateKey}>
                                {
                                  // getAvailabilty(hotel._id,0,date)
                                }
                       
                                </td>
                              ))
                            }
                          </tr>)
                       ))
                      }  */}
                      </tbody>
                    </table>
                        </div>

                        </div>
                            
                 
                </div>
              </section>
            </main>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}


export default HotelAvailable;
