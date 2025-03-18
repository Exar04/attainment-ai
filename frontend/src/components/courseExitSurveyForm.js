import { useEffect, useState } from "react"
import { enginneringSems, diplomaSems, fields, subjectMap, courseOutcomeMap } from "./commonData"

export function CourseExitSurveyForm(){

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


    const [COSurvey, setCoSurvey] = useState([0,0,0,0,0])

    function handleSurveyinput(index, pointsAllocated){
        setCoSurvey(prevState => {
            const newArray = [...prevState]
            newArray[index] = pointsAllocated
            return newArray
        })
    }
    useEffect(() => {
        console.log(COSurvey)
    }, [COSurvey])
    
    const setOfCourseOurcomesBasedOnSelectedSubject = courseOutcomeMap[fieldSelected] && courseOutcomeMap[fieldSelected][semesterSelected] && courseOutcomeMap[fieldSelected][semesterSelected][subjectSelected] ? (
        courseOutcomeMap[fieldSelected][semesterSelected][subjectSelected].map((co, index) => (
            <div key={index} className=" p-1 text-lg text-white flex flex-col items-center justify-center">
                <div className="  grid grid-cols-2 items-center m-2 mx-10 w-screen">
                    <div className=" mx-20">{co}</div>
                    <div className=" flex justify-center grid-rows-1 ">
                        <div role={"button"} onClick={() => { handleSurveyinput(index, 1) }} className={` ${COSurvey[index] == 1 ? "bg-red-400" : "bg-green-400 hover:bg-emerald-400"} text-sm duration-200 mx-6 my-1 p-3 rounded-full font-bold font-mono`}>1</div>
                        <div role={"button"} onClick={() => { handleSurveyinput(index, 2) }} className={` ${COSurvey[index] == 2 ? "bg-red-400" : "bg-green-400 hover:bg-emerald-400"} text-sm duration-200 mx-6 my-1 p-3 rounded-full font-bold font-mono`}>2</div>
                        <div role={"button"} onClick={() => { handleSurveyinput(index, 3) }} className={` ${COSurvey[index] == 3 ? "bg-red-400" : "bg-green-400 hover:bg-emerald-400"} text-sm duration-200 mx-6 my-1 p-3 rounded-full font-bold font-mono`}>3</div>
                        <div role={"button"} onClick={() => { handleSurveyinput(index, 4) }} className={` ${COSurvey[index] == 4 ? "bg-red-400" : "bg-green-400 hover:bg-emerald-400"} text-sm duration-200 mx-6 my-1 p-3 rounded-full font-bold font-mono`}>4</div>
                        <div role={"button"} onClick={() => { handleSurveyinput(index, 5) }} className={` ${COSurvey[index] == 5 ? "bg-red-400" : "bg-green-400 hover:bg-emerald-400"} text-sm duration-200 mx-6 my-1 p-3 rounded-full font-bold font-mono`}>5</div>
                    </div>
                </div>
            </div>
        ))
    ):""

    function handleFormSubmit() {
        fetch('http://localhost:8000/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                MesId: mesId,
                SubjectName: subjectSelected,
                Feedback: COSurvey, 
            }),
        })
            .then(res => {
                if (res.ok){
                    console.log("Feedback submitted Succesfully!")
                    alert("Feedback submitted Succesfully!")
                }else {
                    alert("Invalid User!")
                }
            })
            .catch(err => alert("Server may be down"))
    }

    const [mesId, setMesId] = useState("") 
    const [usernameFromMesId, setUsernameFromMesId ] = useState("")
    function validateUser(){
        console.log("Validating User : ", mesId)
        fetch('http://localhost:8000/validateStudent', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ MesId: mesId }),
        })
            .then(res => {
                if (!res.ok) {
                    // console.error(`HTTP error! status: ${res.status}`);
                    console.log("you dumb dumb!")
                    alert("Wrong Mes ID")
                    return JSON.stringify({
                        Name: "",
                        MesId: "",
                        Feedback: [],
                    });
                }else {
                    return res.json()
                }
            })
            .then(data => {
                console.log(data)
                setUsernameFromMesId(data.Name)
            })
    }

    return (
        <div className="w-screen h-screen bg-gradient-to-bl from-blue-900 to-cyan-400  items-center flex flex-col">
            <div className=" mt-8 text-lg font-bold font-mono text-white flex items-center">
                <div>Mes ID : </div>
                <input onChange={(e) => {setMesId(e.target.value)}} className=" rounded-lg p-2 text-black ml-2 outline-none" />
                <div role={"button"} onClick={() => { validateUser() }} className=" bg-green-400 hover:bg-emerald-400 hover:px-8 text-slate-800 text-sm duration-200 m-2 p-2 px-6 rounded-full font-bold font-mono">
                    Validate 
                </div>
            </div>
            <div className=" font-mono text-lg text-white font-bold">{usernameFromMesId}</div>

            <div className="flex m-1 justify-center">
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

            <div className=" flex flex-col justify-center items-center p-2 m-2 font-mono">{setOfCourseOurcomesBasedOnSelectedSubject}</div>

            <div role={"button"} onClick={() => {handleFormSubmit()}} className=" bg-green-400 hover:bg-emerald-400 hover:px-10 duration-200 m-4 p-4 px-8 rounded-full font-bold font-mono">
                Submit
            </div>
        </div>
    )
}