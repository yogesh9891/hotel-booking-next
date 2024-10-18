import React, { useState } from "react";

interface FileUploadProps {
  onFileChange: (file: File | string) => void;
  acceptImage?: boolean;
  returnOriginal?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileChange,
  acceptImage,
  returnOriginal,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const getBase64 = (
    file: File,
    cb: (result: string | ArrayBuffer | null) => void
  ) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      cb(reader.result);
    };
    reader.onerror = (error) => {
      console.error("Error: ", error);
    };
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      getBase64(selectedFile, (result) => {
        setFile(selectedFile);
        if (returnOriginal) {
          onFileChange(selectedFile);
        } else if (typeof result === "string") {
          onFileChange(result);
        }
      });
    }
  };

  return (
    <div className="position-relative">
      <input
        type="file"
        onChange={handleFileSelection}
        className="form-control"
        accept={acceptImage ? "image/png, image/gif, image/jpeg" : undefined}
      />
    </div>
  );
};

export default FileUpload;
