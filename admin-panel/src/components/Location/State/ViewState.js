import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import SearchBox from "../../Utility/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import AddState from "./AddState";
import { STATEGet, STATEDelete, SETSTATEObj } from "../../../redux/actions/State/State.actions";
import { generateFilePath } from "../../Utility/utils";
function ViewState() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const stateArr = useSelector((states) => states.states.states);
    const stateObj = useSelector((states) => states.states.stateObj);
    const [displayStateArr, setDisplayStateArr] = useState([]);
    const [query, setQuery] = useState("");
    const handleStateEdit = (row) => {

        dispatch(SETSTATEObj(row));
    };

    const [stateMainArr, setStateMainArr] = useState([]);

    const handleGet = () => {
        dispatch(STATEGet());
    };

    const handleCategoryDelete = (row) => {
        dispatch(STATEDelete(row._id))
        dispatch(SETSTATEObj(null))

    }

    useEffect(() => {
        handleGet()
    }, [])

    useEffect(() => {
        if (stateArr?.length) {
            setStateMainArr(stateArr)
            setDisplayStateArr(stateArr)
        }
    }, [stateArr])

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
            name: "Description",
            cell: (row) => <div dangerouslySetInnerHTML={{
                __html: row.description ? row.description : "",
            }}></div>,
        },
        {
            name: "Image",
            cell: (row) => <img src={generateFilePath(row.imageUrl)} />,
        },
        {
            name: "State",
            selector: (row) => row?.countryObj?.name,
        },
        {
            name: "Status",
            minWidth: "210px",
            maxWidth: "211px",
            button: true,
            cell: (row) => <CustomButton greenBtn noIcon btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} path={"/Location/View-State"} />,
        },
        {
            name: "Action",
            minWidth: "210px",
            maxWidth: "211px",
            cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Location/View-State" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleStateEdit(row)} editPath="/Location/View-State" />,
        },
    ];

    // ==============================================================================================================

    const handleFilterByQuery = (e, requiredParametersArr) => {
        let tempArr = displayStateArr.filter(el => {
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
        setStateMainArr([...tempArr])
        console.log([...tempArr], "...tempArr")
    }


    return (
        <main>

            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="blue-1 m-0">{stateObj && stateObj.name ? "Edit " : "Add "} State</h5>
                                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
                            </div>
                            <DashboardBox>
                                <AddState />
                            </DashboardBox>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">State List</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                                    <SearchBox setQuery={(e) => { handleFilterByQuery(e, ["name"]); }} query={query} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={stateMainArr && stateMainArr.length > 0 ? stateMainArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ViewState;
