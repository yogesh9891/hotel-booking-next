import React, { useState } from "react";
import CustomButton from "../Utility/Button";
import tabClick from "../Utility/TabClick";
import OnlineRecharge from "./OnlineRecharge";

function WalletRecharge() {
  const [tabList, settabList] = useState([
    {
      tabName: "Online Recharge",
      active: true,
      render: <OnlineRecharge />,
    },
    {
      tabName: "Offline Recharge",
      active: false,
      render: <OnlineRecharge />,
    },
  ]);

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="blue-1 m-0">Recharge Transactions</h5>
            <ul className="d-flex total-order-tab align-items-center justify-content-end gap-2 dashboard-pills">
              {tabList.map((item, i) => {
                return (
                  <li key={i}>
                    <CustomButton
                      navPills
                      btnName={item.tabName}
                      pillActive={item.active ? true : false}
                      ClickEvent={() => tabClick(i, tabList, settabList)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          {tabList.map((item, index) => {
            return (
              <div className="col-12" key={index}>
                {item.active && item.render}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default WalletRecharge;
