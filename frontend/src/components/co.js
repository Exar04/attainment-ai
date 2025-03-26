import { useCallback, useEffect, useState } from "react"
import {MyDropzone} from "./commonData"
import {utils, read, writeXLSX, writeFile} from "xlsx"
// import dotenv from "dotenv"
import { GoogleGenerativeAI } from "@google/generative-ai"
import getPointsMappedForCnnd from "../nlp/subjects/cnnd"
import allocate_points from "../nlp/match"
import { enginneringSems, diplomaSems, fields, subjectMap, courseOutcomeMap } from "./commonData"

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

    const listOfFields = fields.map((field, index) => (
        <div key={index} onClick={() => {setFieldSelected(field)}} className="p-3 text-xl text-slate-800 hover:text-white hover:bg-slate-800 hover:scale-125 rounded-lg duration-150">{field}</div>
    ))

    const listOfSemesters = (fieldSelected == "Engineering")? enginneringSems.map((sem, index) => (
        <div key={index} onClick={() => { setSemesterSelected(sem)}} className=" p-2 text-xl text-slate-800 hover:text-white hover:bg-slate-800 hover:scale-125 rounded-lg duration-150">{sem}</div>
    )):(("No Sem Available"))

    const listOfSubjects = subjectMap[fieldSelected] && subjectMap[fieldSelected][semesterSelected] ? (
        subjectMap[fieldSelected][semesterSelected].map((sub) => (
          <div onClick={() => {setSubjectSelected(sub)}} className="p-3 text-slate-800 hover:text-white hover:bg-slate-800 hover:scale-110 rounded-lg duration-150" key={sub}>{sub}</div>
        ))
      ) : <div>No subjects available</div>;
    
    const setOfCourseOurcomesBasedOnSelectedSubject = courseOutcomeMap[fieldSelected] && courseOutcomeMap[fieldSelected][semesterSelected] && courseOutcomeMap[fieldSelected][semesterSelected][subjectSelected] ? (
        courseOutcomeMap[fieldSelected][semesterSelected][subjectSelected].map((co) => (
            <div className="text-center p-2 text-white hover:z-10 hover:scale-125 hover:rounded-lg hover:bg-slate-800 hover:border-0 border-x border-slate-800/60 duration-150 text-sm " key={co}>{co}</div>
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

    async function getairesponse(question, listOfCo){
        const prompt = `${question}
        read the question above and give me the allocation of marks across course outcome based on given course outcome. and only give me response in below given json format
        {
            <replace this with above given question>:{

                ${listOfCo[0]}: <allocatedMark>
                ${listOfCo[1]}: <allocatedMark>
                ${listOfCo[2]}: <allocatedMark>
                ${listOfCo[3]}: <allocatedMark>
                ${listOfCo[4]}: <allocatedMark>
                ${listOfCo[5]}: <allocatedMark>
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
                // ...courseOutcomeMap[fieldSelected][semesterSelected][subjectSelected].reduce((acc, key) => {
                //     acc[key] = 0; // Set each key to 0
                //     return acc;
                // }, {}),

                "listOfCo": [
                    ...courseOutcomeMap[fieldSelected][semesterSelected][subjectSelected],
                ]
            }
            }
            newData.push(jsonData)
        });
        // console.log(newData)
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
        < CoMappedComponent setOpenMappedCO={setOpenMappedCO}  openMappedCO={openMappedCO} datainjson={datainjson} subjectSelected={subjectSelected}/>
            :""
           } 
            <div className=" font-bold text-center font-mono text-2xl text-white"> CO Mapper</div>
            <div className=" flex m-1 justify-center">
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
            <div className=" w-96 h-96">
            <MyDropzone files={files} setFiles={setFiles}/>
            </div>
            <div role={"button"} onClick={handleBloom} className=" bg-green-400 hover:bg-emerald-400 hover:px-10 duration-200 m-4 p-4 px-8 rounded-full font-bold font-mono">
                {bloomLoading? "Loading...":"Get CO Mapped"}
            </div>
        </div>
    )
}


function CoMappedComponent(props){
    const [mappedCo, setmappedCo] =  useState([])

    // const genAI = new GoogleGenerativeAI(process.env.REACT_GEMINI_API_KEY) 
    // const genAI = new GoogleGenerativeAI("")  // copy paste the api key her
    // const model = genAI.getGenerativeModel({model:"gemini-pro"})

    async function getairesponse(question, listOfCo){
        const prompt = `${question}
        read the question above and give me the allocation of marks across course outcome based on given course outcome. and only give me response in below given json format
        the total allocated marks should total to 5 marks
        {
            <replace this with above given question>:{
                "${listOfCo[0]}": <allocatedMark> ,
                "${listOfCo[1]}": <allocatedMark> ,
                "${listOfCo[2]}": <allocatedMark> ,
                "${listOfCo[3]}": <allocatedMark> ,
                "${listOfCo[4]}": <allocatedMark> ,
                "${listOfCo[5]}": <allocatedMark>
            }
        }`
        // console.log(prompt)
        // const result = await model.generateContent(prompt)
        // const response = await result.response
        // const text = await response.text()
        // console.log(text)
        // return text
    }

    const fetchAiResponses = async () => {
        const listOfResp = [];
        await Promise.all(
            props.datainjson.map(async (data) => {
                const question = data.question;
                const listOfCo = data.listOfCo; // Assuming your list of course outcomes are in this format

                if (listOfCo && listOfCo.length > 0) {
                    try{

                    const resp = await getairesponse(question, listOfCo);
                    var jsonresp = JSON.parse(resp)
                    } catch (error){
                        console.error("Error parsing JSON:", error);
                    }
                    listOfResp.push(jsonresp);
                }
            })
        );
        setmappedCo(listOfResp);
    }
    const mapCoUsingNlp = () => {
        const listOfResp = [];
        props.datainjson.map(async (data) => {
            const question = data.question
            const listOfCo = data.listOfCo; // Assuming your list of course outcomes are in this format

            if (props.subjectSelected == "Computer Network and Network Design") {
                const Mpoints = getPointsMappedForCnnd(question)
                const pts = allocate_points(Mpoints, 10)
                const jsonresp = {
                    [question]: {
                        1: pts[0],
                        2: pts[1],
                        3: pts[2],
                        4: pts[3],
                        5: pts[4],
                        6: pts[5]
                    }
                }
                listOfResp.push(jsonresp)
                console.log( jsonresp, "hel : " , question, listOfCo, pts)
            }else if (props.subjectSelected == "Database Management System") {
                const Mpoints = getPointsMappedForCnnd(question)
                const pts = allocate_points(Mpoints)
                const jsonresp = {
                    [question]: {
                        1: pts[0],
                        2: pts[1],
                        3: pts[2],
                        4: pts[3],
                        5: pts[4],
                        6: pts[5]
                    }
                }
                listOfResp.push(jsonresp)
                console.log( jsonresp, "hel : " , question, listOfCo, pts)
            }
        })
        setmappedCo(listOfResp);
    }
    const lipo = ["Computer Network and Network Design"]
    const [fetchonce, setfetchonce] = useState(true)
    useEffect(() => {
        if (!fetchonce){setfetchonce(!fetchonce); return }
        setfetchonce(!fetchonce)

        if (lipo.some(word => props.subjectSelected.toLowerCase().includes(word.toLowerCase()))) {
            mapCoUsingNlp()
        } else {
            // fetchAiResponses()
            alert("The NLP for this subject is still not out yet")
        }
    },[])

    const qCotable = (
        mappedCo.map((data, index) => {
            console.log("gg : ", data)
            const question = Object.keys(data)[0];
            const answers = data[question];

            return (
                <div key={index} className="grid grid-cols-2">
                {/* <div key={index} className="flex justify-around"> */}
                    <h2 className=" grid grid-cols-2 mx-8 my-2" >{question}</h2>
                    <ul className="flex justify-around w-full m-2">
                        {Object.entries(answers).map(([subQuestion, value], idx) => (
                            <li key={idx} className="">
                                {value}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }))

    return (
        <div>
            <div onClick={() => {props.setOpenMappedCO(!props.openMappedCO)}} className="absolute top-0 left-0 w-full h-full"></div>
            <div className=" z-20 absolute top-0 left-0 scale-95 bg-slate-800/25 w-full h-full rounded-lg backdrop-blur-sm border p-3 font-mono text-xl text-white/90">
                <div className=" grid grid-cols-2">
                    <div className=" mx-8 my-2">Questions</div>
                    <div className="flex justify-around">
                        <div className=" px-3  border-slate-800">CO1</div>
                        <div className=" px-3  border-slate-800">CO2</div>
                        <div className=" px-3  border-slate-800">CO3</div>
                        <div className=" px-3  border-slate-800">CO4</div>
                        <div className=" px-3  border-slate-800">CO5</div>
                        <div className=" px-3  border-slate-800">CO6</div>
                    </div>
                </div>
            {qCotable}
            {/* {lulu} */}
            </div>
        </div>
    )
}
