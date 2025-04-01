import { useCallback, useEffect, useState } from "react"
import { enginneringSems, diplomaSems, fields, subjectMap, courseOutcomeMap, MyDropzone } from "./commonData"
import {useDropzone} from "react-dropzone"
import {Bar} from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Options
} from 'chart.js';
import getPointsMappedForCnnd from "../nlp/subjects/cnnd";
import getPointsMappedForDBMS from "../nlp/subjects/dbms";
import allocate_points from "../nlp/match";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

export function Attainments() {

    const [openSemlist, setOpenSemlist] = useState(false) 
    const [opensubjectlist, setOpensubjectlist] = useState(false)
    const [openFieldlist, setOpenfieldlist] = useState(false)

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

    const [surveyData, setSurveyData] = useState(null)
    function getSurveyData() {
        fetch("http://localhost:8000/getExitSurvey", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                SubjectName: subjectSelected,
            }),
        })
        .then(res => res.json())
        .then(data => {
            console.log("bazinga : ", data)
            setSurveyData(data)
        })
        .catch(err => alert("Server down maybe!"))
    }

    const surveyDiv = surveyData 
    ? Object.entries(surveyData).map(([key, value], index) => (
        <div key={index} className="m-2 my-0 grid grid-cols-8 bg-emerald-500 font-bold font-mono text-slate-800">
            <div className="text-center">{key}</div> {/* Co1, Co2, etc. */}
            {Object.values(value).map((num, i) => (
                <div key={i} className="text-center bg-violet-500">{num}</div> 
            ))}
            <div className=" flex justify-center">{(1*value[0] + 2*value[1] + 3*value[2] + 4*value[3] + 5*value[4]) * 100/(5 *(value[0] +value[1] + value[2] + value[3] + value[4]))}</div>
            <div className=" flex justify-center">{(1*value[0] + 2*value[1] + 3*value[2] + 4*value[3] + 5*value[4]) * 100*0.2/(5 *(value[0] +value[1] + value[2] + value[3] + value[4]))}</div>
        </div>
    ))
    : null;

    const [CoToOutOf20, setCoToOutOf20] = useState({})
    useEffect(() => {
        if (!surveyData) return; // Ensure surveyData is defined before processing
    
        // Process surveyData: Compute sum of values for each key (Co1, Co2, etc.)
        const computedSums = Object.fromEntries(
            Object.entries(surveyData).map(([key, value]) => [
                key, 
                (1*value[0] + 2*value[1] + 3*value[2] + 4*value[3] + 5*value[4]) * 100*0.2/(5 *(value[0] +value[1] + value[2] + value[3] + value[4]))
                // Object.values(value).reduce((sum, num) => sum + num, 0) // Sum values
            ])
        );
    
        setCoToOutOf20(computedSums); // Store computed sums in state
    }, [surveyData]);

    return (
        <div className=" w-screen h-full bg-gradient-to-b from-blue-900 to-cyan-400 flex flex-col ">
            <div className="flex m-1 h-20 justify-center">
                <div onClick={() => { setOpenfieldlist(!openFieldlist) }} role={"button"} className=" m-3 bg-cyan-500 p-4 sm:px-2 md:px-8 hover:bg-blue-400 duration-150 rounded-full text-white font-mono text-md text-center flex justify-center">
                    {(fieldSelected == "") ? "Select Field" : fieldSelected}
                    {openFieldlist ? <div className="z-20 bg-cyan-400 h-fit w-fit absolute rounded-md translate-y-12 border-2 border-slate-800/60 font-mono p-2">{listOfFields}</div> : ""}
                </div>
                <div onClick={() => { setOpenSemlist(!openSemlist) }} role={"button"} className=" m-3 bg-cyan-500 p-4 sm:px-2 md:px-8 hover:bg-blue-400 duration-150 rounded-full text-white font-mono text-md relative text-center flex justify-center">
                    {(semesterSelected == "") ? "Select Semester" : semesterSelected}
                    {openSemlist ? <div className="z-20 bg-cyan-400 h-fit w-32 absolute rounded-md translate-y-12  border-2 border-slate-800/60 font-mono p-2">{listOfSemesters}</div> : ""}
                </div>
                <div onClick={() => { setOpensubjectlist(!opensubjectlist) }} role={"button"} className=" m-3 bg-cyan-500 p-4 sm:px-2 md:px-8 hover:bg-blue-400 duration-150 rounded-full text-white font-mono text-md relative text-center flex justify-center" >
                    {(subjectSelected == "") ? "Select Subject" : subjectSelected}
                    {opensubjectlist ? <div className="z-20 bg-cyan-400 h-fit w-60 absolute rounded-md translate-y-12 border-2 border-slate-800/60">{listOfSubjects}</div> : ""}
                </div>

                <div role={"button"} onClick={() => { getSurveyData() }} className=" bg-green-400 hover:bg-emerald-400 hover:px-10 duration-200 m-3 p-4 px-8 rounded-full font-bold font-mono">
                    Get Survey Data
                </div>
            </div>

            <IndirectMeasures surveyData={surveyData} CoToOutOf20={CoToOutOf20}/>
            {surveyData?<DirectMeasures surveyData={surveyData} CoToOutOf20={CoToOutOf20} subjectSelected={subjectSelected}/>:<div className=" w-screen h-screen"></div>}
        </div>
    )
}

function IndirectMeasures(props) {
    const surveyDiv = props.surveyData 
    ? Object.entries(props.surveyData).map(([key, value], index) => (
        <div key={index} className={`m-2 my-0 grid grid-cols-8 ${"bg-blue-"+(8-index)+"00"} border-b border-x border-dashed font-bold font-mono text-white ${index == 5? "rounded-b-xl": ""}`}>
            <div className="text-center ">{key}</div> {/* Co1, Co2, etc. */}
            {Object.values(value).map((num, i) => (
                <div key={i} className={`text-center ${"bg-blue-"+(8-index)+"00"}`}>{num}</div> 
            ))}
            <div className=" flex justify-center">{((1*value[0] + 2*value[1] + 3*value[2] + 4*value[3] + 5*value[4]) * 100/(5 *(value[0] +value[1] + value[2] + value[3] + value[4]))).toFixed(2)}</div>
            <div className=" flex justify-center">{((1*value[0] + 2*value[1] + 3*value[2] + 4*value[3] + 5*value[4]) * 100*0.2/(5 *(value[0] +value[1] + value[2] + value[3] + value[4]))).toFixed(2)}</div>
        </div>
    ))
    : null;
    return (
        <>
       
            {/* This is Indirect exit survey chart */}
            {
                props.surveyData ?
                    <div className=" m-2 mb-0 grid grid-cols-8 grid-rows-2 font-bold font-mono text-white ">
                        <div className=" col-span-1 row-span-2 bg-blue-500 justify-center flex items-center rounded-ss-3xl border border-dashed">Course Objectvies</div>
                        <div className=" col-span-5 bg-blue-500 text-center border-y border-dashed">Course Outcome</div>
                        <div className="row-span-2 text-center bg-blue-500 justify-center flex items-center border-y border-l border-dashed">%</div>
                        <div className="row-span-2 text-center bg-blue-500 justify-center flex items-center rounded-se-3xl border border-dashed">Out Of 20</div>
                        <div className=" text-center bg-cyan-500/40 border-b border-dashed">1</div>
                        <div className=" text-center bg-cyan-500/40 border-b border-dashed">2</div>
                        <div className=" text-center bg-cyan-500/40 border-b border-dashed">3</div>
                        <div className=" text-center bg-cyan-500/40 border-b border-dashed">4</div>
                        <div className=" text-center bg-cyan-500/40 border-b border-dashed">5</div>
                    </div>
                    : ""
            }
            {surveyDiv}

            {/* This is chart */}
            {props.surveyData ?
                <div className=" w-full h-80 p-2">
                    <div className=" bg-slate-200 border-2 border-cyan-800 rounded-2xl p-2 h-full w-full flex flex-col justify-center items-center">
                        {/* <div>Course Exit Survey Statistics</div> */}
                        <Bar

                            data={{
                                labels: Object.keys(props.CoToOutOf20 || {}), // Extracting labels (CO1, CO2, etc.)
                                datasets: [
                                    {
                                        label: "Indirect",
                                        data: Object.values(props.CoToOutOf20 || {}),
                                        borderColor: "rgba(200, 220, 235, 1)",
                                        hoverBorderColor:"rgba(40, 67, 135, 0.6)",
                                        backgroundColor: "rgba(40, 67, 135, 0.6)",
                                        borderWidth: 2,
                                        // borderRadius: Number.MAX_VALUE,
                                        borderSkipped: false,
                                    },
                                    // {
                                    //     label: "Direct",
                                    //     data: Object.values(props.CoToOutOf20 || {}), // Extracting corresponding values
                                    //     //
                                    //     borderColor: "rgba(80, 200, 120, 1)",
                                    //     hoverBorderColor:"rgba(40, 120, 135, 1)",
                                    //     backgroundColor: "rgba(80, 200, 120, 0.6)",
                                    //     hoverBackgroundColor: "rgba(80, 200, 120, 1)",
                                    //     borderWidth: 2,
                                    //     borderRadius: Number.MAX_VALUE,
                                    //     borderSkipped: false,
                                    // },
                                ],
                                options:{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true, // Ensures chart starts from 0
                                            max: 20, // ✅ Force y-axis limit to 20
                                            ticks: {
                                                stepSize: 5, // Optional: Control tick intervals
                                            },
                                        },
                                    },
                                }}
                            }
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true, // Ensures chart starts from 0
                                        max: 20, // ✅ Force y-axis limit to 20
                                        ticks: {
                                            stepSize: 5, // Optional: Control tick intervals
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                : ""}
 </>
    )
}

function DirectMeasures(props){
    const [files, setFiles] = useState([])
    const [fileContent, setFileContent] =  useState("")
    const [jsonData, setJsonData] = useState([]);

    const [UtQuestionFile, setUtQuestionFile ] = useState([])
    const [WTQuestionFile, setWTQuestionFile] = useState([])
    const [OralQuestionFile, setOralQuestionFile] = useState([])
    const [EndSemQuestionFile, setEndSemQuestionFile] = useState([])

    const [UtQuestionFileContent, setUtQuestionFileContent ] = useState("")
    const [WTQuestionFileContent, setWTQuestionFileContent] = useState("")
    const [OralQuestionFileContent, setOralQuestionFileContent] = useState("")
    const [EndSemQuestionFileContent, setEndSemQuestionFileContent] = useState("")

    const [UtCo, setUtCo] = useState([0, 0, 0, 0, 0, 0]);
    const [WTCo, setWTCo] = useState([0, 0, 0, 0, 0, 0]);
    const [OralCo, setOralCo] = useState([0, 0, 0, 0, 0, 0]);
    const [EndSemCo, setEndSemCo] = useState([0, 0, 0, 0, 0, 0]);

    const lipo = ["Computer Network and Network Design"]

    // student data will be in the form of
    // name;Utmarks;TW;oral;semMarks
    // the file input will be in the form of csv and we will take that and convert it into


    const parseCSV = (csvString) => {
        const lines = csvString.trim().split("\n")
        const headers = ["Name", "IA_Average", "TW", "Oral", "EndSem"]

        return lines.map(line => {
            const values = line.split(";")
            let obj = {}
            headers.forEach((header, index) => {
                obj[header] = isNaN(values[index]) ? values[index] : Number(values[index])
            })
            return obj
        })
    }
    useEffect(() => {

        if (files.length <= 0){
            // alert("You need to add file")
            return
        }
        // console.log(files)
        const file = files[0]
        // rn we only added functionality to parse text file 
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function(e) {
            const content = e.target.result
            setFileContent(content)
        }
    }, [files])

    useEffect(() => {
        if (fileContent == "") return
        // console.log(fileContent)
        setJsonData(parseCSV(fileContent))
    }, [fileContent])

    const iaAvgSum = jsonData.reduce((sum, student) => sum + student.IA_Average, 0);
    const TWSum = jsonData.reduce((sum, student) => sum + student.TW, 0);
    const OralSum = jsonData.reduce((sum, student) => sum + student.Oral, 0);
    const EndSemSum = jsonData.reduce((sum, student) => sum + student.EndSem, 0);

    const studentsTable = (
        <table className="border-collapse border border-gray-400 w-full text-center">
            <thead>
                <tr className="bg-gray-200 text-black">
                    <th className="border border-gray-400 p-2">Name</th>
                    <th className="border border-gray-400 p-2">IA Average (20)</th>
                    <th className="border border-gray-400 p-2">TW (25)</th>
                    <th className="border border-gray-400 p-2">Oral (25)</th>
                    <th className="border border-gray-400 p-2">EndSem (80)</th>
                </tr>
            </thead>
            <tbody>
                {jsonData.map((student, index) => (
                    <tr key={index} className="hover:bg-gray-100 hover:text-slate-600">
                        <td className={`border border-gray-400 p-2 ${index == jsonData.length-1? "": ""}`}>{student.Name}</td>
                        <td className="border border-gray-400 p-2">{student.IA_Average}</td>
                        <td className="border border-gray-400 p-2">{student.TW}</td>
                        <td className="border border-gray-400 p-2">{student.Oral}</td>
                        <td className="border border-gray-400 p-2">{student.EndSem}</td>
                    </tr>
                ))}
            </tbody>

            <thead>
                <tr className="bg-gray-200 text-black">
                    <th className="border border-gray-400 p-2">Total number of Students present</th>
                    <th className="border border-gray-400 p-2">{jsonData.length}</th>
                    <th className="border border-gray-400 p-2">{jsonData.length}</th>
                    <th className="border border-gray-400 p-2">{jsonData.length}</th>
                    <th className="border border-gray-400 p-2">{jsonData.length}</th>
                </tr>
            </thead>

            <thead>
                <tr className="bg-gray-200 text-black">
                    <th className="border border-gray-400 p-2">Average marks</th>
                    <th className="border border-gray-400 p-2">{(iaAvgSum/jsonData.length).toFixed(2)}</th>
                    <th className="border border-gray-400 p-2">{(TWSum/jsonData.length).toFixed(2)}</th>
                    <th className="border border-gray-400 p-2">{(OralSum/jsonData.length).toFixed(2)}</th>
                    <th className="border border-gray-400 p-2">{(EndSemSum/jsonData.length).toFixed(2)}</th>
                </tr>
            </thead>

            <thead>
                <tr className="bg-gray-200 text-black">
                    <th className="border border-gray-400 p-2">Average marks %</th>
                    <th className="border border-gray-400 p-2">{(iaAvgSum/(jsonData.length*20) * 100).toFixed(2)}</th>
                    <th className="border border-gray-400 p-2">{(TWSum/(jsonData.length*25) * 100).toFixed(2)}</th>
                    <th className="border border-gray-400 p-2">{(OralSum/(jsonData.length*25) * 100).toFixed(2)}</th>
                    <th className="border border-gray-400 p-2">{(EndSemSum/(jsonData.length*80) * 100).toFixed(2)}</th>

                    {/* <th className="border border-gray-400 p-2">{iaAvgSum/jsonData.length}</th>
                    <th className="border border-gray-400 p-2">{TWSum/jsonData.length}</th>
                    <th className="border border-gray-400 p-2">{OralSum/jsonData.length}</th>
                    <th className="border border-gray-400 p-2">{EndSemSum/jsonData.length}</th> */}
                </tr>
            </thead>
        </table>
    )

    const handleGetCoMappedForAllPapers = () => {
        if(UtQuestionFile.length <= 0  ){
            alert("UT Question Paper Not Submited")
            return
        }else if(WTQuestionFile.length <= 0  ){
            alert("WT Question Paper Not Submited")
            return
        }else if(OralQuestionFile.length <= 0  ){
            alert("Oral Question Paper Not Submited")
            return
        }else if(EndSemQuestionFile.length <= 0  ){
            alert("EndSem Question Paper Not Submited")
            return
        }else if (!(lipo.some(word => props.subjectSelected.toLowerCase().includes(word.toLowerCase())))) {
            alert("The NLP for this subject is still not out yet")
            return
        }

        const reader1 = new FileReader()
        reader1.readAsText(UtQuestionFile[0])
        reader1.onload = function(e) {
            setUtQuestionFileContent(e.target.result)
        }

        const reader2 = new FileReader()
        reader2.readAsText(WTQuestionFile[0])
        reader2.onload = function(e) {
            setWTQuestionFileContent(e.target.result)
        }

        const reader3 = new FileReader()
        reader3.readAsText(OralQuestionFile[0])
        reader3.onload = function(e) {
            setOralQuestionFileContent(e.target.result)
        }

        const reader4 = new FileReader()
        reader4.readAsText(EndSemQuestionFile[0])
        reader4.onload = function (e) {
            setEndSemQuestionFileContent(e.target.result)
        }
    }

    const mapCoUsingNlp = (question, pointsToAllocatePerQuestion) => {
        var Mpoints
        if (props.subjectSelected == "Computer Network and Network Design") {
            Mpoints = getPointsMappedForCnnd(question)

        } else if (props.subjectSelected == "Database Management System") {
            Mpoints = getPointsMappedForDBMS(question)
        }
        // const pts = allocate_points(Mpoints, 5)
        const pts = allocate_points(Mpoints, pointsToAllocatePerQuestion)
        const resp = [pts[0], pts[1], pts[2], pts[3], pts[4], pts[5]]
        return resp
    }

    useEffect(() => {
        if (UtQuestionFileContent == "") { return }
        const lines = UtQuestionFileContent.split('\n'); // Split by new line character
        var tot = [0,0,0,0,0,0]
        lines.forEach((line, index) => {
            const currQuestionPointsArr = mapCoUsingNlp(line, 5)
            // console.log("gkg : ", index, mapCoUsingNlp( line,5))
            currQuestionPointsArr.map((p,i) => {
                tot[i] += p
            })
            setUtCo(tot)
        })
        // console.log("t : ", tot)
    }, [UtQuestionFileContent])

    useEffect(() => {
        if (WTQuestionFileContent == "") { return }
        const lines = WTQuestionFileContent.split('\n'); // Split by new line character
        var tot = [0,0,0,0,0,0]
        lines.forEach((line, index) => {
            const currQuestionPointsArr = mapCoUsingNlp(line, 5)
            // console.log("gkg : ", index, mapCoUsingNlp( line,5))
            currQuestionPointsArr.map((p,i) => {
                tot[i] += p
            })
            setWTCo(tot)
        })
    }, [WTQuestionFileContent])

    useEffect(() => {
        if (OralQuestionFileContent == "") { return }
        const lines = OralQuestionFileContent.split('\n'); // Split by new line character
        var tot = [0,0,0,0,0,0]
        lines.forEach((line, index) => {
            const currQuestionPointsArr = mapCoUsingNlp(line, 5)
            // console.log("gkg : ", index, mapCoUsingNlp( line,5))
            currQuestionPointsArr.map((p,i) => {
                tot[i] += p
            })
            setOralCo(tot)
        })
    }, [OralQuestionFileContent])

    useEffect(() => {
        if (EndSemQuestionFileContent == "") { return }
        const lines = EndSemQuestionFileContent.split('\n'); // Split by new line character
        var tot = [0,0,0,0,0,0]
        lines.forEach((line, index) => {
            const currQuestionPointsArr = mapCoUsingNlp(line, 5)
            // console.log("gkg : ", index, mapCoUsingNlp( line,5))
            currQuestionPointsArr.map((p,i) => {
                tot[i] += p
            })
            setEndSemCo(tot)
        })
    }, [EndSemQuestionFileContent])

    const [DistributionTypeAi, setDistributionTypeAi] =  useState(true)
    const addMarksDistributionOfCos = (
        <div className=" flex flex-col justify-center items-center mt-6">
            <div  className="flex justify-center items-center text-white font-bold font-mono text-2xl m-2">
                <div>Add Co Distribution :</div> 
                <div role={"button"} onClick={() => {setDistributionTypeAi(false)}} className={`${DistributionTypeAi? "bg-blue-400":"bg-blue-600"} rounded-full p-2 px-4 mx-2 hover:px-8 duration-300`}>Manually</div>
                <div role={"button"} onClick={() => {setDistributionTypeAi(true)}} className={`${DistributionTypeAi? "bg-blue-600":"bg-blue-400"} mx-2 rounded-full p-2 px-4 hover:px-8 duration-300`}>AI</div>
            </div>
            {DistributionTypeAi?
                <div className=" flex flex-col justify-center items-center">
                    <div className=" text-center font-bold font-mono text-3xl text-white m-2">Add all the Question papers in txt file format</div>
                    <div className=" flex justify-around items-center p-2 text-center text-white font-bold font-mono text-xl ">
                        <div>
                            UT Questions
                            <div className=" w-80 mx-2 h-80">
                                <MyDropzone files={UtQuestionFile} setFiles={setUtQuestionFile} />
                            </div>
                        </div>
                        <div>
                            WT Questions
                            <div className=" w-80 mx-2 h-80">
                                <MyDropzone files={WTQuestionFile} setFiles={setWTQuestionFile} />
                            </div>
                        </div>
                        <div>
                            Oral Questions
                            <div className=" w-80 mx-2 h-80">
                                <MyDropzone files={OralQuestionFile} setFiles={setOralQuestionFile} />
                            </div>
                        </div>
                        <div>
                            EndSem Questions
                            <div className=" w-80 mx-2 h-80">
                                <MyDropzone files={EndSemQuestionFile} setFiles={setEndSemQuestionFile} />
                            </div>
                        </div>
                    </div>
                    <div role={"button"} onClick={() => {handleGetCoMappedForAllPapers()}} className=" bg-green-400 hover:bg-emerald-400 hover:px-10 duration-200 m-4 p-4 px-8 rounded-full font-bold font-mono text-center w-max">
                        {false? "Loading...":"Get CO Mapped"}
                    </div>
                    <CoDistributionTable
                        UtCo={UtCo}
                        WTCo={WTCo}
                        OralCo={OralCo}
                        EndSemCo={EndSemCo}
                        setUtCo={setUtCo}
                        setWTCo={setWTCo}
                        setOralCo={setOralCo}
                        setEndSemCo={setEndSemCo}
                    />
                </div>
            : 
            <div className=" m-2">
            <CoDistributionTable 
                UtCo={UtCo}
                WTCo={WTCo}
                OralCo={OralCo}
                EndSemCo={EndSemCo}
                setUtCo={setUtCo}
                setWTCo={setWTCo}
                setOralCo={setOralCo}
                setEndSemCo={setEndSemCo}
            />
            </div>
            }
        </div>
    )

    return(
        <div className=" w-screen h-fit">
            <div className=" flex flex-col items-center  text-white font-bold font-mono text-2xl m-2">
                <div className=" m-3">TO GET DIRECT ASSESMENT REPORT UPLOAD STUDENT MARKS CSV FILE</div>
                <div className=" w-96 h-96">
                    <MyDropzone files={files} setFiles={setFiles}/>
                </div>
            </div>
            {jsonData.length ? 
            <div className=" m-2 bg-slate-600 text-white">
                {studentsTable} 
            </div>
            :""}
            {jsonData.length ?addMarksDistributionOfCos : ""}
            {jsonData.length ?<>
            <PercentageAttainmentAtCoLevel 
                UtCo={UtCo}
                WTCo={WTCo}
                OralCo={OralCo}
                EndSemCo={EndSemCo}
                setUtCo={setUtCo}
                setWTCo={setWTCo}
                setOralCo={setOralCo}
                setEndSemCo={setEndSemCo}

                iaAvgSum={iaAvgSum}
                TWSum={TWSum}
                OralSum={OralSum}
                EndSemSum={EndSemSum}
                jsonData={jsonData} />
            <TotalMeasures 
                UtCo={UtCo}
                WTCo={WTCo}
                OralCo={OralCo}
                EndSemCo={EndSemCo}

                iaAvgSum={iaAvgSum}
                TWSum={TWSum}
                OralSum={OralSum}
                EndSemSum={EndSemSum}
                jsonData={jsonData} 

                CoToOutOf20={props.CoToOutOf20}/>
            </>: ""}
            


        </div>
    )
}

const CoDistributionTable = (props) => {

    // useEffect(() => {
    //     console.log(props.EndSemCo)
    // }, [props.EndSemCo])

    const handleChange = (index, value, setState) => {
        setState((prevState) => {
            const newValues = [...prevState]
            newValues[index] = Number(value)
            return newValues
        })
    }

    return (
        <table className="border-collapse border border-gray-400 w-full text-white text-center">
            <thead>
                <tr className="bg-gray-700">
                    <th className="border border-gray-400 p-2">CO</th>
                    <th className="border border-gray-400 p-2">IA</th>
                    <th className="border border-gray-400 p-2">WT</th>
                    <th className="border border-gray-400 p-2">Oral</th>
                    <th className="border border-gray-400 p-2">End Sem</th>
                </tr>
            </thead>
            <tbody>
                {[1, 2, 3, 4, 5, 6].map((co, index) => (
                    <tr key={co} className="bg-gray-800">
                        <td className="border border-gray-400 p-2">Distribution of Marks for CO{co}</td>
                        <td className="border border-gray-400 p-2">
                            <input
                                // type="number"
                                value={props.UtCo[index]}
                                onChange={(e) => handleChange(index, e.target.value, props.setUtCo)}
                                className="bg-gray-700 p-1 w-12 text-center"
                            />
                        </td>
                        <td className="border border-gray-400 p-2">
                            <input
                                // type="number"
                                value={props.WTCo[index]}
                                onChange={(e) => handleChange(index, e.target.value, props.setWTCo)}
                                className="bg-gray-700 p-1 w-12 text-center"
                            />
                        </td>
                        <td className="border border-gray-400 p-2">
                            <input
                                // type="number"
                                value={props.OralCo[index]}
                                onChange={(e) => handleChange(index, e.target.value, props.setOralCo)}
                                className="bg-gray-700 p-1 w-12 text-center"
                            />
                        </td>
                        <td className="border border-gray-400 p-2">
                            <input
                                // type="number"
                                value={props.EndSemCo[index]}
                                onChange={(e) => handleChange(index, e.target.value, props.setEndSemCo)}
                                className="bg-gray-700 p-1 w-12 text-center"
                            />
                        </td>
                    </tr>
                ))}
                <td className="border border-gray-400 bg-gray-800 p-2">Total</td>
                <td className={`border border-gray-400 bg-gray-800 p-2 ${props.UtCo.reduce((sum, value) => sum + value, 0) > 20? "bg-red-500/75":""}`}>{props.UtCo.reduce((sum, value) => sum + value, 0)}</td>
                <td className={`border border-gray-400 bg-gray-800 p-2  ${props.WTCo.reduce((sum, value) => sum + value, 0) > 25? "bg-red-500/75":""}`}>{props.WTCo.reduce((sum, value) => sum + value, 0)}</td>
                <td className={`border border-gray-400 bg-gray-800 p-2 ${props.OralCo.reduce((sum, value) => sum + value, 0) > 25? "bg-red-500/75":""}`}>{props.OralCo.reduce((sum, value) => sum + value, 0)}</td>
                <td className={`border border-gray-400 bg-gray-800 p-2 ${props.EndSemCo.reduce((sum, value) => sum + value, 0) > 80? "bg-red-500/75":""}`}>{props.EndSemCo.reduce((sum, value) => sum + value, 0)}</td>
            </tbody>
        </table>
    )
}

const PercentageAttainmentAtCoLevel = (props) => {

    const handleChange = (index, value, setState) => {
        setState((prevState) => {
            const newValues = [...prevState]
            newValues[index] = Number(value)
            return newValues
        })
    }
    return (
        <div className=" w-screen p-2">
        <div className=" text-center text-white text-2xl font-mono m-2">Percentage Attainment At Co Level</div>
        <table className="border-collapse border border-gray-400 w-full text-white text-center">
            <thead>
                <tr className="bg-gray-700">
                    <th className="border border-gray-400 p-2">CO</th>
                    <th className="border border-gray-400 p-2">IA</th>
                    <th className="border border-gray-400 p-2">WT</th>
                    <th className="border border-gray-400 p-2">Oral</th>
                    <th className="border border-gray-400 p-2">End Sem</th>
                </tr>
            </thead>
            <tbody>
                {[1, 2, 3, 4, 5, 6].map((co, index) => (
                    <tr key={co} className="bg-gray-800">
                        <td className="border border-gray-400 p-2">CO{co}</td>
                        <td className="border border-gray-400 p-2">{((props.UtCo[index]/20)*(props.iaAvgSum/(props.jsonData.length*20) * 100)).toFixed(3)}</td>
                        <td className="border border-gray-400 p-2">{((props.WTCo[index]/25)*(props.TWSum/(props.jsonData.length*25) * 100)).toFixed(3)}</td>
                        <td className="border border-gray-400 p-2">{((props.OralCo[index]/25)*(props.OralSum/(props.jsonData.length*25) * 100)).toFixed(3)}</td>
                        <td className="border border-gray-400 p-2">{((props.EndSemCo[index]/80)*(props.EndSemSum/(props.jsonData.length*80) * 100)).toFixed(3)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}

const TotalMeasures = (props) => {
    const UtDmap = props.UtCo.map( (value) => (value / 20) * (props.iaAvgSum / (props.jsonData.length * 20)) * 100)
    const TWDmap = props.WTCo.map( (value) => (value / 20) * (props.TWSum / (props.jsonData.length * 25)) * 100)
    const OralDmap = props.OralCo.map( (value) => (value / 20) * (props.OralSum / (props.jsonData.length * 25)) * 100)
    const EndSemDmap = props.EndSemCo.map( (value) => (value / 20) * (props.EndSemSum / (props.jsonData.length * 80)) * 100)

    useEffect(() => {
        // console.log("gg co out of 20 - ")
        // console.log(props.CoToOutOf20)
    }, [props.CoToOutOf20])
    return (
        <div>
            <div className=" m-2 mt-8 mb-0 grid grid-cols-8 grid-rows-3 font-bold font-mono text-white ">
                <div className=" col-span-1 row-span-2 bg-cyan-500 justify-center flex items-center rounded-ss-3xl border-r border-dashed">Course Outcome</div>
                <div className=" col-span-1 row-span-2 bg-cyan-500 justify-center flex items-center border-r border-dashed">Indirect Measure</div>
                <div className=" col-span-5 bg-cyan-500 text-center border-b flex justify-center items-center  border-r border-dashed">Direct Measure 80%</div>
                <div className="row-span-2 text-center bg-cyan-500 justify-center flex items-center rounded-se-3xl">Total Attainment</div>

                <div className="bg-cyan-500/40 flex justify-center items-center border-r border-dashed">IA</div>
                <div className="bg-cyan-500/40 flex justify-center items-center border-r border-dashed">TW</div>
                <div className="bg-cyan-500/40 flex justify-center items-center border-r border-dashed">ORAL</div>
                <div className="bg-cyan-500/40 flex justify-center items-center border-r border-dashed">ENDS</div>
                <div className="bg-cyan-500/40 flex justify-center items-center text-center text-sm border-r border-dashed">Direct Measurement</div>

                <div className=" flex justify-center items-center col-span-1 border-r border-dashed">% Weigtage</div>
                <div className=" flex justify-center items-center  border-r border-dashed col-span-1">20</div>
                <div className=" flex justify-center items-center  border-r border-dashed col-span-1">10.4</div>
                <div className=" flex justify-center items-center  border-r border-dashed col-span-1">13.6</div>
                <div className=" flex justify-center items-center border-r border-dashed col-span-1">13.6</div>
                <div className=" flex justify-center items-center border-r border-dashed col-span-1">42.4</div>
                <div className=" flex justify-center items-center border-r border-dashed col-span-1">80</div>
                <div className=" flex justify-center items-center">100</div>
            </div>
            <div className=" pb-2">
                {[1, 2, 3, 4, 5, 6].map((co, index) => (
                    <div key={co} className="bg-cyan-500 grid grid-cols-8 mx-2 text-white font-mono">
                        <div className="border border-dashed border-cyan-800 p-2 col-span-1">CO{co}</div>
                        <div className="border border-dashed border-cyan-800 p-2 col-span-1">{(props.CoToOutOf20[`Co${co}`]).toFixed(2)}</div>
                        <div className="border border-dashed border-cyan-800 p-2 col-span-1">{(UtDmap[index] * 0.104).toFixed(3)}</div>
                        <div className="border border-dashed border-cyan-800 p-2 col-span-1">{(TWDmap[index] * 0.136).toFixed(3)}</div>
                        <div className="border border-dashed border-cyan-800 p-2 col-span-1">{(OralDmap[index] * 0.136).toFixed(3)}</div>
                        <div className="border border-dashed border-cyan-800 p-2 col-span-1">{(EndSemDmap[index] * 0.424).toFixed(3)}</div>
                        <div className="border border-dashed border-cyan-800 p-2 col-span-1">
                            {((UtDmap[index] * 0.104).toFixed(3)*1+ (TWDmap[index] * 0.136).toFixed(3)*1+(OralDmap[index] * 0.136).toFixed(3)*1+(EndSemDmap[index] * 0.424).toFixed(3)*1).toFixed(3)}
                        </div>
                        <div className="border border-dashed border-cyan-800 p-2 col-span-1">
                            {(((UtDmap[index] * 0.104).toFixed(3)*1+ (TWDmap[index] * 0.136).toFixed(3)*1+(OralDmap[index] * 0.136).toFixed(3)*1+(EndSemDmap[index] * 0.424).toFixed(3)*1).toFixed(3)*1 +props.CoToOutOf20[`Co${co}`]*1).toFixed(3)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}