import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // ES6
import Select from "react-select";
import CustomButton from "../../Utility/Button";
import { DashboardBox } from "../../Utility/DashboardBox";
import FileUpload from "../../Utility/FileUpload";
import { AddModal } from "../../Utility/Modal";
import { useSelector, useDispatch } from "react-redux";
import { getAllNestedCategories } from "../../../redux/actions/Category/Category.actions";
import { BrandGet } from "../../../redux/actions/Brand/brand.actions";
import { PRODUCTAdd, PRODUCTUpdate, PRODUCT_ADD } from "../../../redux/actions/Product/Product.actions";
import { ATTRIBUTEGet } from "../../../redux/actions/Attribute/Attribute.actions";
function CloneGeneralProduct() {
    const dispatch = useDispatch();
    const [internalCode, setInternalCode] = useState("");
    const [vendorCode, setVendorCode] = useState("");
    const [productCode, setProductCode] = useState("");
    const [dusaanSku, setDusaanSku] = useState("");
    const [brandObj, setBrandObj] = useState({});
    ///////manufacturer
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyCity, setCompanyCity] = useState("");
    const [companyCountry, setCompanyCountry] = useState("");
    const [companyPinCode, setCompanyPinCode] = useState("");
    ///////warehouse address
    const [warehouseCompany, setWarehouseCompany] = useState("");
    const [warehouseAddress, setWarehouseAddress] = useState("");
    const [warehouseCity, setWarehouseCity] = useState("");
    const [warehouseCountry, setWarehouseCountry] = useState("");
    const [warehousePinCode, setWarehousePinCode] = useState("");
    ///////Country of Origin
    const [countryOfOrigin, setCountryOfOrigin] = useState("");
    //////product details
    const [name, setName] = useState("");
    const [vendorSku, setVendorSku] = useState("");
    const [despcription, setDespcription] = useState("");
    const [Specifications, setSpecifications] = useState("");
    const [availableInventory, setAvailableInventory] = useState(0);
    const [fragility, setFragility] = useState("");
    const [careInstructions, setCareInstructions] = useState("");
    const [productMaterial, setProductMaterial] = useState("");
    const [gst, setGst] = useState("");
    const [hsn, setHsn] = useState("");
    const [mrp, setMrp] = useState(0);
    const [sellingPrice, setSellingPrice] = useState(0);
    const [pack_contents, setPack_contents] = useState("");
    const [ships_in_days, setShips_in_days] = useState(0);
    const [returnPolicy, setReturnPolicy] = useState("");
    const [isExlusive, setIsExlusive] = useState(false);
    const [isPrivateLabel, setIsPrivateLabel] = useState(false);
    const [isMadeToOrder, setIsMadeToOrder] = useState(false);
    const [sellerRegionRestrictions, setSellerRegionRestrictions] = useState("");
    const [typeOfPattern, setTypeOfPattern] = useState("");
    const [dom, setDom] = useState("");
    const [shelfLife, setShelfLife] = useState(0);
    const [imageArr, setImageArr] = useState([{ image: "", imageAlt: "" }]);
    //////size of product
    const [product_dimension_width, setProduct_Dimension_width] = useState(0);
    const [product_dimension_height, setProduct_Dimension_height] = useState(0);
    const [product_dimension_length, setProduct_Dimension_length] = useState(0);
    const [product_dimension_weight, setProduct_Dimension_weight] = useState(0);
    ///////size of packaging
    const [packaging_Length, setPackaging_Length] = useState(0);
    const [packaging_Width, setPackaging_Width] = useState(0);
    const [packaging_Height, setPackaging_Height] = useState(0);
    ///////dead weight
    const [dead_weight, setDead_weight] = useState(0);
    ///////tags
    const [tags, setTags] = useState("");
    //////brand
    const [selectedBrandId, setSelectedBrandId] = useState("");
    //////category
    const [mainCategoryArr, setMainCategoryArr] = useState([]);
    const [mainAttributesArr, setMainAttributesArr] = useState([]);
    ///////////////////////////////////////////////////////////////
    const [ModalBox, setModalBox] = useState(false);
    const [ModalType, setModalType] = useState("");
    const [ModalName, setModalName] = useState("");
    ///////////////////////////////////////////////////////////////
    const [videoLink, setVideoLink] = useState("");
    const [productImageStr, setProductImageStr] = useState("");
    const [specificationFile, setSpecificationFile] = useState("");
    const [displayAttributesArr, setDisplayAttributesArr] = useState([]);
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaImage, setMetaImage] = useState("");
    const [status, setStatus] = useState("Publish");
    const [selectedCategoryArr, setSelectedCategoryArr] = useState([]);
    ///////////////////////////////////////////////////////////////
    const authUser = useSelector((state) => state.auth.user);
    const brands = useSelector((state) => state.brand.brands);
    const categoryArr = useSelector((state) => state.category.categories);
    const productObj = useSelector((state) => state.product.productObj);
    const attributes = useSelector((state) => state.attribute.attributes);
    const handleFilterChecked = (arr) => {
        if (arr.length > 0 && arr) {
            return arr.map(el => {
                if (el.subCategoryArr && el.subCategoryArr.length > 0 && el.checked) {
                    let tempArr = selectedCategoryArr;
                    if (tempArr.some(el => el != el._id)) {
                        tempArr.push(el._id)
                    }
                    setSelectedCategoryArr([...tempArr])
                    return { ...el, categoryId: el._id, subCategoryArr: handleFilterChecked(el.subCategoryArr) };
                }
                else {
                    if (el.checked) {
                        let tempArr = selectedCategoryArr;
                        if (tempArr.some(el => el != el._id)) {
                            tempArr.push(el._id)
                        }
                        setSelectedCategoryArr([...tempArr])
                        return { ...el, categoryId: el._id }
                    }
                }
            })
        }
        else {
            return arr
        }
    }
    const handleSubmit = () => {


        let cat_arr = returnSelectedCategories(mainCategoryArr);

        let tempCategoryArr = handleFilterChecked(mainCategoryArr)
        // let tempCategoryArr = handleFilterChecked(mainCategoryArr)
        let obj = {
            internalCode,
            categoryArr: cat_arr.map(el => { return { categoryId: el._id } }),
            vendorCode,
            productCode,
            dusaanSku,
            companyName,
            companyAddress,
            companyCity,
            companyCountry,
            companyPinCode,
            countryOfOrigin,
            name,
            createdBy: authUser?._id,
            sku: vendorSku,
            description: despcription,
            specifications: Specifications,
            vendorSku,
            availableInventory,
            fragility,
            careInstructions,
            productMaterial,
            gst,
            hsn,
            mrp,
            pack_contents,
            ships_in_days,
            returnPolicy,
            isExlusive,
            isPrivateLabel,
            isMadeToOrder,
            sellerRegionRestrictions,
            typeOfPattern,
            dom,
            warehouseCompany,
            warehouseAddress,
            warehouseCity,
            warehouseCountry,
            warehousePinCode,
            shelfLife,
            imageArr,
            product_dimension_width,
            product_dimension_height,
            product_dimension_length,
            product_dimension_weight,
            packaging_Length,
            packaging_Width,
            packaging_Height,
            dead_weight,
            tags,
            attributesArr: displayAttributesArr,
            videoLink,
            productImageStr,
            specificationFile,
            status,
            metaTitle,
            metaDescription,
            metaImage,
            sellingPrice: sellingPrice,
            brandId: selectedBrandId,
        };
        console.log(obj, "final Obj")
        dispatch(PRODUCTAdd(obj));
    };
    useEffect(() => {
        dispatch(getAllNestedCategories());
        dispatch(BrandGet());
        dispatch(ATTRIBUTEGet());
    }, []);
    useEffect(() => {
        if (categoryArr && categoryArr.length > 0) {
            setMainCategoryArr([...categoryArr]);
        }
    }, [categoryArr]);
    useEffect(() => {
        if (attributes && attributes.length > 0) {
            setMainAttributesArr([...attributes]);
        }
    }, [attributes]);
    const returnSelectedCategories = (arr) => {
        let new_selected_arr = arr.filter(el => el.checked)
        let subCategories = arr.reduce((acc, el) => [...acc, ...el.subCategoryArr.filter(el => el.checked)], [])
        if (subCategories?.length) {
            return [...new_selected_arr, ...returnSelectedCategories(subCategories)]
        }
        else {
            return [...new_selected_arr]
        }
    }

    const handleBrandSelection = (obj) => {
        setSelectedBrandId(obj?._id);
        setBrandObj(obj)
    };
    const handleFileSet = (value, index) => {

        let tempArr = imageArr;


        tempArr[index].image = value
        setImageArr([...tempArr]);
    };
    const handleproductImageAltEntry = (value, index) => {
        let tempArr = imageArr;
        tempArr[index].imageAlt = value
        setImageArr([...tempArr]);
    };
    const handlePdfFileSet = (value) => {
        setSpecificationFile(value);
    };
    const handleAttributeVariantChange = (index) => {
        let tempArr = [...mainAttributesArr]
        tempArr[index].checked = !tempArr[index].checked
        setMainAttributesArr(tempArr)
    }
    const handleInnerAttributeVariantChange = (index, innerIndex) => {
        let tempArr = [...mainAttributesArr]
        tempArr[index].attributeValueArr[innerIndex].checked =
            !tempArr[index].attributeValueArr[innerIndex].checked
        setMainAttributesArr([...tempArr])
        generateCombinations(tempArr)
    }
    ////////////p n c generator
    const generateCombinations = (tempattributeArr) => {
        console.log(tempattributeArr, "tempattributeArr")
        const combine = ([head, ...[headTail, ...tailTail]]) => {
            // https://stackoverflow.com/a/57015870
            if (!headTail) {
                return head?.map((el) => ({
                    name: el.name,
                    attributeValueArr: [...el.attributeValueArr],
                }))
            }
            const combined = headTail?.reduce((acc, x) => {
                return acc.concat(
                    head.map((h) => ({
                        name: `${h.name}-${x.name}`,
                        attributeValueArr: [...h.attributeValueArr, ...x.attributeValueArr],
                        price: 0,
                    }))
                )
            }, [])
            return combine([combined, ...tailTail])
        }
        let finalArr = []
        tempattributeArr.forEach((el) => {
            if (el.checked) {
                let tempArr = el.attributeValueArr.filter((elx) => elx.checked)
                console.log(tempArr, "tempArr")
                if (tempArr.length) {
                    finalArr.push(
                        tempArr.map((el) => ({
                            name: el.name,
                            attributeValueArr: [
                                {
                                    attributeId: el._id,
                                },
                            ],
                            price: 0,
                        }))
                    )
                }
            }
        })
        console.log(finalArr, 'finalArr')
        if (finalArr.length) {
            finalArr = combine(finalArr)
        } else {
            setDisplayAttributesArr([])
        }

        // console.log(finalArr, 'FINAL ARR')
        // finalArr
        if (finalArr.length) {
            setDisplayAttributesArr([
                ...finalArr.map((el) => ({
                    ...el,
                    price: 0,
                    discount: 0,
                    currentStock: 0,
                    stockNo: 0,
                })),
            ])
        }
    }
    const handleDisplayAttributesArrChange = (e, index, key) => {
        let tempArr = [...displayAttributesArr]
        tempArr[index][key] = e
        setDisplayAttributesArr([...tempArr])
    }

    useEffect(() => {
        if (productObj && productObj?.vendorCode) {
            // console.log(productObj, "productObj")
            setName(productObj?.name);
            setInternalCode(productObj?.internalCode);
            setVendorCode(productObj?.vendorCode);
            setProductCode(productObj?.productCode);
            setDusaanSku(productObj?.dusaanSku);
            setCompanyName(productObj?.companyName);
            setCompanyAddress(productObj?.companyAddress);
            setCompanyCity(productObj?.companyCity);
            setCompanyCountry(productObj?.companyCountry);
            setCompanyPinCode(productObj?.companyPinCode);
            setWarehouseCompany(productObj?.warehouseCompany);
            setWarehouseAddress(productObj?.warehouseAddress);
            setWarehouseCity(productObj?.warehouseCity);
            setWarehouseCountry(productObj?.warehouseCountry);
            setWarehousePinCode(productObj?.warehousePinCode);
            setCountryOfOrigin(productObj?.countryOfOrigin);
            setVendorSku(productObj?.vendorSku);
            setDespcription(productObj?.description ? productObj?.description : "");
            setSpecifications(productObj?.specification ? productObj?.specification : "");
            setAvailableInventory(productObj?.availableInventory);
            setFragility(productObj?.fragility);
            setCareInstructions(productObj?.careInstructions);
            setProductMaterial(productObj?.productMaterial);
            setGst(productObj?.gst);
            setHsn(productObj?.hsn);
            setMrp(productObj?.mrp);
            setSellingPrice(productObj?.sellingPrice);
            setPack_contents(productObj?.pack_contents);
            setShips_in_days(productObj?.ships_in_days);
            setReturnPolicy(productObj?.returnPolicy);
            setIsExlusive(productObj?.isExlusive);
            setIsPrivateLabel(productObj?.isPrivateLabel);
            setIsMadeToOrder(productObj?.isMadeToOrder);
            setSellerRegionRestrictions(productObj?.sellerRegionRestrictions);
            setTypeOfPattern(productObj?.typeOfPattern);
            setDom(productObj?.dom);
            setShelfLife(productObj?.shelfLife);
            setProduct_Dimension_width(productObj?.product_dimension_width);
            setProduct_Dimension_height(productObj?.product_dimension_height);
            setProduct_Dimension_length(productObj?.product_dimension_length);
            setProduct_Dimension_weight(productObj?.product_dimension_weight);
            setPackaging_Length(productObj?.packaging_Length);
            setPackaging_Width(productObj?.packaging_Width);
            setPackaging_Height(productObj?.packaging_Height);
            setDead_weight(productObj?.dead_weight);
            setTags(productObj?.tags);
            setMetaTitle(productObj?.metaTitle);
            setMetaDescription(productObj?.metaDescription);
            setMetaImage(productObj?.metaImage);
            setImageArr(productObj?.imageArr)
            setVideoLink(productObj?.videoLink)
            setStatus(productObj?.status)

        }
    }, [productObj]);



    useEffect(() => {
        if (brands && productObj) {
            // console.log(brands, "brands")
            // console.log(productObj, "productObj")
            setSelectedBrandId(productObj?.brandId);
            // console.log(brands.find(el => el._id == productObj.brandId), "brands.find(el => el._id == productObj.brandId)")
            let tempBrandObj = brands.find(el => el._id == productObj?.brandId)
            if (tempBrandObj) {
                tempBrandObj.label = tempBrandObj?.name;
                tempBrandObj.value = tempBrandObj?._id
                setBrandObj(tempBrandObj)
            }
        }
    }, [productObj, brands])



    useEffect(() => {
        if (attributes && attributes.length > 0 && productObj && productObj.attributesArr && productObj.attributesArr.length > 0) {

            let temp = handleAttributesArrSelectionOnInit(attributes, productObj?.attributesArr)
            // setDisplayAttributesArr([...temp])
            setDisplayAttributesArr(productObj.attributesArr)
            console.log(temp, "temp");
        }
    }, [productObj, attributes])
    const handleAttributesArrSelectionOnInit = (existingAttributesArr, attributesArrFromDb) => {
        for (const el of existingAttributesArr) {
            if (el.attributeValueArr && el.attributeValueArr.length > 0) {
                for (const ele of el.attributeValueArr) {
                    if (attributesArrFromDb?.some(elx => elx.attributeValueArr?.some(elm => elm.attributeId == ele._id))) {
                        ele.checked = true;
                        el.checked = true;
                    }
                }
            }
        }


        return existingAttributesArr

    }




    const handleCategorySelectOnInit = (selectedCategoryArrFromDB, categoryArr) => {
        let tempArr = categoryArr?.map(el => {
            if (selectedCategoryArrFromDB?.some(ele => ele.categoryId == el._id)) {
                el.checked = true
            }
            if (el.subCategoryArr) {
                handleCategorySelectOnInit(selectedCategoryArrFromDB, el.subCategoryArr)

            }
            return el
        })
    }
    useEffect(() => {
        if (productObj && categoryArr) {
            handleCategorySelectOnInit(productObj.categoryArr, categoryArr);
        }

    }, [categoryArr, productObj])






    // const handleDiscountTypeChange = (obj) => {
    //   setSelectedDiscountType(obj.value);
    // };

    const options = [
        { value: "chocolate", label: "CGST" },
        { value: "strawberry", label: "IGST" },
        { value: "vanilla", label: "SGST" },
    ];

    const discount = [
        { value: "amount", label: "Amount" },
        { value: "percentage", label: "Percentage" },
    ];

    const handleRenderNestedCategory = (arr, id, value) => {
        let tempArr = arr.map(el => {
            if (el._id == id) {
                el.checked = value
                return el
            }
            else {
                if (el.subCategoryArr && el.subCategoryArr.length > 0) {
                    handleRenderNestedCategory(el.subCategoryArr, id, value)
                }
                else {
                    return el
                }
            }
        })
        return tempArr;
    }


    const handleImageObjAdd = () => {
        let tempArr = imageArr
        tempArr.push({ image: "", imageAlt: "" })
        setImageArr([...tempArr])
    }
    const handleImageObjRemove = () => {
        let tempArr = imageArr.filter((el, index) => index != imageArr.length - 1);
        setImageArr([...tempArr])
    }

    const handleNestedCategoryCheckBoxEvent = (id, value) => {
        let tempCategoryArr = categoryArr.map(el => {
            if (el._id == id) {
                el.checked = value
                return el
            }
            else {
                if (el.subCategoryArr && el.subCategoryArr.length > 0) {
                    el.subAttributesArr = handleRenderNestedCategory(el.subCategoryArr, id, value)
                    return el
                }
                else {
                    return el
                }
            }
        });
        setMainCategoryArr([...tempCategoryArr])
    }


    const handleRenderCheckboxCategory = (obj) => {
        return (
            <div className="col-12 mb-3" style={{ marginLeft: `${obj.level + 5}px` }}>
                <input className="form-check-input pointer" checked={obj.checked} value={tags} onChange={(event) => handleNestedCategoryCheckBoxEvent(obj._id, event.target.checked)} type="checkbox" />
                <label style={{ paddingLeft: 5 }}>
                    {obj.name}
                </label>
                {
                    obj.checked && obj.subCategoryArr && obj.subCategoryArr.length > 0 && obj.subCategoryArr.map((el) => {
                        return (
                            handleRenderCheckboxCategory(el)
                        )
                    })
                }
            </div>
        )
    }


    return (
        <form className="form">
            <div className="row">
                <div className="col-12 col-md-8">
                    <DashboardBox>
                        <div className="border-bottom pb-3 mb-4 row">
                            <h5 className="blue-1 mb-4">Product Information</h5>

                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Produc Name <span className="red">*</span>
                                </label>
                                <input value={name} onChange={(event) => setName(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Internal Code <span className="red">*</span>
                                </label>
                                <input value={internalCode} onChange={(event) => setInternalCode(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Vendor Code <span className="red">*</span>
                                </label>
                                <input value={vendorCode} onChange={(event) => setVendorCode(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Product Code <span className="red">*</span>
                                </label>
                                <input value={productCode} onChange={(event) => setProductCode(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Dusaan SKU <span className="red">*</span>
                                </label>
                                <input value={dusaanSku} onChange={(event) => setDusaanSku(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    PRODUCT SKU <span className="red">*</span>
                                </label>
                                <input value={vendorSku} onChange={(event) => setVendorSku(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Company Name <span className="red">*</span>
                                </label>
                                <input value={companyName} onChange={(event) => setCompanyName(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <div className="d-flex align-items-baseline justify-content-between">
                                    <label>BRAND</label>
                                    <CustomButton
                                        isBtn
                                        iconName="fa-solid fa-circle-plus"
                                        btnName="ADD NEW"
                                        changeClass="green fs-12 border-0 bg-white"
                                        ClickEvent={(e) => {
                                            e.preventDefault();
                                            setModalBox(true);
                                            setModalType("addBrandModal");
                                            setModalName("Create Brand");
                                        }}
                                    />
                                    <AddModal ModalBox={ModalBox} setModalBox={setModalBox} name={ModalName} ModalType={ModalType} />
                                </div>
                                {brands && brands.length > 0 && <Select onChange={handleBrandSelection} defaultInputValue={selectedBrandId} value={brandObj} options={brands && brands.length > 0 ? brands.map((el) => ({ ...el, label: el.name, value: el._id })) : []} />}
                            </div>

                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Company Address <span className="red">*</span>
                                </label>
                                <input value={companyAddress} onChange={(event) => setCompanyAddress(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Company City <span className="red">*</span>
                                </label>
                                <input value={companyCity} onChange={(event) => setCompanyCity(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Company Country <span className="red">*</span>
                                </label>
                                <input value={companyCountry} onChange={(event) => setCompanyCountry(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Company Pincode <span className="red">*</span>
                                </label>
                                <input value={companyPinCode} onChange={(event) => setCompanyPinCode(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Warehouse Company <span className="red">*</span>
                                </label>
                                <input value={warehouseCompany} onChange={(event) => setWarehouseCompany(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Warehouse Address <span className="red">*</span>
                                </label>
                                <input value={warehouseAddress} onChange={(event) => setWarehouseAddress(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Warehouse City <span className="red">*</span>
                                </label>
                                <input value={warehouseCity} onChange={(event) => setWarehouseCity(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Warehouse Country <span className="red">*</span>
                                </label>
                                <input value={warehouseCountry} onChange={(event) => setWarehouseCountry(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Warehouse Pincode <span className="red">*</span>
                                </label>
                                <input value={warehousePinCode} onChange={(event) => setWarehousePinCode(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Country Of Origin <span className="red">*</span>
                                </label>
                                <input value={countryOfOrigin} onChange={(event) => setCountryOfOrigin(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Available Inventory <span className="red">*</span>
                                </label>
                                <input value={availableInventory} onChange={(event) => setAvailableInventory(event.target.value)} type="number" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Fragility <span className="red">*</span>
                                </label>
                                <input value={fragility} onChange={(event) => setFragility(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Care Instructions <span className="red">*</span>
                                </label>
                                <input value={careInstructions} onChange={(event) => setCareInstructions(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Product Material <span className="red">*</span>
                                </label>
                                <input value={productMaterial} onChange={(event) => setProductMaterial(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    GST <span className="red">*</span>
                                </label>
                                <input value={gst} onChange={(event) => setGst(event.target.value)} type="number" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    HSN CODE<span className="red">*</span>
                                </label>
                                <input value={hsn} onChange={(event) => setHsn(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    MRP<span className="red">*</span>
                                </label>
                                <input value={mrp} onChange={(event) => setMrp(event.target.value)} type="number" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Pack Contents<span className="red">*</span>
                                </label>
                                <input value={pack_contents} onChange={(event) => setPack_contents(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Ships In (Days)<span className="red">*</span>
                                </label>
                                <input value={ships_in_days} onChange={(event) => setShips_in_days(event.target.value)} type="number" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Return Policy<span className="red">*</span>
                                </label>
                                <input value={returnPolicy} onChange={(event) => setReturnPolicy(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Seller Region Restrictions<span className="red">*</span>
                                </label>
                                <input value={sellerRegionRestrictions} onChange={(event) => setSellerRegionRestrictions(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Type Of Pattern<span className="red">*</span>
                                </label>
                                <input value={typeOfPattern} onChange={(event) => setTypeOfPattern(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Date of manufacturing<span className="red">*</span>
                                </label>
                                <input value={dom} onChange={(event) => setDom(event.target.value)} type="date" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Shelf Life<span className="red">*</span>
                                </label>
                                <input value={shelfLife} onChange={(event) => setShelfLife(event.target.value)} type="text" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Packaging Length<span className="red">*</span>
                                </label>
                                <input value={packaging_Length} onChange={(event) => setPackaging_Length(event.target.value)} type="number" className="form-control" />
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Packaging Width<span className="red">*</span>
                                </label>
                                <input value={packaging_Width} onChange={(event) => setPackaging_Width(event.target.value)} type="number" className="form-control" />
                            </div>





                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Packaging Height<span className="red">*</span>
                                </label>
                                <input value={packaging_Height} onChange={(event) => setPackaging_Height(event.target.value)} type="number" className="form-control" />
                            </div>


                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Dead weight<span className="red">*</span>
                                </label>
                                <input value={dead_weight} onChange={(event) => setDead_weight(event.target.value)} type="text" className="form-control" />
                            </div>















                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Exlusive
                                </label>
                                <div className="row">
                                    <div className="col-3">
                                        <input id="isExlusive" checked={isExlusive == true} value={true} onChange={(event) => setIsExlusive(event.target.value)} type="radio" className="form-check-input pointer" name={"isExlusive"} />
                                        <label style={{ paddingLeft: 10 }} htmlFor="isExlusive">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="col-3">
                                        <input id="isExlusive1" checked={isExlusive == false} value={false} onChange={(event) => setIsExlusive(event.target.value)} name={"isExlusive"} className="form-check-input pointer" type="radio" />
                                        <label style={{ paddingLeft: 10 }} htmlFor="isExlusive1">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Private Label
                                </label>
                                <div className="row">
                                    <div className="col-3">
                                        <input id="setIsPrivateLabel" value={true} checked={isPrivateLabel == true} onChange={(event) => setIsPrivateLabel(true)} type="radio" className="form-check-input pointer" name={"setIsPrivateLabel1"} />
                                        <label style={{ paddingLeft: 10 }} htmlFor="setIsPrivateLabel">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="col-3">
                                        <input id="setIsPrivateLabel1" value={false} checked={isPrivateLabel == false} onChange={(event) => setIsPrivateLabel(true)} type="radio" className="form-check-input pointer" name={"setIsPrivateLabel1"} />
                                        <label style={{ paddingLeft: 10 }} htmlFor="setIsPrivateLabel1">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Made To Order
                                </label>
                                <div className="row">
                                    <div className="col-3">
                                        <input id="setIsMadeToOrder" value={true} checked={isMadeToOrder == true} onChange={(event) => setIsMadeToOrder(true)} type="radio" className="form-check-input pointer" name={"setIsMadeToOrder1"} />
                                        <label style={{ paddingLeft: 10 }} htmlFor="setIsMadeToOrder">
                                            Yes
                                        </label>
                                    </div>
                                    <div className="col-3">
                                        <input id="setIsMadeToOrder1" value={false} checked={isMadeToOrder == false} onChange={(event) => setIsMadeToOrder(false)} name={"setIsMadeToOrder1"} className="form-check-input pointer" type="radio" />
                                        <label style={{ paddingLeft: 10 }} htmlFor="setIsMadeToOrder1">
                                            No
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 mb-3">
                                <label>
                                    Ships In (Days)<span className="red">*</span>
                                </label>
                                <input value={ships_in_days} onChange={(event) => setShips_in_days(event.target.value)} type="number" className="form-control" />
                            </div>


                            <div className="col-12 col-md-3 mb-3">
                                <label>
                                    Attributes<span className="red">*</span>
                                </label>
                                {mainAttributesArr &&
                                    mainAttributesArr.length > 0 &&
                                    mainAttributesArr.map((el, index) => {
                                        return (
                                            <div
                                                key={el._id}
                                            >
                                                <input checked={el.checked} onChange={(event) => handleAttributeVariantChange(index)} className="form-check-input pointer" type="checkbox" />
                                                <label style={{ paddingLeft: 5 }}>
                                                    {el.name}
                                                </label>

                                                {el.checked && (
                                                    <>
                                                        {el.attributeValueArr.length > 0 &&
                                                            el.attributeValueArr.map(
                                                                (ele, index2) => {
                                                                    return (
                                                                        <div key={index2} style={{ marginLeft: 20 }}>
                                                                            <input checked={ele.checked} onChange={(event) => handleInnerAttributeVariantChange(index, index2)} className="form-check-input pointer" type="checkbox" />
                                                                            <label style={{ paddingLeft: 5 }}>
                                                                                {ele.label}
                                                                            </label>
                                                                        </div>
                                                                    )
                                                                }
                                                            )}
                                                    </>
                                                )}
                                            </div>
                                        )
                                    })}

                            </div>
                            {
                                displayAttributesArr && displayAttributesArr.length > 0 &&
                                <div className="col-12 mb-0">
                                    <h5 className="blue-1 mb-4">Product Variants Info</h5>
                                </div>
                            }
                            {displayAttributesArr && displayAttributesArr.length > 0 && displayAttributesArr.map((el, index) => {
                                return (
                                    <div className="col-12 col-md-6" key={index}>
                                        <div className="d-flex align-items-baseline justify-content-between">
                                            <label>
                                                {el.name}<span className="red">*</span>
                                            </label>
                                        </div>
                                        <div className="col-12 col-md-12 mb-3">
                                            <label>Variant Price</label>
                                            <input value={el.price} onChange={(e) => handleDisplayAttributesArrChange(e.target.value, index, 'price')}
                                                type="number" className="form-control" />
                                        </div>



                                    </div>
                                )
                            }
                            )}
                            <div className="col-12 mb-3">
                                <label>
                                    Tags (Comma Separated)
                                    <span className="red">*</span>
                                </label>
                                <input value={tags} onChange={(event) => setTags(event.target.value)} type="text" className="form-control" />
                            </div>
                        </div>
                        <div className="border-bottom pb-3 mb-4 row">
                            <h5 className="blue-1 mb-4">Product Category</h5>
                            {
                                mainCategoryArr && mainCategoryArr.length > 0 && mainCategoryArr.map(el => {
                                    return (
                                        handleRenderCheckboxCategory(el)
                                    )
                                })
                            }



                        </div>
                        <div className="border-bottom pb-3 mb-4 row">
                            <div className="col-12 mb-0">
                                <h5 className="blue-1 mb-4">Weight Height Info</h5>
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <label>Weight [Gm]</label>
                                <input value={product_dimension_weight} onChange={(event) => setProduct_Dimension_weight(event.target.value)} type="number" className="form-control" />
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <label>Length [Cm]</label>
                                <input value={product_dimension_length} onChange={(event) => setProduct_Dimension_length(event.target.value)} type="number" className="form-control" />
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <label>Breadth [Cm]</label>
                                <input value={product_dimension_width} onChange={(event) => setProduct_Dimension_width(event.target.value)} type="number" className="form-control" />
                            </div>
                            <div className="col-12 col-md-3 mb-3">
                                <label>Height [Cm]</label>
                                <input type="number" value={product_dimension_height} onChange={(event) => setProduct_Dimension_height(event.target.value)} className="form-control" />
                            </div>

                        </div>
                        <div className="border-bottom pb-3 mb-4 row">
                            <h5 className="blue-1 mb-4">Price Info And Stock</h5>
                            <>
                                <div className="col-12 col-md-6 mb-3">
                                    <label>
                                        SELLING PRICE<span className="red">*</span>
                                    </label>
                                    <input type="number" min={0} value={sellingPrice} onChange={(event) => setSellingPrice(event.target.value)} className="form-control" />
                                </div>
                            </>
                            {/* <div className="col-12 col-md-6 mb-3">
                <label>GST/VAT/TAX GROUP</label>
                <Select options={options} />
              </div> */}
                        </div>
                        <div className="border-bottom pb-3 mb-4 row">
                            <h5 className="blue-1 mb-4">Description</h5>
                            <div className="col-12 mb-3">
                                <ReactQuill value={despcription} theme="snow" onChange={(e) => setDespcription(e)} />
                            </div>
                        </div>
                        <div className="border-bottom pb-3 mb-4 row">
                            <h5 className="blue-1 mb-4">Specifications</h5>
                            <div className="col-12 mb-3">
                                <ReactQuill value={Specifications} onChange={(e) => setSpecifications(e)} />
                            </div>
                        </div>





































































                        <div className="row">
                            <h5 className="blue-1 mb-4">SEO info</h5>
                            <div className="col-12 mb-3">
                                <label>META TITLE</label>
                                <input onChange={(e) => setMetaTitle(e.target.value)} value={metaTitle} type="text" className="form-control" />
                            </div>
                            <div className="col-12 mb-3">
                                <label>META DESCRIPTION</label>
                                <textarea onChange={(e) => setMetaDescription(e.target.value)} value={metaDescription} name="META DESCRIPTION" className="form-control" rows="3"></textarea>
                            </div>
                            <div className="col-12 mb-3">
                                <label>META IMAGE (300X300)PX</label>
                                <FileUpload onFileChange={(val) => setMetaImage(val)} />
                            </div>
                            <div className="col-12">
                                <CustomButton btntype="button" ClickEvent={handleSubmit} isBtn iconName="fa-solid fa-check" btnName="Save" />
                            </div>
                        </div>
                    </DashboardBox>
                </div>
                <div className="col-12 col-md-4">
                    <DashboardBox>
                        <div className="border-bottom pb-3 mb-4 row">
                            <h5 className="blue-1 mb-3">Product Image Info</h5>
                            <div className="row">
                                <div className="col-2 me-5">
                                    <CustomButton btntype="button" ClickEvent={handleImageObjAdd} isBtn noIcon btnName="+" />
                                </div>
                                <div className="col-2">
                                    <CustomButton btntype="button" ClickEvent={handleImageObjRemove} isBtn noIcon btnName="-" />
                                </div>
                            </div>
                            <div className="col-12 mb-3">
                                <label>
                                    Product Image<span className="red">*</span>
                                </label>

                                {imageArr && imageArr.length > 0 && imageArr.map((el, index) => {
                                    return (
                                        <div key={index} style={{ marginTop: 20, borderBottom: "grey 1px solid", paddingBottom: 15 }} className="row">
                                            <div className="col-12">
                                                <label>
                                                    Product Image<span className="red">*</span>
                                                </label>
                                                <FileUpload onFileChange={(val) => handleFileSet(val, index)} />
                                            </div>
                                            <div className="col-12">
                                                <label>
                                                    Product Image alt<span className="red">*</span>
                                                </label>
                                                <input onChange={(e) => handleproductImageAltEntry(e.target.value, index)} value={el?.imageAlt} type="text" className="form-control" />
                                            </div>
                                        </div>
                                    )
                                })}


                            </div>
                        </div>
                        <div className="border-bottom pb-3 mb-4 row">
                            <h5 className="blue-1 mb-3">Product Video Link</h5>
                            <div className="col-12 mb-3">
                                <label>Video Link<span className="red">*</span>
                                </label>
                                <input onChange={(e) => setVideoLink(e.target.value)} value={videoLink} type="text" className="form-control" />
                            </div>
                        </div>

                        {/* <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-3">Pdf Specifications</h5>
              <div className="col-12 mb-3">
                <label>PDF SPECIFICATIONS</label>
                <FileUpload onFileChange={handlePdfFileSet} />
              </div>
            </div> */}
                        {/* <div className="border-bottom pb-3 mb-4 row">
              <h5 className="blue-1 mb-3">Product Video Info</h5>
              <div className="col-12 mb-3">
                <label>VIDEO PROVIDER</label>
                <Select options={options} />
              </div>
              <div className="col-12 mb-3">
                <label>VIDEO LINK</label>
                <input type="url" className="form-control" />
              </div>
            </div> */}
                        <div className="row">
                            <h5 className="blue-1 mb-3">Others Info</h5>
                            <div className="col-12 mb-3">
                                <label>
                                    STATUS<span className="red">*</span>
                                </label>
                                <div className="d-flex">
                                    <div className="form-check form-check-inline d-flex align-items-center pointer">
                                        <input onChange={(e) => setStatus("Publish")} checked={status == "Publish"} className="form-check-input pointer" type="radio" name="product-status" value="option1" id="product-publish" />
                                        <label className="form-check-label fs-14 pointer" htmlFor="product-publish">
                                            Publish
                                        </label>
                                    </div>
                                    <div className="form-check form-check-inline d-flex align-items-center pointer">
                                        <input onChange={(e) => setStatus("Pending")} checked={status == "Pending"} className="form-check-input pointer" type="radio" name="product-status" value="option2" id="product-pending" />
                                        <label className="form-check-label fs-14 pointer" htmlFor="product-pending">
                                            Pending
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DashboardBox>
                </div>
            </div >
        </form >
    );
}

export default CloneGeneralProduct;
