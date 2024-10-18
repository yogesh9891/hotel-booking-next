import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getProductReview, getSellerReview, upadteReviewStatus } from "../../services/SellerReview.service";
import { getreviewSetingByUserId } from "../../services/ReviewSettings.service";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import tabClick from "../Utility/TabClick";
import { toastError } from "../Utility/ToastUtils";

function SellerReview(e) {
    const [productReviewArr, setProductReviewArr] = useState([]);
    const review_columns = [
        {
            name: "Product",
            selector: (row) => row.rating,
            width: "10%",
        },
        {
            name: "Rating",
            selector: (row) => row.rating,
            width: "10%",
        },
        {
            name: "Customer Feedback",
            cell: (row) => row.message,
            width: "40%",
        },
        {
            name: "Status",
            button: true,
            cell: (row) => (
                <CustomButton
                    isBtn
                    btnName={row.status}
                    btntype="button"
                    changeClass={row.class}
                    noIconMargin
                    noIcon
                />
            ),
            width: "15%",
        },
        {
            name: "Customer & Time",
            selector: (row) => `${row.userObj.name} ${new Date(row.createdAt).toDateString()}`,
            width: "25%",
        },
        {
            name: "Approve",
            cell: (row) => <ActionIcon approve decline isRedirected={true} onRejectClick={() => handleRejectProductReview(row._id)} approvePath={"/Review/Product-Review"} rejectPath={"/Review/Product-Review"} onApproveClick={() => handleApproveProductReview(row._id)} Uniquekey={row._id} />,
            width: "10%",
        },
    ];


    const [tabList, settabList] = useState([
        {
            tabName: "All Review",
            active: true,
        },
        {
            tabName: "Approve",
            active: false,
        },
        {
            tabName: "Pending",
            active: false,
        },
        {
            tabName: "Rejected",
            active: false,
        },
    ]);

    const handleGetProductReview = async () => {
        try {
            let { data: res } = await getSellerReview()
            if (res.data) {
                setProductReviewArr(res.data)
            }
            console.log(res, "response")
        }
        catch (err) {
            toastError(err);
        }
    }

    const handleApproveProductReview = async (id) => {
        try {
            let obj = {
                status: "APPROVED"
            }
            let { data: res } = await upadteReviewStatus(id, obj)
            if (res.message) {
                handleGetProductReview()
            }
            console.log(res, "response")
        }
        catch (err) {
            toastError(err);
        }
    }

    const handleRejectProductReview = async (id) => {
        try {
            let obj = {
                status: "REJECTED"
            }
            let { data: res } = await upadteReviewStatus(id, obj)
            if (res.message) {
                handleGetProductReview()
            }
            console.log(res, "response")
        }
        catch (err) {
            toastError(err);
        }
    }




    const handleGetTselectedTable = () => {
        if (tabList.filter((el) => el.active)[0].tabName == "All Review") {
            return <DataTable columns={review_columns} data={productReviewArr} pagination />;
        } else if (tabList.filter((el) => el.active)[0].tabName == "Approve") {
            return <DataTable columns={review_columns} data={productReviewArr.filter(el => `${el.status}`.toLowerCase() == "approved")} pagination />;
        } else if (tabList.filter((el) => el.active)[0].tabName == "Pending") {
            return <DataTable columns={review_columns} data={productReviewArr.filter(el => `${el.status}`.toLowerCase() == "pending")} pagination />;
        } else {
            return <DataTable columns={review_columns} data={productReviewArr.filter(el => `${el.status}`.toLowerCase() == "rejected")} pagination />;
        }
    };



    useEffect(() => {
        handleGetProductReview()
    }, [])



    return (
        <main>
            <section className="product-category">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex align-items-center justify-content-between mb-3">
                                <h5 className="blue-1 m-0">All Company Review List</h5>
                                <div className="d-flex align-items-center gap-3">
                                    <ul
                                        className="nav nav-pills dashboard-pills justify-content-end"
                                        id="pills-tab"
                                        role="tablist"
                                    >
                                        {tabList.map((item, i) => {
                                            return (
                                                <li key={i}>
                                                    <CustomButton
                                                        navPills
                                                        btnName={item.tabName}
                                                        pillActive={item.active ? true : false}
                                                        ClickEvent={() => {
                                                            tabClick(i, tabList, settabList);
                                                        }}
                                                    />
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <SearchBox extraClass='bg-white' />
                                </div>
                            </div>
                            <DashboardTable>
                                {handleGetTselectedTable()}
                                {/* <DataTable
                  columns={review_columns}
                  data={productReviewArr}
                  pagination
                /> */}
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default SellerReview;
