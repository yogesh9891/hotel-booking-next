import React, { useState } from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../../Utility/Button";
import Select from "react-select";

import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import { downloadCSV } from "../../Utility/CSV";
import SearchBox from "../../Utility/SearchBox";

function Wishlist() {
  const product_columns = [
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
      name: "NUMBER OF USER",
      selector: (row) => row.user,
    },
  ];

  const product_data = [
    {
      id: "1",
      Seq: "1",
      product: "EYELINER SUPER BLACK",
      user: "7",
    },
  ];
  const user_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      selector: (row) => row.user,
      name: "USER",
    },
    {
      name: "NUMBER OF WISHLIST PRODUCT",
      selector: (row) => row.product,
    },
  ];

  const user_data = [
    {
      id: "1",
      Seq: "1",
      product: "4",
      user: "Rahul",
    },
  ];

  const options = [
    { value: "product", label: "Product" },
    { value: "user", label: "User" },
  ];

  const [Value, setValue] = useState("");

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <h5 className="blue-1 mb-4">
                Filter selection criteria For Wishlist
              </h5>
              <DashboardBox className="mb-4">
                <form action="#" className="form row">
                  <div className="col-12">
                    <label>TYPE</label>
                    <Select
                      options={options}
                      defaultInputValue={Value}
                      onChange={(e) => setValue(e.value)}
                    />
                  </div>
                  <div className="col-12 text-center mt-2">
                    <CustomButton
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="Search"
                    />
                  </div>
                </form>
              </DashboardBox>
              <div>
                {Value === "product" && (
                  <>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h5 className="blue-1 m-0 text-capitalize">
                        Wishlist ({Value})
                      </h5>
                      <div className="d-flex align-items-center gap-3">
                        <CustomButton
                          isLink
                          iconName="fa-solid fa-download"
                          btnName="Product CSV"
                          path="/"
                          small
                          roundedPill
                          downloadAble
                          ClickEvent={() => downloadCSV(product_data)}
                        />
                        <SearchBox extraClass="bg-white" />
                      </div>
                    </div>
                    <DashboardTable>
                      <DataTable
                        columns={product_columns}
                        data={product_data}
                        pagination
                      />
                    </DashboardTable>
                  </>
                )}
                {Value === "user" && (
                  <>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <h5 className="blue-1 m-0 text-capitalize">
                        Wishlist ({Value})
                      </h5>
                      <div className="d-flex align-items-center gap-3">
                        <CustomButton
                          isLink
                          iconName="fa-solid fa-download"
                          btnName="User CSV"
                          path="/"
                          small
                          roundedPill
                          downloadAble
                          ClickEvent={() => downloadCSV(user_data)}
                        />
                        <SearchBox extraClass="bg-white" />
                      </div>
                    </div>
                    <DashboardTable>
                      <DataTable
                        columns={user_columns}
                        data={user_data}
                        pagination
                      />
                    </DashboardTable>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Wishlist;
