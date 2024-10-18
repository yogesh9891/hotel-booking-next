import React, { useEffect, useState } from "react";
import { getHotelWithRoomApi } from "../../../services/Hotels.service";
import CustomButton from "../../Utility/Button";
import { DashboardBox } from "../../Utility/DashboardBox";
import { toastError } from "../../Utility/ToastUtils";
import moment from "moment";
import { map } from "@firebase/util";
import { AddRoomDatesPriceApi } from "../../../services/Room.service";
import { useNavigate } from "react-router-dom";
function AddHotelAvailable() {

  const [hotelArr, sethotelArr] = useState([]);
  const [selectAll, setselectAll] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedhhotel, setSlectedhhotel] = useState([]);
  const [startDate, setstartDate] = useState(new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()));
  const [endDate, setendDate] = useState(new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+2));
  const naviage = useNavigate();
  const [selectDateArr, setselectDateArr] = useState([
    {
      startDate:new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()),
      endDate:new Date (new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+2),
      price:0,
      adultPrice:0,
      childPrice:0,
      isAvailable:true,
    }
  ]);

  const formStep = [
    {
      name:"Properties",
      active:false,
      step:1
    },
    {
      name:"Date Range",
      active:false,
      step:2
    },
    {
      name:"Properties Price",
      active:false,
      step:3
    }
  ]

  useEffect(() => {
    getHotelWithRoom();
  },[])

  const getHotelWithRoom = async () => {
    try {
      let {data:res} = await getHotelWithRoomApi();
      if(res.data && res.data.length > 0){

          let tepmArr = res.data.map((hotel) => (
            {
              ...hotel,checked:false,
              roomArr:hotel?.roomArr ?  hotel.roomArr.map((room) => ({...room,checked:false})) : "de"
            }  
          ))
        sethotelArr(tepmArr)
      }
    } catch (error) {
      toastError(error)
    }
  }


const handleHotelChecked = (value,index) => {
  let tempArr = [...hotelArr];

  tempArr[index].checked = value;
  if(tempArr[index]?.roomArr && tempArr[index]?.roomArr?.length  > 0){
     tempArr[index].roomArr = tempArr[index].roomArr.map((room) => ({...room,checked:value}))

     
  }
    sethotelArr([...tempArr])
    let seltempWrr = tempArr.filter(el => el.checked==true);
    let seltempWrr1 = tempArr.filter((hotel) => (
      hotel.roomArr.some((ell) => ell.checked)
   )).map((hotel) => ({...hotel,hotel,roomArr:hotel.roomArr.filter(el => el.checked)}) ) 
    console.log(seltempWrr,"tempArrtempArr---",seltempWrr1)
  setSlectedhhotel([...seltempWrr,...seltempWrr1])
}

const handleSelectAll = (value) => {
  let tempArr = [...hotelArr];
  tempArr = tempArr.map((hotel) => (
    {
      ...hotel,checked:value,
      roomArr:hotel.roomArr.map((room) => ({...room,checked:value}))
    } 
   )) 
 setselectAll(value)
    sethotelArr([...tempArr])
    setSlectedhhotel([...selectedhhotel,...tempArr])
}

const handleRoomChecked = (value,hotelIndex,index) => {
  let tempArr = [...hotelArr];

  tempArr[hotelIndex].roomArr[index].checked = value;
if(tempArr[hotelIndex].roomArr?.length > 0){
  if(tempArr[hotelIndex].roomArr.every((el) => el.checked == true)) {
    tempArr[hotelIndex].checked = value;
  } else {
    tempArr[hotelIndex].checked = false;
  }
}

console.log(tempArr,"tempArrtempArr")
  let seltempWrr = tempArr.filter((hotel) => (
      hotel.roomArr.some((ell) => ell.checked)
   )).map((hotel) => ({...hotel,hotel,roomArr:hotel.roomArr.filter(el => el.checked)}) ) 


  setSlectedhhotel([...seltempWrr])
  sethotelArr([...tempArr])
}

const handleStartDate = (value,index) => {
  let tempDateArr = [...selectDateArr];

  let testDate = new Date( new Date(value).getFullYear(), new Date(value).getMonth(), new Date(value).getDate()    )
  if(index == 0){
    setstartDate(testDate);
  }
  tempDateArr[index].startDate =testDate ;
  setselectDateArr([...tempDateArr]);
}

const handleEndDate = (value,index) => {
  let tempDateArr = [...selectDateArr];
  let testDate = new Date( new Date(value).getFullYear(), new Date(value).getMonth(), new Date(value).getDate()    )

  if(tempDateArr && tempDateArr.length > 1 && tempDateArr.length-1  == index){
      setendDate(testDate)
  } 
  tempDateArr[index].endDate = testDate;
  setselectDateArr([...tempDateArr]);
}

const handleAddDateRangeInHotel = () => {
  let tempDateArr = [...selectDateArr]
  let temphotelArr = [...selectedhhotel];
  console.log(temphotelArr,"temphotelroomArrtemphotelroomArr")
 let temphotelroomArr = temphotelArr.filter((el) => (el?.roomArr?.length > 0)).map((hotel) => (
    {
      ...hotel,
      roomArr:hotel.roomArr.map((room) => ({...room,dateRange:[...tempDateArr]}))
    } 
   ))

    temphotelArr = temphotelArr.filter((el) => (el?.roomArr?.length == 0)).map((ele) => ({...ele,dateRange:[...tempDateArr]}) )
   console.log(temphotelArr,"temphotelArrtemphotelArrtemphotelArr")
   setSlectedhhotel([...temphotelArr,...temphotelroomArr])

}


const handleAddBasePrie = (value,hotelIndex,rooIndex,dateIndex) => {
  let temparrtemparr = [...selectedhhotel];
  if(rooIndex > -1){
    //  temparrtemparr[hotelIndex].roomArr[rooIndex].dateRange[dateIndex].price = parseInt(value);;
  
    temparrtemparr = temparrtemparr.map((hotel,hI) => hI ==hotelIndex ? {...hotel,roomArr:hotel.roomArr.map((romR,rI) => rI ==rooIndex  ? {...romR,  dateRange:romR.dateRange.map((dateR,dI) => dI ==dateIndex ? {...dateR,price:parseInt(value)}: {...dateR}  )}  : {...romR})}: {...hotel})

  } else {
    temparrtemparr = temparrtemparr.map((hotel,hI) => hI ==hotelIndex ? {...hotel,dateRange:hotel.dateRange.map((dateR,dI) => dI ==dateIndex ? {...dateR,price:parseInt(value)}: {...dateR}  )}: {...hotel})

  }

  console.log(temparrtemparr,"temparrtemparrtemparrtemparrtemparrtemparr")
  setSlectedhhotel([...temparrtemparr])

}

const handleAddAdultPrie = (value,hotelIndex,rooIndex,dateIndex) => {
  let temparrtemparr = [...selectedhhotel];
  if(rooIndex > -1){
    temparrtemparr = temparrtemparr.map((hotel,hI) => hI ==hotelIndex ? {...hotel,roomArr:hotel.roomArr.map((romR,rI) => rI ==rooIndex  ? {...romR,  dateRange:romR.dateRange.map((dateR,dI) => dI ==dateIndex ? {...dateR,adultPrice:parseInt(value)}: {...dateR}  )}  : {...romR})}: {...hotel})


    // temparrtemparr[hotelIndex].roomArr[rooIndex].dateRange[dateIndex].adultPrice = parseInt(value);;
 } else {
  temparrtemparr = temparrtemparr.map((hotel,hI) => hI ==hotelIndex ? {...hotel,dateRange:hotel.dateRange.map((dateR,dI) => dI ==dateIndex ? {...dateR,adultPrice :parseInt(value)}: {...dateR}  )}: {...hotel})

 }
  setSlectedhhotel(temparrtemparr)

}

const handleAddChildPrie = (value,hotelIndex,rooIndex,dateIndex) => {
  let temparrtemparr = [...selectedhhotel];
  if(rooIndex > -1){
    // temparrtemparr[hotelIndex].roomArr[rooIndex].dateRange[dateIndex].childPrice = parseInt(value);;
    temparrtemparr = temparrtemparr.map((hotel,hI) => hI ==hotelIndex ? {...hotel,roomArr:hotel.roomArr.map((romR,rI) => rI ==rooIndex  ? {...romR,  dateRange:romR.dateRange.map((dateR,dI) => dI ==dateIndex ? {...dateR,childPrice:parseInt(value)}: {...dateR}  )}  : {...romR})}: {...hotel})


 } else {
  temparrtemparr = temparrtemparr.map((hotel,hI) => hI ==hotelIndex ? {...hotel,dateRange:hotel.dateRange.map((dateR,dI) => dI ==dateIndex ? {...dateR,childPrice:parseInt(value)}: {...dateR}  )}: {...hotel})

 }
  setSlectedhhotel(temparrtemparr)

}

const handleAddAvaible = (value,hotelIndex,rooIndex,dateIndex) => {
  let temparrtemparr = [...selectedhhotel];
  console.log(value,"handleAddAvaible")
  if(rooIndex > -1){
    temparrtemparr = temparrtemparr.map((hotel,hI) => hI ==hotelIndex ? {...hotel,roomArr:hotel.roomArr.map((romR,rI) => rI ==rooIndex  ? {...romR,  dateRange:romR.dateRange.map((dateR,dI) => dI ==dateIndex ? {...dateR,isAvailable:value}: {...dateR}  )}  : {...romR})}: {...hotel})


    // temparrtemparr[hotelIndex].roomArr[rooIndex].dateRange[dateIndex].isAvailable = value
 } else {
  temparrtemparr = temparrtemparr.map((hotel,hI) => hI ==hotelIndex ? {...hotel,dateRange:hotel.dateRange.map((dateR,dI) => dI ==dateIndex ? {...dateR,isAvailable:value}: {...dateR}  )}: {...hotel})

 }
  setSlectedhhotel(temparrtemparr)
}



const handleAddDateRange = () => {

  let temparr = [...selectDateArr];
  let obj = {};
  let star = new Date(endDate);
  console.log(new Date(star),"endDateendDateendDateendDate")
  obj.startDate = new Date(star);
  setstartDate(new Date(star))
let end = new Date(star.getDate() + 2)
star.setDate(star.getDate() +2);

  obj.endDate = new Date(star);
  setendDate(new Date(star));
  temparr.push(obj);
console.log(temparr,"temparrtemparr")
  setselectDateArr(temparr)

}

const handleSubmit = () => {

  if(!selectedhhotel  || selectedhhotel?.length ==0){
    toastError("Please Select Properties");
    return
  }


  // if (
  //   selectedhhotel.length > 0 &&
  //   selectedhhotel &&
  //   selectedhhotel.some((el) => !el.roomArr)
  // ) {
  //   toastError("Please select room in properies section.");
  //   return;
  // }

  if (
    selectDateArr.length > 0 &&
    selectDateArr &&
    selectDateArr.some((el) => !el.startDate)
  ) {
    toastError("Please select date Range");
    return;
  }


  for (const hotel of selectedhhotel) {
    if(hotel?.roomArr?.length > 0){
      for (const room of hotel.roomArr) {
        for (const date of room.dateRange) {
          if(!date.price || date.price == 0){
            return toastError("Please Fill  price " + room.name)
            break;
            
          }
          if(!date.adultPrice || date.adultPrice == 0){
            return toastError("Please Fill Adult price " + room.name)
            break;
            
          }
          if(!date.childPrice || date.childPrice == 0){
            return toastError("Please Fill child price "  + room.name)
            break;
          }
        }
      }
    } else {
      for (const date of hotel.dateRange) {
        if(!date.price || date.price == 0){
          return toastError("Please Fill  price " + hotel.name)
          break;
        }
        if(!date.adultPrice || date.adultPrice == 0){
          return toastError("Please Fill Adult price " + hotel.name)
          break;
        }
        if(!date.childPrice || date.childPrice == 0){
          return toastError("Please Fill child price "  + hotel.name)
          break;
        }
      }
    }
    
  }


let obj = {
  hotelArr:selectedhhotel
}

handleAddhotePreiceApi(obj)




}


const handleAddhotePreiceApi = async (data) => {

  try {
    let {data:res} =  await AddRoomDatesPriceApi(data)
    if(res.success){
      naviage("/Hotels/HotelAvailable")
    }
  } catch (error) {
    toastError(error)
  }
}


  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">AddProperty</h5>
          <DashboardBox>
          <div className="row p-3">
            {
              formStep.map((ste) => (
                <div className="col-md-4">
                  {
                    ste.step == step ? (  <h5 className="btn btn-1 bg-black text-white "   >{ste.name}</h5>) :(  <h5 className="btn " onClick={()=>setStep(ste.step)}>{ste.name}</h5>)
                  }
              
              </div>
              )
              )
            }
           
          </div>
            {
              step == 1 && (
                <div className="row">
                <p>Select All <input type="checkbox"   checked={selectAll} onChange={()=>handleSelectAll(!selectAll)}  /></p>
                             { hotelArr.map((hotel,htelIndex) => (
                               
                                hotel?.roomArr && hotel?.roomArr.length > 0 ?  (
                                      <div className="col-md-3 p-3">
                                        <b style={{fontSize:12}}><input type="checkbox" style={{marginRight:12}}  checked={hotel.checked}  onChange={()=>handleHotelChecked(!hotel.checked,htelIndex)} />{hotel.name}  </b>
                                        {
                                          hotel?.roomArr?.length > 0  && hotel?.roomArr?.map((room,roomIndex) => (
                                            <p className="mb-0" style={{fontSize:12}}><input type="checkbox"  checked={room.checked}  style={{marginRight:12}}   onChange={()=>handleRoomChecked(!room.checked,htelIndex,roomIndex)} />{room.name} </p>
                                          ))
                                        }
                                    
                                      </div>
                                    ) : (
                                      <div className="col-md-3">
                                      <b style={{fontSize:12}}><input type="checkbox" style={{marginRight:12}} checked={hotel.checked}  onChange={()=>handleHotelChecked(!hotel.checked,htelIndex)} />{hotel.name}   </b>
                                      <p className="mb-0" style={{fontSize:12}}><input type="checkbox"   checked={hotel.checked}  style={{marginRight:12}}  onChange={()=>handleHotelChecked(!hotel.checked,htelIndex)} />{hotel.name} </p>
                                      
                                    </div>
                                    )
                                  )
                                  )
                                }
              </div>
              )
            }

            {     
              step == 2 && (
                <div className="row" style={{fontSize:12}}>
                  {
                    selectDateArr && selectDateArr.map((date,dateIndex) => (
                      <div className="col-md-8 mb-3">
                                  <div className="row">
                                      <div className="col-md-6">
                                        <label>Start Date {new Date(date.startDate).toDateString()}</label><br/>
                                          <input type="date" style={{fontSize:12}} className="form-control"  onChange={(e)=>handleStartDate(e.target.value,dateIndex)}   value={moment(new Date(date.startDate)).format('YYYY-MM-DD')} />
                                      </div>
                                      <div className="col-md-6">
                                      <label>End Date {new Date(date.endDate).toDateString()} </label><br/>
                                          <input type="date"  style={{fontSize:12}} className="form-control" min={moment(new Date(date.endDate)).format('YYYY-MM-DD')}  onChange={(e)=>handleEndDate(e.target.value,dateIndex)} value={moment(new Date(date.endDate)).format('YYYY-MM-DD')} />
                                      </div>
                                    </div>
                      </div>
                    ))
                  }
                      <div className="col-md-8 mn">
                      <button className="btn btn-1 bg-black text-white ms-3"  onClick={()=>handleAddDateRange()}><i className="fa fa-plus"> </i> Add Another  </button>
                      </div>
              </div>
              )
            }
          {     
              step == 3 && (
                <div className="row" >
                  {
                    selectedhhotel && selectedhhotel.map((hotel,hotelindex) => (
                      <div className="col-md-12 my-2 ">
                        <b> {hotel.name}</b>
                        {
                          hotel?.roomArr && hotel?.roomArr?.length > 0 ? (       
                            
                            
                            hotel.roomArr && hotel.roomArr.map((room,rooIndex) => (
                            <div className="accordion" id={`hotel${hotelindex}`}>
                            {
                              room.dateRange && room.dateRange.map((date, daetIndex) => (
                                <div className="accordion-item acordding ">
                                <h2 className="accordion-header" id="headingOne">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#room${daetIndex}${rooIndex}${hotelindex}`} aria-expanded="true" aria-controls="collapseOne">
                                      {new Date(date.startDate).toDateString()} - {new Date(date.endDate).toDateString()}
                                  </button>
                                </h2>
                                <div id={`room${daetIndex}${rooIndex}${hotelindex}`} className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                          <b>{room.name}</b>
                                        </div>
                                        <div className="col-md-8">
                                          <p>EverDay Price</p>
                                          <div className="d-flex justify-content-between gap-5">
                                            <div className="">
                                              <label>Base Price</label>
                                                 <input type="text" className="form-control" onChange={(e)=>handleAddBasePrie(e.target.value,hotelindex,rooIndex,daetIndex)} />
                                            </div>
                                            <div className="">
                                                <label>Adult Price</label>
                                                 <input type="text"  className="form-control" onChange={(e)=>handleAddAdultPrie(e.target.value,hotelindex,rooIndex,daetIndex)}  />
                                            </div>
                                            <div className="">
                                                <label>Child Price</label>
                                                 <input type="text"  className="form-control"  onChange={(e)=>handleAddChildPrie(e.target.value,hotelindex,rooIndex,daetIndex)} />
                                            </div>
                                            <div className="">
                                                <label>Is Available</label>

                                            </div>
                                            <div className="">
                                                 <input type="checkbox"   value={date.isAvailable} checked={date.isAvailable}  onChange={(e)=>handleAddAvaible(!date.isAvailable,hotelindex,rooIndex,daetIndex)} />
                                            </div>
                                          </div>

                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              ))
                            }
                       
                          </div>
                          ))) : (
                            <div className="accordion" id={`hotel${hotelindex}`}>
                            {
                              hotel.dateRange && hotel.dateRange.map((date, daetIndex) => (
                                <div className="accordion-item acordding ">
                                <h2 className="accordion-header" id="headingOne">
                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#room${daetIndex}${hotelindex}`} aria-expanded="true" aria-controls="collapseOne">
                                      {new Date(date.startDate).toDateString()} - {new Date(date.endDate).toDateString()}
                                  </button>
                                </h2>
                                <div id={`room${daetIndex}${hotelindex}`} className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                  <div className="accordion-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                          <b>{hotel.name}</b>
                                        </div>
                                        <div className="col-md-8">
                                          <p>EverDay Price</p>
                                          <div className="d-flex justify-content-between gap-5">
                                            <div className="">
                                              <label>Base Price</label>
                                                 <input type="text" className="form-control"  onChange={(e)=>handleAddBasePrie(e.target.value,hotelindex,-1,daetIndex)} />
                                            </div>
                                            <div className="">
                                                <label>Adult Price</label>
                                                 <input type="text"  className="form-control" onChange={(e)=>handleAddAdultPrie(e.target.value,hotelindex,-1,daetIndex)}  />
                                            </div>
                                            <div className="">
                                                <label>Child Price</label>
                                                 <input type="text"  className="form-control"  onChange={(e)=>handleAddChildPrie(e.target.value,hotelindex,-1,daetIndex)} />
                                            </div>
                                            <div className="">
                                                <label>Is Available</label>

                                            </div>
                                            <div className="">

                                                 <input type="checkbox"   value={date.isAvailable} checked={date.isAvailable}  onChange={(e)=>handleAddAvaible(!date.isAvailable,hotelindex,-1,daetIndex)} />
                                            </div>
                                          </div>

                                        </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              ))
                            }
                       
                          </div>
                          )
                
                        }
                     
                      </div>
                    ))
                  }
                
              </div>
              )
            }


        <div className="row mt-3">
          <div className="col-md-6">
            
            {
              step >1 && (
                 <button className="btn btn-1 bg-black text-white me-3 "  onClick={()=>{setStep((prev) => prev-1)}} >Prev</button>
              )
            }
             {
              step < 3 && (
                <button className="btn btn-1 bg-black text-white  " onClick={()=>{
                  if(selectedhhotel && selectedhhotel.length > 0)  {
                    console.log(step,"df")
                    if(step == 2){
                      handleAddDateRangeInHotel()
                    }
                    setStep((prev) => prev+1)
                    
                  } else {
                    toastError("Please Select Properties")
                  }
                  
                 }} >Next</button>
              )
            }

{
              step  ==3 && (
                <button className="btn btn-1 bg-black text-white ms-3" onClick={()=>handleSubmit()} >Submit</button>
              )
            }
          
       
           </div>       
           </div>       
          </DashboardBox>
         
        </div>
      </section>
    </main>
  );
}

export default AddHotelAvailable;
