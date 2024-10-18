import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";

import { useDispatch, useSelector } from "react-redux";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import { AddModal } from "../Utility/Modal";
import AddGallery from "./AddGallery";
import { SETGALLERYOBJ, GALLERYDELETE, GALLERYGET } from "../../redux/actions/Gallery/Gallery.actions";

function ViewGallery() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const [ModalType, setModalType] = useState("");
    const [ModalName, setModalName] = useState("");
    const [ModalBox, setModalBox] = useState(false);
    const galleryArr = useSelector((state) => state.gallery.gallerys);
    const galleryObj = useSelector((state) => state.gallery.galleryObj);
    const [ModalData, setModalData] = useState({});
    const [displayGalleryArr, setDisplayGalleryArr] = useState([]);
    const [query, setQuery] = useState("");
    const handleCategoryEdit = (row) => {
        dispatch(SETGALLERYOBJ(row));
    };

    const [galleryMainArr, setGalleryMainArr] = useState([]);

    const handleGet = () => {
        dispatch(GALLERYGET());
    };

    const handleCategoryDelete = (row) => {
        let confirm =window.confirm("Do you really want to delete this item?")
        if (confirm) {
            dispatch(GALLERYDELETE(row._id))
        }
    
    }

    useEffect(() => {
        handleGet()
    }, [])

    useEffect(() => {
            console.log(galleryMainArr,"galleryMainArrgalleryMainArrgalleryMainArr")
            setGalleryMainArr(galleryArr)
            setDisplayGalleryArr(galleryArr)
    }, [galleryArr])

    const category_columns = [
        {
            name: "ID",
            selector: (row, index) => index + 1,
            sortable: true,
        },
        {
            name: "Title",
            selector: (row) => row?.name,
        },
        // {
        //     name: "Comment",
        //     maxWidth: "211px",
        //     ceil: (row) => <p>{row?.comment}</p>,
        // },
      
        {
            name: "Status",
            minWidth: "210px",
            maxWidth: "211px",
            button: true,
            cell: (row) => <CustomButton greenBtn noIcon btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} path={"/Gallery/View-Gallery"} />,
        },
        {
            name: "Action",
            minWidth: "210px",
            maxWidth: "211px",
            cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Gallery/View-Gallery" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Gallery/View-Gallery" />,
        },
    ];

    // ==============================================================================================================

    const handleFilterByQuery = (e, requiredParametersArr) => {
        let tempArr = displayGalleryArr.filter(el => {
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
        setGalleryMainArr([...tempArr])
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
                                <h5 className="blue-1 m-0">{galleryObj && galleryObj.name ? "Edit " : "Add "} Gallery</h5>
                                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
                            </div>
                            <DashboardBox>
                                <AddGallery />
                            </DashboardBox>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">Gallery List</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                                    <SearchBox setQuery={(e) => { handleFilterByQuery(e, ["name"]); }} query={query} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={galleryMainArr && galleryMainArr.length > 0 ? galleryMainArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ViewGallery;
