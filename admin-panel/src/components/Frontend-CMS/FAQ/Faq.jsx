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
import { deleteFaqById, getFaq } from "../../../services/Faq.service";
import { toastError, toastSuccess } from "../../Utility/ToastUtils";
import { useParams } from "react-router-dom";
function Faq() {
  const dispatch = useDispatch();
  const [faqArr, setFaqArr] = useState([]);
const [faqType, setfaqType] = useState("");
  const {type} = useParams();
  const handleGet = async (query) => {
    try {
      let { data: res } = await getFaq(query)
      if (res.data) {
        setFaqArr(res.data)
        toastSuccess(res.message)
      }
      dispatch(SetBANNERObj(null));
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


  const handleCategoryDelete = async  (row) => {
    let confirm =window.confirm("Do you really want to delete this item?")

    
    if (confirm) {

      try {
      let { data: res } = await deleteFaqById(row._id)
      if (res.msg) {
        toastSuccess(res.msg)
        handleGet(`type=${type}`)
      }
    }
    catch (err) {
      toastError(err)
    }
    }

}

  useEffect(() => {
    handleGet(`type=${type}`)
  }, [faqType]);
  const handleEdit = (row) => {
    dispatch(SetBANNERObj(row));
  };
  const brand_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "10%",
    },
    {
      name: "Heading",
      selector: (row) => row.question,
      width: "20%",
    },
    {
      name: "Description",
      selector: (row) => row.answer.substring(0,150)+ '...',
      width: "30%",
    },
    {
      name: "Action",
      width: "20%",
      cell: (row) => <ActionIcon edit isRedirected={true} onEditClick={() => handleEdit(row)} editPath={`/Faq/${type}/Faq-Create`} onDeleteClick={() => handleCategoryDelete(row)} deletePath={`/Faq/${type}`}remove Uniquekey={row._id} />,
    },
  ];

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Faq List</h5>
                <div className="d-flex align-items-center gap-3">
                  <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD NEW FAQ" path={`/Faq/${type}/Faq-Create`} small roundedPill />
                  <SearchBox extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={brand_columns} data={faqArr && faqArr.length > 0 ? faqArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Faq;
