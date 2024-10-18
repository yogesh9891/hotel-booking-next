import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { images } from "../../Images/Images";
import ActionIcon from "../../Utility/ActionIcon";
import { DashboardTable } from "../../Utility/DashboardBox";
import { useSelector, useDispatch } from "react-redux";
import { getRelatedProducts, PRODUCTGet } from "../../../redux/actions/Product/Product.actions";
import CustomButton from "../../Utility/Button";
import { generateFilePath } from "../../Utility/utils";
import { handleRelatedProductObjAdd, handleRelatedProductObjRemove } from "../../../services/product.service";
import { toastSuccess } from "../../Utility/ToastUtils";

function RelatedProduct({ name }) {
  const dispatch = useDispatch();

  const productArr = useSelector((state) => state.product.products);
  const productObj = useSelector((state) => state.product.productObj);

  const [displayProductArr, setDisplayProductArr] = useState([]);

  const handleGetProducts = () => {
    dispatch(getRelatedProducts(`isRelated=${productObj?._id}`));
  };

  useEffect(() => {
    if (productArr && productArr.length > 0) {
      setDisplayProductArr(productArr);
    }
  }, [productArr]);

  const handleRelatedProductAdd = async (id) => {
    try {
      let obj = {
        productId: productObj?._id,
        relatedProductId: id,
      };
      console.log(obj, "object");
      const { data: res } = await handleRelatedProductObjAdd(obj);
      if (res) {
        handleGetProducts();
        toastSuccess(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleRelatedProductRemove = async (id) => {
    try {
      let obj = {
        productId: productObj?._id,
        relatedProductId: id,
      };
      const { data: res } = await handleRelatedProductObjRemove(obj);
      if (res) {
        handleGetProducts();

        toastSuccess(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    handleGetProducts();
  }, []);

  console.log(
    productArr.map((el) => el.isRelated),
    "PRODUCT"
  );
  const product_sale_columns = [
    {
      name: "SL",
      cell: (row, index) => index + 1,
      sortable: true,
      width: "2%",
    },
    {
      name: "Name",
      selector: (row) => row?.name,
      width: "15%",
    },
    {
      name: "SKU",
      selector: (row) => row?.sku,
      width: "15%",
    },
    {
      name: "Is Related",
      selector: (row, index) => (row?.isRelated ? "Yes" : "No"),
      sortable: true,
      width: "15%",
    },

    {
      name: "Image",
      grow: 0,
      cell: (row) => <img height="84px" width="56px" alt={row?.imageArr[0]?.imageAlt ? row?.imageArr[0]?.imageAlt : "ALT"} src={generateFilePath(row?.imageArr[0]?.image)} />,
      width: "15%",
    },

    {
      name: "Action",
      width: "15%",
      cell: (row) => (
        <>
          {row?.isRelated ? (
            <CustomButton btntype="button" isBtn ClickEvent={() => handleRelatedProductRemove(row._id)} iconName="fa-solid fa-pen-to-square" btnName="Remove Related" />
          ) : (
            <CustomButton btntype="button" isBtn ClickEvent={() => handleRelatedProductAdd(row._id)} iconName="fa-solid fa-pen-to-square" btnName="Add To Related" />
          )}
          {/* <CustomButton btntype="button" isRedirected={true} editPath={`/Product/clone-Product`} edit ClickEvent={(e) => { e.preventDefault(); dispatch(SetPRODUCTObj(row)) }} iconName="fa-solid fa-pen-to-square" btnName="Clone Product" /> */}
        </>
      ),
    },
  ];

  return (
    <DashboardTable className="mt-4">
      <h5 className="blue-1 mb-4">{name}</h5>
      <DataTable columns={product_sale_columns} data={displayProductArr && displayProductArr.length > 0 ? displayProductArr : []} pagination />
    </DashboardTable>
  );
}

export default RelatedProduct;
