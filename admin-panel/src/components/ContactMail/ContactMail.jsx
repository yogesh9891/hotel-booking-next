import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { deleteContact, getContacts } from "../../services/Contact.service";
import ActionIcon from "../Utility/ActionIcon";
import { DashboardTable } from "../Utility/DashboardBox";
import { toastError, toastSuccess } from "../Utility/ToastUtils";
import { Modal, Box } from "@mui/material";
import CustomButton from "../Utility/Button";
import { useLocation, useSearchParams } from "react-router-dom";

function ContactMail() {
  // ======================================================================================

  const [contactList, setContactList] = useState([]);
const [showModal, setshowModal] = useState(false);
const [contactObj, setcontactObj] = useState(false);
const [isBook, setIsBook] = useState(false);
const [searchParams, setSearchParams] = useSearchParams()
const location =useLocation();

const handleGet = async (isbook) => {
  try {
    let {data:res} = await getContacts(`isBook=${isbook}`);
      if(res.data ) {
        setContactList(res.data);
      }
  } catch (error) {
    toastError(error)
  }
}

const  handleSingleContact = (row) => {
  setcontactObj(row)
 setshowModal(true)
}

const handleDeleteContact = async (id) => {
  try {
    let {data:res} = await deleteContact(id);
    if(res.message){
      toastSuccess(res.message)
    }
    handleGet();
  } catch (error) {
    toastError(error)
  }
}


useEffect(() => {
 
let squery = searchParams.get("isBook");
let isbook = false
if(squery){
  console.log(squery,"isBookisBookisBook")
  setIsBook(true)
  isbook =true
}  else {
  setIsBook(false)
}
handleGet(isbook);
}, [location])




const handleCategoryDelete = (row) => {
  handleDeleteContact(row._id)
}
  const mail_columns = [
    {
      name: "SL",
      selector: (row,index) => (index+1),
      sortable: true,
      width:'10%'
    },
    {
      name: "NAME",
      selector: (row) => row.name,
      width:'20%'
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      width:'20%'
    },
    {
      name: "Phone",
      cell: (row) => row.phone,
      width:'15%'
    },
   
        {
      name: "Date",
      cell: (row) => new Date(row.createdAt).toDateString(),
      width:'15%'
    },
    {
      name: "Action",
      minWidth: "210px",
      maxWidth: "211px",
      cell: (row) =>
        <>
      <button type="button" className="btn btn-1 bg-black text-white me-2" onClick={()=> handleSingleContact(row)}>Details</button>

      <ActionIcon Uniquekey={row._id} remove  deletePath="/Contact" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true}   />,

        </>
  }
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
          <h5 className="blue-1 mb-4"> {isBook  == false ?'Contact Mail List' :'Booking Enquiry'}</h5>
          <DashboardTable>
            <DataTable columns={mail_columns} data={contactList} pagination />
          </DashboardTable>


      <Modal open={showModal} onClose={() => setshowModal(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box className="modal-box">
        <div className="modal-container" style={{width: "600px" }}>
          <div className="modal-header">
            <h5>Query</h5>
            <CustomButton
              isBtn
              btntype="button"
              iconName="fa fa-times text-white"
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
                  <p><b>Name</b> :{contactObj?.name}</p>
                  <p><b>Email</b> {contactObj?.email}</p>
                  <p><b>Phone</b> : {contactObj?.phone}</p>
                  <p><b>Title</b> : {contactObj?.title}</p>
                  <p><b>Date</b> : {new Date(contactObj.createdAt).toDateString()}</p>
                  <p><b>Message</b></p>
                  <p>{contactObj?.message}</p>
                  { contactObj?.propertyName && (           <p><b>Property Name</b> : {contactObj?.propertyName}</p>)  }
                  { contactObj?.bookingDate && (           <p><b>Booking Date</b> : {contactObj?.bookingDate}</p>)  }
                  { contactObj?.bookingPrice && (           <p><b>Booking Price</b> : {contactObj?.bookingPrice}</p>)  }
                  { contactObj?.bookingGuest && (           <p><b>Booking Price</b> : {contactObj?.bookingGuest}</p>)  }
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

export default ContactMail;
