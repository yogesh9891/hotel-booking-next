import React, { useState, useEffect } from "react";
import Select from "react-select";
import CustomButton from "../Utility/Button";
import { DashboardBox } from "../Utility/DashboardBox";
import ReactQuill from "react-quill"; // ES6
import FileUpload from "../Utility/FileUpload";
import { newNewsletter } from "../../services/newsletter.service";

function AddEmailTemplate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let obj = {
        title,
        description,
      };
      const { data: res } = await newNewsletter(obj);
      if (res) {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <section className="product-category" style={{ minHeight: "75vh" }}>
        <div className="container-fluid p-0">
          <form action="#" className="form">
            <h5 className="blue-1 mb-4">Add New Email</h5>
            <div className="row">
              <div className="col-12 col-md-8">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Email/Newsletter</h5>
                    <div className="col-12 mb-3">
                      <label>
                        TITLE <span className="red">*</span>
                      </label>
                      <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" />
                    </div>
                    {/* <div className="col-12 mb-3">
                      <label>
                        SLUG<span className="red">*</span>
                      </label>
                      <input type="text" className="form-control" />
                    </div> */}
                    <div className="col-12">
                      <label>
                        DESCRIPTION<span className="red">*</span>
                      </label>
                      <ReactQuill onChange={(e) => setDescription(e)} />
                    </div>
                  </div>
                  <div className="col-12 mt-4">
                    <CustomButton ClickEvent={(e) => handleSubmit(e)} isBtn iconName="fa-solid fa-check" btnName="Save" />
                  </div>
                </DashboardBox>
              </div>
              {/* <div className="col-12 col-md-4">
                <DashboardBox>
                  <div className="row">
                    <h5 className="blue-1 mb-4">Basic Info</h5>
                    <div className="col-12 mb-3">
                      <label>
                        CATEGORY<span className="red">*</span>
                      </label>
                      <Select options={options} />
                    </div>
                    <div className="col-12 mb-3">
                      <label>
                        Tags (Comma Separated)<span className="red">*</span>
                      </label>
                      <Select options={options} isMulti />

                      <div className="form-text fs-12 blue-1">Suggested Tags</div>
                    </div>
                    <div className="col-12 mb-3">
                      <label>
                        Image(1000x500)px<span className="red">*</span>
                      </label>
                      <FileUpload />
                    </div>
                    <div className="col-12 mb-3">
                      <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" name="category-status" value="option1" id="publish-checkbox" />
                        <label className="form-check-label fs-14" htmlFor="publish-checkbox">
                          Publish
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <CustomButton isBtn iconName="fa-solid fa-check" btnName="Save" />
                    </div>
                  </div>
                </DashboardBox>
              </div> */}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default AddEmailTemplate;
