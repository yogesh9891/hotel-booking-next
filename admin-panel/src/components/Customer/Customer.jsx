import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { images } from "../Images/Images";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import { downloadCSV } from "../Utility/CSV";
import { DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import tabClick from "../Utility/TabClick";
import { useDispatch, useSelector } from "react-redux";
import { usersGet } from "../../redux/actions/Users/users.actions";
import { updateUserKycStatus, updateUserStatus } from "../../services/users.service";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ProductDetail from "./CustomerDetail";
import { EditModal } from "../Utility/Modal";
import { toastSuccess } from "../Utility/ToastUtils";
import { toastError } from "../../utils/toastUtils";
function Customer() {
  const dispatch = useDispatch();
  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);
  const [displayUsersArr, setDisplayUsersArr] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [activeUsersArr, setActiveUsersArr] = useState([]);
  const [inActiveUsersArr, setInActiveUsersArr] = useState([]);
  const userArr = useSelector((state) => state.users.users);
  const [selectedData, setSelectedData] = useState(null);

  const handleChangeActiveStatus = async (id, value) => {
    try {
      let { data: res } = await updateUserStatus(id, { status: value });
      if (res.message) {
        toastSuccess(res.message);
        handleGetAllUsers();
      }
    } catch (err) {
      if (err.response.data.message) {
        console.error(err.response.data.message);
        toastError(err.response.data.message);
      } else {
        console.error(err.message);
        toastError(err.message);
      }
    }
  };

  const handleChangeKycStatus = async (id, value) => {
    try {
      let { data: res } = await updateUserKycStatus(id, { value: value });
      if (res.message) {
        toastSuccess(res.message);
        handleGetAllUsers();
      }
    } catch (err) {
      if (err.response.data.message) {
        console.error(err.response.data.message);
        toastError(err.response.data.message);
      } else {
        console.error(err.message);
        toastError(err.message);
      }
    }

    console.log(id, value);
  };

  const handleModalSet = (e, row) => {
    e.preventDefault();
    setModalBox(true);
    setModalType("customer-detail");
    setModalName("Customer Information");
    setSelectedData(row);
  };

  const users_columns = [
    {
      name: "ID",
      selector: (row) => row._id,
      sortable: true,
      width: "5%",
    },
    {
      name: "AVATAR",
      cell: (row) => <img src={images.customer} alt={row.firstname} />,
      width: "10%",
    },
    {
      name: "NAME",
      selector: (row) => `${row.firstName} ${row.lastName}`,
      width: "10%",
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      width: "15%",
    },
    {
      name: "PHONE",
      selector: (row) => row.phone,
      width: "10%",
    },
    {
      name: "IS ACTIVE",
      button: true,
      cell: (row) => <Switch onChange={(e) => handleChangeActiveStatus(row._id, e.target.checked)} checked={row.isActive} />,
      width: "10%",
    },
    {
      name: "Kyc Status",
      button: true,
      selector: (row) => row.kycStatus,
      width: "10%",
    },
    {
      name: "Change Kyc Status",
      button: true,
      cell: (row) => (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={row.kycStatus} label="Age" onChange={(e) => handleChangeKycStatus(row._id, e.target.value)}>
            <MenuItem value={"Pending"}>Pending</MenuItem>
            <MenuItem value={"Approve"}>Approve</MenuItem>
            <MenuItem value={"Denied"}>Denied</MenuItem>
          </Select>
        </FormControl>
      ),
      width: "20%",
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <CustomButton btntype="button" ClickEvent={(e) => handleModalSet(e, row)} isBtn iconName="fa-solid fa-check" btnName="View" />
          {selectedData && <EditModal ModalBox={ModalBox} data={selectedData} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} width="max-content" />}
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

  const handleGetAllUsers = () => {
    dispatch(usersGet());
  };
  useEffect(() => {
    if (userArr && userArr.length) {
      setUsersArr(userArr);
      setDisplayUsersArr(userArr);
      setActiveUsersArr(usersArr.filter((el) => el.isActive));
      setInActiveUsersArr(usersArr.filter((el) => !el.isActive));
    }
  }, [userArr]);

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetTselectedTable = () => {
    if (tabList.filter((el) => el.active)[0].tabName == "All Customer") {
      return <DataTable columns={users_columns} data={usersArr} pagination />;
    } else if (tabList.filter((el) => el.active)[0].tabName == "Active Customer") {
      return <DataTable columns={users_columns} data={activeUsersArr} pagination />;
    } else {
      return <DataTable columns={users_columns} data={inActiveUsersArr} pagination />;
    }
  };

  return (
    <main>
      <section className="product-category">
        <div className="container-fluid p-0">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <ul className="nav nav-pills dashboard-pills justify-content-end" id="pills-tab" role="tablist">
              {tabList.map((item, i) => {
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
              })}
            </ul>
            <CustomButton isLink iconName="fa-solid fa-plus" btnName="Create Customer" path="/Customer-Create" />
          </div>
          <DashboardTable>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5 className="blue-1 m-0">Active Customer</h5>
              <div className="d-flex align-items-center gap-3">
                <SearchBox extraClass="bg-white" />
                <CustomButton isLink iconName="fa-solid fa-download" btnName="Customer CSV" path="/" small roundedPill downloadAble ClickEvent={() => downloadCSV(usersArr)} />
              </div>
            </div>

            {handleGetTselectedTable()}
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}

export default Customer;
