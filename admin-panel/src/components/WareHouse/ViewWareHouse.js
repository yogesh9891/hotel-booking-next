import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";

import { useDispatch, useSelector } from "react-redux";
import { SETSTATEOBJ, STATEDELETE as areaDELETE, STATEGET as areaGET } from "../../redux/actions/Country/Country.actions";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import { AddModal } from "../Utility/Modal";
import AddWareHouse from "./AddWareHouse";
import { WAREHOUSEDELETE, WAREHOUSEGET, SETWAREHOUSEOBJ } from "../../redux/actions/WareHouse/WareHouse.actions";
function ViewWareHouse() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const [ModalType, setModalType] = useState("");
    const [ModalName, setModalName] = useState("");
    const [ModalBox, setModalBox] = useState(false);
    const warehouseArr = useSelector((state) => state.warehouse.warehouses);
    const warehouseObj = useSelector((state) => state.warehouse.warehousesObj);
    const [ModalData, setModalData] = useState({});
    const [displayWareHouseArr, setDisplayWareHouseArr] = useState([]);
    const [query, setQuery] = useState("");
    const handleCategoryEdit = (row) => {
        dispatch(SETWAREHOUSEOBJ(row));
    };

    const [wareHouseArr, setWareHouseArr] = useState([]);

    const handleGet = () => {
        dispatch(WAREHOUSEGET());
    };

    const handleCategoryDelete = (row) => {
        dispatch(WAREHOUSEDELETE(row._id))
    }

    useEffect(() => {
        handleGet()
    }, [])

    useEffect(() => {
        if (warehouseArr?.length) {
            setWareHouseArr(warehouseArr)
            setDisplayWareHouseArr(warehouseArr)
        }
    }, [warehouseArr])

    const category_columns = [
        {
            name: "ID",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row?.name,
        },
        {
            name: "State",
            selector: (row) => row?.stateObj?.name,
        },
        {
            name: "City",
            selector: (row) => row?.cityObj?.name,
        },
        {
            name: "Area",
            selector: (row) => row?.areaObj?.name,
        },
        {
            name: "Warehouse/Store",
            selector: (row) => row?.isStore ? "Store" : "Warehouse",
        },
        {
            name: "Status",
            minWidth: "210px",
            maxWidth: "211px",
            button: true,
            cell: (row) => <CustomButton greenBtn noIcon btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} path={"/Warehouse/View-Warehouse"} />,
        },
        {
            name: "Action",
            minWidth: "210px",
            maxWidth: "211px",
            cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Warehouse/View-Warehouse" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Warehouse/View-Warehouse" />,
        },
    ];

    // ==============================================================================================================

    const handleFilterByQuery = (e, requiredParametersArr) => {
        let tempArr = displayWareHouseArr.filter(el => {
            for (const ele of requiredParametersArr) {
                console.log(`${el[ele]}`.toLowerCase().includes(`${e}`.toLowerCase()), "ele,el")
                if (`${el[`${ele}`.toLowerCase()]}`.toLowerCase().includes(`${e}`.toLowerCase())) {
                    // console.log("true")
                    return true;
                }
                else {
                    return false;
                }
            }
        })
        setQuery(e)
        setWareHouseArr([...tempArr])
        console.log([...tempArr], "...tempArr")
    }


    return (
        <main>
            <AddModal
                ModalBox={ModalBox}
                setModalBox={setModalBox}
                name={ModalName}
                ModalType={ModalType}
                data={ModalData}
            />
            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="blue-1 m-0">{warehouseObj && warehouseObj.name ? "Edit " : "Add "} WareHouse/STORE</h5>
                                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
                            </div>
                            <DashboardBox>
                                <AddWareHouse />
                            </DashboardBox>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">WareHouse/STORE List</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                                    <SearchBox setQuery={(e) => { handleFilterByQuery(e, ["name"]); }} query={query} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={wareHouseArr && wareHouseArr.length > 0 ? wareHouseArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ViewWareHouse;
