
import React from "react";
import DataTable from "react-data-table-component";
import ActionIcon from "../Utility/ActionIcon";
import { DashboardTable } from "../Utility/DashboardBox";

function OnlineRecharge() {
  const recharge_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "DATE",
      selector: (row) => row.date,
      
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      
    },
    {
      name: "TXN ID",
      selector: (row) => row.txn,
      
    },
    {
      name: "AMOUNT",
      selector: (row) => row.amount,
      
    },
    {
      name: "TYPE",
      selector: (row) => row.type,
      
    },
    {
      name: "PAYMENT METHOD",
      selector: (row) => row.payment_method,
      
    },
    {
      name: "ACTION",
      cell: (row) => <ActionIcon approve decline />,
    },
  ];
  const recharge_data = [
    {
      id: "1",
      Seq: "1",
      date: "17th Jun, 2022",
      email:'xyz@gmail.com',
      txn:'444',
      amount:'₹555',
      type:'xyz',
      payment_method:'xyz'
    },
  ];

  return (
    <DashboardTable className="mt-4">
      <DataTable
        columns={recharge_columns}
        data={recharge_data}
        pagination
      />
    </DashboardTable>
  );
}

export default OnlineRecharge;
