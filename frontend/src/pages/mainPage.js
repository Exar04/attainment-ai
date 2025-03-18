import { useState } from "react"
import { Outlet, useParams, useNavigate } from "react-router-dom"

export function MainPage() {
    const [activeElem, setActiveElem] = useState(0)  
    // 0 -> about us 
    // 1 -> blooms Taxonomy 
    // 2 -> Course outcome mapper
    // 3 -> Feedback form
    // 4 -> Exit Survey
    const navi = useNavigate()
    return (
        <div className="flex flex-col">
            <div className=" w-full h-40 bg-blue-500 flex justify-center items-center font-bold font-mono text-3xl text-white">Pillai HOC College of Engineering and Technology (PHCET)</div>
            <div className=" w-full h-14 bg-blue-700 flex justify-center items-center">
                <div role={"button"} onClick={() => {setActiveElem(0); navi("/aboutus")}} className={`${activeElem == 0? " bg-sky-500 hover:text-white":""} p-2 rounded-xl hover:text-cyan-200 hover:scale-110 text-white text-xl font-mono font-bold duration-100 mx-4`}>About us</div>
                <div role={"button"} onClick={() => {setActiveElem(1); navi("/bloom")}} className= {`${activeElem == 1? " bg-sky-500 hover:text-white":""} p-2 rounded-xl hover:text-cyan-200 hover:scale-110 text-white text-xl font-mono font-bold duration-100 mx-4`}>Blooms Taxonomy</div>
                <div role={"button"} onClick={() => {setActiveElem(2); navi("/co")}} className={`${activeElem == 2? " bg-sky-500 hover:text-white":""} p-2 rounded-xl hover:text-cyan-200 hover:scale-110 text-white text-xl font-mono font-bold duration-100 mx-4`}>Course Outcome Mapper</div>
                <div role={"button"} onClick={() => {setActiveElem(3); navi("/feedbackForm")}} className={`${activeElem == 3? " bg-sky-500 hover:text-white":""} p-2 rounded-xl hover:text-cyan-200 hover:scale-110 text-white text-xl font-mono font-bold duration-100 mx-4`}>Feedback Form</div>
                <div role={"button"} onClick={() => {setActiveElem(4); navi("/exitSurvey")}} className={`${activeElem == 4? " bg-sky-500 hover:text-white":""} p-2 rounded-xl hover:text-cyan-200 hover:scale-110 text-white text-xl font-mono font-bold duration-100 mx-4`}>Exit Survey</div>
            </div>
            {/* {activeElem} */}
            <Outlet />            
        </div>
    )
}