import React, { useState } from "react";
import { images } from "../Images/Images";
import CustomButton from "../Utility/Button";
import { DashboardBox, DashboardTable } from "../Utility/DashboardBox";
import SearchBox from "../Utility/SearchBox";
import tabClick from "../Utility/TabClick";
import ActionIcon from "../Utility/ActionIcon";
import DataTable from "react-data-table-component";
import { downloadCSV } from "../Utility/CSV";
import { generateFilePath } from "../Utility/utils";
import { rolesObj } from "../../utils/roles";
import Select from "react-select";

function ProductDetail({ customerData }) {
  // ==============================================================================================
  console.log(customerData, "CUSTOMER");
  const [tabList, settabList] = useState([
    {
      tabName: "ORDERS",
      active: true,
    },
    {
      tabName: "WALLET HISTORIES",
      active: false,
    },
    {
      tabName: "ADDRESSES",
      active: false,
    },
  ]);
  const table_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Order ID",
      selector: (row) => row.order_id,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Total Product QTY",
      selector: (row) => row.product_quantity,
    },
    {
      name: "Total Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Order Status",
      button: true,
      width: "10%",
      cell: () => <CustomButton redBtn btnName="Pending" />,
    },
    {
      name: "Is Paid",
      button: true,
      width: "10%",
      cell: () => <CustomButton redBtn btnName="Pending" />,
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon approve detail detailpath="/Order/Sale-Detail" Uniquekey={row.id} />,
    },
  ];

  const table_data = [
    {
      id: "1",
      Seq: "1",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
    {
      id: "2",
      Seq: "2",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
    {
      id: "3",
      Seq: "3",
      date: "	17th Jun, 2022",
      order_id: "27220617041151	",
      email: "devesh.batra@ebslon.com",
      product_quantity: "6",
      amount: "4,232.00",
    },
  ];
  const wallet_columns = [
    {
      name: "SL",
      selector: (row) => row.Seq,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "User",
      selector: (row) => row.user,
    },
    {
      name: "TXN ID",
      selector: (row) => row.txn,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Payment Method",
      selector: (row) => row.method,
    },
    {
      name: "Action",
      cell: (row) => <ActionIcon approve decline Uniquekey={row.id} />,
    },
  ];

  const wallet_data = [
    {
      id: "1",
      Seq: "1",
      date: "	17th Jun, 2022",
      txn: "27220617041151	",
      user: "XYZ",
      method: "COD",
      type: "CGST",
      amount: "4,232.00",
    },
    {
      id: "2",
      Seq: "2",
      date: "	17th Jun, 2022",
      txn: "27220617041151	",
      user: "XYZ",
      method: "COD",
      type: "CGST",
      amount: "4,232.00",
    },
    {
      id: "3",
      Seq: "3",
      date: "	17th Jun, 2022",
      txn: "27220617041151	",
      user: "XYZ",
      method: "COD",
      type: "CGST",
      amount: "4,232.00",
    },
  ];

  const address_columns = [
    {
      name: "Full Name",
      sortable: true,
      selector: (row) => row.name,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Region",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.region,
    },
    {
      name: "Email",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.email,
    },
    {
      name: "Phone Number",
      minWidth: "200px",
      maxWidth: "210px",
      selector: (row) => row.contact,
    },
    {
      name: "Action",
      minWidth: "200px",
      maxWidth: "210px",
      button: true,
      cell: (row) => <CustomButton greenBtn noIcon btnName="EDIT" />,
    },
  ];

  const address_data = [
    {
      id: "1",
      name: "XYZ",
      address: "112/6 XYZ",
      region: "Delhi, India",
      email: "XYZ@gmail.com",
      contact: "5665455423",
    },
  ];

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // ==============================================================================================

  return (
    <main>
      <section className="product-category" >
        <div className="container-fluid p-0" style={{ height: "60vh", overflowY: "auto" }}>
          <DashboardBox className="mb-5" >
            <h5 className="blue-1 mb-4">Product Detail</h5>
            <div className="row">
              <div className={`col-12 col-md-12`}>
                <div className="customer-profile">
                  <h6 className="blue-1 text-capitalize my-3">{customerData?.name}</h6>
                  <ul className="blue-1 fs-14">
                    <li><span className="fw-600">Product Name <span>:</span></span>{customerData?.name}</li>
                    {
                      customerData.categoryArr && customerData.categoryArr.length > 0 && customerData.categoryArr.map((el, index) => {
                        return (
                          <li key={index}><span className="fw-600">Category {index + 1} Name <span>:</span></span>{el?.categoryObj.name}</li>
                        )
                      }
                      )
                    }
                    <li><span className="fw-600">Internal Code <span>:</span></span>{customerData?.internalCode}</li>
                    <li><span className="fw-600">Vendor Code <span>:</span></span>{customerData?.vendorCode}</li>
                    <li><span className="fw-600">Product Code <span>:</span></span>{customerData?.productCode}</li>
                    <li><span className="fw-600">Dusaan SKU <span>:</span></span>{customerData?.dusaanSku}</li>
                    <li><span className="fw-600">Company Name <span>:</span></span>{customerData?.companyName}</li>
                    <li><span className="fw-600">Company Address <span>:</span></span>{customerData?.companyAddress}</li>
                    <li><span className="fw-600">Company City <span>:</span></span>{customerData?.companyCity}</li>
                    <li><span className="fw-600">Company Country <span>:</span></span>{customerData?.companyCountry}</li>
                    <li><span className="fw-600">Company Pin Code <span>:</span></span>{customerData?.companyPinCode}</li>
                    <li><span className="fw-600">Country Of Origin <span>:</span></span>{customerData?.countryOfOrigin}</li>
                    <li><span className="fw-600">SKU <span>:</span></span>{customerData?.sku}</li>
                    <li><span className="fw-600">Description <span>:</span></span> <span dangerouslySetInnerHTML={{ __html: customerData?.description }}></span></li>
                    <li><span className="fw-600">Specification <span>:</span></span> <span dangerouslySetInnerHTML={{ __html: customerData?.specification }}></span></li>
                    <li><span className="fw-600">Vendor SKU <span>:</span></span>{customerData?.vendorSku}</li>
                    <li><span className="fw-600">Available Inventory <span>:</span></span>{customerData?.availableInventory}</li>
                    <li><span className="fw-600">Fragility <span>:</span></span>{customerData?.fragility}</li>
                    <li><span className="fw-600">Care Instructions <span>:</span></span>{customerData?.careInstructions}</li>
                    <li><span className="fw-600">Product Material <span>:</span></span>{customerData?.productMaterial}</li>
                    <li><span className="fw-600">GST <span>:</span></span>{customerData?.gst}</li>
                    <li><span className="fw-600">HSN <span>:</span></span>{customerData?.hsn}</li>
                    <li><span className="fw-600">MRP <span>:</span></span>{customerData?.mrp}</li>
                    <li><span className="fw-600">Pack contents <span>:</span></span>{customerData?.pack_contents}</li>
                    <li><span className="fw-600">Dhips in days <span>:</span></span>{customerData?.ships_in_days}</li>
                    <li><span className="fw-600">Return Policy <span>:</span></span>{customerData?.returnPolicy}</li>
                    <li><span className="fw-600">Exlusive <span>:</span></span>{customerData?.isExlusive ? "Yes" : "No"}</li>
                    <li><span className="fw-600">PrivateLabel <span>:</span></span>{customerData?.isPrivateLabel ? "Yes" : "No"}</li>
                    <li><span className="fw-600">MadeToOrder <span>:</span></span>{customerData?.isMadeToOrder ? "Yes" : "No"}</li>
                    <li><span className="fw-600">Seller Region Restrictions <span>:</span></span>{customerData?.sellerRegionRestrictions}</li>
                    <li><span className="fw-600">Type Of Pattern <span>:</span></span>{customerData?.typeOfPattern}</li>
                    <li><span className="fw-600">Date of manufacture <span>:</span></span>{`${new Date(customerData?.dom).toDateString()}`}</li>
                    <li><span className="fw-600">Shelf Life <span>:</span></span>{customerData?.shelfLife}</li>
                    <li><span className="fw-600">Product dimension width <span>:</span></span>{customerData?.product_dimension_width}</li>
                    <li><span className="fw-600">Product dimension height <span>:</span></span>{customerData?.product_dimension_height}</li>
                    <li><span className="fw-600">Product dimension length <span>:</span></span>{customerData?.product_dimension_length}</li>
                    <li><span className="fw-600">Product dimension weight <span>:</span></span>{customerData?.product_dimension_weight}</li>
                    <li><span className="fw-600">Packaging Length <span>:</span></span>{customerData?.packaging_Length}</li>
                    <li><span className="fw-600">Packaging Width <span>:</span></span>{customerData?.packaging_Width}</li>
                    <li><span className="fw-600">Packaging Height <span>:</span></span>{customerData?.packaging_Height}</li>
                    <li><span className="fw-600">Dead weight <span>:</span></span>{customerData?.dead_weight}</li>
                    <li><span className="fw-600">Tags <span>:</span></span>{customerData?.tags}</li>
                    <li><span className="fw-600">Video Link <span>:</span></span>{customerData?.videoLink}</li>
                    <li><span className="fw-600">Status <span>:</span></span>{customerData?.status}</li>
                    <li><span className="fw-600">Meta Title <span>:</span></span>{customerData?.metaTitle}</li>
                    <li><span className="fw-600">Meta Description <span>:</span></span>{customerData?.metaDescription}</li>
                    <li><span className="fw-600">Meta Image <span>:</span></span><br /><img src={generateFilePath(customerData?.metaImage)} style={{ height: 50, width: 50 }} alt="" /> </li>
                    {
                      customerData.imageArr && customerData.imageArr.length > 0 && customerData.imageArr.map((el, index) => {
                        return (
                          <li key={index}><span className="fw-600">Product Image {index + 1}<span>:</span></span><img src={generateFilePath(el?.image)} style={{ height: 50, width: 50 }} alt="" /> </li>
                        )

                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
          </DashboardBox>
          {/* <ul
            className="nav nav-pills dashboard-pills mb-3"
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
                    ClickEvent={() => {
                      tabClick(i, tabList, settabList);
                    }}
                  />
                </li>
              );
            })}
          </ul>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <ul
              className="nav nav-pills dashboard-pills mb-0"
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
                      ClickEvent={() => {
                        tabClick(i, tabList, settabList);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
            <div className="col-2">
              <Select options={options} placeholder='Filters' />
            </div>
          </div>
          <DashboardBox>
            {tabList.map((item) => {
              if (item.active) {
                if (item.tabName === "ORDERS") {
                  return (
                    <>
                      <div className="d-flex justify-content-between mb-3">
                        <CustomButton
                          isLink
                          iconName="fa-solid fa-download"
                          btnName={`${item.tabName} CSV`}
                          extraClass="d-flex align-items-center"
                          path="/"
                          small
                          roundedPill
                          downloadAble
                          ClickEvent={() => downloadCSV(table_data)}
                        />
                        <SearchBox extraClass="bg-light" />
                      </div>
                      <DashboardTable>
                        <DataTable
                          columns={table_columns}
                          data={table_data}
                          pagination
                        />
                      </DashboardTable>
                    </>
                  );
                }
                if (item.tabName === "WALLET HISTORIES") {
                  return (
                    <>
                      <div className="d-flex justify-content-between mb-3">
                        <CustomButton
                          isLink
                          iconName="fa-solid fa-download"
                          btnName={`${item.tabName} CSV`}
                          extraClass="d-flex align-items-center"
                          path="/"
                          small
                          roundedPill
                          downloadAble
                          ClickEvent={() => downloadCSV(table_data)}
                        />
                        <SearchBox extraClass="bg-light" />
                      </div>
                      <DashboardTable>
                        <DataTable
                          columns={wallet_columns}
                          data={wallet_data}
                          pagination
                        />
                      </DashboardTable>
                    </>
                  );
                }
                if (item.tabName === "ADDRESSES") {
                  return (
                    <>
                      <div className="d-flex justify-content-between mb-3">
                        <CustomButton
                          isLink
                          iconName="fa-solid fa-download"
                          btnName={`${item.tabName} CSV`}
                          extraClass="d-flex align-items-center"
                          path="/"
                          small
                          roundedPill
                          downloadAble
                          ClickEvent={() => downloadCSV(table_data)}
                        />
                        <SearchBox extraClass="bg-light" />
                      </div>
                      <DashboardTable>
                        <DataTable
                          columns={address_columns}
                          data={address_data}
                          pagination
                        />
                      </DashboardTable>
                    </>
                  );
                }
              }
            })}
          </DashboardBox> */}
        </div >
      </section >
    </main >
  );
}

export function UserDetailModal({ customerData }) {
  // ==============================================================================================
  console.log(customerData, "CUSTOMER");
  // ==============================================================================================

  return (
    <main>
      <section className="product-category" >
        <div className="container-fluid p-0" style={{ height: "60vh", overflowY: "auto", maxWidth: "80vw" }}>
          <DashboardBox className="mb-5" >
            <h5 className="blue-1 mb-4">{customerData.role} DETAIL</h5>
            <div className="row">
              <div className={`col-12 col-md-12`} style={{ overflowWrap: "break-word" }}>
                <div className="customer-profile">
                  {/* <h6 className="blue-1 text-capitalize my-3">{customerData?.name ? customerData?.name : customerData?.role}</h6> */}
                  <ul className="blue-1 fs-14">
                    <li><span className="fw-600">Name <span>:</span></span>{customerData?.name ? customerData?.name : "NA"}</li>
                    <li><span className="fw-600">Email <span>:</span></span>{customerData?.email ? customerData?.email : "NA"}</li>
                    <li><span className="fw-600">Phone <span>:</span></span>{customerData?.phone ? customerData?.phone : "NA"}</li>
                    <li><span className="fw-600">Is Active <span>:</span></span>{customerData?.isActive ? "Yes" : "No"}</li>
                    <li><span className="fw-600">Is Approved <span>:</span></span>{customerData?.isApproved ? "Yes" : "No"}</li>
                    {
                      customerData.role == rolesObj.SELLER &&
                      <>
                        <li><span className="fw-600">Seller Commission Category <span>:</span></span>{customerData?.sellerCategoryObj?.name ? `${customerData?.sellerCategoryObj?.name}` : "NA"} </li>
                        <li><span className="fw-600">Seller Commission Value <span>:</span></span>{customerData?.sellerCategoryObj?.commission ? `${customerData?.sellerCategoryObj?.commission}%` : "NA"} </li>
                        <li><span className="fw-600">Nature of business <span>:</span></span>{customerData?.natureofBusiness ? customerData?.natureofBusiness : "NA"} </li>
                        <li><span className="fw-600">Nature of business other <span>:</span></span>{customerData?.natureOfBusinessOther ? customerData?.natureOfBusinessOther : "NA"} </li>
                        <li><span className="fw-600">Other business type <span>:</span></span>{customerData?.otherBusinessType ? customerData?.otherBusinessType : "NA"} </li>
                        <li><span className="fw-600">Business type <span>:</span></span>{customerData?.businessType ? customerData?.businessType : "NA"} </li>
                        <li><span className="fw-600">Correspondance address <span>:</span></span>{customerData?.correspondanceAddress ? customerData?.correspondanceAddress : "NA"} </li>
                        <li><span className="fw-600">Correspondance address landmark <span>:</span></span>{customerData?.correspondanceAddressLandmark ? customerData?.correspondanceAddressLandmark : "NA"} </li>
                        <li><span className="fw-600">Working unit address <span>:</span></span>{customerData?.workingUnitAddress ? customerData?.workingUnitAddress : "NA"} </li>
                        <li><span className="fw-600">Working unit landmark <span>:</span></span>{customerData?.workingUnitLandmark ? customerData?.workingUnitLandmark : "NA"} </li>
                        <li><span className="fw-600">Pickup and drop address <span>:</span></span>{customerData?.pickupAndDropAddress ? customerData?.pickupAndDropAddress : "NA"} </li>
                        <li><span className="fw-600">Pickup and drop other address <span>:</span></span>{customerData?.pickupAndDropOtherAddress ? customerData?.pickupAndDropOtherAddress : "NA"} </li>
                        <li><span className="fw-600">Pickup and drop other landmark <span>:</span></span>{customerData?.pickupAndDropOtherLandmark ? customerData?.pickupAndDropOtherLandmark : "NA"} </li>
                        <li><span className="fw-600">Gstn <span>:</span></span>{customerData?.GSTN ? customerData?.GSTN : "NA"} </li>
                        <li><span className="fw-600">Businessscale <span>:</span></span>{customerData?.BusinessScale ? customerData?.BusinessScale : "NA"} </li>
                        <li><span className="fw-600">Certifications <span>:</span></span>{customerData?.certifications ? customerData?.certifications : "NA"} </li>
                        <li><span className="fw-600">Turnover <span>:</span></span>{customerData?.turnover ? customerData?.turnover : "NA"} </li>
                        <li><span className="fw-600">Cin <span>:</span></span>{customerData?.CIN ? customerData?.CIN : "NA"} </li>
                        <li><span className="fw-600">Pan <span>:</span></span>{customerData?.PAN ? customerData?.PAN : "NA"} </li>
                        <li><span className="fw-600">Aadhaar <span>:</span></span>{customerData?.Aadhaar ? customerData?.Aadhaar : "NA"} </li>
                        <li><span className="fw-600">Name of authorised signatory <span>:</span></span>{customerData?.nameOfAuthorisedSignatory ? customerData?.nameOfAuthorisedSignatory : "NA"} </li>
                        <li><span className="fw-600">Authorised signatory address <span>:</span></span>{customerData?.authorisedSignatoryAddress ? customerData?.authorisedSignatoryAddress : "NA"} </li>
                        <li><span className="fw-600">Authorised signatory contact <span>:</span></span>{customerData?.authorisedSignatoryContact ? customerData?.authorisedSignatoryContact : "NA"} </li>
                        <li><span className="fw-600">Business commence mantdate <span>:</span></span>{customerData?.businessCommencementDate ? customerData?.businessCommencementDate : "NA"} </li>
                        <li><span className="fw-600">Awards and recognitions <span>:</span></span>{customerData?.awardsAndRecognitions ? customerData?.awardsAndRecognitions : "NA"} </li>
                        <li><span className="fw-600">Quality compliance and certificates <span>:</span></span>{customerData?.qualityComplianceAndCertificates ? customerData?.qualityComplianceAndCertificates : "NA"} </li>
                        <li><span className="fw-600">Monthly production capacity <span>:</span></span>{customerData?.monthlyProductionCapacity ? customerData?.monthlyProductionCapacity : "NA"} </li>
                        <li><span className="fw-600">Upload processing videos <span>:</span></span>{customerData?.uploadProcessingVideos ? customerData?.uploadProcessingVideos : "NA"} </li>
                        <li><span className="fw-600">Account no <span>:</span></span>{customerData?.accountNo ? customerData?.accountNo : "NA"} </li>
                        <li><span className="fw-600">Account holder name <span>:</span></span>{customerData?.accountHolderName ? customerData?.accountHolderName : "NA"} </li>
                        <li><span className="fw-600">Ifsc code <span>:</span></span>{customerData?.ifscCode ? customerData?.ifscCode : "NA"} </li>
                        <li><span className="fw-600">Swift code <span>:</span></span>{customerData?.swiftCode ? customerData?.swiftCode : "NA"} </li>
                        <li><span className="fw-600">Bank name <span>:</span></span>{customerData?.bankName ? customerData?.bankName : "NA"} </li>
                        <li><span className="fw-600">Other market place url <span>:</span></span>{customerData?.otherMarketPlaceUrl ? customerData?.otherMarketPlaceUrl : "NA"} </li>
                        <li><span className="fw-600">Facebook url <span>:</span></span>{customerData?.facebook ? customerData?.facebook : "NA"} </li>
                        <li><span className="fw-600">Instagram url <span>:</span></span>{customerData?.instagram ? customerData?.instagram : "NA"} </li>
                        <li><span className="fw-600">Twitter url <span>:</span></span>{customerData?.twitter ? customerData?.twitter : "NA"} </li>
                        <li><span className="fw-600">Linkedin url <span>:</span></span>{customerData?.linkedIn ? customerData?.linkedIn : "NA"} </li>
                        <li><span className="fw-600">Other Link <span>:</span></span>{customerData?.otherLink ? customerData?.otherLink : "NA"} </li>
                        <li><span className="fw-600">Website url <span>:</span></span>{customerData?.websiteUrl ? customerData?.websiteUrl : "NA"} </li>
                        <li><span className="fw-600">Copy of cancelled cheque <span>:</span></span>
                          {
                            customerData?.copyOfCancelledCheque &&
                            <img img src={generateFilePath(customerData?.copyOfCancelledCheque)} style={{ height: 50, width: 50 }} alt="" />
                          }
                        </li>
                        <li><span className="fw-600">Working unit pics <span>:</span></span>
                          {
                            customerData?.workingUnitpics &&
                            <img img src={generateFilePath(customerData?.workingUnitpics)} style={{ height: 50, width: 50 }} alt="" />
                          }
                        </li>
                      </>
                    }
                  </ul>
                </div>
              </div>
            </div>
          </DashboardBox>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
