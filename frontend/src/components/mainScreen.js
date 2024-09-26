export function MainScreen(){
    return (
        <div className=" w-full h-full justify-center items-center flex flex-col">
            <div className=" font-bold text-center font-mono text-2xl"> Attainment AI </div>
            <div className=" flex m-4 justify-center">
                <div className=" m-3 bg-gray-500 p-4 px-8 rounded-full text-white font-mono text-lg">Semester</div>
                <div className=" m-3 bg-gray-500 p-4 px-8 rounded-full text-white font-mono text-lg" >Subject</div>
                <div className=" m-3 bg-gray-500 p-4 px-8 rounded-full text-white font-mono text-lg">Field</div>
            </div>

            <div className="bg-gray-500 w-1/2 h-1/3 flex flex-col justify-center items-center rounded-lg border-2 border-cyan-200 border-dashed ">
                <img src="upload-logo.png" className="w-32 h-32"></img>
                <div className="text-white font-mono font-bold">Upload your excel or word files here</div>
            </div>
            <div className=" bg-green-400 m-4 p-4 px-8 rounded-full font-bold font-mono">
                Get Bloom
            </div>
        </div>
    )
}