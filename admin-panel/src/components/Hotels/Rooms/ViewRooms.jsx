import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../Utility/Button";
import { DashboardTable } from "../../Utility/DashboardBox";
import SearchBox from "../../Utility/SearchBox";
// import ProductDetail from "CustomerDetail";
import { useNavigate, useParams } from "react-router-dom";
import {
  ROOMDELETE,
  ROOMGET,
  SetROOMOBJ,
} from "../../../redux/actions/Room/Room.action";

export default function ViewRooms() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: hotelId } = useParams();
  const [mainRoomsArr, setMainRoomsArr] = useState([]);
  const [displayRoomsArr, setDisplayRoomsArr] = useState([]);
  const roomsArr = useSelector((state) => state.room.roomsArr);
  const handleEditSet = (e, row) => {
    e.preventDefault();
    dispatch(SetROOMOBJ(row));
    navigate(`/Propertys/AddRoom/${hotelId}`);
  };

  const handleAddSet = () => {
    dispatch(SetROOMOBJ({}));
    navigate(`/Propertys/AddRoom/${hotelId}`);
  };

  useEffect(() => {
    if (hotelId) {
      handleGet(hotelId);
    } else {
      navigate(-1);
    }
  }, [hotelId]);

  const handleDelete = (e, row) => {
    e.preventDefault();
    dispatch(ROOMDELETE(row));
  };

  const users_columns = [
    {
      name: "ID",
      selector: (row, index) => index + 1,
      sortable: true,
      width: "25%",
    },
    {
      name: "NAME",
      selector: (row) => `${row?.name}`,
      width: "25%",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <CustomButton
            btntype="button"
            ClickEvent={(e) => handleEditSet(e, row)}
            isBtn
            iconName="fa-solid fa-check"
            btnName="Edit"
          />
          <div style={{ marginLeft: 14 }}>
            <CustomButton
              btntype="button"
              ClickEvent={(e) => handleDelete(e, row)}
              isBtn
              noIcon={true}
              btnName="Delete"
            />
          </div>
        </>
      ),
      width: "15%",
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

  const handleGet = (hotelId) => {
    dispatch(ROOMGET(`hotelId=${hotelId}`));
  };
  useEffect(() => {
    if (roomsArr && roomsArr.length > 0) {
      setMainRoomsArr(roomsArr);
      setDisplayRoomsArr(roomsArr);
    } else {
      setMainRoomsArr([]);
      setDisplayRoomsArr([]);
    }
  }, [roomsArr]);

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
              isBtn
              iconName="fa-solid fa-plus"
              btnName="Create Room"
              ClickEvent={(e) => handleAddSet()}
            />
          </div>
          <DashboardTable>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5 className="blue-1 m-0">Rooms</h5>
              <div className="d-flex align-items-center gap-3">
                <SearchBox extraClass="bg-white" />
                {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="Customer CSV" path="/" small roundedPill downloadAble ClickEvent={() => downloadCSV(usersArr)} /> */}
              </div>
            </div>

            <DataTable
              columns={users_columns}
              data={displayRoomsArr}
              pagination
            />
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}
