import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import ActionIcon from "../Utility/ActionIcon";
import CustomButton from "../Utility/Button";
import SearchBox from "../Utility/SearchBox";
import { DashboardTable } from "../Utility/DashboardBox";
import { useSelector, useDispatch } from "react-redux";
import { SetPackageObj, PackageDelete, PackageGet } from "../../redux/actions/Package/Package.actions";
import { generateFilePath } from "../Utility/utils";

export const ViewPackage = () => {

    const dispatch = useDispatch();
    const packageArr = useSelector((packages) => packages.packages.packages);
    const packageObj = useSelector((packages) => packages.packages.packageObj);
    const [displaypackageArr, setDisplayPackageArr] = useState([]);
    const [query, setQuery] = useState("");
    const [packageMainArr, setPackageMainArr] = useState([]);


    useEffect(() => {
        handleGet()
    }, [])


    const handlePackageEdit = (row) => {
        dispatch(SetPackageObj(row));
    };

 

    const handleGet = () => {
        dispatch(PackageGet());
    };

    const handlePackageDelete = (row) => {
        dispatch(PackageDelete(row._id))
        dispatch(SetPackageObj({}));
    }


    useEffect(() => {
        console.log(packageArr,"hsuidfsaiufagsdifgifuayfiutfgitiu")
    
            setPackageMainArr(packageArr)
            setDisplayPackageArr(packageArr)
        
    }, [packageArr])
    const package_columns = [
        {
          name: "SL",
          selector: (row,index) => index + 1,
          sortable: true,
          width: "5%",
        },
        {
            name: "Image",
            grow: 0,
            cell: (row) => <img height="84px" width="56px" src={generateFilePath(row?.mainImage)} />,
            width: "15%",
          },
        {
          name: "Name",
          selector: (row) => row.name,
          width: "20%",
        },
        {
          name: "Caption",
          selector: (row) => row.caption,
          width: "20%",
        },
            {
                name: "Status",
                minWidth: "210px",
                maxWidth: "211px",
                button: true,
                cell: (row) => <CustomButton greenBtn noIcon btnName={`${row.status == "APPROVED" ? "Active" : "InActive"}`} path={"/Location/View-Country"} />,
            },
            {
                name: "Action",
                minWidth: "210px",
                maxWidth: "211px",
                cell: (row) => <ActionIcon Uniquekey={row._id} remove edit deletePath="/Package/View-Package" onDeleteClick={() => handlePackageDelete(row)} isRedirected={true} onEditClick={() => handlePackageEdit(row)} editPath="/Package/Add-Package" />,
            },
      ];
  
    
      return (
        <main>
          <section className="product-category" style={{ minHeight: "75vh" }}>
            <div className="container-fluid p-0">
              <div className="row">
                <div className="col-12">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <h5 className="blue-1 m-0">Package List</h5>
                    <div className="d-flex gap-3">
                      <CustomButton
                        isLink
                        iconName="fa-solid fa-plus"
                        btnName="ADD NEW Package"
                        path="/Package/Add-Package"
                      />
                      <SearchBox extraClass="bg-white" />
                    </div>
                  </div>
                  <DashboardTable>
                    <DataTable columns={package_columns} data={packageMainArr && packageMainArr.length > 0 ? packageMainArr : []}  pagination />
                  </DashboardTable>
                </div>
              </div>
            </div>
          </section>
        </main>
      );
}


export default ViewPackage;
