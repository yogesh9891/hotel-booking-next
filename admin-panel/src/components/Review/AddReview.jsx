import React, { useState, useEffect } from "react";
import Select from "react-select";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import { useSelector, useDispatch } from "react-redux";

import { PRODUCTGet } from "../../redux/actions/Product/Product.actions";
import { toastError, toastSuccess } from "../../utils/toastUtils";
import { getAdminAllProducts } from "../../services/product.service";
import FileUpload from "../Utility/FileUpload";
import { HOTELGET } from "../../redux/actions/Hotels/Hotel.action";
import {
  AddReviewApi,
  getReviewBYId,
  upadteReview,
} from "../../services/review.service";
import { useParams, useSearchParams } from "react-router-dom";
function AddReview() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [rating, setrating] = useState(1);
  const [date, setDate] = useState(new Date());
  const [searchParams, setSearchParams] = useSearchParams();
  const [productArr, setProductArr] = useState([]);
  const hotelsArr = useSelector((state) => state.hotel.hotelsArr);
  const [hotelId, sethotelId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [reviewObj, setReviewObj] = useState("");

  const handleGet = () => {
    dispatch(HOTELGET());
  };
  useEffect(() => {
    handleGet();
  }, []);
  useEffect(() => {
    if (searchParams.get("id")) {
      setReviewId(searchParams.get("id"));
      handleGetBId(searchParams.get("id"));
    }
  }, [searchParams]);
  const handleGetBId = async (id) => {
    try {
      let { data: res } = await getReviewBYId(id);
      if (res.data) {
        setReviewObj(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };
  useEffect(() => {
    if (hotelsArr && hotelsArr.length) {
      setProductArr(hotelsArr);
    }
  }, [hotelsArr]);

  useEffect(() => {
    if (reviewObj && reviewObj._id) {
      setName(reviewObj.title);
      setMessage(reviewObj?.message);
      sethotelId(reviewObj?.hotelId);
      setLink(reviewObj?.link);
      setrating(reviewObj?.rating);
      setImage(reviewObj?.image);
      setDate(reviewObj?.date);
    }
  }, [reviewObj]);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (`${name}` == "") {
      toastError("please enter name");
      return;
    }

    if (`${rating}` == "") {
      toastError("please enter rating");
      return;
    }

    if (`${message}` == "") {
      toastError("please enter message");
      return;
    }

    let obj = {
      name,
      rating,
      message,
      hotelId,
      date,
      image,
      link,
    };

    try {
      if (reviewId) {
        let { data: res } = await upadteReview(reviewId, obj);

        if (res.success) {
          toastSuccess(res.message);

          // window.location.reload();
        }
      } else {
        let { data: res } = await AddReviewApi(obj);

        if (res.success) {
          toastSuccess(res.message);

          // window.location.reload();
        }
      }
    } catch (error) {
      console.log(error);
      toastError(error);
    }
  };

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <form action="#" className="form">
            <h5 className="blue-1 mb-4">Add New Review</h5>
            <div className="row">
              <div className="col-12 col-md-8">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Review</h5>
                    <div className="col-12 mb-2">
                      <label>Hotel</label>
                      <Select
                        options={
                          productArr &&
                          productArr.map((ele) => ({
                            label: `${ele?.name}`,
                            value: ele?._id,
                          }))
                        }
                        value={
                          productArr &&
                          productArr
                            .map((ele) => ({
                              label: `${ele?.name}`,
                              value: ele?._id,
                            }))
                            .find((el) => el._id == hotelId)
                        }
                        onChange={(e) => sethotelId(e.value)}
                      />
                    </div>

                    <div className="col-12 mb-2">
                      <label>
                        Rating
                        <select
                          className="form-control bg-ligh"
                          value={rating}
                          onChange={(e) => {
                            setrating(e.target.value);
                          }}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </label>
                    </div>
                    <div className="col-12 mb-3">
                      <label>
                        Name <span className="red">*</span>
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label>
                        Link <span className="red">*</span>
                      </label>
                      <input
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label>
                        Date<span className="red">*</span>
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="pt-3 col-12 col-md-12 mb-3">
                      <label htmlFor="">Image</label>
                      <FileUpload onFileChange={(val) => setImage(val)} />
                    </div>
                    <div className="col-12">
                      <label>
                        Message<span className="red">*</span>
                      </label>
                      <textarea
                        class="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <CustomButton
                      ClickEvent={handleSubmit}
                      isBtn
                      iconName="fa-solid fa-check"
                      btnName="Save"
                    />
                  </div>
                </DashboardBox>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddReview;
