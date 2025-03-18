export const enginneringSems = ["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6","Sem 7","Sem 8"]
export const diplomaSems = []
export const fields = ["Engineering", "Diploma"]

// const [subjectMap, setSubjectMap] = useState({"Engineering": enginneringSems, "Diploma":diplomaSems})
export const subjectMap = {
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

export const courseOutcomeMap = {
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