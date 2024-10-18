import React from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";
import { DashboardTable } from "../Utility/DashboardBox";

function NewsLetter() {
  const new_letter_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
      //   maxWidth: "500px",
    },
    {
      name: "TITLE",
      selector: (row) => row.title,
      //   maxWidth: "500px",
    },
    {
      name: "PUBLISH DATE",
      selector: (row) => row.date,
    },
    {
      name: "Status",
      button: true,
      width: "200px",
      cell: (row) => <Switch />,
    },
    {
      name: "CREATED BY",
      selector: (row) => row.createdBy,
    },
    {
      name: "MAIL TO",
      selector: (row) => row.mailTo,
    },
    {
      name: "Action",
      width: "200px",
      cell: (row) => <ActionIcon remove edit Uniquekey={row.id} />,
    },
  ];

  const new_letter_data = [
    {
      id: "1",
      Seq: "1",
      title: "xyz",
      date: "12 jun, 2022",
      createdBy:'asdf',
      mailTo:'abcd'
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">News Letter List</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-plus"
                    btnName="ADD NEW"
                    path="/Marketing/NewsLetter/Create"
                    small
                    roundedPill
                  />
                 <SearchBox extraClass='bg-white' />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  columns={new_letter_columns}
                  data={new_letter_data}
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

export default NewsLetter;
