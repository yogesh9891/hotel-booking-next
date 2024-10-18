import React from "react";
import CustomButton from "../../Utility/Button";

function ShowCategory({ data }) {
  return (
    <ul className="blue-1 fs-14 customer-profile p-3">
     { console.log(data)}
      <li>
        <span className="fw-600">
          Name<span>:</span>
        </span>
       {data.Name}
      </li>
      <li>
        <span className="fw-600">
          Slug<span>:</span>
        </span>
        {data.Name}
      </li>
      <li>
        <span className="fw-600">
          Searchable<span>:</span>
        </span>
        Active
      </li>
      <li>
        <span className="fw-600">
          Parent Category<span>:</span>
        </span>
     {data.Parent_Category}
      </li>
      <li>
        <span className="fw-600">
          Icon<span>:</span>
        </span>
      </li>
      <li>
        <span className="fw-600">
          Active Status <span>:</span>
        </span>
        <CustomButton greenBtn btnName="Active" />
      </li>
    </ul>
  );
}

export default ShowCategory;
