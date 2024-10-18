import React, { useEffect, useState } from "react";
import Select from "react-select";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import ReactQuill from "react-quill"; // ES6

import FileUpload from "../Utility/FileUpload";
import { generalModelStatuses } from "../Utility/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  SetBlogObj,
  BlogAdd,
  BlogUpdate,
} from "../../redux/actions/Blog/Blog.actions";
import { toastError } from "../Utility/ToastUtils";
import { getBlogCategory } from "../../services/BlogCategory.service";
import QuillEditor from "../../utils/QuillEditor";
function AddBlog() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setauthor] = useState("");
  const [slug, setSlug] = useState("");
  const [blogCategoryId, setblogCategoryId] = useState({
    name: "",
    value: "",
  });
  const [blogCategoryArr, setblogCategoryArr] = useState([]);
  const [status, setStatus] = useState(generalModelStatuses.APPROVED);
  const [read, setRead] = useState(false);
  const statesObj = useSelector((blogs) => blogs.blog.blogObj);
  const handleAddBlog = () => {
    if (title == "") {
      toastError("Name is mandatory !");
      return;
    }
    if (description == "") {
      toastError("Description is mandatory !");
      return;
    }
    if (imageUrl == "") {
      toastError("Image is mandatory !");
      return;
    }

    let obj = {
      title,
      description,
      publish: status,
      slug,
      blogCategoryId: blogCategoryId._id,
      author,
      read,
      image: imageUrl,
    };
    console.log(obj, "category obj");

    if (statesObj?._id) {
      dispatch(BlogUpdate(statesObj._id, obj));
      console.log("sdfndsfsdjhsdjkfsdhjkhfjksdhkjhkj");
      dispatch(SetBlogObj(null));
      setTitle("");
      setSlug("");
      setDescription("");
      setImageUrl("");
    } else {
      dispatch(BlogAdd(obj));
      setTitle("");
      setDescription("");
      setImageUrl("");
    }
  };

  const handlegetBlogCategory = async (obj, id) => {
    try {
      let { data: res } = await getBlogCategory();
      if (res.data) {
        console.log(res.data, "res.datares.datares.data");
        setblogCategoryArr(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };
  useEffect(() => {
    handlegetBlogCategory();
  }, []);

  useEffect(() => {
    if (
      blogCategoryArr &&
      statesObj &&
      blogCategoryArr.length > 0 &&
      statesObj._id
    ) {
      let cat = blogCategoryArr.find(
        (el) => el._id === statesObj.blogCategoryId
      );

      if (cat && cat?._id) {
        console.log({ ...cat, value: cat?._id, name: cat?.name });
        setblogCategoryId({ ...cat, value: cat?._id, label: cat?.name });
      }
    }
  }, [blogCategoryArr]);

  useEffect(() => {
    if (statesObj) {
      setTitle(statesObj?.title);
      setSlug(statesObj?.slug);
      setStatus(statesObj?.status);
      setDescription(statesObj.description);
      setImageUrl(statesObj?.image);
      setStatus(statesObj?.publish);
      setRead(statesObj?.read);
      setauthor(statesObj?.author);
    }

    // return () => {
    //     dispatch(SETSTATEOBJ(null));
    // };
  }, [statesObj]);

  const handleSetImage = (value) => {
    setImageUrl(value);
  };

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <form action="#" className="form">
            <h5 className="blue-1 mb-4">Add New Post</h5>
            <div className="row">
              <div className="col-12 col-md-8">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Post Info</h5>
                    <div className="col-12 mb-3">
                      <label>
                        TITLE <span className="red">*</span>
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label>
                        SLUG <span className="red">*</span>
                      </label>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="col-12">
                      <label>
                        DESCRIPTION<span className="red">*</span>
                      </label>
                      <QuillEditor
                        value={description}
                        handleChange={(e) => setDescription(e)}
                      />
                    </div>
                    <div className="col-12 mb-3">
                      <label>
                        Author<span className="red">*</span>
                      </label>
                      <input
                        type="text"
                        value={author}
                        onChange={(e) => setauthor(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>
                </DashboardBox>
              </div>
              <div className="col-12 col-md-4">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Basic Info</h5>
                    <div className="col-12 mb-3">
                      <label>
                        CATEGORY<span className="red">*</span>
                      </label>
                      <Select
                        options={
                          blogCategoryArr && blogCategoryArr.length > 0
                            ? blogCategoryArr.map((el) => ({
                                ...el,
                                label: el.name,
                                value: el._id,
                              }))
                            : []
                        }
                        onChange={(val) => setblogCategoryId(val)}
                        value={blogCategoryId}
                      />
                    </div>
                    {/* <div className="col-12 mb-3">
                      <label>
                        Tags (Comma Separated)<span className="red">*</span>
                      </label>
                      <Select options={options} isMulti />

                      <div className="form-text fs-12 blue-1">
                        Suggested Tags
                      </div>
                    </div> */}
                    <div className="col-12 mb-3">
                      <label>
                        Image(1000x500)px<span className="red">*</span>
                      </label>
                      <FileUpload onFileChange={(val) => setImageUrl(val)} />
                    </div>
                    <div className="col-12 mb-3">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="category-status"
                          value="option1"
                          id="publish-checkbox"
                          checked={status}
                          onChange={() => setStatus(!status)}
                        />
                        <label
                          className="form-check-label fs-14"
                          htmlFor="publish-checkbox"
                        >
                          Publish
                        </label>
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="category-status"
                          value="option1"
                          id="read-checkbox"
                          checked={read}
                          onChange={() => setRead(!read)}
                        />
                        <label
                          className="form-check-label fs-14"
                          htmlFor="read-checkbox"
                        >
                          Must Read
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <CustomButton
                        isBtn
                        btntype="button"
                        iconName="fa-solid fa-check"
                        btnName="Save"
                        ClickEvent={handleAddBlog}
                      />
                    </div>
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

export default AddBlog;
