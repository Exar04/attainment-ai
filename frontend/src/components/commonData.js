import { useCallback, useEffect, useState } from "react"
import {useDropzone} from "react-dropzone"

export const enginneringSems = ["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6","Sem 7","Sem 8"]
export const diplomaSems = []
export const fields = ["Engineering", "Diploma"]

// const [subjectMap, setSubjectMap] = useState({"Engineering": enginneringSems, "Diploma":diplomaSems})
export const subjectMap = {
    "Engineering":{
        "Sem 1":["Applied Maths I", "Applied Physics", "Applied Chemestry", "Engineering Mechanics", "Basic Electric and Electronics Engineering"],
        "Sem 2":["Applied Maths II", "Elective Physics", "Elective Chemestry", "Engineering Graphics", "Program Core Course"],
        "Sem 3":["Engineering Math III", "Data Structures and Analysis", "Database Management System", "Principle of Communciations", "Paradigms and Computer Programming Fundamentals"],
        "Sem 4":["Engineering Math IV", "Computer Network and Network Design", "Operating System", "Automata Theory", "Computer Organization and Architecture"],
        "Sem 5":["Internet Programming", "Computer Network Security", "Enterpreneurship and E-Business", "Software Engineering"],
        "Sem 6":["Data Mining & Business Intelligence", "Web X.0 ","Wireless Technology", "AI and DS 1"],
        "Sem 7":["AI And DS II", "Internet of Everything"],
        "Sem 8":[]
    }
}

export const courseOutcomeMap = {
    "Engineering": {
        "Sem 1": {
            "Applied Maths I": [],
            "Applied Physics": [],
            "Applied Chemestry": [],
            "Engineering Mechanics": [],
            "Basic Electric and Electronics Engineering": []
        },
        "Sem 2": {
            "Applied Maths II": [],
            "Elective Physics": [],
            "Elective Chemestry": [],
            "Engineering Graphics": [],
            "Program Core Course": []
        },
        "Sem 3": {
            "Engineering Math III": [
                "Apply the concept of Laplace transform to solve the real integrals in enginnering problems",
                "Apply the concept of inverse laplace transform of various functions in engineering problems",
                "Expand the periodic function by using Fourier series for real life problems and complex engineering problems",
                "Find orthogonal trajectories and analytic function by using basic concepts of complex variable theory",
                "Apply the concept of Correlation and Regression to the engineering problems in data science, machine learning and AI",
                "Illustrate understanding of concepts of probability and expectation for getting the spread of the data and distribution of probabilities"
            ],
            "Data Structures and Analysis": [
                "Classify and Apply the concepts of stacks, queue and linked list in real life problem solving",
                "Classify, apply and analyze the concept trees in real life problem solving",
                "Illustrage and justify the concepts of graphs in real life problem solving",
                "List and examine the concepts of sorting, searching techniques in real life problem solving",
                "Use and identify the concept of recursion, hashing in real life problem solving",
                "Examine and justify different methods of stacks, queues, linked list, trees and graphs to various applications"
            ],
            "Database Management System": [
                "Identify the need of Database Management System",
                "Design conceptual model for real life applications",
                "Create Relational Model for real life applicaions",
                "Formulate query using SQL commands",
                "Apply the concept of normalization to relational database design",
                "Demonstrate the concept of transaction, concurrency and recovery"
            ],
            "Principle of Communciations": [
                "Describe analog and digital communication systems",
                "Differentiate types of noise , analysis the fourier transform of time and frequency domain",
                "Design transmitter and reciever of AM, DSB, SSB and FM",
                "Describe Sampling theorem and pulse modulation systems",
                "Explain multiplexing and digital band pass modulation techniques",
                "Describe electromagnetic rediation and propagation of waves"
            ],
            "Paradigms and Computer Programming Fundamentals": [
                "Understand and compare different programming paradigms",
                "Understand and Objectve orieanted constructs and use them in program design",
                "Understand the concept of declarative programming paradigms through functional and logic programming",
                "Design and Develop program based on declarative programming paradigm using functional and logic programming",
                "Understand the role of concurrency in parallel and distributed programming",
                "Understand different application domains for use of scripting languages"
            ]
        },
        "Sem 4": {
            "Engineering Math IV": [
                "Apply the concepts of eigen values and eigen vectors to solve engineering problems",
                "Illustrate the use of concepts of Complex Integration for evaluating integrals, computing residues & evaluate various contour integrals",
                "Apply the concept of Z- transformation and its inverse in engineering problems",
                "Apply the concept of probability distribution to engineering problems & testing hypothesis of small samples using sampling theory",
                "Apply the concept of Linear Programming to solve the optimization problems",
                "Use the Non-Linear Programming techniques to solve the optimization problems",
            ],
            "Computer Network and Network Design": [
                "Describe the functionalities of each layer of the models and compare the Models",
                "Categorize the types of transmission media and explain data link layer concepts, design issues and protocols",
                "Analyze the routing protocols and assign IP address to networks. ",
                "Explain the data transportation and session management issues and related protocols used for end to end delivery of data",
                "List the data presentation techniques and illustrate the client/server model in application layer protocols",
                "Use of networking concepts of IP address, Routing, and application services to design a network for an organization",
            ],
            "Operating System": [
                "Understand the basic concepts related to Operating System",
                "Describe the process management policies and illustrate scheduling of processes by CPU",
                "Explain and apply synchronization primitives and evaluate deadlock conditionsas handled by Operating System",
                "Describe and analyze the memory allocation and management functions of Operating System",
                "Analyze and evaluate the services provided by Operating System for storage management",
                "Compare the functions of various special-purpose Operating Systems",
            ],
            "Automata Theory": [
                "Explain, analyze and design Regular languages, Expression and Grammars",
                "Design different types of Finite Automata and Machines as Acceptor, Verifier and Translator",
                "Analyze and design Context Free languages and Grammars",
                "Design different types of Push down Automata as Simple Parser",
                "Design different types of Turing Machines as Acceptor, Verifier, Translator and Basic computing machine",
                "Develop understanding of applications of various Automata",
            ],
            "Computer Organization and Architecture": [
                "Demonstrate the fundamentals of Digital Logic Design",
                "Describe basic organization of computer, the architecture of 8086 microprocessor and implement assembly language programming for 8086 microprocessors",
                "Demonstrate control unit operations and conceptualize instruction level parallelism",
                "List and Identify integers and real numbers and perform computer arithmetic operations on integers",
                "Categorize memory organization and explain the function of each element of a memory hierarchy",
                "Examine different methods for computer I/O mechanism",
            ]
        },
        "Sem 5": {
            "Internet Programming": [
                "Select protocols or technologies required for various web applications",
                "Apply JavaScript to add functionality to web pages",
                "Design front end application using basic React",
                "Design front end applications using functional components of React",
                "Design back-end applications using Node.js",
                "Construct web based Node.js applications using Express",
            ],
            "Computer Network Security": [
                "Explain the fundamentals concepts of computer security and network security",
                "Identify the basic cryptographic techniques using classical and block encryption methods",
                "Study and describe the system security malicious software",
                "Describe the Network layer security, Transport layer security and application layer security",
                "Explain the need of network management security and illustrate the need for NAC",
                "Identify the function of an IDS and firewall for the system security",
            ],
            "Enterpreneurship and E-Business": [
                "Understand the concept of entrepreneurship and its close relationship with enterprise and owner-management",
                "Understand the nature of business development in the context of existing organizations and of new business start-ups",
                "Comprehended important factors for starting a new venture and business development",
                "Know issues and decisions involved in financing and resourcing a business start-up",
                "Describe various E-business Models",
                "Discuss various E-business Strategies",
            ],
            "Software Engineering": [
                "Understand and use basic knowledge in software engineering",
                "Identify requirements, analyze and prepare models",
                "Plan, schedule and track the progress of the projects",
                "Design & develop the software solutions for the growth of society",
                "To demonstrate and evaluate real time projects with respect to software engineering principles",
                "Apply testing and assure quality in software solution",
            ]
        },
        "Sem 6": {
            "Data Mining & Business Intelligence": [
                "Demonstrate an understanding of the importance of data warehousing and data mining and the principles of business intelligence",
                "Organize and prepare the data needed for data mining using pre preprocessing techniques",
                "Perform exploratory analysis of the data to be used for mining",
                "Implement the appropriate data mining methods like classification, clustering or Frequent Pattern mining on large data sets",
                "Define and apply metrics to measure the performance of various data mining algorithms",
                "Apply BI to solve practical problems: Analyze the problem domain, use the data collected in enterprise apply the appropriate data mining technique, interpret and visualize the results and provide decision support"
            ],
            "Web X.0 ": [
                "Understand the basic concepts related to web analytics and semantic web",
                "Understand how TypeScript can help you eliminate bugs in your code and enable you to scale your code",
                "Understand AngularJS framework and build dynamic, responsive single-page web applications",
                "Apply MongoDB for frontend and backend connectivity using REST API",
                "Apply Flask web development framework to build web applications with less code",
                "Develop Rich Internet Application using proper choice of Framework",
            ],
            "Wireless Technology": [
                "Describe the basic concepts of Wireless Network and Wireless Generations",
                "Demonstrate and Evaluate the various Wide Area Wireless Technologies",
                "Analyze the prevalent IEEE standards used for implementation of WLAN and WMAN Technologies",
                "Appraise the importance of WPAN, WSN and Ad-hoc Networks",
                "Analyze various Wireless Network Security Standards",
                "Review the design considerations for deploying the Wireless Network Infrastructure",
            ],
            "AI and DS 1": [
                "Develop a basic understanding of the building blocks of AI as presented in terms of intelligent agents",
                "Apply an appropriate problem-solving method and knowledge-representation scheme",
                "Develop an ability to analyze and formalize the problem (as a state space, graph, etc.). They will be able to evaluate and select the appropriate search method",
                "Apply problem solving concepts with data science and will be able to tackle them from a statistical perspective",
                "Choose and apply appropriately from a wider range of exploratory and inferential methods for analyzing data and will be able to evaluate and interpret the results contextually",
                "Understand and apply types of machine learning methods for real world problems",
            ]
        },
        "Sem 7": {
            "AI And DS II": [
                "Design models for reasoning with uncertainty as well as the use of unreliable information",
                "Analyze the process of building a Cognitive application",
                "Design fuzzy controller system",
                "Apply learning concepts to develop real life applications",
                "Evaluate performance of learning algorithms",
                "Analyze current trends in Data Science",
            ],
            "Internet of Everything": [
                "Describe the Characteristics and Conceptual Framework of IoT",
                "Differentiate between the levels of the IoT architectures",
                "Analyze the IoT access technologies",
                "Illustrate various edge to cloud protocol for IoT",
                "Apply IoT analytics and data visualization",
                "Analyze and evaluate IoT applications",
            ]
        },
        "Sem 8": {}
    }
}

export function MyDropzone(props){

    const onDrop = useCallback(acceptedFiles => {
        props.setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
    },[])

    const { getRootProps, getInputProps, isDragActive} = useDropzone({ onDrop })

    return (

        <div {...getRootProps()} className=" z-10 bg-sky-600 duration-300 hover:bg-blue-500  w-full h-full flex flex-col justify-center items-center rounded-lg text-center border-2  border-cyan-400 border-dotted">
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

        } else if (props.files[index].type === "text/csv") { // ✅ Added CSV file handling
            return (
                <img
                    key={index}
                    src="csv_file_logo.png" // Make sure this image exists in your project
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
