import React from "react";
import DataTable from "react-data-table-component";
import { DashboardTable } from "../../Utility/DashboardBox";

function WalletRechargeHistory() {
  const visitor_columns = [
    {
      name: "SL	",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "USER",
      selector: (row) => row.user,
    },
    {
      name: "EMAIL	",
      selector: (row) => row.email,
    },
    {
      name: "TYPE	",
      selector: (row) => row.type,
    },
    {
      name: "AMOUNT	",
      selector: (row) => row.amount,
    },
    {
      name: "PAYMENT DETAILS	",
      selector: (row) => row.payment,
    },
    {
      name: "TRX ID	",
      selector: (row) => row.tax,
    },
    {
      name: "DATE	",
      selector: (row) => row.date,
    },
  ];

  const visitor_data = [
    {
      id: "1",
      Seq: "1",
      user: "XYZ",
      email: "gnbg@gmail.com",
      type: "yjyuj",
      amount: "878",
      payment: "789",
      tax: "877",
      date: "22 july 2022",
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <h5 className="blue-1 mb-4">Wallet recharge history</h5>
              <DashboardTable>
                <DataTable
                  columns={visitor_columns}
                  data={visitor_data}
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

export default WalletRechargeHistory;
