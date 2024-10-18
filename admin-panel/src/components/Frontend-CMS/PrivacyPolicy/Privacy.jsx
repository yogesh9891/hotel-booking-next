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
import { getPolicy } from "../../../services/policy.service";
import { toastError } from "../../Utility/ToastUtils";

function Privacy() {
  const dispatch = useDispatch();

  const [privacyArr, setPrivacyArr] = useState([]);
  const handleGet = async (e) => {
    try {
      let { data: res } = await getPolicy()
      if (res.data) {
        setPrivacyArr(res.data)
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
      name: "Policy",
      cell: (row, index) => <div dangerouslySetInnerHTML={{ __html: row.policies }}></div>,
      sortable: true,
      width: "100%",
    },

    // {
    //   name: "Action",
    //   width: "20%",
    //   cell: (row) => <ActionIcon isRedirected={true} onEditClick={() => handleEdit(row)} editPath="/Banners/Banner-Create" onDeleteClick={() => console.log("deleted")} deletePath="/Banners" remove edit Uniquekey={row.id} />,
    // },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Banner List</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD PRIVACY" path="/PrivacyPolicy/PrivacyPolicy-Create" small roundedPill />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={brand_columns} data={privacyArr && privacyArr.length > 0 ? privacyArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Privacy;
