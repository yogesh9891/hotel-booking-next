import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import { images } from "../Images/Images";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import { AddModal, EditModal } from "../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
import { PRODUCTDelete, PRODUCTGet, SetPRODUCTObj } from "../../redux/actions/Product/Product.actions";
import { generateFilePath } from "../Utility/utils";
import { toastError, toastSuccess } from "../../utils/toastUtils";
import { approveProductsInBulk, deleteProductsInBulk, unapproveProductsInBulk } from "../../services/product.service";
function ProductList() {
  const dispatch = useDispatch();

  const productArr = useSelector((state) => state.product.products);
  const [displayProductArr, setDisplayProductArr] = useState([]);

  const handleGetProducts = () => {
    dispatch(PRODUCTGet());
  }
  useEffect(() => {
    handleGetProducts()
  }, []);

  const [displayButtons, setDisplayButtons] = useState(false);

  useEffect(() => {
    if (productArr && productArr.length > 0) {
      setDisplayProductArr([...productArr.map(el => {
        el.checked = false
        return el
      })])
    }
  }, [productArr])

  const handleEdit = (row) => {
    // dispatch(SetPRODUCTObj(row));
  };

  const handleDeleteById = (id) => {
    dispatch(PRODUCTDelete(id));
  };

  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalData, setModalData] = useState({});
  const [ModalBox, setModalBox] = useState(false);


  const handleCheckProduct = (row, index, e) => {
    let tempArr = displayProductArr.map(el => {
      if (row._id == el._id) {
        el.checked = e.target.checked
      }
      return el
    })
    handleGetProductCheckedStatus(tempArr)
    setDisplayProductArr([...tempArr])
    console.log(index, row, e.target.checked)
  }

  const handleGetProductCheckedStatus = (tempArr) => {
    if (tempArr.some(el => el.checked == true)) {
      setDisplayButtons(true)
    }
    else {
      setDisplayButtons(false)
    }
  }


  const handleDeleteSelected = async () => {
    try {
      let selectedArr = displayProductArr.filter(el => el.checked).map(el => {
        let obj = {
          productId: el._id,
        }
        return obj
      })
      if (!selectedArr.length > 0) {
        toastError("Please select atleast one product to perform this action")
        return
      }
      let { data: res } = await deleteProductsInBulk(selectedArr)
      if (res.message) {
        toastSuccess(res.message)
        handleGetProducts()
      }
    }
    catch (e) {
      toastError(e)
    }
  }



  const handleSetSelectedAsActive = async () => {
    try {
      let selectedArr = displayProductArr.filter(el => el.checked).map(el => {
        let obj = {
          productId: el._id,
        }
        return obj
      })
      if (!selectedArr.length > 0) {
        toastError("Please select atleast one product to perform this action")
        return
      }
      let { data: res } = await approveProductsInBulk(selectedArr)
      console.log(res, "response")
      if (res.message) {
        toastSuccess(res.message)
        handleGetProducts()
      }
    }
    catch (e) {
      toastError(e)
    }
  }
  const handleSetSelectedAsInActive = async () => {
    try {
      let selectedArr = displayProductArr.filter(el => el.checked).map(el => {
        let obj = {
          productId: el._id,
        }
        return obj
      })
      if (!selectedArr.length > 0) {
        toastError("Please select atleast one product to perform this action")
        return
      }

      let { data: res } = await unapproveProductsInBulk(selectedArr)
      if (res.message) {
        toastSuccess(res.message)
        handleGetProducts()
      }
    }
    catch (e) {
      toastError(e)
    }
  }

  const handleClearSelection = () => {
    let tempArr = displayProductArr.map(el => {
      el.checked = false
      return el
    })
    setDisplayProductArr(tempArr)
  }


  const product_sale_columns = [
    {
      name: "SL",
      cell: (row, index) => <input key={index} type="checkbox" checked={row.checked} onChange={(e) => handleCheckProduct(row, index, e)} />,
      sortable: true,
      width: "2%",
    },
    // {
    //   name: "SL",
    //   selector: (row, index) => index + 1,
    //   sortable: true,
    //   width: "7%",
    // },
    {
      name: "Name",
      selector: (row) => row?.name,
      width: "25%",
    },
    {
      name: "SKU",
      selector: (row) => row?.sku,
      width: "25%",
    },

    {
      name: "Image",
      grow: 0,
      cell: (row) => <img height="84px" width="56px" alt={row?.imageArr[0]?.imageAlt ? row?.imageArr[0]?.imageAlt : "ALT"} src={generateFilePath(row?.imageArr[0]?.image)} />,
      width: "15%",
    },
    {
      name: "Status",
      button: true,
      cell: (row) => <Switch checked={row.active} />,
      width: "10%",
    },
    {
      name: "Action",
      width: "15%",
      cell: (row) => (
        <>
          <ActionIcon
            Uniquekey={row.id}
            remove
            deletePath="/Product/Product-List"
            onDeleteClick={() => handleDeleteById(row._id)}
            isRedirected={true}
            onEditClick={() => {
              setModalBox(true);
              setModalType("product-detail");
              setModalName(row.Name);
              dispatch(SetPRODUCTObj(row))
              setModalData(row)
              // handleEdit(row)
            }}
            edit
            editPath="/Product/Update-Product"
          // detail
          // detailClick={(e) => {
          //   e.preventDefault();
          // }}
          />


        </>
      ),
    },
    // {
    //   name: "Clone",
    //   width: "15%",
    //   cell: (row) => (
    //     <>
    //       {/* <CustomButton btntype="button" isRedirected={true} editPath={`/Product/clone-Product`} edit ClickEvent={(e) => { e.preventDefault(); dispatch(SetPRODUCTObj(row)) }} iconName="fa-solid fa-pen-to-square" btnName="Clone Product" /> */}
    //       <CustomButton btntype="button" isLink path={`/Product/clone-Product`} edit ClickEvent={() => { dispatch(SetPRODUCTObj(row)) }} iconName="fa-solid fa-pen-to-square" btnName="Clone Product" />


    //     </>
    //   ),
    // },
  ];

  return (
    <main>
      <AddModal
        ModalBox={ModalBox}
        setModalBox={setModalBox}
        name={ModalName}
        data={ModalData}
        ModalType={ModalType}
      />
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="blue-1">Product List</h5>
                <CustomButton isLink iconName="fa-solid fa-plus" btnName="ADD NEW PRODUCT" path="/Product/AddProduct" />
              </div>
              {
                displayButtons &&
                <div className="d-flex align-items-center justify-content-end mb-4">
                  <div style={{ marginLeft: 15 }}>
                    <CustomButton isLink iconName="fa-solid fa-minus" ClickEvent={() => handleDeleteSelected()} btnName="Delete Selected" path="/Product/Product-List" />
                  </div>
                  <div style={{ marginLeft: 15 }}>
                    <CustomButton isLink iconName="fa-solid fa-plus" ClickEvent={() => handleSetSelectedAsActive()} noIcon btnName="Set selected as Active" path="/Product/Product-List" />
                  </div>
                  <div style={{ marginLeft: 15 }}>
                    <CustomButton isLink iconName="fa-solid fa-plus" ClickEvent={() => handleSetSelectedAsInActive()} noIcon btnName="Set selected as In-Active" path="/Product/Product-List" />
                  </div>
                  <div style={{ marginLeft: 15 }}>
                    <CustomButton isLink iconName="fa-solid fa-plus" ClickEvent={() => handleClearSelection()} noIcon btnName="Clear Selection" path="/Product/Product-List" />
                  </div>
                </div>
              }
              <DashboardTable>
                <DataTable columns={product_sale_columns} data={displayProductArr && displayProductArr.length > 0 ? displayProductArr : []} pagination />
              </DashboardTable>
            </div>
          </div>
        </div>
      </section>
      <EditModal ModalBox={ModalBox} data={ModalData} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} />
    </main>
  );
}

export default ProductList;
