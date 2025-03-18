import { useEffect, useState } from "react"
import { enginneringSems, diplomaSems, fields, subjectMap, courseOutcomeMap } from "./commonData"

export function ExitSurvey() {

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
            console.log(data)
            setSurveyData(data)
        })
        .catch(err => alert("Server down maybe!"))
    }

    // const surveyDiv = surveyData? surveyData.map((data, index) => (
    //         <div className=" m-2 my-0 grid grid-cols-8 bg-emerald-500 font-bold font-mono text-slate-800">
    //             <div className=" text-center">CO1</div>
    //             <div className=" text-center"></div>
    //             <div className=" text-center">3</div>
    //             <div className=" text-center">4</div>
    //             <div className=" text-center">5</div>
    //         </div>
    // )):""

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



    return (
        <div className=" w-screen h-screen bg-gradient-to-bl from-blue-900 to-cyan-400 flex flex-col ">

            <div className="flex m-1 justify-center">
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

                <div role={"button"} onClick={() => { getSurveyData() }} className=" bg-green-400 hover:bg-emerald-400 hover:px-10 duration-200 m-4 p-4 px-8 rounded-full font-bold font-mono">
                    Get Survey Data
                </div>
            </div>
            {
                surveyData ?
                    <div className=" m-2 mb-0 grid grid-cols-8 grid-rows-2 bg-red-500 font-bold font-mono text-slate-800">
                        <div className=" col-span-1 row-span-2 bg-slate-300 justify-center flex items-center">Course Objectvies</div>
                        <div className=" col-span-5 bg-gray-400 text-center">Course Outcome</div>
                        <div className="row-span-2 text-center bg-slate-300 justify-center flex items-center">%</div>
                        <div className="row-span-2 text-center bg-slate-400 justify-center flex items-center">Out Of 20</div>
                        <div className=" text-center">1</div>
                        <div className=" text-center">2</div>
                        <div className=" text-center">3</div>
                        <div className=" text-center">4</div>
                        <div className=" text-center">5</div>
                    </div>
                    : ""
            }
            {surveyDiv}

        </div>
    )
}