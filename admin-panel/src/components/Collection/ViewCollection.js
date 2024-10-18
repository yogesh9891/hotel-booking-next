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
import AddCollection from "./AddCollection";
import { SetCollectionObj, CollectionDelete, CollectionGet } from "../../redux/actions/Collection/Collection.actions";
import { generateFilePath } from "../Utility/utils";
function ViewCollection() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const collectionArr = useSelector((collection) => collection.collection.collections);
    const collectionObj = useSelector((collection) => collection.collection.collectionObj);
    const [displayCollectionArr, setDisplayCollectionArr] = useState([]);
    const [query, setQuery] = useState("");
    const [collectionMainArr, setCollectionMainArr] = useState([]);

    useEffect(() => {
        handleGet()
    }, [])



    const handleCategoryEdit = (row) => {
        dispatch(SetCollectionObj(row));
    };


    const handleGet = () => {
        dispatch(CollectionGet());
    };

    const handleCategoryDelete = (row) => {
        dispatch(CollectionDelete(row._id))
    }


    useEffect(() => {
        console.log(collectionArr, "hsuidfsaiufagsdifgifuayfiutfgitiu")

        setCollectionMainArr(collectionArr)
        setDisplayCollectionArr(collectionArr)

    }, [collectionArr])

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
            cell: (row) => <CustomButton greenBtn noIcon btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} path={"/Collection/View-Collection"} />,
        },
        {
            name: "Action",
            minWidth: "210px",
            maxWidth: "211px",
            cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Collection/View-Collection" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Collection/View-Collection" />,
        },
    ];

    // ==============================================================================================================

    const handleFilterByQuery = (e, requiredParametersArr) => {
        let tempArr = displayCollectionArr.filter(el => {
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
        setCollectionMainArr([...tempArr])
        console.log([...tempArr], "...tempArr")
    }


    return (
        <main>

            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="blue-1 m-0">{collectionObj && collectionObj.name ? "Edit Collection" : "Add Collection"}</h5>
                                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
                            </div>
                            <DashboardBox>
                                <AddCollection />
                            </DashboardBox>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">Collection List</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                                    <SearchBox setQuery={(e) => { handleFilterByQuery(e, ["name"]); }} query={query} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={collectionMainArr && collectionMainArr.length > 0 ? collectionMainArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ViewCollection;
