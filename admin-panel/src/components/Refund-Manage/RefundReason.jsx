import React from "react";
import SearchBox from "../Utility/SearchBox";
import DataTable from "react-data-table-component";
import { DashboardTable, DashboardBox } from "../Utility/DashboardBox";
import CustomButton from "../Utility/Button";
import ActionIcon from "../Utility/ActionIcon";

function RefundReason() {
  const reason_columns = [
    {
      name: "ID",
      selector: (row) => row.sl,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.name,
    },
    {
      name: "ACTION",
      cell: (row) => <ActionIcon edit remove Uniquekey={row.id} />,
    },
  ];

  const reason_data = [
    {
      id: "1",
      sl: "1",
      name: "Product mismatch",
    },
    {
      id: "2",
      sl: "2",
      name: "Product mismatch",
    },
    {
      id: "3",
      sl: "3",
      name: "Product mismatch",
    },
    {
      id: "4",
      sl: "4",
      name: "Product mismatch",
    },
    {
      id: "5",
      sl: "5",
      name: "Product mismatch",
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <h5 className="blue-1 mb-4">Add New Reason</h5>
              <DashboardBox>
                <form action="#" className="form row">
                  <div className="col-12 mb-3">
                    <label className="blue-1 fs-12">
                      REASON <span className="red">*</span>
                    </label>
                    <input type="text" className="form-control" />
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
                <h5 className="blue-1 mb-4">Reason List</h5>
                <SearchBox extraClass="bg-white" />
              </div>
              <DashboardTable>
                <DataTable
                  columns={reason_columns}
                  data={reason_data}
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

export default RefundReason;
