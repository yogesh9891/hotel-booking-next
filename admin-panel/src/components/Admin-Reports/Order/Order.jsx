import React, { useState } from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../../Utility/Button";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import Select from "react-select";
import { DateRangePicker } from "react-date-range";
import SearchBox from "../../Utility/SearchBox";
import { downloadCSV } from "../../Utility/CSV";

function Order() {
  const order_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Order ID",
      selector: (row) => row.order_id,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Product QTY",
      selector: (row) => row.product_quantity,
    },
    {
      name: "Total Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Order Status",
      button: true,
      width: "10%",
      cell: () => (
        <CustomButton
          greenBtn
          btnName="Confirmed"
          ClickEvent={(e) => e.preventDefault()}
        />
      ),
    },
    {
      name: "Is Paid",
      button: true,
      width: "10%",
      cell: () => (
        <CustomButton
          greenBtn
          btnName="Paid"
          ClickEvent={(e) => e.preventDefault()}
        />
      ),
    },
  ];
  const order_data = [
    {
      id: "1",
      Seq: "1",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
  ];
  const type = [
    { value: "All Orders", label: "All Orders" },
    { value: "Pending", label: "Pending" },
    { value: "Complete", label: "Complete" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Inhouse", label: "Inhouse" },
  ];

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const handleSelect = (ranges) => {
    console.log(ranges);
  };

  const [ProductType, setProductType] = useState('')

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <h5 className="blue-1 mb-4">
                Filter selection criteria For Order
              </h5>
              <DashboardBox className="mb-4 col-12 col-lg-6">
                <form action="#" className="form row">
                  <div className="col-12 mb-4">
                    <label>TYPE</label>
                    <Select options={type} defaultInputValue={ProductType} onChange={(e)=>setProductType(e.value)} />
                  </div>
                  <div className="col-12 mb-4">
                    <div>
                      <label>DATE</label>
                    </div>
                    <DateRangePicker
                      ranges={[selectionRange]}
                      onChange={handleSelect}
                    />
                  </div>
                  <div className="col-12">
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="Search"
                    />
                  </div>
                </form>
              </DashboardBox>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">{ProductType}</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-download"
                    btnName="Order CSV"
                    path="/"
                    small
                    roundedPill
                    downloadAble
                    ClickEvent={() => downloadCSV(order_data)}
                  />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  columns={order_columns}
                  data={order_data}
                  pagination
                />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Order;
