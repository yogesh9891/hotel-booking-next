import React from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../../Utility/Button";
import { downloadCSV } from "../../Utility/CSV";
import SearchBox from "../../Utility/SearchBox";
import { DashboardTable } from "../../Utility/DashboardBox";

function TopCustomer() {
  const customer_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.name,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
    {
      name: "PHONE",
      selector: (row) => row.phone,
    },
    {
      name: "TOTAL SPEND",
      selector: (row) => row.total,
    },
    {
      name: "JOINED AT",
      selector: (row) => row.joining,
    },
  ];

  const customer_data = [
    {
      id: "1",
      Seq: "1",
      name: "xyz",
      email: "hnnb0@gmail.com",
      phone: "5665565656",
      total: "565",
      joining: "4th Aug, 2022",
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Top Customers</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-download"
                    btnName="Customer CSV"
                    path="/"
                    small
                    roundedPill
                    downloadAble
                    ClickEvent={() => downloadCSV(customer_data)}
                  />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  columns={customer_columns}
                  data={customer_data}
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

export default TopCustomer;
