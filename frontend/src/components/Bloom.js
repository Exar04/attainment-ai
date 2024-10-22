import { useCallback, useEffect, useState } from "react"
import {useDropzone} from "react-dropzone"
import {utils, read, writeXLSX, writeFile} from "xlsx"
// import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"

export function Bloom(){
    const [files, setFiles] = useState([])
    const [bloomLoading, setBloomLoading] = useState(false)
    const [fileContent, setFileContent] = useState("")
    const [datainjson, setdatainjson] = useState([])
    const [activateBloomOutput, setActivateBloomOutput] = useState(false)

    // dotenv.config()
    const genAI = new GoogleGenerativeAI(process.env.REACT_GEMINI_API_KEY) 
    const model = genAI.getGenerativeModel({model:"gemini-pro"})

    const handleBloom = () => {
        if (bloomLoading){return}

        if (files.length <= 0){
            alert("You need to add file")
            return
        }

        setBloomLoading(true)
        setActivateBloomOutput(true)

        // rn we are just handling the first input file
        // but later we will add functionality to do batch analysis
        const file = files[0]
        // rn we only added functionality to parse text file 
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function(e) {
            const content = e.target.result // This is the file content
            setFileContent(content) // Store the content in the state
        }

        setTimeout(() => {
            setBloomLoading(false)
          }, 1000);

        setBloomLoading(false)
    }

    function handleXlsxExport(data){
        var wb = utils.book_new()
        var ws = utils.json_to_sheet(data)

        utils.book_append_sheet(wb, ws, "sheetoli")
        writeFile(wb, "myexceltest.xlsx")
    }

    async function getairesponse(question){
            const prompt = `${question}
read the question above and tell me if the question is valid in blooms taxonomy and only give response in following example format
{
    <replace this with above given question>:{
        create: false
        evaluate: false
        analysis: false 
        apply: false 
        understand:false
        remember: false 

    }
}`

            const result = await model.generateContent(prompt)
            const response = result.response
            const text = response.text()
            console.log(text)
            return text
    }
    function getBloomsTaxonomy(question){
        var bloombloom
        var keywords = {
            'Remember': ['define', 'list', 'recall', 'name'],
            'Understand': ['explain', 'describe', 'discuss'],
            'Apply': ['use', 'demonstrate', 'apply'],
            'Analyze': ['analyze', 'differentiate', 'compare'],
            'Evaluate': ['evaluate', 'judge', 'critique'],
            'Create': ['create', 'design', 'construct']
        }
        return bloombloom
    }
    useEffect(() => {
        // after hitting get bloom we will get our content and this hook will get triggered
        // so even if there are multiple files in queue, each time a fileContent gets changed we asume next file in queue has been added to do query 

        if (fileContent == "") { return }
        var newData = []
        const lines = fileContent.split('\n'); // Split by new line character
        lines.forEach((line, index) => {
            // const aijsonresp = getairesponse(line) 

            // const jsonData = { "question": line, "create": false, "evaluate": false, "analysis": false, "apply": false, "understand": false, "remember": false }
            const jsonData = { "question": line , "taxonomy":[]}
            newData.push(jsonData)
        });
        // newData.pop()
        setdatainjson(newData)
    }, [fileContent])

    // useEffect(() => {
    //     if (datainjson.length == 0 ){
    //         return
    //     }
    //     handleXlsxExport(datainjson)
    // }, [datainjson])

    const sems = ["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6","Sem 7","Sem 8"]
    const listOfSemesters = sems.map((sem) => (
        <div className=" border-b-2 p-3">
            {sem}
            {/* <div className=" bg-white w-full h-1 rounded-md"></div> */}
        </div>
    ))
    return (
        <div className=" w-full h-full bg-gradient-to-bl from-blue-900 to-cyan-400 justify-center items-center flex flex-col">
            { activateBloomOutput? < BloomMappedComponent datainjson={datainjson} setdatainjson={setdatainjson} setActivateBloomOutput={setActivateBloomOutput} activateBloomOutput={activateBloomOutput}/>:""}
            <div className=" font-bold text-center font-mono text-2xl text-white mt-6 mb-9"> Get Blooms Taxonomy </div>
            {/* <div className=" flex m-4 justify-center">
                <div onClick={() => {setOpenSemlist(!openSemlist)}} role={"button"} className=" m-3 bg-cyan-500 p-4 sm:px-2 md:px-8 hover:bg-blue-400 duration-150 rounded-full text-white font-mono text-md relative text-center">
                    Select Semester
                    {openSemlist? <div className="z-20 bg-cyan-400 h-96 w-60 absolute rounded-md -translate-x-10 translate-y-5 border-2 font-mono p-4">{listOfSemesters}</div>:""}
                </div>
                <div onClick={() => {setOpensubjectlist(!opensubjectlist)}} role={"button"}  className=" m-3 bg-cyan-500 p-4 sm:px-2 md:px-8 hover:bg-blue-400 duration-150 rounded-full text-white font-mono text-md relative text-center" >
                    Select Subject
                    { opensubjectlist?<div className="z-20 bg-cyan-400 h-96 w-60 absolute rounded-md -translate-x-10 translate-y-5 border-2"></div>:""}
                </div>
                <div role={"button"} className=" m-3 bg-cyan-500 p-4 sm:px-2 md:px-8 hover:bg-blue-400 duration-150 rounded-full text-white font-mono text-md text-center">Select Field</div>
            </div> */}

            <MyDropzone files={files} setFiles={setFiles}/>
            <div role={"button"} onClick={handleBloom} className=" bg-green-400 hover:bg-emerald-400 hover:px-10 duration-200 m-9 p-4 px-8 rounded-full font-bold font-mono">
                {bloomLoading? "Loading...":"Get Bloom"}
            </div>
        </div>
    )
}

function MyDropzone(props){

    const onDrop = useCallback(acceptedFiles => {
        props.setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
    },[])

    const { getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

    return (

        <div {...getRootProps()} className=" z-10 bg-sky-600 duration-300 hover:bg-blue-500  w-96 h-96 flex flex-col justify-center items-center rounded-lg text-center border-2  border-cyan-400 border-dotted">
            <input {...getInputProps()} />
            {props.files.length > 0 ?
                <SetUploadedFilesLogo files={props.files}/>
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
            setAngles([0])
        }else if ( props.files.length == 2){
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
        if(props.files[index].type == "application/pdf"){
            return (
                <img
                    key={index} // Adding a key when mapping
                    src="pdf_file_logo.webp"
                    className={`${angle >= 0 ? "translate-x-5 translate-y-4" : "-translate-x-5 -translate-y-4"} absolute z-20 w-40 h-40`}
                    style={{ transform: `rotate(${angle}deg)` }}
                />
            );
        } else if (props.files[index].type == "application/vnd.ms-excel") {

            return (
                <img
                    key={index} // Adding a key when mapping
                    src="excel-file-logo.png"
                    className={`${angle >= 0 ? "translate-x-5 translate-y-4" : "-translate-x-5 -translate-y-4"} absolute z-20 w-40 h-40`}
                    style={{ transform: `rotate(${angle}deg)` }}
                />
            );
        } else if (props.files[index].type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return (
                <img
                    key={index} // Adding a key when mapping
                    src="word-file-logo.png"
                    className={`${angle >= 0 ? "translate-x-5 translate-y-4" : "-translate-x-5 -translate-y-4"} absolute z-20 w-40 h-40`}
                    style={{ transform: `rotate(${angle}deg)` }}
                />
            );

        } else if (props.files[index].type == "text/plain") {
            return (
                <img
                    key={index} // Adding a key when mapping
                    src="txt-file-logo.png"
                    className={`${angle >= 0 ? "translate-x-5 translate-y-4" : "-translate-x-5 -translate-y-4"} absolute z-20 w-40 h-40`}
                    style={{ transform: `rotate(${angle}deg)` }}
                />
            );

        }
    });

    return(
        <div className=" relative w-full h-full flex justify-center items-center">
            {angledImgs}
        </div>
    )
}

function BloomMappedComponent(props){
    function getBloomsTaxonomy(question){
        var bloombloom = []
        var keywords = {
            'Remember': ['define', 'list', 'recall', 'name', 'what'],
            'Understand': ['explain', 'describe', 'discuss'],
            'Apply': ['use', 'demonstrate', 'apply'],
            'Analyze': ['analyze', 'differentiate', 'compare'],
            'Evaluate': ['evaluate', 'judge', 'critique'],
            'Create': ['create', 'design', 'construct']
        }
        var lowerQuestion = question.toLowerCase();

        for (var level in keywords) {
            var levelKeywords = keywords[level];
    
            // Check if any of the keywords for this level are in the question
            for (var i = 0; i < levelKeywords.length; i++) {
                if (lowerQuestion.includes(levelKeywords[i])) {
                    bloombloom.push(level);
                    break; // Stop after finding the first match for this level
                }
            }
        }
        return bloombloom
    }

    const [bloomedData, setBloomedData] = useState([])
    useEffect(() => {
        var templistofBloomedData = []
        console.log(props.datainjson)
        props.datainjson.map((data, index) => {
            var tempQuestionAndItstaxo = {"question":data.question, "taxonomy":getBloomsTaxonomy(data.question)}

            templistofBloomedData.push(tempQuestionAndItstaxo)
        }) 
        setBloomedData(templistofBloomedData)
        // props.setdatainjson()
    }, [props.datainjson])

    const qBloomtable = (
        bloomedData.map((data, index) => (
            <div key={index} className=" flex justify-around">
                <div className="w-3/5 text-center">{data.question}</div>
                <div className=" flex">{data.taxonomy.map((taxo,index) => <div key={index}>{taxo}{(index == data.taxonomy.length-1)?"":","}</div>)}</div>
            </div>
        )))

    return (
        <div>
            <div onClick={() => {props.setActivateBloomOutput(!props.activateBloomOutput)}} className="absolute top-0 left-0 w-full h-full"></div>
            <div className=" z-20 absolute top-0 left-0 scale-95 bg-slate-800/25 w-full h-full rounded-lg backdrop-blur-sm border p-3 font-mono text-xl text-white/90">
                <div className=" flex justify-around"> 
                <div className=" text-center w-3/5">Questions</div>
                <div className=" px-3  border-slate-800">Taxonomy</div>
                </div>
            {qBloomtable}
            </div>
        </div>
    )
}
