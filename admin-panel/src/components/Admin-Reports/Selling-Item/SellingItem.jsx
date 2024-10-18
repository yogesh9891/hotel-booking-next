import React from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../../Utility/Button";
import { downloadCSV } from "../../Utility/CSV";
import { DashboardTable } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";

function SellingItem() {
  const selling_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "SELLER",
      selector: (row) => row.seller,
    },
    {
      name: "PRODUCT",
      selector: (row) => row.product,
    },
    {
      name: "TOTAL SALE",
      selector: (row) => row.total,
    },
    {
      name: "AVERAGE RATING",
      selector: (row) => row.rating,
    },
  ];

  const selling_data = [
    {
      id: "1",
      Seq: "1",
      seller: "	Super admin",
      product: "EYELINER SUPER BLACK",
      total: "0",
      rating: "0",
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Top selling item</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-download"
                    btnName="Product CSV"
                    path="/"
                    small
                    roundedPill
                    downloadAble
                    ClickEvent={() => downloadCSV(selling_data)}
                  />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  columns={selling_columns}
                  data={selling_data}
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

export default SellingItem;
