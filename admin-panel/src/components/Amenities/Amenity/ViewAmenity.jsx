import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../Utility/Button";
import { DashboardTable } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";
// import ProductDetail from "CustomerDetail";
import { amenityCategoryDelete, amenityCategoryGet, SetAmenityCategoryObj } from "../../../redux/actions/AmenityCategory/AmenityCategory.action";
import { EditModal } from "../../Utility/Modal";
import { useNavigate } from "react-router-dom";
import { amenityDelete, amenityGet, SetAmenityObj } from "../../../redux/actions/Amenity/Amenity.action";


export default function ViewAmenity() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [mainAmenityArr, setMainAmenityArr] = useState([]);
    const [displayAmenityArr, setDisplayAmenityArr] = useState([]);
    const amenityArr = useSelector((state) => state.amenity.amenityArr);
    const handleEditSet = (e, row) => {
        e.preventDefault();
        dispatch(SetAmenityObj(row))
        navigate("/Amenities/Add")
    };


    const handleDelete = (e, row) => {
        e.preventDefault();
        dispatch(amenityDelete(row._id))
    };

    const users_columns = [
        {
            name: "ID",
            selector: (row) => row._id,
            sortable: true,
            width: "25%",
        },
        {
            name: "NAME",
            selector: (row) => `${row?.name}`,
            width: "25%",
        },
        {
            name: "AMENITY CATEGORY NAME",
            selector: (row) => `${row?.amenityCategoryObj?.name}`,
            width: "25%",
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <CustomButton btntype="button" ClickEvent={(e) => handleEditSet(e, row)} isBtn iconName="fa-solid fa-check" btnName="Edit" />
                    <div style={{ marginLeft: 14 }}>
                        <CustomButton btntype="button" ClickEvent={(e) => handleDelete(e, row)} isBtn noIcon={true} btnName="Delete" />
                    </div>
                </>
            ),
            width: "15%",
        },
    ];

    const [tabList, settabList] = useState([
        {
            tabName: "All Customer",
            active: true,
        },
        {
            tabName: "Active Customer",
            active: false,
        },
        {
            tabName: "Inactive customer",
            active: false,
        },
    ]);

    const handleGet = () => {
        dispatch(amenityGet());
    };
    useEffect(() => {
        if (amenityArr && amenityArr.length) {
            setMainAmenityArr(amenityArr)
            setDisplayAmenityArr(amenityArr)
        }
    }, [amenityArr]);

    useEffect(() => {
        handleGet();
    }, []);


    return (
        <main>
            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <ul className="nav nav-pills dashboard-pills justify-content-end" id="pills-tab" role="tablist">
                            {/* {tabList.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <CustomButton
                                            navPills
                                            btnName={item.tabName}
                                            pillActive={item.active ? true : false}
                                            path={item.path}
                                            extraClass={item.extraClass}
                                            ClickEvent={() => {
                                                tabClick(i, tabList, settabList);
                                            }}
                                        />
                                    </li>
                                );
                            })} */}
                        </ul>
                        <CustomButton isLink iconName="fa-solid fa-plus" btnName="Create Amenity" path="/Amenities/Add" />
                    </div>
                    <DashboardTable>
                        <div className="d-flex align-items-center justify-content-between mb-5">
                            <h5 className="blue-1 m-0">Amenities</h5>
                            <div className="d-flex align-items-center gap-3">
                                <SearchBox extraClass="bg-white" />
                                {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="Customer CSV" path="/" small roundedPill downloadAble ClickEvent={() => downloadCSV(usersArr)} /> */}
                            </div>
                        </div>

                        <DataTable columns={users_columns} data={displayAmenityArr} pagination />
                    </DashboardTable>
                </div>
            </section>
        </main>
    );
}
