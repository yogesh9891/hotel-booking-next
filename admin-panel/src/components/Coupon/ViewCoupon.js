import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import SearchBox from "../Utility/SearchBox";

import { useDispatch, useSelector } from "react-redux";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import AddCoupon from "./AddCoupon";
import { toastError } from "../Utility/ToastUtils";
import { deleteDiscount, getDiscount } from "../../services/Coupon.service";
import { DisplayDate } from "../../utils/DateUtils";
import { discountStatus } from "../../utils/roles";
import CustomButton from "../Utility/Button";
export default function ViewCoupon() {
    // ==============================================================================================================
    const dispatch = useDispatch();
    const [selectedDiscountObj, setSelectedDiscountObj] = useState({});
    const [reloadCount, setReloadCount] = useState(0);
    const [discountArr, setDiscountArr] = useState([]);
    const [mainArr, setMainArr] = useState([]);
    const [query, setQuery] = useState("");
    const handleCategoryEdit = (row) => {
        setSelectedDiscountObj(row)
        // dispatch(SET_PRODUCT_CATEGORY_OBJ(row));
    };

    const handleDiscountDelete = async (row) => {
        try {
            let { data: res } = await deleteDiscount(row._id)
            if (res.message) {
                handleGetDiscounts()
            }
        }
        catch (err) {
            toastError(err)
        }
        // dispatch(PRODUCT_CATEGORYDelete(row._id));
    };



    const handleGetDiscounts = async (query) => {
        try {
            let { data: res } = await getDiscount(query)
            if (res.data) {
                console.log(res.data)
                setDiscountArr(res.data)
                setMainArr(res.data)
            }
        }
        catch (err) {
            toastError(err)
        }
    }


    useEffect(() => {
        handleGetDiscounts()
        // dispatch(PRODUCT_CATEGORYGet());
    }, [reloadCount])



    const category_columns = [
        {
            name: "Discount Code",
            selector: (row) => row?.discountCode,
        },

        {
            name: "Value",
            selector: (row) => `${row?.type == discountStatus.PERCENTAGE ? `${row?.value}%` : row?.value}`,

        },
        {
            name: "Valid for number of users",
            selector: (row) => row?.validFor,
        },
        // {
        //     name: "Used by",
        //     selector: (row) => row?.usedBy,
        // },
        {
            name: "Expires On",
            selector: (row) => DisplayDate(row.expiryDate, "dd/mm/yyyy"),
        },

        {
            name: "Action",
            minWidth: "210px",
            maxWidth: "211px",
            cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Coupon/View-Coupon" onDeleteClick={() => handleDiscountDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Coupon/View-Coupon" />,
        },
    ];



    const handleSearch = (queryValue) => {
        setQuery(queryValue)
        let tempArr = mainArr
        tempArr = tempArr.filter(el => `${el.discountCode}`.toLowerCase().includes(`${queryValue}`.toLowerCase()))
        setDiscountArr([...tempArr])
    }





    // ==============================================================================================================

    return (
        <main>
            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="blue-1 m-0">{selectedDiscountObj?.discountCode ? "Update" : "Add"} Discount Coupon </h5>
                            </div>
                            <DashboardBox>
                                <AddCoupon selectedDiscountObj={selectedDiscountObj} setSelectedDiscountObj={setSelectedDiscountObj} setReloadCount={setReloadCount} />
                            </DashboardBox>
                        </div>
                        <div className="col-12 col-md-8">
                            <div className="d-flex align-items-center justify-content-between mb-4">
                                <h5 className="blue-1 m-0"> Discount Coupon List</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    <CustomButton ClickEvent={() => handleGetDiscounts("active=true")} isLink noIcon={true} iconName="fa-solid fa-plus" btnName="View Active" path="/Coupon/View-Coupon" roundedPill small />
                                    <CustomButton ClickEvent={() => handleGetDiscounts("")} isLink noIcon={true} iconName="fa-solid fa-plus" btnName="View All" path="/Coupon/View-Coupon" roundedPill small />

                                    <SearchBox query={query} setQuery={e => handleSearch(e)} extraClass="bg-white" />
                                </div>
                            </div>
                            <DashboardTable>
                                <DataTable columns={category_columns} data={discountArr && discountArr.length > 0 ? discountArr : []} pagination />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}