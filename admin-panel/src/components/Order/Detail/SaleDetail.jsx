import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import {
  getOrderById,
  updateOrderById,
  updateStatusOrderById,
} from "../../../services/order.service";
import { toastError, toastSuccess } from "../../../utils/toastUtils";
import CustomButton from "../../Utility/Button";
import { ORDER_STATUS } from "../../Utility/constants";
import { DashboardBox, DashboardTable } from "../../Utility/DashboardBox";
import { generateFilePath } from "../../Utility/utils";

function SaleDetail(props) {
  // =========================================================================================

  const [searchParams, setSearchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState("");
  const [orderObj, setOrderObj] = useState({});
  const [selecetedOrderStatus, setSelecetedOrderStatus] = useState({});
  const getOrder = async () => {
    try {
      const { data: res } = await getOrderById(searchParams.get("orderId"));
      if (res) {
        console.log(res.data);
        setOrderObj(res.data);
        setTrackingId(res.data.trackingId);
        setSelecetedOrderStatus({
          label: res.data.orderStatus,
          value: res.data.orderStatus,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const sale_columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "5%",
    },
    {
      name: "Type",
      selector: (row) => row.guesttype,
      width: "10%",
    },
    {
      name: "Name",
      selector: (row) => row?.firstName + " " + row?.lastName,
      width: "45%",
    },

    // {
    //   name: "Qty",
    //   cell: (row) => <p className="fs-14">{row.quantity}</p>,
    //   width:'5%'
    // },
    // {
    //   name: "Price",
    //   selector: (row) => `$ ${orderObj?.currencyObj?.convertRate ? orderObj?.currencyObj?.convertRate*row.price : row.price}`,
    //   width:'10%'
    // },

    // {
    //   name: "Total",
    //   selector: (row) => `$ ${orderObj?.currencyObj?.convertRate ? orderObj?.currencyObj?.convertRate*row.totalPrice : row.totalPrice}`,
    //   width:'10%'
    // },
  ];

  const handlePrint = async () => {
    // try {
    //   const { data: res } = await getInvoiceById(orderObj?._id);
    //   if (res) {
    //     window.open(`${url}/${res.data}`);
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const handleOrderUpdate = async () => {
    try {
      let updateObj = {
        trackingId,
        orderStatus: selecetedOrderStatus?.label,
        userId: orderObj?.userId,
      };

      // console.log(updateObj,"updateObjupdateObjupdateObj")
      // console.log(orderObj,"orderObj?._idorderObj?._id get ")
      // console.log(orderObj?.addressObj,"===_id get ")
      const { data: res } = await updateStatusOrderById(
        orderObj?._id,
        updateObj
      );
      if (res) {
        toastSuccess(res.message);
        getOrder();
      }
    } catch (error) {
      toastError(error);
    }
  };

  // const order_comfirm = [
  //   { value: ORDER_STATUS.PENDING, label: ORDER_STATUS.PENDING },
  //   { value: ORDER_STATUS.CONFIRMED, label: ORDER_STATUS.CONFIRMED },
  //   { value: ORDER_STATUS.PROCESSED, label: ORDER_STATUS.PROCESSED },
  //   { value: ORDER_STATUS.DISPATCHED, label: ORDER_STATUS.DISPATCHED },
  //   { value: ORDER_STATUS.DELIVERED, label: ORDER_STATUS.DELIVERED },
  //   { value: ORDER_STATUS.CANCELLED, label: ORDER_STATUS.CANCELLED },
  // ];

  //   =========================================================================================

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="col-12 col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="blue-1 m-0">Order Details</h5>
              <CustomButton
                ClickEvent={() => handlePrint()}
                path={`/Order/Sale-Detail?orderId=${orderObj?._id}`}
                isLink
                downloadAble
                btnName="PRINT"
                noIcon
                noIconMargin
              />
            </div>
          </div>
          {/* <div className="col-12 col-md-12">
          <DashboardBox>
            <div className="row">
       
            <div className="col-md-4">
                    <label>Tracking Details </label>
                    <textarea className="form-control" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} ></textarea>
                  </div>
                  <div className="col-md-4">
                    <label>Order Status </label>
                    <Select options={order_comfirm} onChange={(e) => setSelecetedOrderStatus(e)} value={selecetedOrderStatus} />
                  </div>

                  <div className="col-md-4 text-center mt-2">
                    <CustomButton isBtn btntype="button" ClickEvent={() => handleOrderUpdate()} iconName="fa-solid fa-check" btnName="Save" />
                  </div>
             
            </div>
            </DashboardBox>
          </div> */}
          <hr />
          <div className="row">
            <DashboardBox className="col-12 col-md-12 row  m-0">
              {/* <div className="col-12 col-md-6"> */}
              {/* <DashboardBox className="blue-1"> */}
              {/* <div className="customer-profile">
                    <h6 className="blue-1 text-capitalize mb-3">Billing Info</h6>
                    <ul className="blue-1 fs-14">
                      <li>
                        <span className="fw-600">
                          Name<span>:</span>
                        </span>
                        Devesh
                      </li>
                      <li>
                        <span className="fw-600">
                          Email<span>:</span>
                        </span>
                        devesh.batra@ebslon.com
                      </li>
                      <li>
                        <span className="fw-600">
                          Phone<span>:</span>
                        </span>
                        9999063652
                      </li>
                      <li>
                        <span className="fw-600">
                          Address<span>:</span>
                        </span>
                        506-507, GD ITL, A-09, Netaji Subhash place, Pitampura
                      </li>
                      <li>
                        <span className="fw-600">
                          City<span>:</span>
                        </span>
                        New Delhi
                      </li>
                      <li>
                        <span className="fw-600">
                          State<span>:</span>
                        </span>
                        Delhi
                      </li>
                      <li>
                        <span className="fw-600">
                          Country<span>:</span>
                        </span>
                        New Delhi
                      </li>
                      <li>
                        <span className="fw-600">
                          Postcode<span>:</span>
                        </span>
                        110034
                      </li>
                    </ul>
                  </div> */}
              {/* </DashboardBox> */}
              {/* </div> */}
              <div className="col-12 col-md-6">
                <DashboardBox className="blue-1">
                  <div className="customer-profile">
                    {/* <h6 className="blue-1 text-capitalize mb-3">Aahilya Creations</h6> */}
                    <ul className=" fs-14">
                      <li>
                        <span className="fw-600">
                          Booking Id<span>:</span>
                        </span>
                        {orderObj._id}
                      </li>
                      <li>
                        <span className="fw-600">
                          Payment Method<span>:</span>
                        </span>
                        {orderObj?.paymentMethod ?? "Razorpay"}
                      </li>
                      <li>
                        <span className="fw-600">
                          Date :<span>:</span>
                        </span>
                        {new Date(orderObj?.createdAt).toDateString()}
                      </li>
                      <li>
                        <span className="fw-600">
                          Booking Total :<span>:</span>
                        </span>
                        {orderObj?.totalAmount}
                      </li>
                      <li>
                        <span className="fw-600">
                          Booking Status :<span>:</span>
                        </span>
                        {orderObj?.orderStatus}
                      </li>

                      <li>
                        <span className="fw-600">
                          RMS ReservationId :<span>:</span>
                        </span>
                        {orderObj?.reservationId}
                      </li>
                    </ul>
                  </div>
                </DashboardBox>
              </div>
              <div className="col-12 col-md-6">
                <DashboardBox>
                  <div className="customer-profile">
                    <h6 className="blue-1 text-capitalize ">Booking Info</h6>
                    <ul className="blue-1 fs-14">
                      <li>
                        <span className="fw-600">
                          Name<span>:</span>
                        </span>
                        {orderObj?.name}
                      </li>

                      <li>
                        <span className="fw-600">
                          Phone<span>:</span>
                        </span>
                        {orderObj?.mobile}
                      </li>
                      <li>
                        <span className="fw-600">
                          Email<span>:</span>
                        </span>
                        {orderObj?.email}
                      </li>
                    </ul>
                  </div>
                </DashboardBox>
              </div>

              <hr />
              <div className="col-12 col-md-12">
                <DashboardBox>
                  <div className="customer-profile">
                    <h6 className="blue-1 text-capitalize ">Booking Detail</h6>
                    <div className="row">
                      <div className="col-md-2">Image</div>
                      <div className="col-md-2">Name</div>
                      <div className="col-md-2">Nights</div>
                      <div className="col-md-2">Check In</div>
                      <div className="col-md-2">Check Out</div>
                    </div>
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src={`${generateFilePath(
                            orderObj?.hotelObj?.mainImage
                          )}`}
                          width="50px"
                        />
                      </div>
                      <div className="col-md-2">{orderObj?.hotelObj?.name}</div>
                      <div className="col-md-2">{orderObj?.nights}</div>
                      <div className="col-md-2">
                        {new Date(orderObj?.startDate).toDateString()}
                      </div>
                      <div className="col-md-2">
                        {new Date(orderObj?.endDate).toDateString()}
                      </div>
                    </div>
                  </div>
                </DashboardBox>
              </div>
              {/* <div className="col-12 col-md-6">
                <DashboardBox className="blue-1">
                  <div className="customer-profile">
                    <h6 className="blue-1 text-capitalize mb-3"> 	Billing Details</h6>
                    <ul className="blue-1 fs-14">
                      <li>
                    
                        {orderObj?.addressObj?.name}  {orderObj?.addressObj?.email} , {orderObj?.addressObj?.phone}
                      </li>
                    
                      <li>
                      
                       
                      </li>
                      <li>
                      
                        {orderObj?.addressObj?.address}
                      </li>
                      <li>
                  
                        {orderObj?.addressObj?.city},{orderObj?.addressObj?.state}
                      </li>
                      <li>
                       
               
                      </li>
                      <li>
                     
                        {orderObj?.addressObj?.country}
                      </li>
                      <li>
                     
                        {orderObj?.addressObj?.pincode}
                      </li>
                    </ul> 
                  </div>
                </DashboardBox>
              </div> */}
              <div className="col-12">
                <DashboardBox className="blue-1">
                  {/* <div className="d-flex justify-content-between align-items-end">
                    <div>
                       {/* <h5 className="blue-1 mb-3">Package: {orderObj?._id}</h5> 
                      <CustomButton redBtn btnName="Pending" />/

                      Status : {orderObj?.orderStatus}
                    </div>
                    <h6 className="border py-2 m-0 px-4 text-white bg-black rounded-2 fs-14">Shipping Method : NA</h6>
                  </div> */}
                  <DashboardTable className="my-4">
                    <h5 className="blue-1 mb-3">Guest Details</h5>
                    <DataTable
                      columns={sale_columns}
                      data={orderObj?.guestArr}
                    />
                  </DashboardTable>
                  <div className="customer-profile">
                    <h6 className="blue-1 text-capitalize mb-3"> Summary</h6>
                    <ul className="blue-1 fs-14">
                      <li>
                        <span className="fw-600">
                          Subtotal<span>:</span>
                        </span>
                        {orderObj?.subTotalAmount}
                      </li>
                      {/* <li>
                        <span className="fw-600">
                          Discount<span>:</span>
                        </span>
                        -  0.00
                      </li> */}
                      {orderObj?.gst && (
                        <li>
                          <span className="fw-600">
                            Gst ({orderObj?.gst.tax}) %<span>:</span>
                          </span>
                          {orderObj?.gst.amount}
                        </li>
                      )}

                      {/* <li>
                        <span className="fw-600">
                          TAX/GST<span>:</span>
                        </span>
                         {orderObj?.items?.reduce((acc, el) => acc + el.cgst + el.sgst, 0)}
                      </li> */}
                      <li>
                        <span className="fw-600">
                          Grand Total<span>:</span>
                        </span>
                        {orderObj?.totalAmount}
                      </li>
                    </ul>
                  </div>
                </DashboardBox>
              </div>
            </DashboardBox>
            {/* <div className="col-12 col-md-4">
              <DashboardBox>
                <form action="#" className="form row">
                  <div className="col-12">
                    <label>Tracking Id </label>
                    <input type="text" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} className="form-control" />
                  </div>
                  <div className="col-12">
                    <label>Order Status </label>
                    <Select options={order_comfirm} onChange={(e) => setSelecetedOrderStatus(e)} value={selecetedOrderStatus} />
                  </div>

                  <div className="col-12 text-center mt-2">
                    <CustomButton isBtn btntype="button" ClickEvent={() => handleOrderUpdate()} iconName="fa-solid fa-check" btnName="Save" />
                  </div>
                </form>
              </DashboardBox>
            </div> */}
          </div>
        </div>
      </section>
    </main>
  );
}

export default SaleDetail;
