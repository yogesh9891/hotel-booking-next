import React from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../../Utility/Button";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import Select from "react-select";
import SearchBox from "../../Utility/SearchBox";
import { downloadCSV } from "../../Utility/CSV";

function Payment() {
  const Payment_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "USER",
      selector: (row) => row.user,
    },
    {
      name: "AMOUNT",
      selector: (row) => row.amount,
    },
    {
      name: "PAYMENT METHOD",
      selector: (row) => row.method,
    },
    {
      name: "PAYMENT DETAILS",
      selector: (row) => row.detail,
    },
    {
      name: "TRX ID",
      selector: (row) => row.trx,
    },
    {
      name: "DATE",
      selector: (row) => row.date,
    },
  ];
  const Payment_data = [
    {
      id: "1",
      Seq: "1",
      user: "Devesh Batra",
      amount: "467.9",
      method: "Cash On Delivery",
      detail: "",
      trx: "none",
      date: "17th Jun, 2022",
    },
  ];
  const Method = [
    { value: "Cash On Delivery", label: "Cash On Delivery" },
    { value: "Wallet", label: "Wallet" },
    { value: "PayPal", label: "PayPal" },
    { value: "Stripe", label: "Stripe" },
    { value: "PayStack", label: "PayStack" },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <h5 className="blue-1 mb-4">Select Payment Method</h5>
              <DashboardBox className="mb-4">
                <form action="#" className="form row">
                  <div className="col-12 mb-4">
                    <label>PAYMENT METHOD</label>
                    <Select options={Method} />
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
                <h5 className="blue-1 m-0">Payment</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-download"
                    btnName="Payment CSV"
                    path="/"
                    small
                    roundedPill
                    downloadAble
                    ClickEvent={() => downloadCSV(Payment_data)}
                  />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  columns={Payment_columns}
                  data={Payment_data}
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

export default Payment;
