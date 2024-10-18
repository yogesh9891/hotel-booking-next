import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import CustomButton from "../Utility/Button";
import { toastError, toastSuccess } from "../Utility/ToastUtils";
import { DashboardTable } from "../Utility/DashboardBox";
import { HOTELGET } from "../../redux/actions/Hotels/Hotel.action";
import { useNavigate } from "react-router-dom";
import { getHotels, saveHotelposition,  } from "../../services/Hotels.service";

export default function HotelSequence() {
    const navigate = useNavigate();
    const [dataIsAdded, setDataIsAdded] = useState(false);
    const [displayHotelsInSelectedHotelArr, setDisplayHotelsInSelectedHotelArr] = useState([]);
    const [productsArr, setHotelsArr] = useState([]);
    const [productCategoriesArr, setHotelCategoriesArr] = useState([]);
    const [selectedHotelHotelObj, setSelectedHotelHotelObj] = useState("");
    const [productsNotInSelectedHotel, setHotelsNotInSelectedHotel] = useState([]);
    const [parentHotelId, setParentHotelId] = useState("");

    // const handleGetAllHotelCategories = async () => {
    //     try {
    //         let arr = await getHotelData();
           
    //             let pareantcategoryObj = {
    //                 name:"Parent category",
    //                 _id:0,
    //             }
    //                    arr.unshift(pareantcategoryObj);
    //              setHotelCategoriesArr(arr);
            
    //     } catch (err) {
    //         toastError(err)
    //     }
    // }

    // const getHotelData = async (level = 1, parentId = undefined) => {
    //     try {
    //         let query = `level=${level}`;
    //         if (parentId) {
    //             query = query + `&parentHotelId=${parentId}`
    //         }
    //         const res = await getHotel(query);
    //         // console.log(res?.data)
    //         if (res?.data?.data) {
    //             return (res?.data?.data)
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toastError(error)
    //     }
    //     return ([])
    // }


    const handleGetAllHotels = async () => {
        try {
            let { data: res } = await getHotels(`order=true`);
            if (res.success) {
                setHotelsArr(res.data);
                setDisplayHotelsInSelectedHotelArr(res.data);
                setHotelsNotInSelectedHotel(res.data);
                // if (selectedHotelHotelObj) {
                //     handleSetDisplayHotelsOnInit(res.data)
                // }
            }
        } catch (err) {
            toastError(err)
        }
    }


    // const handleSetDisplayHotelsOnInit = (data) => {
    //     let tempArr = []
    //     let tempArr2 = []
    //     if (selectedHotelHotelObj) {
    //         tempArr = data.filter(el => el.productHotelIdArr.some(ele => ele.productHotelId == selectedHotelHotelObj._id))
    //         tempArr2 = data.filter(el => el.productHotelIdArr.every(ele => ele.productHotelId != selectedHotelHotelObj._id))
    //     }
    //     else {
    //         tempArr = data
    //         tempArr2 = data
    //     }
    //     setDisplayHotelsInSelectedHotelArr(tempArr)
    //     setHotelsNotInSelectedHotel(tempArr2)
    // }
    // const handleSetDisplayHotels = () => {
    //     let tempArr = []
    //     let tempArr2 = []
    //     if (selectedHotelHotelObj._id || selectedHotelHotelObj._id != "") {
    //         tempArr = productsArr.filter(el => el.productHotelIdArr.some(ele => ele.productHotelId == selectedHotelHotelObj._id))
    //         tempArr2 = productsArr.filter(el => el.productHotelIdArr.every(ele => ele.productHotelId != selectedHotelHotelObj._id))
    //     }
    //     else {
    //         tempArr = productsArr
    //         tempArr2 = productsArr
    //     }
    //     tempArr.sort((a, b) => {
    //         console.log(
    //             a.productHotelIdArr.find(el => `${el.productHotelId}` == selectedHotelHotelObj._id).position,
    //             "a",
    //             b.productHotelIdArr.find(el => `${el.productHotelId}` == selectedHotelHotelObj._id).position,
    //             "b"
    //         )
    //         return a.productHotelIdArr.find(el => `${el.productHotelId}` == selectedHotelHotelObj._id)?.position - b.productHotelIdArr.find(el => `${el.productHotelId}` == selectedHotelHotelObj._id)?.position
    //     })
    //     setDisplayHotelsInSelectedHotelArr(tempArr)
    //     setHotelsNotInSelectedHotel(tempArr2)
    // }

    // useEffect(() => {
    //     handleSetDisplayHotels()
    // }, [selectedHotelHotelObj])



    const handleMoveElementUp = (objectId) => {
   
        let index = displayHotelsInSelectedHotelArr.findIndex(el => el._id == objectId)
        if (index != 0) {
            let obj = displayHotelsInSelectedHotelArr[index]
            let tempArr = displayHotelsInSelectedHotelArr.filter((el, innerIndex) => objectId != el._id)
            tempArr.splice(index - 1, 0, obj)
            setDisplayHotelsInSelectedHotelArr(tempArr)
        }
        else {
            toastError("Already at Top")
        }
    }
    const handleMoveElementDown = (objectId) => {
      

        let index = displayHotelsInSelectedHotelArr.findIndex(el => el._id == objectId)
        console.log(index, displayHotelsInSelectedHotelArr.length)
        if (index != displayHotelsInSelectedHotelArr.length - 1) {
            let obj = displayHotelsInSelectedHotelArr[index]
            let tempArr = displayHotelsInSelectedHotelArr.filter((el, innerIndex) => objectId != el._id)
            tempArr.splice(index + 1, 0, obj)
            setDisplayHotelsInSelectedHotelArr(tempArr)
        }
        else {
            toastError("Already at Bottom")
        }

    }

    const existing_product_columns = [
        {
            name: "SL",
            selector: (row, index) => `${index + 1}`,
            minWidth: "80px",
            maxWidth: "80px",
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
        },
        {
            name: "Management",
            minWidth: "20px",
            cell: (row, index) => (
                <>
                    <CustomButton
                        greenBtn
                        noIcon
                        btnName="Move Up"
                        ClickEvent={(e) => {
                            e.preventDefault();
                            handleMoveElementUp(row._id)
                        }}
                    />
                    <CustomButton
                        greenBtn
                        noIcon
                        btnName="Move Down"
                        ClickEvent={(e) => {
                            e.preventDefault();
                            handleMoveElementDown(row._id)
                        }}
                    />

                    {/* <CustomButton
                        redBtn
                        noIcon
                        btnName="Remove From Hotel"
                        ClickEvent={(e) => {
                            e.preventDefault();
                            handleRemoveHotelFromHotel(row._id)
                        }}
                    /> */}
                </>
            ),
        },
    ];


    // const not_existing_product_columns = [
    //     {
    //         name: "SL",
    //         selector: (row, index) => `${index + 1}`,
    //         sortable: true,
    //     },
    //     {
    //         name: "Name",
    //         selector: (row) => row.name,
    //     },

    //     {
    //         name: "Position Management",
    //         minWidth: "20px",
    //         maxWidth: "200px",
    //         cell: (row) => (
    //             <>
    //                 <CustomButton
    //                     greenBtn
    //                     noIcon
    //                     btnName="Add To Hotel"
    //                     ClickEvent={(e) => {
    //                         e.preventDefault();
    //                         handleAddHotelToHotel(row._id)
    //                     }}
    //                 />
    //             </>
    //         ),
    //     },
    // ];


    // const handleChange = async (Value) => {
    //     setSelectedHotelHotelObj(Value)
    //     let level = 1;
    //     let parentId = "" ;
    //     if(Value._id != 0){
    //             level = 2;
    //             parentId = Value?._id 
    //     }
    //     try {
    //         let arr = await getHotelData(level,parentId);
           
    //             console.log(arr,"caferesdfdsf")
    //             setDisplayHotelsInSelectedHotelArr(arr)
       
            
    //     } catch (err) {
    //         toastError(err)
    //     }
    //     console.log(Value, "value")
    // }





 
    useEffect(() => {
        handleGetAllHotels()
      }, []);


    // const handleAddHotelToHotel = async (id) => {
    //     try {
    //         if (!selectedHotelHotelObj._id || selectedHotelHotelObj._id == "") {
    //             toastError("Please Select a product category first")
    //             return
    //         }
    //         let obj = {
    //             productHotelId: selectedHotelHotelObj._id
    //         }
    //         // let { data: res } = await AddHotelHotelByHotelId(id, obj);
    //         // if (res.success) {
    //         //     // handleGetAllHotels()   
    //         // }
    //     } catch (err) {
    //         toastError(err)
    //     }
    // }


    // const handleRemoveHotelFromHotel = async (id) => {
    //     try {
    //         console.log(selectedHotelHotelObj._id)
    //         if (!selectedHotelHotelObj._id || selectedHotelHotelObj._id == "") {
    //             toastError("Please Select a product category first")
    //             return
    //         }
    //         let obj = {
    //             productHotelId: selectedHotelHotelObj._id
    //         }
    //         // let { data: res } = await RemoveHotelHotelByHotelId(id, obj);
    //         // if (res.success) {
    //         //     handleGetAllHotels()
    //         // }
    //     } catch (err) {
    //         toastError(err)
    //     }
    // }






    const handleSaveHotelWisePositionForHotels = async () => {
        try {
          
            let tempArr = displayHotelsInSelectedHotelArr.map((el, index) => {
                let obj = {
                    order: index + 1,
                    hotelId:el?._id
                }
                return obj
            })

            let obj = {
                hotel:tempArr,
            }

            console.log(tempArr,"tempArrtempArrtempArrtempArr")
            let { data: res } = await saveHotelposition(obj)
            if (res.message) {
                toastSuccess(res.message)
            }
        } catch (err) {
            toastError(err)
        }
    }








    return (
        <main>
            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                       
                        <div className="col-12 col-md-12">
                            <div className="d-flex gap-3 justify-content-between mb-4 align-items-center">
                                <h5 className="blue-1 m-0">Hotel Sequence</h5>
                                <button className="btn btn-1 bg-black text-white" onClick={(e) => {
                                        e.preventDefault();
                                        handleSaveHotelWisePositionForHotels()
                                        // handleAddHotelToHotel(row._id)
                                    }}>Save Positions</button>
                               
             
                            </div>
                            <DashboardTable>
                                <DataTable columns={existing_product_columns} data={displayHotelsInSelectedHotelArr}  />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
