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
import { getContactInfo } from "../../../services/contactInfo.service";
import { toastError } from "../../Utility/ToastUtils";

function ContactInfo() {
  const dispatch = useDispatch();

  const [contactInfoArr, setContactInfoArr] = useState([]);

  const handleGet = async (e) => {
    try {
      let { data: res } = await getContactInfo()
      if (res.data) {
        setContactInfoArr(res.data)
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
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Alternate Phone",
      selector: (row) => row.alternatePhone,
    },
    {
      name: "Facebook Link",
      selector: (row) => row.facebookLink,
    },
    {
      name: "Twitter Link",
      selector: (row) => row.twitterLink,
    },
    {
      name: "Instagram Link",
      selector: (row) => row.instagramLink,
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
                <h5 className="blue-1 m-0">Contact Info</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD CONTACT INFO" path="/Contact-Info/Contact-Info-Create" small roundedPill />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={brand_columns} data={contactInfoArr && contactInfoArr.length > 0 ? contactInfoArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactInfo;
