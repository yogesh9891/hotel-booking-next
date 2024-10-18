import React from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { downloadCSV } from "../Utility/CSV";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";

function KYC() {
  const kyc_columns = [
    {
      name: "ID",
      selector: (row) => row.sl,
    },
    {
      name: "NAME",
      selector: (row) => row.name,
    },
    {
      name: "BANK NAME",
      selector: (row) => row.bank,
    },
    {
      name: "ACCOUNT NO.",
      selector: (row) => row.account,
    },
    {
      name: "IFSC CODE",
      selector: (row) => row.ifsc,
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon remove Uniquekey={row.id} />,
    },
  ];

  const kyc_data = [
    {
      id: "1",
      sl: "1",
      name: "Rahul",
      bank: "sbi",
      account: "12345667788766",
      ifsc: "sbidia234564",
    },
  ];
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="blue-1 m-0">Active Customer</h5>
            <div className="d-flex align-items-center gap-3">
              <SearchBox extraClass="bg-white" />
              <CustomButton
                isLink
                iconName="fa-solid fa-download"
                btnName="KYC CSV"
                path="/"
                downloadAble
                ClickEvent={() => downloadCSV(kyc_data)}
              />
              <CustomButton
                isLink
                iconName="fa-solid fa-plus"
                btnName="Add KYC"
                path="/Customer/KYC/Create"
              />
            </div>
          </div>
          <DashboardTable>
            <DataTable columns={kyc_columns} data={kyc_data} pagination />
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}

export default KYC;
