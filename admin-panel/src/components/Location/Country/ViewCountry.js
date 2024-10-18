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
import AddCountry from "./AddCountry";
import { SetCountryObj, CountryDelete, CountryGet } from "../../../redux/actions/Country/Country.actions";
import { generateFilePath } from "../../Utility/utils";
function ViewCountry() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const countryArr = useSelector((countries) => countries.countries.countries);
    const countryObj = useSelector((countries) => countries.countries.countryObj);
    const [displayCountryArr, setDisplayCountryArr] = useState([]);
    const [query, setQuery] = useState("");
    const [countryMainArr, setCountryMainArr] = useState([]);

    useEffect(() => {
        handleGet()
    }, [])



    const handleCategoryEdit = (row) => {
        dispatch(SetCountryObj(row));
    };


    const handleGet = () => {
        dispatch(CountryGet());
    };

    const handleCategoryDelete = (row) => {
        dispatch(CountryDelete(row._id))
    }


    useEffect(() => {
        console.log(countryArr, "hsuidfsaiufagsdifgifuayfiutfgitiu")

        setCountryMainArr(countryArr)
        setDisplayCountryArr(countryArr)

    }, [countryArr])

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
            name: "Status",
            minWidth: "210px",
            maxWidth: "211px",
            button: true,
            cell: (row) => <CustomButton greenBtn noIcon btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} path={"/Location/View-Country"} />,
        },
        {
            name: "Action",
            minWidth: "210px",
            maxWidth: "211px",
            cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Location/View-Country" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Location/View-Country" />,
        },
    ];

    // ==============================================================================================================

    const handleFilterByQuery = (e, requiredParametersArr) => {
        let tempArr = displayCountryArr.filter(el => {
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
        setCountryMainArr([...tempArr])
        console.log([...tempArr], "...tempArr")
    }


    return (
        <main>

            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="blue-1 m-0">{countryObj && countryObj.name ? "Edit Country" : "Add Country"}</h5>
                                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
                            </div>
                            <DashboardBox>
                                <AddCountry />
                            </DashboardBox>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">Country List</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                                    <SearchBox setQuery={(e) => { handleFilterByQuery(e, ["name"]); }} query={query} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={countryMainArr && countryMainArr.length > 0 ? countryMainArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ViewCountry;
