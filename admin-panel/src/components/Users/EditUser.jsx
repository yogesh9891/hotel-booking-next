import React, { useEffect, useState } from "react";
import { businessNatureObj, businessTypeObj, rolesObj } from "../../utils/roles";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import Select from "react-select";

import { toastError, toastSuccess } from "../Utility/ToastUtils";
import { addUser, updateUser } from "../../services/users.service";
import { useDispatch, useSelector } from "react-redux";
import FileUpload from "../Utility/FileUpload";
import { useParams } from "react-router-dom";
import { getUserById } from "../../redux/actions/Users/users.actions";
function EditUser() {
    const dispatch = useDispatch()
    const params = useParams()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(false);
    const [role, setRole] = useState(rolesObj.BUYER);
    const [sellerCategoryId, setSellerCategoryId] = useState("");
    const userObj = useSelector(state => state.users.userObj)
    const [sellerCategoryArr, setSellerCategoryArr] = useState([]);
    const [rolesArr, setRolesArr] = useState([{ value: "SUBADMIN", label: "SUBADMIN" }, { value: "SELLER", label: "SELLER" }, { value: "BUYER", label: "BUYER" }]);

    const [businessTypeObjValue, setBusinessTypeObjValue] = useState({});
    const [sellerCommissionObj, setSellerCommissionObj] = useState({});
    const [natureOfBusinessObj, setNatureOfBusinessObj] = useState({});

    const [businessTypesArr, setBusinessTypesArr] = useState([
        { value: "MANUFACTURER", label: "MANUFACTURER" },
        { value: "IMPORTER", label: "IMPORTER" },
        { value: "EXPORTER", label: "EXPORTER" },
        { value: "WHOLESALER", label: "WHOLESALER" },
        { value: "RESELLER", label: "RESELLER" },
        { value: "OTHERS", label: "OTHERS" },
    ]);
    const [natureOfBusinessArr, setNatureOfBusinessArr] = useState([
        { value: "PROPRIETOR", label: "PROPRIETOR" },
        { value: "PARTNERSHIP", label: "PARTNERSHIP" },
        { value: "PRIVATELTDCO", label: "PRIVATELTDCO" },
        { value: "PUBLICLTDCO", label: "PUBLICLTDCO" },
        { value: "ONEPERSONCOMPANY", label: "ONEPERSONCOMPANY" },
        { value: "OTHERS", label: "OTHERS" },
    ]);
    const [natureofBusiness, setNatureofBusiness] = useState("");
    const [natureOfBusinessOther, setNatureOfBusinessOther] = useState("");
    const [otherBusinessType, setOtherBusinessType] = useState("");
    const [businessType, setBusinessType] = useState("");
    // Contact Details
    const [correspondanceAddress, setCorrespondanceAddress] = useState("");
    const [correspondanceAddressLandmark, setCorrespondanceAddressLandmark] = useState("");
    const [workingUnitAddress, setWorkingUnitAddress] = useState("");
    const [workingUnitLandmark, setWorkingUnitLandmark] = useState("");
    const [pickupAndDropAddress, setPickupAndDropAddress] = useState(""); ////////if others selected then 2 states below this one will be filled. 
    const [pickupAndDropOtherAddress, setPickupAndDropOtherAddress] = useState("");
    const [pickupAndDropOtherLandmark, setPickupAndDropOtherLandmark] = useState("");
    //Contact Details/////kyc details
    const [GSTN, setGSTN] = useState("");
    const [BusinessScale, setBusinessScale] = useState("");
    const [certifications, setCertifications] = useState("");
    const [turnover, setTurnover] = useState("");
    const [CIN, setCIN] = useState("");
    const [PAN, setPAN] = useState("");
    const [Aadhaar, setAadhaar] = useState("");
    ///////seller profile
    const [nameOfAuthorisedSignatory, setNameOfAuthorisedSignatory] = useState("");
    const [authorisedSignatoryAddress, setAuthorisedSignatoryAddress] = useState("");
    const [authorisedSignatoryContact, setAuthorisedSignatoryContact] = useState("");
    const [businessCommencementDate, setBusinessCommencementDate] = useState("");
    const [awardsAndRecognitions, setAwardsAndRecognitions] = useState("");
    const [qualityComplianceAndCertificates, setQualityComplianceAndCertificates] = useState("");
    ///////seller profile/////////////this will only be visible if seller is a manufacturer which will be determined by business type
    const [monthlyProductionCapacity, setMonthlyProductionCapacity] = useState("");
    const [uploadProcessingVideos, setUploadProcessingVideos] = useState("");
    const [workingUnitpics, setWorkingUnitpics] = useState("");
    /////////banking details
    const [accountNo, setAccountNo] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [swiftCode, setSwiftCode] = useState("");
    const [bankName, setBankName] = useState("");
    const [copyOfCancelledCheque, setCopyOfCancelledCheque] = useState("");
    /////////online pressence
    const [otherMarketPlaceUrl, setOtherMarketPlaceUrl] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [twitter, setTwitter] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [otherLink, setOtherLink] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [permissionsArr, setPermissionsArr] = useState([
        {
            name: "Category",
            permissionsObj: {
                READ: false,
                CREATE: false,
                UPDATE: false,
                DELETE: false
            },

        },
        {
            name: "Products",
            permissionsObj: {
                READ: false,
                CREATE: false,
                UPDATE: false,
                DELETE: false
            },
        },
        {
            name: "Homepage customizations",
            permissionsObj: {
                READ: false,
                CREATE: false,
                UPDATE: false,
                DELETE: false
            },
        }
    ]);


    const handleSubmit = async () => {
        try {
            if (name == "") {
                toastError("Name is mandatory")
                return
            }
            else if (email == "") {
                toastError("Email is mandatory")
                return
            }
            else if (phone == "") {
                toastError("Phone is mandatory")
                return
            }
            else if (phone.length != 10) {
                toastError("Invalid Phone number")
                return
            }
            if (role == rolesObj.SELLER) {
                if (natureofBusiness == "") {
                    toastError("Nature of Business is mandatory")
                    return
                }
                if (sellerCategoryId == "") {
                    toastError("Seller Category is mandatory")
                    return
                }
                else if (businessType == "") {
                    toastError("Business Type is mandatory")
                    return
                }
                else if (correspondanceAddress == "") {
                    toastError("Correspondance Address is mandatory")
                    return
                }
                else if (correspondanceAddressLandmark == "") {
                    toastError("Correspondance Address Landmark is mandatory")
                    return
                }
                else if (workingUnitAddress == "") {
                    toastError("Working Unit Address Landmark is mandatory")
                    return
                }
                else if (workingUnitLandmark == "") {
                    toastError("Working Unit Landmark is mandatory")
                    return
                }
                else if (pickupAndDropAddress == "") {
                    toastError("Pickup And Drop Address is mandatory")
                    return
                }
                else if (pickupAndDropAddress == "Other" && pickupAndDropOtherAddress == "") {
                    toastError("Pickup And Drop Other Address is mandatory")
                    return
                }
                else if (pickupAndDropAddress == "Other" && pickupAndDropOtherLandmark == "") {
                    toastError("Pickup And Drop Other Landmark is mandatory")
                    return
                }
                else if (GSTN == "") {
                    toastError("GSTN is mandatory")
                    return
                }
                else if (BusinessScale == "") {
                    toastError("Business Scale is mandatory")
                    return
                }
                else if (certifications == "") {
                    toastError("Certifications is mandatory")
                    return
                }
                else if (turnover == "") {
                    toastError("Turnover is mandatory")
                    return
                }
                else if (CIN == "") {
                    toastError("CIN is mandatory")
                    return
                }
                else if (PAN == "") {
                    toastError("PAN is mandatory")
                    return
                }
                else if (Aadhaar == "") {
                    toastError("Aadhaar is mandatory")
                    return
                }
                else if (nameOfAuthorisedSignatory == "") {
                    toastError("Name Of Authorised Signatory is mandatory")
                    return
                }
                else if (authorisedSignatoryAddress == "") {
                    toastError("Authorised Signatory Address is mandatory")
                    return
                }
                else if (authorisedSignatoryContact == "") {
                    toastError("Authorised Signatory Contact is mandatory")
                    return
                }
                else if (businessCommencementDate == "") {
                    toastError("Business Commencement Date is mandatory")
                    return
                }
                else if (qualityComplianceAndCertificates == "") {
                    toastError("Quality Compliance And Certificates is mandatory")
                    return
                }
                else if (accountNo == "") {
                    toastError("Account No is mandatory")
                    return
                }
                else if (accountHolderName == "") {
                    toastError("Account Holder Name is mandatory")
                    return
                }
                else if (ifscCode == "") {
                    toastError("IFSC Code is mandatory")
                    return
                }
                else if (swiftCode == "") {
                    toastError("Swift Code is mandatory")
                    return
                }
                else if (bankName == "") {
                    toastError("Bank Name is mandatory")
                    return
                }
                else if (copyOfCancelledCheque == "") {
                    toastError("Copy Of Cancelled Cheque is mandatory")
                    return
                }
            }

            let obj = {
                name,
                email,
                phone,
                password,
                isActive: status,
                role,
            }


            if (role == rolesObj.SELLER) {
                obj.natureofBusiness = natureofBusiness
                obj.natureOfBusinessOther = natureOfBusinessOther
                obj.otherBusinessType = otherBusinessType
                obj.businessType = businessType
                obj.correspondanceAddress = correspondanceAddress
                obj.correspondanceAddressLandmark = correspondanceAddressLandmark
                obj.workingUnitAddress = workingUnitAddress
                obj.workingUnitLandmark = workingUnitLandmark
                obj.pickupAndDropAddress = pickupAndDropAddress
                obj.pickupAndDropOtherAddress = pickupAndDropOtherAddress
                obj.pickupAndDropOtherLandmark = pickupAndDropOtherLandmark
                obj.GSTN = GSTN
                obj.BusinessScale = BusinessScale
                obj.sellerCategoryId = sellerCategoryId
                obj.certifications = certifications
                obj.turnover = turnover
                obj.CIN = CIN
                obj.PAN = PAN
                obj.Aadhaar = Aadhaar
                obj.nameOfAuthorisedSignatory = nameOfAuthorisedSignatory
                obj.authorisedSignatoryAddress = authorisedSignatoryAddress
                obj.authorisedSignatoryContact = authorisedSignatoryContact
                obj.businessCommencementDate = businessCommencementDate
                obj.awardsAndRecognitions = awardsAndRecognitions
                obj.qualityComplianceAndCertificates = qualityComplianceAndCertificates
                obj.monthlyProductionCapacity = monthlyProductionCapacity
                obj.uploadProcessingVideos = uploadProcessingVideos
                obj.workingUnitpics = workingUnitpics
                obj.uploadProcessingVideos = uploadProcessingVideos
                obj.workingUnitpics = workingUnitpics
                obj.accountNo = accountNo
                obj.accountHolderName = accountHolderName
                obj.ifscCode = ifscCode
                obj.swiftCode = swiftCode
                obj.bankName = bankName
                obj.copyOfCancelledCheque = copyOfCancelledCheque
                obj.otherMarketPlaceUrl = otherMarketPlaceUrl
                obj.facebook = facebook
                obj.instagram = instagram
                obj.twitter = twitter
                obj.linkedIn = linkedIn
                obj.otherLink = otherLink
                obj.websiteUrl = websiteUrl
            }


            if (role == rolesObj.SUBADMIN) {
                obj.permissionsArr = permissionsArr.map(el => {
                    el.permissionName = el.name;
                    return el
                })
            }
            let { data: res } = await updateUser(obj, params.id);
            if (res.message) {
                toastSuccess(res.message)
            }
        }
        catch (err) {
            toastError(err)
        }
    }


    const handleCheckPermission = (index, indexX) => {
        let tempPermissionArr = permissionsArr;
        console.log(tempPermissionArr[index].permissionsObj[indexX], "tempPermissionArr[index].innerPermissionsArr[indexX]")
        tempPermissionArr[index].permissionsObj[indexX] = !tempPermissionArr[index].permissionsObj[indexX]
        setPermissionsArr([...tempPermissionArr])
    }





    const handleGetUserById = () => {
        dispatch(getUserById(params.id))
    }



    useEffect(() => {
        handleGetUserById()
    }, [])



    useEffect(() => {
        if (userObj) {
            setName(userObj.name ? userObj.name : "");
            setEmail(userObj.email ? userObj.email : "");
            setPhone(userObj.phone ? userObj.phone : "");
            setStatus(userObj.status ? userObj.status : "");
            setRole(userObj.role)
            if (userObj?.permissionsObj && userObj?.permissionsObj?.permissionsArr) {
                setPermissionsArr(userObj?.permissionsObj?.permissionsArr.map(el => {
                    let permissionObj = permissionsArr.find(elx => elx.name == el.permissionName)
                    el.name = el.permissionName
                    return el
                }))
            }
            else {
                setPermissionsArr([
                    {
                        name: "Category",
                        permissionsObj: {
                            READ: false,
                            CREATE: false,
                            UPDATE: false,
                            DELETE: false
                        },

                    },
                    {
                        name: "Products",
                        permissionsObj: {
                            READ: false,
                            CREATE: false,
                            UPDATE: false,
                            DELETE: false
                        },
                    },
                    {
                        name: "Homepage customizations",
                        permissionsObj: {
                            READ: false,
                            CREATE: false,
                            UPDATE: false,
                            DELETE: false
                        },
                    }
                ])
            }
            if (userObj.role == rolesObj.SELLER) {
                // console.log(userObj.pickupAndDropAddress)
                setNatureofBusiness(userObj?.natureofBusiness)
                setNatureOfBusinessOther(userObj?.natureOfBusinessOther)
                setOtherBusinessType(userObj?.otherBusinessType)
                setBusinessType(userObj?.businessType)
                setCorrespondanceAddress(userObj?.correspondanceAddress)
                setCorrespondanceAddressLandmark(userObj?.correspondanceAddressLandmark)
                setWorkingUnitAddress(userObj?.workingUnitAddress)
                setWorkingUnitLandmark(userObj?.workingUnitLandmark)
                setPickupAndDropAddress(userObj?.pickupAndDropAddress)
                setPickupAndDropOtherAddress(userObj?.pickupAndDropOtherAddress)
                setPickupAndDropOtherLandmark(userObj?.pickupAndDropOtherLandmark)
                setGSTN(userObj?.GSTN)
                setBusinessScale(userObj?.BusinessScale)
                setCertifications(userObj?.certifications)
                setTurnover(userObj?.turnover)
                setCIN(userObj?.CIN)
                setPAN(userObj?.PAN)
                setAadhaar(userObj?.Aadhaar)
                setNameOfAuthorisedSignatory(userObj?.nameOfAuthorisedSignatory)
                setAuthorisedSignatoryAddress(userObj?.authorisedSignatoryAddress)
                setAuthorisedSignatoryContact(userObj?.authorisedSignatoryContact)
                setBusinessCommencementDate(userObj?.businessCommencementDate)
                setAwardsAndRecognitions(userObj?.awardsAndRecognitions)
                setQualityComplianceAndCertificates(userObj?.qualityComplianceAndCertificates)
                setMonthlyProductionCapacity(userObj?.monthlyProductionCapacity)
                setUploadProcessingVideos(userObj?.uploadProcessingVideos)
                setWorkingUnitpics(userObj?.workingUnitpics)
                setAccountNo(userObj?.accountNo)
                setAccountHolderName(userObj?.accountHolderName)
                setIfscCode(userObj?.ifscCode)
                setSwiftCode(userObj?.swiftCode)
                setBankName(userObj?.bankName)
                setCopyOfCancelledCheque(userObj?.copyOfCancelledCheque)
                setOtherMarketPlaceUrl(userObj?.otherMarketPlaceUrl)
                setFacebook(userObj?.facebook)
                setInstagram(userObj?.instagram)
                setTwitter(userObj?.twitter)
                setLinkedIn(userObj?.linkedIn)
                setOtherLink(userObj?.otherLink)
                setWebsiteUrl(userObj?.websiteUrl)
            }
            console.log(userObj, "userObj")
        }
    }, [userObj])




    const handleWorkingUnitPicsSet = (value) => {
        setWorkingUnitpics(value);
    };
    const handleBlankChequeSet = (value) => {
        setCopyOfCancelledCheque(value);
    };

    return (
        <main>
            <section className="product-category">
                <div className="container-fluid p-0">
                    <h5 className="blue-1 mb-4">Add New User</h5>
                    <DashboardBox>
                        <form className="form row">
                            <h5 className="blue-1 mb-4">Basic Info</h5>
                            <div className="col-12 col-md-4 mb-3">
                                <label>
                                    Name <span className="red">*</span>
                                </label>
                                <input
                                    name="first_name"
                                    className="form-control"
                                    type="text"
                                    required=""
                                    onChange={(e) => setName(e.target.value)} value={name}
                                />
                            </div>
                            <div className="col-12 col-md-4 mb-3">
                                <label>Phone</label>
                                <input
                                    name="last_name"
                                    className="form-control"
                                    type="text"
                                    disabled
                                    required=""
                                    maxLength={10}
                                    onChange={(e) => setPhone(e.target.value)} value={phone}
                                />
                            </div>
                            <div className="col-12 col-md-4 mb-3">
                                <label>
                                    Email Address or Phone Number
                                    <span className="red">*</span>
                                </label>
                                <input disabled onChange={(e) => setEmail(e.target.value)} value={email} name="text" className="form-control" type="email" />
                            </div>


                            {
                                role == rolesObj.SUBADMIN && permissionsArr && permissionsArr.length > 0 && permissionsArr.map((el, index) => {
                                    return (
                                        <div key={index} className="col-12 col-md-12 mb-3">
                                            <label>
                                                {el.name}
                                            </label>
                                            {
                                                el.permissionsObj &&
                                                <>
                                                    <div className="col-12 col-md-12 mb-3">
                                                        <input checked={el.permissionsObj["CREATE"]} onChange={() => handleCheckPermission(index, "CREATE")} type="checkbox" />
                                                        <span style={{ marginLeft: 15 }}>
                                                            Create
                                                        </span>
                                                    </div>
                                                    <div className="col-12 col-md-12 mb-3">
                                                        <input checked={el.permissionsObj["READ"]} onChange={() => handleCheckPermission(index, "READ")} type="checkbox" />
                                                        <span style={{ marginLeft: 15 }}>
                                                            Read
                                                        </span>
                                                    </div>
                                                    <div className="col-12 col-md-12 mb-3">
                                                        <input checked={el.permissionsObj["UPDATE"]} onChange={() => handleCheckPermission(index, "UPDATE")} type="checkbox" />
                                                        <span style={{ marginLeft: 15 }}>
                                                            Update
                                                        </span>
                                                    </div>
                                                    <div className="col-12 col-md-12 mb-3">
                                                        <input checked={el.permissionsObj["DELETE"]} onChange={() => handleCheckPermission(index, "DELETE")} type="checkbox" />
                                                        <span style={{ marginLeft: 15 }}>
                                                            Delete
                                                        </span>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    )
                                })
                            }



                            {
                                role == rolesObj.SELLER &&
                                <>
                                    <div className="col-12 col-md-12 mb-3">
                                        <label>
                                            Business Type
                                            <span className="red">*</span>
                                        </label>
                                        <Select defaultInputValue={businessType} value={businessTypeObjValue} onChange={(e) => { setBusinessType(e.value); setBusinessTypeObjValue(e) }} options={businessTypesArr} />
                                        {
                                            businessType == businessTypeObj.OTHERS &&

                                            <div className="col-12 col-md-12 mb-3">
                                                <label>
                                                    Enter Your Business Type
                                                    <span className="red">*</span>
                                                </label>
                                                <input onChange={(e) => setOtherBusinessType(e.target.value)} value={otherBusinessType} className="form-control" type="text" />
                                            </div>
                                        }
                                    </div>
                                    <div className="col-12 col-md-12 mb-3">
                                        <label>
                                            Seller Commission Type
                                            <span className="red">*</span>
                                        </label>
                                        <Select value={sellerCommissionObj} onChange={(e) => { setSellerCategoryId(e.value); setSellerCommissionObj(e) }} options={sellerCategoryArr} />
                                    </div>
                                    <div className="col-12 col-md-12 mb-3">
                                        <label>
                                            Nature Of Business
                                            <span className="red">*</span>
                                        </label>
                                        <Select defaultInputValue={natureofBusiness} value={natureOfBusinessObj} onChange={(e) => { setNatureofBusiness(e.value); setNatureOfBusinessObj(e) }} options={natureOfBusinessArr} />
                                        {
                                            natureofBusiness == businessNatureObj.OTHERS &&
                                            <div className="col-12 col-md-12 mb-3">
                                                <label>
                                                    Enter Your nature of your Business Business
                                                    <span className="red">*</span>
                                                </label>
                                                <input onChange={(e) => setNatureOfBusinessOther(e.target.value)} value={natureOfBusinessOther} className="form-control" type="text" />
                                            </div>
                                        }
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Correspondance Address
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setCorrespondanceAddress(e.target.value)} value={correspondanceAddress} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Correspondance Address Landmark
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setCorrespondanceAddressLandmark(e.target.value)} value={correspondanceAddressLandmark} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Working Unit Address
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setWorkingUnitAddress(e.target.value)} value={workingUnitAddress} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Working Unit Landmark
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setWorkingUnitLandmark(e.target.value)} value={workingUnitLandmark} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-8 mb-3">
                                        <label>
                                            Pickup And Drop Address
                                            <span className="red">*</span>
                                        </label>
                                        <div>
                                            <input id="1" name="prickupanddropaddress" onChange={(e) => setPickupAndDropAddress(e.target.value)} value={"Correspondance"} type="radio" />
                                            <label htmlFor="1" style={{ paddingRight: 15, paddingLeft: 5 }}>
                                                Same as Correspondance
                                            </label>
                                            <input id={"2"} name="prickupanddropaddress" onChange={(e) => setPickupAndDropAddress(e.target.value)} value={"Working"} type="radio" />
                                            <label htmlFor="2" style={{ paddingRight: 15, paddingLeft: 5 }}>
                                                Same as Working
                                            </label>
                                            <input id={"3"} name="prickupanddropaddress" onChange={(e) => setPickupAndDropAddress(e.target.value)} value={"Other"} type="radio" />
                                            <label htmlFor="3" style={{ paddingRight: 15, paddingLeft: 5 }}>
                                                Other
                                            </label>
                                        </div>
                                    </div>
                                    {
                                        pickupAndDropAddress == "Other" &&
                                        <>
                                            <div className="col-12 col-md-4 mb-3">
                                                <label>
                                                    Pickup And Drop Address
                                                    <span className="red">*</span>
                                                </label>
                                                <input onChange={(e) => setPickupAndDropOtherAddress(e.target.value)} value={pickupAndDropOtherAddress} className="form-control" type="text" />
                                            </div>
                                            <div className="col-12 col-md-4 mb-3">
                                                <label>
                                                    Pickup And Drop Landmark
                                                    <span className="red">*</span>
                                                </label>
                                                <input onChange={(e) => setPickupAndDropOtherLandmark(e.target.value)} value={pickupAndDropOtherLandmark} className="form-control" type="text" />
                                            </div>
                                        </>
                                    }
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            GSTN
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setGSTN(e.target.value)} value={GSTN} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            GSTN
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setGSTN(e.target.value)} value={GSTN} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Business Scale
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setBusinessScale(e.target.value)} value={BusinessScale} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Certifications
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setCertifications(e.target.value)} value={certifications} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Turnover
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setTurnover(e.target.value)} value={turnover} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            CIN
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setCIN(e.target.value)} value={CIN} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            PAN
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setPAN(e.target.value)} value={PAN} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Aadhaar
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setAadhaar(e.target.value)} value={Aadhaar} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Name Of Authorised Signatory
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setNameOfAuthorisedSignatory(e.target.value)} value={nameOfAuthorisedSignatory} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Authorised Signatory Address
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setAuthorisedSignatoryAddress(e.target.value)} value={authorisedSignatoryAddress} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Authorised Signatory Contact
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setAuthorisedSignatoryContact(e.target.value)} value={authorisedSignatoryContact} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Business Commencement Date
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setBusinessCommencementDate(e.target.value)} value={businessCommencementDate} className="form-control" type="date" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Awards And Recognitions
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setAwardsAndRecognitions(e.target.value)} value={awardsAndRecognitions} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Quality Compliance And Certificates
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setQualityComplianceAndCertificates(e.target.value)} value={qualityComplianceAndCertificates} className="form-control" type="text" />
                                    </div>
                                    {
                                        businessType == businessTypeObj.MANUFACTURER &&
                                        <>
                                            <div className="col-12 col-md-4 mb-3">
                                                <label>
                                                    Monthly Production Capacity
                                                    <span className="red">*</span>
                                                </label>
                                                <input onChange={(e) => setMonthlyProductionCapacity(e.target.value)} value={monthlyProductionCapacity} className="form-control" type="text" />
                                            </div>
                                            <div className="col-12 col-md-4 mb-3">
                                                <label>
                                                    Upload Processing Videos
                                                    <span className="red">*</span>
                                                </label>
                                                <input onChange={(e) => setUploadProcessingVideos(e.target.value)} value={uploadProcessingVideos} className="form-control" type="text" />
                                            </div>
                                        </>
                                    }
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Working Unit pics
                                            <span className="red">*</span>
                                        </label>
                                        <FileUpload onFileChange={handleWorkingUnitPicsSet} />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Account No
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setAccountNo(e.target.value)} value={accountNo} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Account Holder Name
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setAccountHolderName(e.target.value)} value={accountHolderName} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            IFSC Code
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setIfscCode(e.target.value)} value={ifscCode} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Swift Code
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setSwiftCode(e.target.value)} value={swiftCode} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Bank Name
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setBankName(e.target.value)} value={bankName} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Copy Of Cancelled Cheque
                                            <span className="red">*</span>
                                        </label>
                                        <FileUpload onFileChange={handleBlankChequeSet} />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Other Market Place Url
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setOtherMarketPlaceUrl(e.target.value)} value={otherMarketPlaceUrl} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Facebook Url
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setFacebook(e.target.value)} value={facebook} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Twitter Url
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setTwitter(e.target.value)} value={twitter} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Instagram Url
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setInstagram(e.target.value)} value={instagram} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            LinkedIn Url
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setLinkedIn(e.target.value)} value={linkedIn} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Other Url
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setOtherLink(e.target.value)} value={otherLink} className="form-control" type="text" />
                                    </div>
                                    <div className="col-12 col-md-4 mb-3">
                                        <label>
                                            Website Url
                                            <span className="red">*</span>
                                        </label>
                                        <input onChange={(e) => setWebsiteUrl(e.target.value)} value={websiteUrl} className="form-control" type="text" />
                                    </div>
                                </>
                            }
                        </form>
                        <div className="col-12 mt-2 text-center">
                            <CustomButton
                                ClickEvent={() => handleSubmit()}
                                isBtn
                                iconName="fa-solid fa-check"
                                btnName="Submit"
                            />
                        </div>
                    </DashboardBox>
                </div>
            </section>
        </main >
    );
}

export default EditUser;
