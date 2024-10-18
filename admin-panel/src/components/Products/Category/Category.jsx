import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import AddCategory from "./AddCategory";
import ActionIcon from "../../Utility/ActionIcon";
import CustomButton from "../../Utility/Button";
import { downloadCSV } from "../../Utility/CSV";
import SearchBox from "../../Utility/SearchBox";

import { AddModal } from "../../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import { CATEGORYDelete, CATEGORYGet, SetCATEGORYObj } from "../../../redux/actions/Category/Category.actions";
import { toastError } from "../../../utils/toastUtils";
function Category() {
  // ==============================================================================================================
  const dispatch = useDispatch();
  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);
  const categoryArr = useSelector((state) => state.category.categories);
  const [ModalData, setModalData] = useState({});
  const [displayCategoryArr, setDisplayCategoryArr] = useState([]);
  const [query, setQuery] = useState("");
  const handleCategoryEdit = (row) => {
    dispatch(SetCATEGORYObj(row));
  };

  const [categoriesArr, setCategoriesArr] = useState([]);

  const handleCategoryGet = () => {
    dispatch(CATEGORYGet());
  };

  const handleCategoryDelete = (row) => {
    dispatch(CATEGORYDelete(row._id))
  }


  useEffect(() => {
    handleCategoryGet()
  }, [])


  useEffect(() => {
    if (categoryArr?.length) {
      setCategoriesArr(categoryArr)
      setDisplayCategoryArr(categoryArr)
    }
  }, [categoryArr])

  const category_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Parent Category",
      selector: (row) => (row.parentCategoryName ? row.parentCategoryName : "NA"),
    },
    {
      name: "Level",
      selector: (row) => row?.level,
    },
    {
      name: "Status",
      minWidth: "210px",
      maxWidth: "211px",
      button: true,
      cell: (row) => <CustomButton greenBtn noIcon btnName="Active" path={"/Category"} />,
    },
    {
      name: "Action",
      minWidth: "210px",
      maxWidth: "211px",
      cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Category" onDeleteClick={() => handleCategoryDelete(row)} isRedirected={true} onEditClick={() => handleCategoryEdit(row)} editPath="/Category" />,
    },
  ];

  // ==============================================================================================================

  const handleFilterByQuery = (e, requiredParametersArr) => {
    let tempArr = displayCategoryArr.filter(el => {
      for (const ele of requiredParametersArr) {
        console.log(`${el[ele]}`.toLowerCase().includes(`${e}`.toLowerCase()), "ele,el")
        if (`${el[`${ele}`.toLowerCase()]}`.toLowerCase().includes(`${e}`.toLowerCase())) {
          // console.log("true")
          return true;
        }
        else {
          return false;
        }
      }
    })
    setQuery(e)
    setCategoriesArr([...tempArr])
    console.log([...tempArr], "...tempArr")
  }


  return (
    <main>
      <AddModal
        ModalBox={ModalBox}
        setModalBox={setModalBox}
        name={ModalName}
        ModalType={ModalType}
        data={ModalData}
      />
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="blue-1 m-0">Add Category</h5>
                {/* <CustomButton isLink iconName="fa-solid fa-plus" btnName="BULK CATEGORY UPLOAD" path="/Bulk-Category-Upload" roundedPill small /> */}
              </div>
              <DashboardBox>
                <AddCategory />
              </DashboardBox>
            </div>
            <div className="col-12 col-md-8">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1 m-0">Category List</h5>
                <div className="d-flex gap-3 align-items-center">
                  <CustomButton isLink iconName="fa-solid fa-download" btnName="CATEGORY CSV" path="/Product/Bulk-Category-Upload" small roundedPill downloadAble />
                  <SearchBox setQuery={(e) => { handleFilterByQuery(e, ["name"]); }} query={query} extraClass="bg-white" />
                </div>
              </div>
              <DashboardTable>
                <DataTable columns={category_columns} data={categoriesArr && categoriesArr.length > 0 ? categoriesArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Category;
