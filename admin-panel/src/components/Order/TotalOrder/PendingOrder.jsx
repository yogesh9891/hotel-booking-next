import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getAllOrders, updateStatusProductsInBulk } from "../../../services/order.service";
import { deleteProductsInBulk } from "../../../services/product.service";
import CustomButton from "../../Utility/Button";
import { DashboardTable } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";
import { toastError, toastSuccess } from "../../Utility/ToastUtils";
function PendingOrder({ name }) {
  const [orders, setOrders] = useState([]);
  const [displayOrders, setdisplayOrders] = useState([]);
  const [displayButtons, setDisplayButtons] = useState(false);
  const [status, setStatus] = useState("")

  const getOrder = async () => {
    try {
      const { data: res } = await getAllOrders();
      if (res) {
       
        // setOrders(res.data.filter((el) => el.status != "CANCELLED"));
        setOrders([...res.data.map(el => {
            el.checked = false
            return el
          })])
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckOrder = (row, index, e) => {
    let tempArr = orders.map(el => {
      if (row._id == el._id) {
        el.checked = !el.checked 
      }
      return el
    })
    handleGetOrderCheckedStatus(tempArr)
    setOrders([...tempArr])
    console.log(index, row, e.target.checked)
  }

  
  const handleGetOrderCheckedStatus = (tempArr) => {
    if (tempArr.some(el => el.checked == true)) {
      setDisplayButtons(true)
    }
    else {
      setDisplayButtons(false)
    }
  }

  const handleClearSelection = () => {
    let tempArr = orders.map(el => {
      el.checked = false
      return el
    })

    handleGetOrderCheckedStatus(tempArr)
    setOrders(tempArr)
  }

  const handleDeleteSelected = async () => {
    try {
      let selectedArr = orders.filter(el => el.checked).map(el => {
        let obj = {
          orderId: el._id,
        }
        return obj
      })
      if (`${status}` =='') {
        toastError("Please select order status")
        return
      }
      if (!selectedArr.length > 0) {
        toastError("Please select atleast one order to perform this action")
        return
      }

      let obj = {
        orderId:selectedArr,
        status
      }
    //   let { data: res } = await updateStatusProductsInBulk(obj)
    //   if (res.message) {
    //     toastSuccess(res.message)
    // getOrder();
    //   }
    }
    catch (e) {
      toastError(e)
    }
  }
  useEffect(() => {
    getOrder();
  }, []);

  const PendingOrder_columns = [
    {
        name: "SL",
        cell: (row, index) => <>
        <span onClick={(e) => handleCheckOrder(row, index, e)}>
          {row.checked == true?<i className="fa fa-check-square"/>:<i className="fa fa-square"/>}
        </span></>,
        sortable: true,
        width: "2%",
      },
    {
      name: "SL",
      // selector: (row, index) => index + 1,
      sortable: true,
      accessor: (row, index) =>  + 1 ,
      width: "5%",
    },
    {
      name: "Date",
      selector: (row) => new Date(row?.createdAt).toDateString(),
    },
    {
      name: "Order ID",
      selector: (row) => row._id,
      width: "15%",
    },
    {
      name: "Name",
      selector: (row) => row?.name ,
      width: "15%",
    },

    {
      name: "Amount",
      selector: (row) => row.totalAmount,
      width: "15%",
    },
    {
      name: "Status",
      button: true,
      width: "10%",
      cell: (row) => <CustomButton redBtn={row?.orderStatus == "CANCELLED"} greenBtn={row?.orderStatus != "CANCELLED"} btnName={row?.orderStatus} />,
    },
    // {
    //   name: "Is Paid",
    //   button: true,
    //   width: "10%",
    //   cell: (row) => <CustomButton redBtn={row?.paymentObj?.paymentChk != 1} greenBtn={row?.paymentObj?.paymentChk == 1} btnName={row?.paymentObj?.paymentChk == 1 ? "PAID" : "PENDING"} />,
    // },
    {
      name: "Action",
      cell: (row) => <CustomButton btnName={"View"} path={`/Order/Sale-Detail?orderId=${row?._id}`} isLink />,
    },
  ];

  return (
    <DashboardTable className="mt-4">
      {/* <div className="d-flex gap-3 justify-content-between mb-4">
        <h5 className="blue-1 m-0">{name}</h5>
        {
                displayButtons &&
                <div className="d-flex align-items-center justify-content-end mb-4">
                     <div style={{ marginLeft: 15 }}>
                            
                                                <select className="form-control"   value={status} onChange={(e) => setStatus(e.target.value)} >
                                                    <option value="">Please Select Status</option>
                                                    {
                                                        Object.values(ORDER_STATUS).length > 0 && Object.values(ORDER_STATUS).map(el => <option>{el}</option>)
                                                    }
                                                </select>
                                            </div>
                  <div style={{ marginLeft: 15 }}>
                    <CustomButton isLink iconName="fa-solid fa-minus" ClickEvent={() => handleDeleteSelected()} btnName="Status Changed" path="/Order/Total-Order" />
                  </div>
                  {/* <div style={{ marginLeft: 15 }}>
                    <CustomButton isLink iconName="fa-solid fa-plus" ClickEvent={() => handleSetSelectedAsActive()} noIcon btnName="Set selected as Active" path="/Product/Product-List" />
                  </div>
                  <div style={{ marginLeft: 15 }}>
                    <CustomButton isLink iconName="fa-solid fa-plus" ClickEvent={() => handleSetSelectedAsInActive()} noIcon btnName="Set selected as In-Active" path="/Product/Product-List" />
                  </div> 
                  <div style={{ marginLeft: 15 }}>
                    <CustomButton isLink iconName="fa-solid fa-plus" ClickEvent={() => handleClearSelection()} noIcon btnName="Clear Selection" path="/Order/Total-Order" />
                  </div>
                </div>
              }
        <SearchBox extraClass="bg-white" />
      </div> */}
      <DataTable columns={PendingOrder_columns} data={orders} pagination />
    </DashboardTable>
  );
}

export default PendingOrder;
