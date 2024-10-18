import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../Utility/Button";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
// import ProductDetail from "CustomerDetail";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  HOTELDELETE,
  HOTELGET,
  HOTELUPDATE,
  SetHOTELOBJ,
} from "../../redux/actions/Hotels/Hotel.action";
import ActionIcon from "../Utility/ActionIcon";
import { generateFilePath } from "../Utility/utils";
import { generalHoteType, generalModelStatuses } from "../Utility/constants";
import { Switch } from "@mui/material";
import { toastError } from "../Utility/ToastUtils";

export default function ViewHotels() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [mainHotelsArr, setMainHotelsArr] = useState([]);
  const [displayHotelsArr, setDisplayHotelsArr] = useState([]);
  const hotelsArr = useSelector((state) => state.hotel.hotelsArr);
  const handleEditSet = (e, row) => {
    e.preventDefault();

    // dispatch(SetHOTELOBJ(row));
    navigate(`/Propertys/Edit/${row?._id}`);
  };
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterByQuery = (e, requiredParametersArr) => {
    let tempArr = displayHotelsArr.filter((el) => {
      for (const ele of requiredParametersArr) {
        console.log(
          `${el[ele]}`.toLowerCase().includes(`${e}`.toLowerCase()),
          "ele,el"
        );
        if (
          `${el[`${ele}`.toLowerCase()]}`
            .toLowerCase()
            .includes(`${e}`.toLowerCase())
        ) {
          // console.log("true")
          return true;
        } else {
          return false;
        }
      }
    });
    setQuery(e);
    setDisplayHotelsArr([...tempArr]);
    console.log([...tempArr], "...tempArr");
  };

  const handleChangeStatus = async (status, id) => {
    try {
      dispatch(HOTELUPDATE({ isActive: status }, id));
      handleGet();
    } catch (error) {
      toastError(error);
    }
  };

  const handleDelete = (e, row) => {
    e.preventDefault();

    if (!window.confirm("Are you sure ? ")) {
      return 0;
    }

    dispatch(HOTELDELETE(row._id));
  };

  const users_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "15%",
    },
    {
      name: "NAME",
      selector: (row) => `${row?.name}`,
      width: "25%",
    },
    {
      name: "Type",
      selector: (row) =>
        `${row?.hotelType == "Hotels" ? row?.hotelType : "Apartments"}  `,
      width: "10%",
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={generateFilePath(row?.mainImage)}
          width="100px"
          height="100px"
        />
      ),
      width: "15%",
    },
    {
      name: "Status",
      button: true,
      cell: (row) => (
        <Switch
          checked={row.isActive}
          onChange={() => handleChangeStatus(!row.isActive, row._id)}
        />
      ),
      width: "15%",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <CustomButton
            btntype="button"
            ClickEvent={(e) => handleEditSet(e, row)}
            isBtn
            iconName="fa-solid fa-pencil"
          />
          <div style={{ marginLeft: 14 }}>
            <CustomButton
              btntype="button"
              ClickEvent={(e) => handleDelete(e, row)}
              isBtn
              iconName="fa-solid fa-trash"
            />
          </div>
          <div style={{ marginLeft: 14 }}>
            <CustomButton
              path={`/Propertys/ViewRoom/${row._id}`}
              isLink
              iconName="fa-solid fa-eye"
              btnName="View Rooms"
            />
          </div>
        </>
      ),
      width: "20%",
    },
  ];

  const [tabList, settabList] = useState([
    {
      tabName: "All Customer",
      active: true,
    },
    {
      tabName: "Active Customer",
      active: false,
    },
    {
      tabName: "Inactive customer",
      active: false,
    },
  ]);

  const handleGet = (q) => {
    dispatch(HOTELGET(q));
  };
  useEffect(() => {
    if (hotelsArr && hotelsArr.length) {
      setMainHotelsArr(hotelsArr);
      setDisplayHotelsArr(hotelsArr);
    }
  }, [hotelsArr]);

  useEffect(() => {
    if (searchParams.get("type")) {
      let hotelType = [
        {
          name: searchParams.get("type"),
          checked: true,
        },
      ];

      let q = `&propertyType=${encodeURIComponent(JSON.stringify(hotelType))}`;
      handleGet(q);
    }
  }, [searchParams]);
  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <ul
              className="nav nav-pills dashboard-pills justify-content-end"
              id="pills-tab"
              role="tablist"
            >
              {/* {tabList.map((item, i) => {
                                return (
                                    <li key={i}>
                                        <CustomButton
                                            navPills
                                            btnName={item.tabName}
                                            pillActive={item.active ? true : false}
                                            path={item.path}
                                            extraClass={item.extraClass}
                                            ClickEvent={() => {
                                                tabClick(i, tabList, settabList);
                                            }}
                                        />
                                    </li>
                                );
                            })} */}
            </ul>
            <CustomButton
              isLink
              iconName="fa-solid fa-plus"
              btnName="Create Property"
              path="/Propertys/Add"
            />
          </div>
          <DashboardTable>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5 className="blue-1 m-0">Propertys</h5>
              <div className="d-flex align-items-center gap-3">
                <SearchBox
                  setQuery={(e) => {
                    handleFilterByQuery(e, ["name", "hotelType"]);
                  }}
                  query={query}
                  extraClass="bg-white"
                />
                {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="Customer CSV" path="/" small roundedPill downloadAble ClickEvent={() => downloadCSV(usersArr)} /> */}
              </div>
            </div>

            <DataTable
              columns={users_columns}
              data={displayHotelsArr}
              pagination
            />
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}
