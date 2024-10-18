import React, { useState, useEffect } from "react";

interface FileData {
  link: File;
  base64: string | ArrayBuffer | null;
}

interface MultiFileUploadProps {
  onFileChange: (files: FileData[]) => void;
  acceptImage?: boolean;
  returnOriginal?: boolean;
  multiple?: boolean;
}

const MultiFileUpload: React.FC<MultiFileUploadProps> = ({
  onFileChange,
  acceptImage,
  returnOriginal,
  multiple = false,
}) => {
  const [filesArr, setFilesArr] = useState<FileData[]>([]);
  const [value, setValue] = useState<string | File>("");
  const [filesConversionToJSONCompleted, setFilesConversionToJSONCompleted] =
    useState(false);

  const getBase64 = (
    file: File,
    cb: (result: string | ArrayBuffer | null) => void
  ) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        cb(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error: ", error);
      };
    }
  };

  const handleFileSelection = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const tempArr: FileData[] = [];
    let files: any = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        getBase64(files[i], (result) => {
          tempArr.push({ link: files[i], base64: result });
          if (i === files.length - 1) {
            setFilesConversionToJSONCompleted(true);
            setFilesArr([...tempArr]);
            setValue("");
          } else {
            setFilesConversionToJSONCompleted(false);
            setValue(files[i]);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (filesConversionToJSONCompleted) {
      onFileChange(filesArr);
    }
  }, [filesArr, filesConversionToJSONCompleted]);

  return (
    <div className="position-relative">
      <input
        multiple={multiple}
        type="file"
        onChange={handleFileSelection}
        className="form-control"
        accept={acceptImage ? "image/png, image/gif, image/jpeg" : undefined}
      />
    </div>
  );
};

export default MultiFileUpload;
