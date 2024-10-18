import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { deleteContact, getContacts } from "../../services/Contact.service";
import ActionIcon from "../Utility/ActionIcon";
import { DashboardTable } from "../Utility/DashboardBox";
import { toastError, toastSuccess } from "../Utility/ToastUtils";
import { Modal, Box } from "@mui/material";
import CustomButton from "../Utility/Button";
import { deleteProperty, getPropertys } from "../../services/Property.service";
import { Link } from "react-router-dom";

function Property() {
  // ======================================================================================

  const [contactList, setContactList] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [contactObj, setcontactObj] = useState(false);

  const handleGet = async () => {
    try {
      let { data: res } = await getPropertys();
      if (res.data) {
        setContactList(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };

  const handleSingleContact = (row) => {
    setcontactObj(row);
    setshowModal(true);
  };

  const handleDeleteContact = async (id) => {
    try {
      let { data: res } = await deleteProperty(id);
      if (res.message) {
        toastSuccess("Property Deleted Sucessfully");
      }
      handleGet();
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    handleGet();
  }, []);

  const handleCategoryDelete = (row) => {
    handleDeleteContact(row._id);
  };
  const mail_columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "10%",
    },
    {
      name: "Property Name",
      selector: (row) => row.name,
      width: "20%",
    },
    {
      name: "Name",
      selector: (row) => row.fname,
      width: "20%",
    },
    {
      name: "Location",
      cell: (row) => row.propertyState,
      width: "15%",
    },
    {
      name: "Date",
      cell: (row) => new Date(row.createdAt).toDateString(),
      width: "15%",
    },
    // {
    //   name: "Subject",
    //   cell: (row) => row.fname + ' '+ row.lname,
    //   width:'15%'
    // },
    {
      name: "Action",
      minWidth: "210px",
      maxWidth: "211px",
      cell: (row) => (
        <>
          <Link
            to={`/Property-Info/${row._id}`}
            className="btn btn-1 bg-black text-white me-2"
          >
            Details
          </Link>
          <ActionIcon
            Uniquekey={row._id}
            remove
            deletePath="/Property"
            onDeleteClick={() => handleCategoryDelete(row)}
            isRedirected={true}
          />
          ,
        </>
      ),
    },
  ];

  const mail_data = [
    {
      id: "1",
      Seq: "1",
      Name: "Rahul",
      email: "rahul@gmail.com",
      msg: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
    },
    {
      id: "2",
      Seq: "2",
      Name: "Rahul",
      email: "rahul@gmail.com",
      msg: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
    },
    {
      id: "3",
      Seq: "3",
      Name: "Rahul",
      email: "rahul@gmail.com",
      msg: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
    },
    {
      id: "4",
      Seq: "4",
      Name: "Rahul",
      email: "rahul@gmail.com",
      msg: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
    },
    {
      id: "5",
      Seq: "5",
      Name: "Rahul",
      email: "rahul@gmail.com",
      msg: "Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum Lorem Ispum",
    },
  ];
  // ======================================================================================

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <h5 className="blue-1 mb-4">Property Enquiry List</h5>
          <DashboardTable>
            <DataTable columns={mail_columns} data={contactList} pagination />
          </DashboardTable>

          <Modal
            open={showModal}
            onClose={() => setshowModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="modal-box">
              <div className="modal-container" style={{ width: "600px" }}>
                <div className="modal-header">
                  <h5>Query</h5>
                  <CustomButton
                    isBtn
                    btntype="button"
                    iconName="ion-close-circled text-white"
                    changeClass="border-0 bg-transparent rounded-circle modal-close"
                    ClickEvent={(e) => {
                      e.preventDefault();
                      setshowModal(false);
                    }}
                  />
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-12">
                      <p>
                        <b>Name</b> :{contactObj?.name}
                      </p>
                      <p>
                        <b>Email</b> {contactObj?.email}
                      </p>
                      <p>
                        <b>Phone</b> : {contactObj?.phone}
                      </p>
                      <p>
                        <b>Title</b> : {contactObj?.title}
                      </p>
                      <p>
                        <b>Message</b>
                      </p>
                      <p>{contactObj?.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </section>
    </main>
  );
}

export default Property;
