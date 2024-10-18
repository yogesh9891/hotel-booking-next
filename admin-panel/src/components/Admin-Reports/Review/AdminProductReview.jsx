import React from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../../Utility/Button";
import { downloadCSV } from "../../Utility/CSV";
import SearchBox from "../../Utility/SearchBox";
import { DashboardTable } from "../../Utility/DashboardBox";

function AdminProductReview() {
  const review_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "PRODUCT",
      selector: (row) => row.product,
    },
    {
      name: "RATING",
      selector: (row) => row.rating,
    },
    {
      name: "NUMBER OF REVIEW",
      selector: (row) => row.number,
    },
  ];

  const review_data = [
    {
      id: "1",
      Seq: "1",
      product: "Nails",
      rating: "0",
      number: "5",
    },
    {
      id: "2",
      Seq: "2",
      product: "Eyes",
      rating: "0",
      number: "5",
    },
    {
      id: "3",
      Seq: "3",
      product: "Face",
      rating: "0",
      number: "5",
    },
    {
      id: "4",
      Seq: "4",
      product: "Lips",
      rating: "0",
      number: "5",
    },
    {
      id: "5",
      Seq: "5",
      product: "Nail polish",
      rating: "0",
      number: "5",
    },
    {
      id: "6",
      Seq: "6",
      product: "Perfect Finish box(Nail P...",
      rating: "0",
      number: "5",
    },
    {
      id: "7",
      Seq: "7",
      product: "Foundation",
      rating: "0",
      number: "5",
    },
    {
      id: "8",
      Seq: "8",
      product: "LIQUID SINDOOR",
      rating: "0",
      number: "5",
    },
    {
      id: "9",
      Seq: "9",
      product: "BEAUTY POP BOX LIP COLOR",
      rating: "0",
      number: "5",
    },
    {
      id: "10",
      Seq: "10",
      product: "LIPSTIC A & B",
      rating: "0",
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
                <h5 className="blue-1 m-0">Product Review</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton
                    isLink
                    iconName="fa-solid fa-download"
                    btnName="Product Review CSV"
                    path="/"
                    small
                    roundedPill
                    downloadAble
                    ClickEvent={() => downloadCSV(review_data)}
                  />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable
                  columns={review_columns}
                  data={review_data}
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

export default AdminProductReview;
