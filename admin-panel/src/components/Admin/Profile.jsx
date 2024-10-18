import React, { useState, useEffect } from "react";
import BaiscInfo from "./BaiscInfo";
import ChangePassword from "./ChangePassword";
import Address from "./Address";
import CustomButton from "../Utility/Button";
import tabClick from "../Utility/TabClick";
import { rolesObj } from "../../utils/roles";
import { useSelector } from "react-redux";
import SellerDocuments from "./SellerDocuments";
function Profile() {
  const [addAddress, setaddAddress] = useState(false);
  const role = useSelector((state) => state.auth.role);

  const [tabList, settabList] = useState([
    {
      tabName: "BASIC INFO",
      active: true,
      render: <BaiscInfo />,
    },
    {
      tabName: "CHANGE PASSWORD",
      active: false,
      render: <ChangePassword />,
    },

  ]);

  useEffect(() => {
    if (role == rolesObj.SELLER) {
      settabList(prevState => {
        return [...prevState,
        //   {
        //   tabName: "ADDRESS",
        //   active: false,
        //   role: "SELLER",
        //   render: <Address addAddress={addAddress} />,
        // },
        {
          tabName: "DOCUMENTS",
          active: false,
          role: "SELLER",
          render: <SellerDocuments />,
        },]
      })
    }
    return () => {
      settabList([
        {
          tabName: "BASIC INFO",
          active: true,
          render: <BaiscInfo />,
        },
        {
          tabName: "CHANGE PASSWORD",
          active: false,
          render: <ChangePassword />,
        },
      ])
    }

  }, [role])


  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <div className="row">
            <div className="col-12">
              <ul
                className="nav nav-pills dashboard-pills mb-3 justify-content-end"
                id="pills-tab"
                role="tablist"
              >
                {tabList.map((item, i) => {
                  return (
                    <li key={i}>
                      <CustomButton
                        navPills
                        btnName={item.tabName}
                        pillActive={item.active ? true : false}
                        ClickEvent={() => { setaddAddress(false); tabClick(i, tabList, settabList) }}
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
        </div>
      </section>
    </main>
  );
}

export default Profile;
