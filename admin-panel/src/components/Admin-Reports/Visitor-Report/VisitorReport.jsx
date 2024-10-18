import React from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../../Utility/Button";
import { downloadCSV } from "../../Utility/CSV";
import SearchBox from "../../Utility/SearchBox";
import { DashboardTable } from "../../Utility/DashboardBox";

function VisitorReport() {
  const visitor_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "IP",
      selector: (row) => row.ip,
    },
    {
      name: "AGENT",
      selector: (row) => row.agent,
    },
    {
      name: "DEVICE",
      selector: (row) => row.device,
    },
    {
      name: "LOCATION",
      selector: (row) => row.location,
    },
    {
      name: "DATE",
      selector: (row) => row.date,
    },
  ];

  const visitor_data = [
    {
      id: "1",
      Seq: "1",
      ip: "108.162.246.96",
      agent: "Chrome-66.0.3359-Blink-Windows 10",
      device: "Windows 10",
      location: "United States, Washington",
      date: "4th Aug, 2022",
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Visitor Report</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-download"
                    btnName="Visitor CSV"
                    path="/"
                    small
                    roundedPill
                    downloadAble
                    ClickEvent={() => downloadCSV(visitor_data)}
                  />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
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

export default VisitorReport;
