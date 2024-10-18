import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getAllOrders } from "../../../services/order.service";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { DashboardTable } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";

function CancleOrder({ name }) {
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    try {
      const { data: res } = await getAllOrders();
      if (res) {
        setOrders(res.data.filter((el) => el.status == "CANCELLED"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const PendingOrder_columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => new Date(row?.createdAt).toDateString(),
    },
    {
      name: "Order ID",
      selector: (row) => row?._id,
    },
    {
      name: "Phone",
      selector: (row) => row?.addressObj?.phone,
    },
    {
      name: "Total Product QTY",
      selector: (row) => row?.items?.reduce((acc, el) => acc + el.quantity, 0),
    },
    {
      name: "Total Amount",
      selector: (row) => row.totalAmount,
    },
    {
      name: "Order Status",
      button: true,
      width: "10%",
      cell: (row) => <CustomButton redBtn={row?.status == "CANCELLED"} greenBtn={row?.status != "CANCELLED"} btnName={row?.status} />,
    },
    {
      name: "Is Paid",
      button: true,
      width: "10%",
      cell: (row) => <CustomButton redBtn={row?.paymentObj?.paymentChk != 1} greenBtn={row?.paymentObj?.paymentChk == 1} btnName={row?.paymentObj?.paymentChk == 1 ? "PAID" : "PENDING"} />,
    },
    // {
    //   name: "Action",
    //   cell: (row) => <ActionIcon approve detail detailpath="/Order/Sale-Detail" Uniquekey={row.id} />,
    // },
  ];

  return (
    <DashboardTable className="mt-4">
      <div className="d-flex gap-3 justify-content-between mb-4">
        <h5 className="blue-1 m-0">{name}</h5>
        <SearchBox extraClass="bg-white" />
      </div>
      <DataTable columns={PendingOrder_columns} data={orders} pagination noDataComponent="No data available in table" />
    </DashboardTable>
  );
}

export default CancleOrder;
