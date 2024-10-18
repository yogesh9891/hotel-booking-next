import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";

import { useDispatch, useSelector } from "react-redux";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import { AddModal } from "../Utility/Modal";
import AddTestimonial from "./AddTestimonial";
import { SETTESTIMONIALOBJ, TESTIMONIALDELETE, TESTIMONIALGET } from "../../redux/actions/Tesimonial/Testimonial.actions";

function ViewTestimonial() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const [ModalType, setModalType] = useState("");
    const [ModalName, setModalName] = useState("");
    const [ModalBox, setModalBox] = useState(false);
    const testimonialArr = useSelector((state) => state.testimonial.testimonials);
    const testimonialObj = useSelector((state) => state.testimonial.testimonialObj);
    const [ModalData, setModalData] = useState({});
    const [displayTestimonialArr, setDisplayTestimonialArr] = useState([]);
    const [query, setQuery] = useState("");
    const handleCategoryEdit = (row) => {
        dispatch(SETTESTIMONIALOBJ(row));
    };

    const [testimonialMainArr, setTestimonialMainArr] = useState([]);

    const handleGet = () => {
        dispatch(TESTIMONIALGET());
    };

    const handleCategoryDelete = (row) => {
        let confirm =window.confirm("Do you really want to delete this item?")
        if (confirm) {
            dispatch(TESTIMONIALDELETE(row._id))
        }
    
    }

    useEffect(() => {
        handleGet()
    }, [])

    useEffect(() => {
        if (testimonialArr?.length) {
            console.log(testimonialMainArr,"testimonialMainArrtestimonialMainArrtestimonialMainArr")
            setTestimonialMainArr(testimonialArr)
            setDisplayTestimonialArr(testimonialArr)
        }
    }, [testimonialArr])

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
            cell: (row) => <CustomButton greenBtn noIcon btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} path={"/Testimonial/View-Testimonial"} />,
        },
        {
            name: "Action",
            minWidth: "210px",
            maxWidth: "211px",
            cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Testimonial/View-Testimonial" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Testimonial/View-Testimonial" />,
        },
    ];

    // ==============================================================================================================

    const handleFilterByQuery = (e, requiredParametersArr) => {
        let tempArr = displayTestimonialArr.filter(el => {
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
        setTestimonialMainArr([...tempArr])
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
                                <h5 className="blue-1 m-0">{testimonialObj && testimonialObj.name ? "Edit " : "Add "} Testimonial</h5>
                                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Product/Bulk-Category-Upload" roundedPill small /> */}
                            </div>
                            <DashboardBox>
                                <AddTestimonial />
                            </DashboardBox>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0">Testimonial List</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble /> */}
                                    <SearchBox setQuery={(e) => { handleFilterByQuery(e, ["name"]); }} query={query} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={testimonialMainArr && testimonialMainArr.length > 0 ? testimonialMainArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ViewTestimonial;
