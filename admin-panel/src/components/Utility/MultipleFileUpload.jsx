import React, { useState } from "react";
import { useEffect } from "react";
import CustomButton from "./Button";

function MultiFileUpload({ onFileChange, acceptImage, returnOriginal, multiple = false }) {
  const [filesArr, setFilesArr] = useState([]);
  const [value, setValue] = useState([]);
  const [filesConversionToJSONCompleted, setFilesConversionToJSONCompleted] = useState(false);
  const getBase64 = (file, cb) => {
    if (file) {

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        cb(reader.result);
      };
      reader.onerror = function (error) {
        // console.log('Error: ', error)
      };
    }
  };
  const handleFileSelection = async (event) => {
    event.preventDefault();
    let tempArr = [];
    if (event.target.files && event.target.files.length > 0) {
      for (let i = 0; i <= event.target.files.length - 1; i++) {
        getBase64(event.target.files[i], (result) => {
          console.log(event.target.files[i], "event.target.files[i]")
          tempArr.push({ link: event.target.files[i], base64: result });
          if (i == event.target.files.length - 1) {
            setFilesConversionToJSONCompleted(true)
            console.log(tempArr,"tempArrtempArr--------------------------------------")
            setFilesArr([...tempArr])
            setValue("")
          }
          else {
            setFilesConversionToJSONCompleted(false)
            setValue(event.target.files[i])
          }
        });
      }
    }
  };

  // useEffect(() => {
  //   console.log(filesArr,"filesArrfilesArrfilesArrfilesArr--------------------------------------")

  //   if (filesConversionToJSONCompleted) {

  //     onFileChange(filesArr);

  //   }
  // }, [filesConversionToJSONCompleted])

  useEffect(() => {
    console.log(filesConversionToJSONCompleted,filesArr,"filesArrfilesAddddddddddrrfilesArrfilesArr--------------------------------------")
    if (filesConversionToJSONCompleted) {

      onFileChange(filesArr);

    }
  }, [filesArr])


  return (
    <div className="position-relative">
      <input multiple type="file" onChange={(event) => handleFileSelection(event)} className="form-control" accept="image/png, image/gif, image/jpeg" />
      <CustomButton isLink extraClass="position-absolute start-0 top-0 h-100 text-uppercase rounded-0" noIcon btnName="Browse" />

      {/* <CustomButton isLink extraClass="position-absolute start-0 top-0 h-100 text-uppercase rounded-0" noIcon btnName="Browse" /> */}
    </div>
  );
}

export default MultiFileUpload;
