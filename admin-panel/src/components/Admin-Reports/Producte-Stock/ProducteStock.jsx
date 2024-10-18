import React from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../../Utility/Button";
import Select from "react-select";

import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";

function ProducteStock() {
  const product_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "NAME",
      selector: (row) => row.name,
    },
    {
      name: "TYPE",
      selector: (row) => row.type,
    },
    {
      name: "BRAND",
      selector: (row) => row.brand,
    },
  ];

  const product_data = [
    {
      id: "1",
      Seq: "1",
      name: "	EYELINER SUPER BLACK",
      type: "Physical Product",
      brand: "Glam Fam",
    },
  ];

  const options = [
    { value: "product-list", label: "All Product list" },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <h5 className="blue-1 mb-4">
              Filter selection criteria For Product stock

              </h5>
              <DashboardBox className='mb-4'>
                <form action="#" className="form row">
                  <div className="col-12">
                    <label>TYPE</label>
                    <Select options={options} />
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
              <DashboardTable>
                <DataTable
                  columns={product_columns}
                  data={product_data}
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

export default ProducteStock;
