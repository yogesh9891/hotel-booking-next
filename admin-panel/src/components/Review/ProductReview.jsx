import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  deleteReview,
  getReview,
  upadteReviewStatus,
} from "../../services/review.service";
import { getreviewSetingByUserId } from "../../services/ReviewSettings.service";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import tabClick from "../Utility/TabClick";
import { toastError, toastSuccess } from "../Utility/ToastUtils";

function ProductReview(e) {
  const [productReviewArr, setProductReviewArr] = useState([]);
  const handleStateEdit = (row) => {};
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure ? ")) {
      return 0;
    }

    try {
      let { data: res } = await deleteReview(id);
      if (res.msg) {
        toastSuccess(res.msg);
      }
    } catch (error) {
      toastError(error);
    }
  };

  const review_columns = [
    {
      name: "Rating",
      selector: (row) => row.rating,
      width: "10%",
    },
    {
      name: "Name",
      cell: (row) => row.title,
      width: "10%",
    },
    {
      name: "Hotel",
      selector: (row) => `${row?.hotelObj?.name}`,
      width: "25%",
    },
    {
      name: " Feedback",
      cell: (row) => row.message,
      width: "40%",
    },
    // {
    //   name: "Status",
    //   button: true,
    //   cell: (row) => (
    //     <CustomButton
    //       isBtn
    //       btnName={row.status}
    //       btntype="button"
    //       changeClass={row.class}
    //       noIconMargin
    //       noIcon
    //     />
    //   ),
    //   width: "15%",
    // },

    {
      name: "Action",
      minWidth: "210px",
      maxWidth: "211px",
      cell: (row) => (
        <ActionIcon
          Uniquekey={row._id}
          remove
          edit
          deletePath="/Review/Product-Review"
          onDeleteClick={() => handleDelete(row?._id)}
          isRedirected={true}
          onEditClick={() => handleStateEdit(row)}
          editPath={`/Review/Add-Review?id=${row._id}`}
        />
      ),
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

  const handlegetReview = async () => {
    try {
      let { data: res } = await getReview();
      if (res.data) {
        setProductReviewArr(res.data);
      }
      console.log(res, "response");
    } catch (err) {
      toastError(err);
    }
  };

  const handleApproveProductReview = async (id) => {
    try {
      let obj = {
        status: "APPROVED",
      };
      let { data: res } = await upadteReviewStatus(id, obj);
      if (res.message) {
        handlegetReview();
      }
      console.log(res, "response");
    } catch (err) {
      toastError(err);
    }
  };

  const handleRejectProductReview = async (id) => {
    try {
      let obj = {
        status: "REJECTED",
      };
      let { data: res } = await upadteReviewStatus(id, obj);
      if (res.message) {
        handlegetReview();
      }
      console.log(res, "response");
    } catch (err) {
      toastError(err);
    }
  };

  const handleGetTselectedTable = () => {
    if (tabList.filter((el) => el.active)[0].tabName == "All Review") {
      return (
        <DataTable
          columns={review_columns}
          data={productReviewArr}
          pagination
        />
      );
    } else if (tabList.filter((el) => el.active)[0].tabName == "Approve") {
      return (
        <DataTable
          columns={review_columns}
          data={productReviewArr.filter(
            (el) => `${el.status}`.toLowerCase() == "approved"
          )}
          pagination
        />
      );
    } else if (tabList.filter((el) => el.active)[0].tabName == "Pending") {
      return (
        <DataTable
          columns={review_columns}
          data={productReviewArr.filter(
            (el) => `${el.status}`.toLowerCase() == "pending"
          )}
          pagination
        />
      );
    } else {
      return (
        <DataTable
          columns={review_columns}
          data={productReviewArr.filter(
            (el) => `${el.status}`.toLowerCase() == "rejected"
          )}
          pagination
        />
      );
    }
  };

  useEffect(() => {
    handlegetReview();
  }, []);

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">All Product Review List</h5>

                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="Add Reivew"
                    path="/Review/Add-Review"
                  />
                  <SearchBox extraClass="bg-white" />
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

export default ProductReview;
