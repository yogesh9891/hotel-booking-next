import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../../Utility/ActionIcon";
import { images } from "../../Images/Images";
import CustomButton from "../../Utility/Button";
import { DashboardTable } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import { BANNERGet, SetBANNERObj } from "../../../redux/actions/Banner/Banner.actions";
import { generateFilePath } from "../../Utility/utils";
import { getLogo } from "../../../services/logo.service";
import { toastError } from "../../Utility/ToastUtils";

function Logo() {
  const dispatch = useDispatch();

  // const bannerArr = useSelector((state) => state.banner.banners);
  const [logoArr, setLogoArr] = useState([]);

  const handleGet = async (e) => {
    try {
      let { data: res } = await getLogo()
      if (res.data) {
        setLogoArr(res.data)
        // toastSuccess(res.message)
      }
      // if (isUpdateBanner) {
      // dispatch(BANNERUpdate(obj, selectedBannerId));
      // } else {
      // dispatch(BANNERAdd(obj));
      // }
    }
    catch (err) {
      toastError(err)
    }
  };

  useEffect(() => {
    handleGet()
  }, []);

  const handleEdit = (row) => {
    dispatch(SetBANNERObj(row));
  };
  const brand_columns = [
    {
      name: "Image",
      grow: 0,
      width: "20%",
      cell: (row) => <img height="84px" width="56px" alt={row.name} src={generateFilePath(row.logoUrl)} />,
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Logo</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD NEW LOGO" path="/Logo/Logo-Create" small roundedPill />
                  {/* <SearchBox extraClass="bg-white" /> */}
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={brand_columns} data={logoArr && logoArr.length > 0 ? logoArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Logo;
