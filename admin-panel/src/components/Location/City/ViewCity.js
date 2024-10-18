import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import SearchBox from "../../Utility/SearchBox";

import { useDispatch, useSelector } from "react-redux";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import { AddModal } from "../../Utility/Modal";
import AddCity from "./AddCity";
import { CountryGet } from "../../../redux/actions/Country/Country.actions";
import { STATEGet, STATEDelete, SETSTATEObj } from "../../../redux/actions/State/State.actions";
import { CityAdd, CityGet, SetCityObj, CityUpdate, CityDelete } from "../../../redux/actions/City/City.actions";
import { generateFilePath } from "../../Utility/utils";

function ViewCity() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const countriesArr = useSelector((countries) => countries.countries.countries);
    const statesArr = useSelector((states) => states.states.states);
    const citiesArr = useSelector((cities) => cities.cities.cities);
    const [displayCityArr, setDisplayCityArr] = useState([]);
    const [query, setQuery] = useState("");
    const [cityMainArr, setCityMainArr] = useState([]);
    const cityObj = useSelector((cities) => cities.cities.cityObj);



    const handleCityEdit = (row) => {
        dispatch(SetCityObj(row));
    };



    const handleGet = () => {
        dispatch(CityGet());
    };

    const handleCategoryDelete = (row) => {
        dispatch(CityDelete(row._id))
    }

    useEffect(() => {
        handleGet()
    }, [])

    useEffect(() => {
        if (citiesArr?.length) {
            setCityMainArr(citiesArr)
            setDisplayCityArr(citiesArr)
        }
    }, [citiesArr])

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
            selector: (row) => row?.stateObj?.name,
        },
        {
            name: "Country",
            selector: (row) => row?.countryObj?.name,
        },
        {
            name: "Status",
            minWidth: "210px",
            maxWidth: "211px",
            button: true,
            cell: (row) => <CustomButton greenBtn noIcon btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} path={"/Location/View-City"} />,
        },
        {
            name: "Action",
            minWidth: "210px",
            maxWidth: "211px",
            cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Location/View-City" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCityEdit(row)} editPath="/Location/View-City" />,
        },
    ];

    // ==============================================================================================================

    const handleFilterByQuery = (e, requiredParametersArr) => {
        let tempArr = displayCityArr.filter(el => {
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
        setCityMainArr([...tempArr])
        console.log([...tempArr], "...tempArr")
    }


    return (
        <main>

            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="blue-1 m-0">{cityObj && cityObj.name ? "Edit " : "Add "} City </h5>
                                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
                            </div>
                            <DashboardBox>
                                <AddCity />
                            </DashboardBox>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">City List</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                                    <SearchBox setQuery={(e) => { handleFilterByQuery(e, ["name"]); }} query={query} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={cityMainArr && cityMainArr.length > 0 ? cityMainArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ViewCity;
