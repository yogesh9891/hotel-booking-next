import React from "react";
import DataTable from "react-data-table-component";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import CustomButton from "../Utility/Button";
import { DashboardChart, DashboardTable } from "../Utility/DashboardBox";

function SettlementDetails() {
    // ================================================================================================================
    const product_columns = [
        {
            name: "SL",
            selector: (row) => row.sl,
            sortable: true,
        },
        {
            name: "Name",
            selector: (row) => row.name,
        },
        {
            name: "Brand ",
            selector: (row) => row.brand,
        },
        {
            name: "Total Sale ",
            selector: (row) => row.sale,
        },
    ];

    const product_data = [
        {
            sl: "1",
            name: "EYELINER SUPER BLACK",
            brand: "",
            sale: "0",
        },
        {
            sl: "2",
            name: "EYELINER SUPER BLACK",
            brand: "",
            sale: "0",
        },
        {
            sl: "3",
            name: "EYELINER SUPER BLACK",
            brand: "",
            sale: "0",
        },
        {
            sl: "4",
            name: "EYELINER SUPER BLACK",
            brand: "",
            sale: "0",
        },
        {
            sl: "5",
            name: "EYELINER SUPER BLACK",
            brand: "",
            sale: "0",
        },
        {
            sl: "6",
            name: "EYELINER SUPER BLACK",
            brand: "",
            sale: "0",
        },
        {
            sl: "7",
            name: "EYELINER SUPER BLACK",
            brand: "",
            sale: "0",
        },
        {
            sl: "8",
            name: "EYELINER SUPER BLACK",
            brand: "",
            sale: "0",
        },
        {
            sl: "9",
            name: "EYELINER SUPER BLACK",
            brand: "",
            sale: "0",
        },
    ];

    const quality_columns = [
        {
            name: "SL",
            selector: (row) => row.sl,
            sortable: true,
        },
        {
            name: "Category Name",
            selector: (row) => row.category,
        },
        {
            name: "Product Quantity",
            selector: (row) => row.quantity,
        },
    ];

    const quality_data = [
        {
            sl: "1",
            category: "EYELINER SUPER BLACK",
            quantity: "0",
            sortable: true,
        },
        {
            sl: "2",
            category: "EYELINER SUPER BLACK",
            quantity: "0",
            sortable: true,
        },
        {
            sl: "3",
            category: "EYELINER SUPER BLACK",
            quantity: "0",
            sortable: true,
        },
        {
            sl: "4",
            category: "EYELINER SUPER BLACK",
            quantity: "0",
            sortable: true,
        },
        {
            sl: "5",
            category: "EYELINER SUPER BLACK",
            quantity: "0",
            sortable: true,
        },
    ];

    ChartJS.register(ArcElement, Tooltip, Legend);
    const productChartData = {
        labels: ["Published", "Total"],
        datasets: [
            {
                label: "Products",
                data: [50, 50],
                backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(75, 192, 192, 0.2)"],
                borderColor: ["rgba(54, 162, 235)", "rgba(75, 192, 192)"],
                borderWidth: 1,
            },
        ],
    };
    const OrderChartData = {
        labels: ["Total", "Complete", "Processing", "pending"],
        datasets: [
            {
                label: "Orders Summary",
                data: [3, 0, 0, 0],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.2)", //green
                    "rgba(54, 162, 235, 0.2)", //blue
                    "rgba(255, 206, 86, 0.2)", //yellow
                    "rgba(153, 102, 255, 0.2)", //purple
                ],
                borderColor: [
                    "rgba(75, 192, 192)",
                    "rgba(54, 162, 235)",
                    "rgba(255, 206, 86)",
                    "rgba(153, 102, 255)",
                ],
                borderWidth: 1,
            },
        ],
    };
    const GuestRegisterChart = {
        labels: ["In Cart", "Registered", "guest"],
        datasets: [
            {
                label: "Guest/Authorized Order Today",
                data: [10, 5, 8],
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

    // ================================================================================================================

    return (
        <main>
            <section>
                <div className="container-fluid">
                    <h5 className="blue-1 mb-4">
                        Dashboard for Settlement details from Dusaan
                    </h5>
                    <div className="row">
                        <div className="col-12 col-md-4 mb-5">
                            <DashboardChart>
                                <h5 className="blue-1 mb-4">Products</h5>
                                <Doughnut data={productChartData} />
                            </DashboardChart>
                        </div>
                        <div className="col-12 col-md-4 mb-5">
                            <DashboardChart>
                                <h5 className="blue-1 mb-4">Orders Summary</h5>
                                <Doughnut data={OrderChartData} />
                            </DashboardChart>
                        </div>
                        <div className="col-12 col-md-4 mb-5">
                            <DashboardChart>
                                <h5 className="blue-1 mb-4">Guest/Authorized Order Today</h5>
                                <Doughnut data={GuestRegisterChart} />
                            </DashboardChart>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-md-6 mb-5">
                            <DashboardTable>
                                <h5 className="blue-1 mb-4">Top 10 Product</h5>
                                <DataTable columns={product_columns} data={product_data} />
                            </DashboardTable>
                        </div>
                        <div className="col-12 col-md-6 mb-5">
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
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default SettlementDetails;