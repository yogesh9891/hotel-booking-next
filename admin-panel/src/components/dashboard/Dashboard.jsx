import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CustomButton from "../Utility/Button";
import tabClick from "../Utility/TabClick";
import {
  DashboardBox,
  DashboardChart,
  DashboardTable,
} from "../Utility/DashboardBox";
import { getDashboardApi } from "../../services/dashboard.service";

function Dashboard() {
  const [dashboardObj, setdashboardObj] = useState("");
  const [totalHotels, settotalHotels] = useState(0);
  const [totalApartments, settotalApartments] = useState(0);
  const [totalCustomer, settotalCustomer] = useState(0);
  const [totalOrder, settotalOrder] = useState(0);
  const [totalPending, settotalPending] = useState(0);
  const [totalComplete, settotalComplete] = useState(0);
  const [totalConfirmed, settotalConfirmed] = useState(0);
  const [totalSale, settotalSale] = useState(0);
  const [totalReview, settotalReview] = useState(0);
  const [totalactiveCustomer, settotalactiveCustomer] = useState(0);
  const [totalSubscriber, settotalSubscriber] = useState(0);
  const [producrArr, setproducrArr] = useState([]);

  const handlseDashboard = async () => {
    try {
      let { data: res } = await getDashboardApi();
      if (res.data) {
        setdashboardObj(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(dashboardObj, "dashboardObjdashboardObjsa");
    if (dashboardObj) {
      settotalHotels(dashboardObj.totalHotels);
      settotalApartments(dashboardObj.totalApatments);
      settotalPending(dashboardObj.totalPendingOrder);
      settotalComplete(dashboardObj.totalCompleteOrder);
      settotalCustomer(dashboardObj.totalUser);
      settotalactiveCustomer(dashboardObj.totalActiveUser);
      settotalSale(dashboardObj?.totalRevenue[0]?.totalAmount);
      settotalOrder(dashboardObj.totalOrder);
      settotalReview(dashboardObj.totalProductReview);
      setproducrArr(dashboardObj.topProductOrder);
    }
  }, [dashboardObj]);

  useEffect(() => {
    handlseDashboard();
  }, []);

  // ================================================================================================================
;



  const coupon_sale_data = ["No data available in table"];

  ChartJS.register(ArcElement, Tooltip, Legend);
  const productChartData = {
    labels: ["Total", "Apartments", "Hotels"],
    datasets: [
      {
        label: "Property",
        data: [
          dashboardObj?.totalActiveProduct,
          dashboardObj?.totalApatments,
          dashboardObj?.totalHotels,
        ],
        backgroundColor: [
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ], //yellow],
        borderColor: [
          "rgba(54, 162, 235)",
          "rgba(75, 192, 192)",
          "rgba(255, 206, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const OrderChartData = {
    labels: ["Total", "Confirmed", "pending"],
    datasets: [
      {
        label: "Booking Summary",
        data: [
          dashboardObj.totalOrder,
          dashboardObj.totalCompleteOrder,
          dashboardObj.totalPendingOrder,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", //green
          "rgba(54, 162, 235, 0.2)", //blue
          "rgba(255, 206, 86, 0.2)", //yellow
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const GuestRegisterChart = {
    labels: ["Booking", "User Booking", "Guest Booking"],
    datasets: [
      {
        label: "Guest/Authorized Booking",
        data: [
          dashboardObj?.totalOrder,
          dashboardObj?.totalAuthOrder,
          dashboardObj?.totalOrder - dashboardObj?.totalAuthOrder,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", //green
          "rgba(54, 162, 235, 0.2)", //blue
          "rgba(255, 206, 86, 0.2)", //yellow
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const product_columns = [
    {
      name: "SL",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "10%",
    },
    {
      name: "Name",
      selector: (row) => row?.name,
    },

    {
      name: "Total Order ",
      selector: (row) => row.count,
      width: "20%",
    },
  ];
   const location_columns = [
     {
       name: "SL",
       selector: (row, index) => index + 1,
       sortable: true,
       width: "10%",
     },
     {
       name: "Name",
       selector: (row) => row?.name,
     },

     {
       name: "Total Property ",
       selector: (row) => row.total,
       width: "20%",
     },
   ];
  // ================================================================================================================

  return (
    <main>
      <section className="mb-5">
        <div className="container-fluid">
          <div className="dashboard-head mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <h5 className="blue-1 mb-0">Summary</h5>
              {/* <ul className="dashboard-filter filters">
                {filter.map((item, i) => {
                  return (
                    <li key={`${item.type}_${i}`}>
                      <CustomButton
                        navPills
                        btnName={item.name}
                        changeClass="filtering"
                        pillActive={item.active ? true : false}
                        data-type={item.type}
                        ClickEvent={() => tabClick(i, filter, setfilter)}
                      />
                    </li>
                  );
                })}
              </ul> */}
            </div>
          </div>
          {/* <div className="row">
            {dashboardBox.map((item, i) => {
              return (
                <div className="col-12 col-md-6 col-lg-4 col-xxl-3" key={i}>
                  <DashboardBox className="dashboard-summary">
                    <h5 className="blue-1">{item.heading}</h5>
                    <h4 className="text-dark mb-0">{item.today}</h4>
                  </DashboardBox>
                </div>
              );
            })}
          </div> */}
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1"> Total Hotels</h5>
                <h4 className="text-dark mb-0">{totalHotels}</h4>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1"> Total Apartments</h5>
                <h4 className="text-dark mb-0">{totalHotels}</h4>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1"> Total Customer</h5>
                <h4 className="text-dark mb-0">{totalCustomer}</h4>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1"> Total Booking</h5>
                <h4 className="text-dark mb-0">{totalOrder}</h4>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1"> Total Pending</h5>
                <h4 className="text-dark mb-0">{totalPending}</h4>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1"> Total Complete</h5>
                <h4 className="text-dark mb-0">{totalComplete}</h4>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1"> Total Sale</h5>
                <h4 className="text-dark mb-0">{totalSale}</h4>
              </DashboardBox>
            </div>{" "}
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1"> Total Review</h5>
                <h4 className="text-dark mb-0">{totalReview}</h4>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1"> Total Active Customer</h5>
                <h4 className="text-dark mb-0">{totalactiveCustomer}</h4>
              </DashboardBox>
            </div>
            <div className="col-12 col-md-6 col-lg-4 col-xxl-3">
              <DashboardBox className="dashboard-summary">
                <h5 className="blue-1"> Total Subscriber</h5>
                <h4 className="text-dark mb-0">{totalSubscriber}</h4>
              </DashboardBox>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-6 col-xxl-4 mb-5">
              <DashboardChart>
                <h5 className="blue-1 mb-4">Products</h5>
                <Doughnut data={productChartData} />
              </DashboardChart>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 mb-5">
              <DashboardChart>
                <h5 className="blue-1 mb-4">Orders Summary</h5>
                <Doughnut data={OrderChartData} />
              </DashboardChart>
            </div>
            <div className="col-12 col-md-6 col-xxl-4 mb-5">
              <DashboardChart>
                <h5 className="blue-1 mb-4">Guest/Authorized Order Today</h5>
                <Doughnut data={GuestRegisterChart} />
              </DashboardChart>
            </div>
            {/* <div className="col-12 col-md-6 col-xxl-4 mb-5">
              <DashboardChart>
                <h5 className="blue-1 mb-4">Today Order summary</h5>
                <Doughnut data={TodayOrderChart} />
              </DashboardChart>
            </div> */}
          </div>
        </div>
      </section>

      <section>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-xxl-6 mb-5">
              <DashboardTable>
                <h5 className="blue-1 mb-4">Top 10 Property</h5>
                <DataTable columns={product_columns} data={producrArr} />
              </DashboardTable>
            </div>
            <div className="col-12 col-xxl-6 mb-5">
              <DashboardTable>
                <h5 className="blue-1 mb-4">Location Property</h5>
                <DataTable columns={location_columns} data={producrArr} />
              </DashboardTable>
            </div>
            {/* <div className="col-12 col-xxl-6 mb-5">
              <DashboardTable>
                <h5 className="blue-1 mb-4">Category Wise Product Qty</h5>
                <DataTable columns={quality_columns} data={quality_data} />
                <div className="text-center mt-4 mb-2">
                  <CustomButton
                    isLink
                    noIcon
                    btnName="SEE ALL"
                    path="/"
                    small
                    roundedPill
                  />
                </div>
              </DashboardTable>
            </div> */}
            {/* <div className="col-12 col-xxl-6 mb-5">
              <DashboardTable>
                <h5 className="blue-1 mb-4">Category Wise Product Sale</h5>
                <DataTable
                  columns={product_sale_columns}
                  data={product_sale_data}
                />
                <div className="text-center mt-4 mb-2">
                  <CustomButton
                    isLink
                    noIcon
                    btnName="SEE ALL"
                    path="/"
                    small
                    roundedPill
                  />
                </div>
              </DashboardTable>
            </div> */}
            {/* <div className="col-12 col-xxl-6 mb-5">
              <DashboardTable>
                <h5 className="blue-1 mb-4">Coupon Wise Sale</h5>
                <DataTable
                  columns={coupon_sale_columns}
                  data={coupon_sale_data}
                />
              </DashboardTable>
            </div> */}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
