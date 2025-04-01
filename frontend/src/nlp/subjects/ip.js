const WebProgrammingFundamentals = [
    "Working of Web Browser",
    "Browser Architecture",
    "Rendering Engine",
    "HTTP Request",
    "HTTP Response",
    "Caching Mechanism",
    "HTTP Protocol",
    "HTTP Methods",
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "Status Codes",
    "HTTP Headers",
    "HTTPS",
    "SSL",
    "TLS",
    "Transport Layer Security",
    "HTTPS Handshake",
    "Domain Name System",
    "DNS",
    "DNS Resolution Process",
    "DNS Record Types",
    "DNS Caching and Propagation",
    "TLS Handshake Process",
    "XML",
    "Extensible Markup Language",
    "JSON",
    "JavaScript Object Notation",
    "DOM",
    "Document Object Model",
    "DOM Manipulation Methods",
    "URL",
    "Uniform Resource Locator",
    "URI",
    "Uniform Resource Identifier)",
    "REST",
    "Representational State Transfer API",
    "API Authentication",
    "OAuth",
    "API Keys",
    "JWT",
    "SOAP",
    "Nginx",
    "Reverse Proxy",
    "Load Balancing",
]

const Javascript = [
    "ES5",
    "ES6",
    "Var",
    "Let",
    "Const",
    "Arrow Functions",
    "Class-Based Inheritance",
    "Prototype-Based Inheritance",
    "Variables",
    "Mutable",
    "Immutable Variables",
    "Conditional Statements",
    "If-Else Statement",
    "Switch Case",
    "Loops",
    "ForEach",
    "Higher-Order Functions",
    "Event Handling",
    "Event Listeners",
    "Event Delegation",
    "Synchronous Event Handling",
    "Asynchronous Event Handling",
    "DOM Manipulation",
    "getElementById",
    "querySelector",
    "innerHTML", "textContent",
    "appendChild", "removeChild",
    "Class",
    "Inheritance",
    "Constructor Functions",
    "Extending Classes",
    "Super Keyword",
    "Iterators",
    "Generators",
    "Promises",
    "Client-Server Communication",
    "AJAX",
    "Fetch API",
    "XMLHttpRequest",
    "Handling API Responses",
    "Async/Await",
]

const ReactFundamentals = [
    "React Libraries",
    "Redux",
    "React Router",
    "Axios",
    "React File Structure",
    "Components",
    "Functional Components",
    "Class Components",
    "Component Composition",
    "Component Lifecycle",
    "Lifecycle Methods in Class Components",
    "Mounting",
    "Updating",
    "Unmounting",
    "State",
    "Props",
    "useState",
    "Prop Drilling",
    "Context API",
    "Single Page Applications",
    "Route component",
    "Link component",
    "Navigate Components",
    "Dynamic Routing",
    "Protected Routes",
    "Controlled components",
    "Uncontrolled Components",
    "Events",
    "Handling Click",
    "Handling Change",
    "Handling Submit Events",
    "Component Reusability and Modularity",
    "Performance Optimization",
    "Memoization",
    "Code Splitting",
    "Lazy Loading",
    "State Management",
]

const AdvancedReact = [
    "Functional Components",
    "Refs",
    "useRef",
    "useEffect",
    "useState",
    "useContext",
    "useReducer",
    "Custom Hooks",
    "Flow Architecture",
    "Unidirectional Data Flow",
    "State Management Patterns",
    "Model-View-Controller",
    "MVC Framework",
    "Flux",
    "Bundling the Application",
    "Tree Shaking",
    "Code Splitting",
    "Webpack",
    "React Native",
    "Building Mobile Apps",
]

const Nodejs = [
    "Node.js",
    "Asynchronous Programming",
    "Asynchronous Execution",
    "Blocking code",
    "Non-blocking Code",
    "Callback",
    "Event Loops",
    "REPL",
    "Read Eval Print Loop",
    "Event Emitter",
    "Networking Module",
    "HTTP Server",
    "Handling Requests and Responses",
    "Buffers",
    "Reading and Writing Binary Data",
    "Streams",
    "File System",
    "Web Module",
    "HTTP Module",
    "Serving Static Files",
    "MongoDB",
    "CRUD Operations",
    "Mongoose",
]

const Expressjs = [
    "Express.js",
    "Express Router",
    "Organizing Routes in Express",
    "REST API",
    "RESTful API with Express",
    "Handling Requests and Responses",
    "Middleware",
    "Generator",
    "Authentication",
    "JWT",
    "OAuth",
    "Social Logins",
    "Sessions",
    "Managing Sessions in Express",
    "Session Storage",
    "Memory, Redis, Database",
    "Commercial Deployment",
    "Deploying Express Apps",
    "AWS", 
    "Heroku", 
    "Vercel",
]


const chapter1tags = WebProgrammingFundamentals
const chapter2tags = Javascript
const chapter3tags = ReactFundamentals
const chapter4tags = AdvancedReact
const chapter5tags = Nodejs
const chapter6tags = Expressjs

// this is still incomplete so don't use it yet
function getPointsMappedForIP(question) {
    var counter = []

    var matches = chapter1tags.filter(word => question.toLowerCase().includes(word.toLowerCase()));
    if (matches.length > 0) {
        counter.push(matches.length);
    } else {
        counter.push(0);
    }

    var matches = chapter2tags.filter(word => question.toLowerCase().includes(word.toLowerCase()));
    if (matches.length > 0) {
        counter.push(matches.length);
    } else {
        counter.push(0);
    }

    var matches = chapter3tags.filter(word => question.toLowerCase().includes(word.toLowerCase()));
    if (matches.length > 0) {
        counter.push(matches.length);
    } else {
        counter.push(0);
    }

    var matches = chapter4tags.filter(word => question.toLowerCase().includes(word.toLowerCase()));
    if (matches.length > 0) {
        counter.push(matches.length);
    } else {
        counter.push(0);
    }

    var matches = chapter5tags.filter(word => question.toLowerCase().includes(word.toLowerCase()));
    if (matches.length > 0) {
        counter.push(matches.length);
    } else {
        counter.push(0);
    }

    var matches = chapter6tags.filter(word => question.toLowerCase().includes(word.toLowerCase()));
    if (matches.length > 0) {
        counter.push(matches.length);
    } else {
        counter.push(0);
    }
    return counter
}

console.log(getPointsMappedForIP("what is ip?"))

export default getPointsMappedForIP