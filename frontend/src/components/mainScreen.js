import { useCallback, useEffect, useState } from "react";
import {useDropzone} from "react-dropzone"
export function MainScreen(){
    return (
        <div className=" w-full h-full bg-gradient-to-bl from-blue-900 to-cyan-400 justify-center items-center flex flex-col">
            <div className=" font-bold text-center font-mono text-2xl text-white"> Attainment AI </div>
            <div className=" flex m-4 justify-center">
                <div className=" m-3 bg-cyan-500 p-4 px-8 rounded-full text-white font-mono text-lg">Semester</div>
                <div className=" m-3 bg-cyan-500 p-4 px-8 rounded-full text-white font-mono text-lg" >Subject</div>
                <div className=" m-3 bg-cyan-500 p-4 px-8 rounded-full text-white font-mono text-lg">Field</div>
            </div>

            <MyDropzone />
            <div className=" bg-green-400 hover:bg-emerald-400 hover:px-10 duration-200 m-4 p-4 px-8 rounded-full font-bold font-mono">
                Get Bloom
            </div>
        </div>
    )
}

function MyDropzone(){
    const [files, setFiles] = useState([])

    const onDrop = useCallback(acceptedFiles => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
    },[])

    useEffect(() => {
        console.log(files)
    }, [files])
    
    const { getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

    return (

        <div {...getRootProps()} className=" z-10 bg-sky-600 duration-300 hover:bg-blue-500  w-96 h-96 flex flex-col justify-center items-center rounded-lg text-center border-2  border-cyan-400 border-dotted">
            <input {...getInputProps()} />
            {files.length > 0 ?
                <SetUploadedFilesLogo files={files}/>
                :
                <>
                    {isDragActive ? (
                        <div className="flex flex-col justify-center items-center">
                            <img src="upload_logo_blue.png" className="w-32 h-32"></img>
                            <div className=" font-mono text-white font-bold">Drop the file here</div>
                        </div>
                    ) :
                        <div className="flex flex-col justify-center items-center">
                            <img src="upload_logo_blue.png" className="w-32 h-32"></img>
                            <div className="text-white font-mono font-bold">Upload your excel, word, text files here</div>
                        </div>
                    }
                </>
            }
        </div>
    )
}

function SetUploadedFilesLogo(props) {
    const [angles, setAngles] = useState([])
    useEffect(() => {
        // image / png
        // application / pdf
        // docx // application/vnd.openxmlformats-officedocument.wordprocessingml.document
        // excel // application/vnd.ms-excel

        // if (props.files[0].type == "image/png"){
        //     console.log("image type png")
        // }
        if( props.files.length == 1){
            console.log("yesh angle set")
            setAngles([0])
        }else if ( props.files.length == 2){
            // setAngles([-20, 20])
            setAngles([-20, 20])
        }else if ( props.files.length == 3){
            setAngles([-30, 0, 30])
        }else if ( props.files.length == 4){
            setAngles([-35, -20, 20, 35])
        }else if ( props.files.length == 5){
            setAngles([-40, -30, 0, 30, 40])
        }
    },[props.files])

    const angledImgs = angles.map((angle, index) => {
        return (
          <img
            key={index} // Adding a key when mapping
            src="pdf_file_logo.webp"
            className={`${angle >= 0 ? "translate-x-5 translate-y-4": "-translate-x-5 -translate-y-4"} absolute z-20 w-40 h-40`}
            style={{transform: `rotate(${angle}deg)`}}
          />
        );
      });
      
    return(
        <div className=" relative w-full h-full flex justify-center items-center">
            {angledImgs}
        </div>
    )
}