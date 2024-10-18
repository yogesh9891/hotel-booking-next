import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { downloadCSV } from "../Utility/CSV";
import SearchBox from "../Utility/SearchBox";

import { AddModal } from "../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import { toastError } from "../../utils/toastUtils";
import AddSeo from "./AddSeo";
import { SetSeoObj, SeoDelete, SeoGet } from "../../redux/actions/Seo/Seo.actions";
import { generateFilePath } from "../Utility/utils";
function ViewSeo() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const seoArr = useSelector((seo) => seo.seo.seos);
    const seoObj = useSelector((seo) => seo.seo.seoObj);
    const [displaySeoArr, setDisplaySeoArr] = useState([]);
    const [query, setQuery] = useState("");
    const [seoMainArr, setSeoMainArr] = useState([]);

    useEffect(() => {
        handleGet()
    }, [])



    const handleCategoryEdit = (row) => {
        dispatch(SetSeoObj(row));
    };


    const handleGet = () => {
        dispatch(SeoGet());
    };

    const handleCategoryDelete = (row) => {
        dispatch(SeoDelete(row._id))
    }


    useEffect(() => {
        console.log(seoArr, "hsuidfsaiufagsdifgifuayfiutfgitiu")

        setSeoMainArr(seoArr)
        setDisplaySeoArr(seoArr)

    }, [seoArr])

    const category_columns = [
        {
            name: "ID",
            selector: (row, index) => index + 1,
            sortable: true,
            width:"5%"
        },
        {
            name: "Name",
            selector: (row) => row.name,
            width:"15%"
        },
        {
            name: "Url",
            selector: (row) => row.url,
        },
        // {
        //     name: "Description",
        //     cell: (row) => <div dangerouslySetInnerHTML={{
        //         __html: row.description ? row.description : "",
        //     }}></div>,
        // },
    
        {
            name: "Status",
            minWidth: "210px",
            maxWidth: "211px",
            button: true,
            cell: (row) => <CustomButton greenBtn noIcon btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} path={"/Seo/View-Seo"} />,
        },
        {
            name: "Action",
            minWidth: "210px",
            maxWidth: "211px",
            cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Seo/View-Seo" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Seo/View-Seo" />,
        },
    ];

    // ==============================================================================================================

    const handleFilterByQuery = (e, requiredParametersArr) => {
        let tempArr = displaySeoArr.filter(el => {
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
        setSeoMainArr([...tempArr])
        console.log([...tempArr], "...tempArr")
    }


    return (
        <main>

            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="blue-1 m-0">{seoObj && seoObj.name ? "Edit Seo" : "Add Seo"}</h5>
                                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
                            </div>
                            <DashboardBox>
                                <AddSeo />
                            </DashboardBox>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">Seo List</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                                    <SearchBox setQuery={(e) => { handleFilterByQuery(e, ["name"]); }} query={query} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={seoMainArr && seoMainArr.length > 0 ? seoMainArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ViewSeo;
