import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { downloadCSV } from "../../Utility/CSV";
import SearchBox from "../../Utility/SearchBox";

import { AddModal } from "../../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import { toastError } from "../../../utils/toastUtils";
import AddLocation from "./AddLocation";
import { SetLocationObj, LocationDelete, LocationGet } from "../../../redux/actions/Location/Location.actions";
import { generateFilePath } from "../../Utility/utils";
function ViewLocation() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const locationArr = useSelector((location) => location.location.locations);
    const locationObj = useSelector((location) => location.location.locationObj);
    const [displayLocationArr, setDisplayLocationArr] = useState([]);
    const [query, setQuery] = useState("");
    const [locationMainArr, setLocationMainArr] = useState([]);

    useEffect(() => {
        handleGet()
    }, [])



    const handleCategoryEdit = (row) => {
        dispatch(SetLocationObj(row));
    };


    const handleGet = () => {
        dispatch(LocationGet());
    };

    const handleCategoryDelete = (row) => {
        dispatch(LocationDelete(row._id))
    }


    useEffect(() => {
        console.log(locationArr, "hsuidfsaiufagsdifgifuayfiutfgitiu")

        setLocationMainArr(locationArr)
        setDisplayLocationArr(locationArr)

    }, [locationArr])

    const category_columns = [
        {
            name: "ID",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
        },
        // {
        //     name: "Description",
        //     cell: (row) => <div dangerouslySetInnerHTML={{
        //         __html: row.description ? row.description : "",
        //     }}></div>,
        // },
        {
            name: "Image",
            cell: (row) => <img src={generateFilePath(row.imageUrl)} />,
        },
        {
            name: "Status",
            minWidth: "210px",
            maxWidth: "211px",
            button: true,
            cell: (row) => <CustomButton greenBtn noIcon btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} path={"/Location/View-Location"} />,
        },
        {
            name: "Action",
            minWidth: "210px",
            maxWidth: "211px",
            cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Location/View-Location" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Location/View-Location" />,
        },
    ];

    // ==============================================================================================================

    const handleFilterByQuery = (e, requiredParametersArr) => {
        let tempArr = displayLocationArr.filter(el => {
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
        setLocationMainArr([...tempArr])
        console.log([...tempArr], "...tempArr")
    }


    return (
        <main>

            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="blue-1 m-0">{locationObj && locationObj.name ? "Edit Location" : "Add Location"}</h5>
                                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
                            </div>
                            <DashboardBox>
                                <AddLocation />
                            </DashboardBox>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">Location List</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                                    <SearchBox setQuery={(e) => { handleFilterByQuery(e, ["name"]); }} query={query} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={locationMainArr && locationMainArr.length > 0 ? locationMainArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ViewLocation;
