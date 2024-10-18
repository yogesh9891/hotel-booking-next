import React, { useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { downloadCSV } from "../Utility/CSV";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import tabClick from "../Utility/TabClick";

function RefundRequest() {
  const refund_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.date,
    },
    {
      name: "ORDER ID",
      selector: (row) => row.order,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
    {
      name: "TOTAL AMOUNT",
      selector: (row) => row.amount,
    },
    {
      name: "REQUEST STATUS",
      cell: (row) => <CustomButton redBtn btnName="Pending" />,
    },
    {
      name: "IS REFUNDED",
      selector: (row) => row.refund,
    },
    {
      name: "ACTION",
      selector: (row) => <ActionIcon approve decline />,
    },
  ];
  const comfirmed_refund_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.date,
    },
    {
      name: "ORDER ID",
      selector: (row) => row.order,
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
    },
    {
      name: "TOTAL AMOUNT",
      selector: (row) => row.amount,
    },
    {
      name: "REQUEST STATUS",
      cell: (row) => <CustomButton greenBtn btnName="Comfirmed" />,
    },
    {
      name: "IS REFUNDED",
      selector: (row) => row.refund,
    },
    {
      name: "ACTION",
      selector: (row) => <ActionIcon remove />,
    },
  ];

  const refund_data = [
    {
      id: "1",
      Seq: "1",
      date: "22 june 2022",
      order: "5",
      email: "df@gmail.com",
      amount: "₹666",
      refund: "No",
    },
  ];
  const comfirmed_refund_data = [
    {
      id: "1",
      Seq: "1",
      date: "22 june 2022",
      order: "5",
      email: "df@gmail.com",
      amount: "₹666",
      refund: "Yes",
    },
  ];

  const [tabList, settabList] = useState([
    {
      tabName: "PENDING",
      active: true,
    },
    {
      tabName: "COMFIRMED",
      active: false,
    },
  ]);

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <ul
                className="nav nav-pills dashboard-pills mb-3 justify-content-end"
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
              {tabList.map((item) => {
                if (item.active) {
                  if (item.tabName === "PENDING") {
                    return (
                      <DashboardTable>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                          <h5 className="blue-1 m-0">
                            Pending Refund Requests
                          </h5>
                          <div className="d-flex align-items-center gap-3">
                            <CustomButton
                              isLink
                              iconName="fa-solid fa-download"
                              btnName="Refund CSV"
                              path="/"
                              small
                              roundedPill
                              downloadAble
                              ClickEvent={() => downloadCSV(refund_data)}
                            />
                            <SearchBox extraClass="bg-white" />
                          </div>
                        </div>
                        <DataTable
                          columns={refund_columns}
                          data={refund_data}
                          pagination
                        />
                      </DashboardTable>
                    );
                  }
                  if (item.tabName === "COMFIRMED") {
                    return (
                      <DashboardTable>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                          <h5 className="blue-1 m-0">
                            Confirmed Refund Requests
                          </h5>
                          <div className="d-flex align-items-center gap-3">
                            <CustomButton
                              isLink
                              iconName="fa-solid fa-download"
                              btnName="Refund CSV"
                              path="/"
                              small
                              roundedPill
                              downloadAble
                              ClickEvent={() => downloadCSV(comfirmed_refund_data)}
                            />
                            <SearchBox extraClass="bg-white" />
                          </div>
                        </div>
                        <DataTable
                          columns={comfirmed_refund_columns}
                          data={comfirmed_refund_data}
                          pagination
                        />
                      </DashboardTable>
                    );
                  }
                }
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default RefundRequest;
