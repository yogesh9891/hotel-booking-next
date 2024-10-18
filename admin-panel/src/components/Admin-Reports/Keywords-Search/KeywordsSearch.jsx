import React from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../../Utility/Button";
import { downloadCSV } from "../../Utility/CSV";
import SearchBox from "../../Utility/SearchBox";
import { DashboardTable } from "../../Utility/DashboardBox";

function KeywordsSearch() {
  const keyword_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "KEYWORDS",
      selector: (row) => row.Name,
    },
    {
      name: "NUMBER OF TIME",
      selector: (row) => row.number,
    },
  ];

  const keyword_data = [
    {
      id: "1",
      Seq: "1",
      Name: "Nails",
      number: "5",
    },
    {
      id: "2",
      Seq: "2",
      Name: "Eyes",
      number: "5",
    },
    {
      id: "3",
      Seq: "3",
      Name: "Face",
      number: "5",
    },
    {
      id: "4",
      Seq: "4",
      Name: "Lips",
      number: "5",
    },
    {
      id: "5",
      Seq: "5",
      Name: "Nail polish",
      number: "5",
    },
    {
      id: "6",
      Seq: "6",
      Name: "Perfect Finish box(Nail P...",
      number: "5",
    },
    {
      id: "7",
      Seq: "7",
      Name: "Foundation",
      number: "5",
    },
    {
      id: "8",
      Seq: "8",
      Name: "LIQUID SINDOOR",
      number: "5",
    },
    {
      id: "9",
      Seq: "9",
      Name: "BEAUTY POP BOX LIP COLOR",
      number: "5",
    },
    {
      id: "10",
      Seq: "10",
      Name: "LIPSTIC A & B",
      number: "5",
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Keyword search report</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-download"
                    btnName="Keyword CSV"
                    path="/"
                    small
                    roundedPill
                    downloadAble
                    ClickEvent={() => downloadCSV(keyword_data)}
                  />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  columns={keyword_columns}
                  data={keyword_data}
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

export default KeywordsSearch;
