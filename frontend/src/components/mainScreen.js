import { useState } from "react";
import Dropzone from "react-dropzone"
export function MainScreen(){
    return (
        <div className=" w-full h-full justify-center items-center flex flex-col">
            <div className=" font-bold text-center font-mono text-2xl"> Attainment AI </div>
            <div className=" flex m-4 justify-center">
                <div className=" m-3 bg-gray-500 p-4 px-8 rounded-full text-white font-mono text-lg">Semester</div>
                <div className=" m-3 bg-gray-500 p-4 px-8 rounded-full text-white font-mono text-lg" >Subject</div>
                <div className=" m-3 bg-gray-500 p-4 px-8 rounded-full text-white font-mono text-lg">Field</div>
            </div>

            <div className="bg-gray-500 w-1/2 h-1/3 flex flex-col justify-center items-center rounded-lg border-2 border-cyan-200 border-dashed text-center">
                <img src="upload-logo.png" className="w-32 h-32"></img>
                <div className="text-white font-mono font-bold">Upload your excel, word, text files here</div>
            </div>
            {/* <UploadFile className=""/> */}
            <div className=" bg-green-400 m-4 p-4 px-8 rounded-full font-bold font-mono">
                Get Bloom
            </div>
        </div>
    )
}


const UploadFile = () => {
    const [file, setFile] = useState(null);
  
    const handleUpload = (acceptedFiles) => {
      console.log("logging drop/selected file",acceptedFiles);
      // fake request to upload file
      const url = "https://api.escuelajs.co/api/v1/files/upload";
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]); // Assuming you only accept one file
  
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // File uploaded successfully
            setFile(acceptedFiles[0]);
          } else {
            // File upload failed
            console.error(response);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
  
    return (
      <div className="main-container bg-gray-500 w-1/2 h-1/3 flex flex-col justify-center items-center rounded-lg border-2 border-cyan-200 border-dashed ">
        <Dropzone onDrop={handleUpload} accept="image/*" minSize={10} maxSize={3072000}>
          {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => {
            const additionalClass = isDragAccept ? "accept" : isDragReject ? "reject" : "";
  
            return (
              <div
                {...getRootProps({
                  className: `dropzone ${additionalClass}`,
                })}
              >
                <input {...getInputProps()}  />
                <p className=" font-mono font-bold text-lg text-white text-center">Drag'n'drop excel, word or text file</p>
              </div>
            );
          }}
        </Dropzone>
        {file && (
          <>
            <div className=" font-mono font-bold text-lg text-white">file Uploaded</div>
            <img src={URL.createObjectURL(file)} className="img-container" alt="Uploaded file" />
          </>
        )}
      </div>
    );
  };