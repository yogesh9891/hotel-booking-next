import React from "react";
import DataTable from "react-data-table-component";
import CustomButton from "../Utility/Button";
import { downloadCSV } from "../Utility/CSV";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";

function AccountsLedger() {
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
            name: "Date of transaction",
            selector: (row) => row?.dot ? row?.dot : "",
        },
        {
            name: "Qty.",
            selector: (row) => row.qty,
        },
        {
            name: "Total Sale Value",
            selector: (row) => row.sale,
        },
    ];

    const product_data = [
        {
            sl: "1",
            name: "EYELINER SUPER BLACK",
            brand: "Nike",
            dot: `${new Date(new Date() - Math.random() * (1e+12))}`,
            qty: `${Math.floor(Math.random() * 899 + 100)}`,
            sale: `${Math.floor(Math.random() * 899999 + 100000)}`,
        },
        {
            sl: "2",
            name: "EYELINER SUPER BLACK",
            brand: "Nike",
            dot: `${new Date(new Date() - Math.random() * (1e+12))}`,
            qty: `${Math.floor(Math.random() * 899 + 100)}`,
            sale: `${Math.floor(Math.random() * 899999 + 100000)}`,
        },
        {
            sl: "3",
            name: "EYELINER SUPER BLACK",
            brand: "Nike",
            dot: `${new Date(new Date() - Math.random() * (1e+12))}`,
            qty: `${Math.floor(Math.random() * 899 + 100)}`,
            sale: `${Math.floor(Math.random() * 899999 + 100000)}`,
        },
        {
            sl: "4",
            name: "EYELINER SUPER BLACK",
            brand: "Nike",
            dot: `${new Date(new Date() - Math.random() * (1e+12))}`,
            qty: `${Math.floor(Math.random() * 899 + 100)}`,
            sale: `${Math.floor(Math.random() * 899999 + 100000)}`,
        },
        {
            sl: "5",
            name: "EYELINER SUPER BLACK",
            brand: "Nike",
            dot: `${new Date(new Date() - Math.random() * (1e+12))}`,
            qty: `${Math.floor(Math.random() * 899 + 100)}`,
            sale: `${Math.floor(Math.random() * 899999 + 100000)}`,
        },
        {
            sl: "6",
            name: "EYELINER SUPER BLACK",
            brand: "Nike",
            dot: `${new Date(new Date() - Math.random() * (1e+12))}`,
            qty: `${Math.floor(Math.random() * 899 + 100)}`,
            sale: `${Math.floor(Math.random() * 899999 + 100000)}`,
        },
        {
            sl: "7",
            name: "EYELINER SUPER BLACK",
            brand: "Nike",
            dot: `${new Date(new Date() - Math.random() * (1e+12))}`,
            qty: `${Math.floor(Math.random() * 899 + 100)}`,
            sale: `${Math.floor(Math.random() * 899999 + 100000)}`,
        },
        {
            sl: "8",
            name: "EYELINER SUPER BLACK",
            brand: "Nike",
            dot: `${new Date(new Date() - Math.random() * (1e+12))}`,
            qty: `${Math.floor(Math.random() * 899 + 100)}`,
            sale: `${Math.floor(Math.random() * 899999 + 100000)}`,
        },
        {
            sl: "9",
            name: "EYELINER SUPER BLACK",
            brand: "Nike",
            dot: `${new Date(new Date() - Math.random() * (1e+12))}`,
            qty: `${Math.floor(Math.random() * 899 + 100)}`,
            sale: `${Math.floor(Math.random() * 899999 + 100000)}`,
        },
    ];

    // ================================================================================================================

    return (
        <main>
            <section>
                <div className="container-fluid">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="blue-1 mb-0">Accounts &amp; Ledger</h5>
                        <div className="d-flex align-items-center gap-3">
                            <CustomButton
                                isLink
                                iconName="fa-solid fa-download"
                                btnName="ACCOUNT CSV"
                                path="/"
                                small
                                roundedPill
                                downloadAble
                                ClickEvent={() => downloadCSV(product_data)}
                            />
                            <SearchBox extraClass="bg-white" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <DashboardTable>
                                <DataTable columns={product_columns} data={product_data} />
                            </DashboardTable>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AccountsLedger;