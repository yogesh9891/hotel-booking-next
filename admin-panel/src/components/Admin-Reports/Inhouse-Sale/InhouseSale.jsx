import React from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../../Utility/Button";
import Select from "react-select";

import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";

function InhouseSale() {
  const inhouse_columns = [
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

  const inhouse_data = [
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

  const options = [
    { value: "Pending", label: "Pending" },
    { value: "Complete", label: "Complete" },
    { value: "Confirmed", label: "Confirmed" },
    { value: "Cancelled", label: "Cancelled" },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <h5 className="blue-1 mb-4">
                Filter selection criteria For Inhouse product sale
              </h5>
              <DashboardBox className='mb-4'>
                <form action="#" className="form row">
                  <div className="col-12">
                    <label>SALE TYPE</label>
                    <Select options={options} />
                  </div>
                  <div className="col-12 text-center mt-2">
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="Save"
                    />
                  </div>
                </form>
              </DashboardBox>
              <DashboardTable>
                <DataTable
                  columns={inhouse_columns}
                  data={inhouse_data}
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

export default InhouseSale;
