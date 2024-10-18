import React from "react";
import CustomButton from "../Utility/Button";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import DataTable from "react-data-table-component";
import SearchBox from "../Utility/SearchBox";
import ActionIcon from "../Utility/ActionIcon";

function RefundProcess() {
  const process_columns = [
    {
      name: "ID",
      selector: (row) => row.sl,
      sortable: true,
      width: "10%",
    },
    {
      name: "PROCESS",
      selector: (row) => row.process,
      width: "25%",
    },
    {
      name: "DESCRIPTION",
      cell: (row) => row.desp,
      width: "45%",
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon edit remove Uniquekey={row.id} />,
      width: "20%",
    },
  ];

  const process_data = [
    {
      id: "1",
      sl: "1",
      process: "Start",
      desp: "The refund process has been started.",
    },
    {
      id: "2",
      sl: "2",
      process: "Processing",
      desp: "The refund is processing.",
    },
    {
      id: "3",
      sl: "3",
      process: "Complete",
      desp: "The refund is completed.",
    },
  ];
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <h5 className="blue-1 mb-4">Add Refund Process</h5>
              <DashboardBox>
                <form action="#" className="form row">
                  <div className="col-12 mb-3">
                    <label className="blue-1 fs-12">
                      PROCESS <span className="red">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-12 mb-3">
                    <label className="blue-1 fs-12">
                      DESCRIPTION<span className="red">*</span>
                    </label>
                    <textarea className="form-control" rows="5"></textarea>
                  </div>
                  <div className="col-12 text-center">
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="Save"
                      extraClass="rounded-pill"
                    />
                  </div>
                </form>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex gap-3 justify-content-between">
                <h5 className="blue-1 mb-4">Delivery Process</h5>
                <SearchBox extraClass="bg-white" />
              </div>
              <DashboardTable>
                <DataTable
                  columns={process_columns}
                  data={process_data}
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

export default RefundProcess;
