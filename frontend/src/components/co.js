import { useCallback, useEffect, useState } from "react"
import {useDropzone} from "react-dropzone"
import {utils, read, writeXLSX, writeFile} from "xlsx"
// import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"

export function Co(){
    const [files, setFiles] = useState([])
    const [bloomLoading, setBloomLoading] = useState(false)
    const [fileContent, setFileContent] = useState("")
    const [datainjson, setdatainjson] = useState([])

    const [openSemlist, setOpenSemlist] = useState(false) 
    const [opensubjectlist, setOpensubjectlist] = useState(false)
    const [openFieldlist, setOpenfieldlist] = useState(false)
    const [openMappedCO, setOpenMappedCO] = useState(false)

    const [fieldSelected, setFieldSelected] = useState("")
    const [semesterSelected, setSemesterSelected] = useState("")
    const [subjectSelected, setSubjectSelected] = useState("")
    // const [engSemesterSelected, setEngSemesterSelected] = useState("")


    const enginneringSems = ["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6","Sem 7","Sem 8"]
    const diplomaSems = []
    const fields = ["Engineering", "Diploma"]

    // const [subjectMap, setSubjectMap] = useState({"Engineering": enginneringSems, "Diploma":diplomaSems})
    const subjectMap = {
        "Engineering":{
            "Sem 1":["Applied Maths I", "Applied Physics", "Applied Chemestry", "Engineering Mechanics", "Basic Electric and Electronics Engineering"],
            "Sem 2":["Applied Maths II", "Elective Physics", "Elective Chemestry", "Engineering Graphics", "Program Core Course"],
            "Sem 3":["Engineering Math III", "Data Structures and Analysis", "Database Management System", "Principle of Communciations", "Paradigms and Computer Programming Fundamentals"],
            "Sem 4":["Engineering Math III", "Computer Network and Network Design", "Operating System", "Automata Theory", "Computer Organization and Architecture"],
            "Sem 5":[],
            "Sem 6":[],
            "Sem 7":[],
            "Sem 8":[]
        }
    }

    const courseOutcomeMap = {
        "Engineering": {
            "Sem 1":{
                "Applied Maths I":[], 
                "Applied Physics":[], 
                "Applied Chemestry":[], 
                "Engineering Mechanics":[], 
                "Basic Electric and Electronics Engineering":[]
            },
            "Sem 2":{
                "Applied Maths II":[], 
                "Elective Physics":[], 
                "Elective Chemestry":[], 
                "Engineering Graphics":[], 
                "Program Core Course":[]
            },
            "Sem 3":{
                "Engineering Math III":[
                    "Apply the concept of Laplace transform to solve the real integrals in enginnering problems",
                    "Apply the concept of inverse laplace transform of various functions in engineering problems",
                    "Expand the periodic function by using Fourier series for real life problems and complex engineering problems",
                    "Find orthogonal trajectories and analytic function by using basic concepts of complex variable theory",
                    "Apply the concept of Correlation and Regression to the engineering problems in data science, machine learning and AI",
                    "Illustrate understanding of concepts of probability and expectation for getting the spread of the data and distribution of probabilities"
                ], 
                "Data Structures and Analysis":[
                    "Classify and Apply the concepts of stacks, queue and linked list in real life problem solving",
                    "Classify, apply and analyze the concept trees in real life problem solving",
                    "Illustrage and justify the concepts of graphs in real life problem solving",
                    "List and examine the concepts of sorting, searching techniques in real life problem solving",
                    "Use and identify the concept of recursion, hashing in real life problem solving",
                    "Examine and justify different methods of stacks, queues, linked list, trees and graphs to various applications"
                ], 
                "Database Management System":[
                    "Identify the need of Database Management System",
                    "Design conceptual model for real life applications",
                    "Create Relational Model for real life applicaions",
                    "Formulate query using SQL commands",
                    "Apply the concept of normalization to relational database design",
                    "Demonstrate the concept of transaction, concurrency and recovery"
                ], 
                "Principle of Communciations":[
                    "Describe analog and digital communication systems",
                    "Differentiate types of noise , analysis the fourier transform of time and frequency domain",
                    "Design transmitter and reciever of AM, DSB, SSB and FM",
                    "Describe Sampling theorem and pulse modulation systems",
                    "Explain multiplexing and digital band pass modulation techniques",
                    "Describe electromagnetic rediation and propagation of waves"
                ], 
                "Paradigms and Computer Programming Fundamentals":[
                    "Understand and compare different programming paradigms",
                    "Understand and Objectve orieanted constructs and use them in program design",
                    "Understand the concept of declarative programming paradigms through functional and logic programming",
                    "Design and Develop program based on declarative programming paradigm using functional and logic programming",
                    "Understand the role of concurrency in parallel and distributed programming",
                    "Understand different application domains for use of scripting languages"
                ]
            },
            "Sem 4":{
                "Engineering Math III":[], 
                "Computer Network and Network Design":[], 
                "Operating System":[], 
                "Automata Theory":[], 
                "Computer Organization and Architecture":[]
            },
            "Sem 5":{},
            "Sem 6":{},
            "Sem 7":{},
            "Sem 8":{}
        }
    }


    const listOfFields = fields.map((field) => (
        <div onClick={() => {setFieldSelected(field)}} className="p-3 text-xl text-slate-800 hover:text-white hover:bg-slate-800 hover:scale-125 rounded-lg duration-150">{field}</div>
    ))

    const listOfSemesters = (fieldSelected == "Engineering")? enginneringSems.map((sem) => (
        <div onClick={() => { setSemesterSelected(sem)}} className=" p-2 text-xl text-slate-800 hover:text-white hover:bg-slate-800 hover:scale-125 rounded-lg duration-150">{sem}</div>
    )):((""))

    const listOfSubjects = subjectMap[fieldSelected] && subjectMap[fieldSelected][semesterSelected] ? (
        subjectMap[fieldSelected][semesterSelected].map((sub) => (
          <div onClick={() => {setSubjectSelected(sub)}} className="p-3 text-slate-800 hover:text-white hover:bg-slate-800 hover:scale-110 rounded-lg duration-150" key={sub}>{sub}</div>
        ))
      ) : <div>No subjects available</div>;
    
    const setOfCourseOurcomesBasedOnSelectedSubject = courseOutcomeMap[fieldSelected] && courseOutcomeMap[fieldSelected][semesterSelected] && courseOutcomeMap[fieldSelected][semesterSelected][subjectSelected] ? (
        courseOutcomeMap[fieldSelected][semesterSelected][subjectSelected].map((co) => (
            <div className="text-center p-2 text-white hover:z-10 hover:scale-125 hover:rounded-lg hover:bg-slate-800 hover:border-0 border-x border-slate-800/60 duration-150 text-sm ">{co}</div>
        ))
    ):""

    const genAI = new GoogleGenerativeAI(process.env.REACT_GEMINI_API_KEY) 
    const model = genAI.getGenerativeModel({model:"gemini-pro"})

    const handleBloom = () => {
        if (bloomLoading){return}

        if (files.length <= 0){
            alert("You need to add file")
            return
        }
        if (fieldSelected == "" || subjectSelected == "" || semesterSelected == ""){
            alert ("Selet a Field, Semester and Subject")
            return
        }

        setBloomLoading(true)

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

    useEffect(() => {
        // after hitting get bloom we will get our content and this hook will get triggered
        // so even if there are multiple files in queue, each time a fileContent gets changed we asume next file in queue has been added to do query 

        if (fileContent == "") { return }
        var newData = []
        const lines = fileContent.split('\n'); // Split by new line character
        lines.forEach((line, index) => {
            // const aijsonresp = getairesponse(line) 
            var jsonData = {}
            if (courseOutcomeMap[fieldSelected] && courseOutcomeMap[fieldSelected][semesterSelected] && courseOutcomeMap[fieldSelected][semesterSelected][subjectSelected]){
            jsonData = {
                "question": line,
                ...courseOutcomeMap[fieldSelected][semesterSelected][subjectSelected].reduce((acc, key) => {
                    acc[key] = 0; // Set each key to 0
                    return acc;
                }, {}),
            }
            }
            newData.push(jsonData)
        });
        setdatainjson(newData)
    }, [fileContent])

    // this used to export excel file on clicking bloom button but instead of that now we are going to create a new widow showing it in table form
    // useEffect(() => {
    //     if (datainjson.length == 0 ){
    //         return
    //     }
    //     handleXlsxExport(datainjson)
    // }, [datainjson])

    useEffect(() => {
        if (datainjson.length == 0 ){
            return
        }
        // open new window
        setOpenMappedCO(true) 
    }, [datainjson])

    // these use effects hide the already opened lists if other list is clicked on
    useEffect(() => {
        if (openFieldlist == true){
            setOpensubjectlist(false)
            setOpenSemlist(false)
        }
    }, [openFieldlist])
    useEffect(() => {
        if (openSemlist == true){
            setOpensubjectlist(false)
            setOpenfieldlist(false)
        }
    }, [openSemlist])
    useEffect(() => {
        if (opensubjectlist == true){
            setOpenfieldlist(false)
            setOpenSemlist(false)
        }
    }, [opensubjectlist])


    return (
        <div className=" w-full h-full bg-gradient-to-bl from-blue-900 to-cyan-400 justify-center items-center flex flex-col">
           { openMappedCO?
        //    <>
        //     <div onClick={() => {setOpenMappedCO(!openMappedCO)}} className="absolute top-0 left-0 w-full h-full"></div>
        //     <div className=" z-20 absolute top-0 left-0 scale-95 bg-slate-800/25 w-full h-full rounded-lg backdrop-blur-sm border flex justify-center items-center"></div>
        //    </>
        < CoMappedComponent setOpenMappedCO={setOpenMappedCO}  openMappedCO={openMappedCO} datainjson={datainjson}/>
            :""
           } 
            <div className=" font-bold text-center font-mono text-2xl text-white"> CO Mapper</div>
            <div className=" flex m-4 justify-center">
                <div onClick={() => {setOpenfieldlist(!openFieldlist)}}  role={"button"} className=" m-3 bg-cyan-500 p-4 sm:px-2 md:px-8 hover:bg-blue-400 duration-150 rounded-full text-white font-mono text-md text-center flex justify-center">
                    {(fieldSelected == "")? "Select Field":fieldSelected}
                    {openFieldlist? <div className="z-20 bg-cyan-400 h-fit w-fit absolute rounded-md translate-y-12 border-2 border-slate-800/60 font-mono p-2">{listOfFields}</div>:""}
                </div>
                <div onClick={() => {setOpenSemlist(!openSemlist)}} role={"button"} className=" m-3 bg-cyan-500 p-4 sm:px-2 md:px-8 hover:bg-blue-400 duration-150 rounded-full text-white font-mono text-md relative text-center flex justify-center">
                    {(semesterSelected == "")? "Select Semester":semesterSelected}
                    {openSemlist? <div className="z-20 bg-cyan-400 h-fit w-32 absolute rounded-md translate-y-12  border-2 border-slate-800/60 font-mono p-2">{listOfSemesters}</div>:""}
                </div>
                <div onClick={() => {setOpensubjectlist(!opensubjectlist)}} role={"button"}  className=" m-3 bg-cyan-500 p-4 sm:px-2 md:px-8 hover:bg-blue-400 duration-150 rounded-full text-white font-mono text-md relative text-center flex justify-center" >
                    {(subjectSelected == "")? "Select Subject":subjectSelected}
                    { opensubjectlist?<div className="z-20 bg-cyan-400 h-fit w-60 absolute rounded-md translate-y-12 border-2 border-slate-800/60">{listOfSubjects}</div>:""}
                </div>
            </div>
            <div className=" flex justify-center items-center p-2 m-2 font-mono">{setOfCourseOurcomesBasedOnSelectedSubject}</div>
            <MyDropzone files={files} setFiles={setFiles}/>
            <div role={"button"} onClick={handleBloom} className=" bg-green-400 hover:bg-emerald-400 hover:px-10 duration-200 m-4 p-4 px-8 rounded-full font-bold font-mono">
                {bloomLoading? "Loading...":"Get CO Mapped"}
            </div>
        </div>
    )
}

function CoMappedComponent(props){
    const qCotable = (
        props.datainjson.map(data => (
            <div className=" flex justify-around">
                <div className="w-3/5 text-center">{data.question}</div>
                {Object.keys(data).filter(key => key !== 'question').map((key, index) => (
            <div key={index} className="px-3 border-slate-800">{data[key]}</div>
        ))}
            </div>
        )))

    return (
        <div>
            <div onClick={() => {props.setOpenMappedCO(!props.openMappedCO)}} className="absolute top-0 left-0 w-full h-full"></div>
            <div className=" z-20 absolute top-0 left-0 scale-95 bg-slate-800/25 w-full h-full rounded-lg backdrop-blur-sm border p-3 font-mono text-xl text-white/90">
                <div className=" flex justify-around"> 
                <div className=" text-center w-3/5">Questions</div>
                <div className=" px-3  border-slate-800">CO1</div>
                <div className=" px-3  border-slate-800">CO2</div>
                <div className=" px-3  border-slate-800">CO3</div>
                <div className=" px-3  border-slate-800">CO4</div>
                <div className=" px-3  border-slate-800">CO5</div>
                <div className=" px-3  border-slate-800">CO6</div>
                </div>
            {qCotable}
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