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
// import CustomerDetail from "./CustomerDetail";
import { EditModal } from "../Utility/Modal";
import { toastError, toastSuccess } from "../Utility/ToastUtils";
import { rolesObj } from "../../utils/roles";
function User() {
  const dispatch = useDispatch();
  const [ModalType, setModalType] = useState("");
  const [ModalName, setModalName] = useState("");
  const [ModalBox, setModalBox] = useState(false);
  const [displayUsersArr, setDisplayUsersArr] = useState([]);
  const [usersArr, setUsersArr] = useState([]);
  const [activeUsersArr, setActiveUsersArr] = useState([]);
  const [inActiveUsersArr, setInActiveUsersArr] = useState([]);
  const userArr = useSelector((state) => state.users.users);
  const role = useSelector((state) => state.auth.role);
  const [selectedData, setSelectedData] = useState(null);

  const handleChangeActiveStatus = async (id, value) => {
    try {
      let { data: res } = await updateUserStatus(id, { isActive: value });
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


  const handleChangeApprovalStatusStatus = async (id, value) => {
    try {
      console.log(value)
      let { data: res } = await updateUserStatus(id, { isApproved: value });
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
  const [users_columns, setUsers_columns] = useState([
    {
      name: "ID",
      selector: (row, index) => index + 1,
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
      selector: (row) => `${row.name}`,
      width: "10%",
    },
    {
      name: "EMAIL",
      selector: (row) => row.email,
      width: "15%",
    },
    {
      name: "PHONE",
      selector: (row) => (row.phone || row.phone != "") ? row.phone : "NA",
      width: "10%",
    },
    {
      name: "ROLE",
      selector: (row) => row.role,
      width: "10%",
    },
    {
      name: "IS ACTIVE",
      button: true,
      cell: (row) => <Switch onChange={(e) => handleChangeActiveStatus(row._id, e.target.checked)} checked={row.isActive} />,
      width: "8%",
    },
    {
      name: "Approval Status",
      button: true,
      cell: (row) => <Switch onChange={(e) => handleChangeApprovalStatusStatus(row._id, e.target.checked)} checked={row.isApproved} />,
      width: "10%",
    },

  ]);

  const [tabList, settabList] = useState([
    {
      tabName: "All Users",
      active: true,
    },
    {
      tabName: "Active Users",
      active: false,
    },
    {
      tabName: "Inactive Users",
      active: false,
    },
    {
      tabName: "Warehouse",
      active: false,
    },
    {
      tabName: "Store",
      active: false,
    },
  ]);

  const handleGetAllUsers = () => {
    dispatch(usersGet());
  };
  useEffect(() => {
    console.log(userArr)
    if (userArr && userArr.length) {
      setUsersArr(userArr);
      setDisplayUsersArr(userArr);
      setActiveUsersArr(usersArr.filter((el) => el.isActive));
      setInActiveUsersArr(usersArr.filter((el) => !el.isActive));
    }
  }, [userArr]);


  useEffect(() => {
    if (role == rolesObj.ADMIN) {
      setUsers_columns(previousState => [...previousState, {
        name: "Action",
        cell: (row) => (
          <>
            <CustomButton btntype="button" ClickEvent={(e) => handleModalSet(e, row)} isBtn iconName="fa-solid fa-check" btnName="View" />
            {
              (row.role == rolesObj.SELLER || row.role == rolesObj.SUBADMIN) &&
              <div style={{ paddingLeft: "10px" }}>
                <CustomButton isLink btnName="Edit" path={`/User/User-edit/${row._id}`} edit iconName="fa-solid fa-pen-to-square" />
              </div>
            }
          </>
        ),
        width: "15%",
      }]
      )
    }
    else if (role == rolesObj.SUBADMIN) {
      setUsers_columns(previousState => [...previousState, {
        name: "Action",
        cell: (row) => (
          <>
            <CustomButton btntype="button" ClickEvent={(e) => handleModalSet(e, row)} isBtn iconName="fa-solid fa-check" btnName="View" />
            {

              row.role == rolesObj.SELLER || row.role == rolesObj.BUYER &&
              <div style={{ paddingLeft: "10px" }}>
                <CustomButton btntype="button" isRedirected={true} editPath={`/User/User-edit/${row._id}`} edit ClickEvent={(e) => handleModalSet(e, row)} iconName="fa-solid fa-pen-to-square" btnName="Edit" />
              </div>
            }
            {/* {selectedData && <EditModal ModalBox={ModalBox} data={selectedData} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} width="max-content" />} */}
          </>
        ),
        width: "15%",
      }]
      )
    }
    else {
      setUsers_columns(previousState => [...previousState, {
        name: "Action",
        cell: (row) => (
          <>
            <CustomButton btntype="button" ClickEvent={(e) => handleModalSet(e, row)} isBtn iconName="fa-solid fa-check" btnName="View" />
            {/* {selectedData && <EditModal ModalBox={ModalBox} data={selectedData} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} width="max-content" />} */}
          </>
        ),
        width: "15%",
      }]
      )
    }



    if (role == rolesObj.ADMIN) {
      settabList(prevState => {
        return [...prevState, {
          tabName: "Sub Admins",
          active: false,
        },
        {
          tabName: "Warehouse",
          active: false,
        },
        {
          tabName: "Store",
          active: false,
        },]
      })
    }
    if (role == rolesObj.SUBADMIN) {
      settabList(prevState => {
        return [...prevState,
        {
          tabName: "Warehouse",
          active: false,
        },
        {
          tabName: "Store",
          active: false,
        },
        ]
      })
    }

    return () => {
      setUsers_columns([{
        name: "ID",
        selector: (row, index) => index + 1,
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
        selector: (row) => `${row.name}`,
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
        name: "ROLE",
        selector: (row) => row.role,
        width: "10%",
      },
      {
        name: "IS ACTIVE",
        button: true,
        cell: (row) => <Switch onChange={(e) => handleChangeActiveStatus(row._id, e.target.checked)} checked={row.isActive} />,
        width: "8%",
      },
      {
        name: "Approval Status",
        button: true,
        cell: (row) => <Switch onChange={(e) => handleChangeApprovalStatusStatus(row._id, e.target.checked)} checked={row.isApproved} />,
        width: "10%",
      },])
      settabList([
        {
          tabName: "All Users",
          active: true,
        },
        {
          tabName: "Active Users",
          active: false,
        },
        {
          tabName: "Inactive Users",
          active: false,
        },
      ])
    }
  }, [role, usersArr])

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  const handleGetTselectedTable = () => {
    if (tabList.filter((el) => el.active)[0].tabName == "All Users") {
      return <DataTable columns={users_columns} data={usersArr} pagination />;
    } else if (tabList.filter((el) => el.active)[0].tabName == "Active Users") {
      return <DataTable columns={users_columns} data={activeUsersArr} pagination />;
    }
    else if (tabList.filter((el) => el.active)[0].tabName == "Sub Admins") {
      return <DataTable columns={users_columns} data={usersArr.filter(el => el.role == rolesObj.SUBADMIN)} pagination />;
    }
    else if (tabList.filter((el) => el.active)[0].tabName == "Warehouse") {
      return <DataTable columns={users_columns} data={usersArr.filter(el => el.role == rolesObj.WAREHOUSE)} pagination />;
    }
    else if (tabList.filter((el) => el.active)[0].tabName == "Store") {
      return <DataTable columns={users_columns} data={usersArr.filter(el => el.role == rolesObj.STORE)} pagination />;
    }
    else {
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
            <CustomButton isLink iconName="fa-solid fa-plus" btnName="Create User" path="/User-Create" />
          </div>
          <DashboardTable>
            <div className="d-flex align-items-center justify-content-between mb-5">
              <h5 className="blue-1 m-0">Active Customer</h5>
              <div className="d-flex align-items-center gap-3">
                <SearchBox extraClass="bg-white" />
                {/* <CustomButton isLink iconName="fa-solid fa-download" btnName="Customer CSV" path="/" small roundedPill downloadAble ClickEvent={() => downloadCSV(usersArr)} /> */}
              </div>
            </div>
            <EditModal ModalBox={ModalBox} data={selectedData} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} width="max-content" />

            {handleGetTselectedTable()}
          </DashboardTable>
        </div>
      </section>
    </main>
  );
}

export default User;
