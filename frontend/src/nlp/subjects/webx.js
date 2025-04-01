const IntroToWebX = [
    "Web 1.0",
    "Static Web",
    "Web 2.0",
    "Dynamic and Social Web",
    "Web 3.0",
    "Decentralized and Intelligent Web",
    "Web Analytics",
    "Clickstream",
    "Semantic Web",
    "N-Triples",
    "Turtle",
    "Ontology",
    "Knowledge Representation",
    "RDF",
    "Resource Description Framework",
    "SPARQL",
    "Query Language",
]

const TypeScript = [
    "TypeScript",
    "TypeScript Internal Architecture",
    "TypeScript Compiler",
    "tsc",
    "Type System",
    "Transpiling",
    "TypeScript Environment Setup",
    "tsconfig.json",
    "TypeScript Types, Variables, and Operators",
    "Primitive Types",
    "Type Inference",
    "Type Annotations",
    "Declaring Variables",
    "TypeScript Operators",
    "Loops",
    "Conditional Statements",
    "if, else, switch",
    "Ternary Operator",
    "Loops",
    "for, while, do-while, for-of, for-in",
    "TypeScript Functions",
    "Function Declaration and Expression",
    "Function Parameters",
    "Return Types",
    "Optional and Default Parameters",
    "Arrow Functions in TypeScript",
    "Function Overloading",
    "TypeScript Classes and Objects",
    "Class Declaration and Instantiation",
    "Constructor and Constructor Parameters",
    "Inheritance and Access Modifiers", "public, private, protected",
    "Getter",
    "Setter Methods",
    "Abstract Classes and Interfaces",
    "TypeScript Modules",
    "Exporting and Importing Modules",
    "Default and Named Exports",
    "export and import syntax",
]

const IntroToAngularJS = [
    "AngularJS",
    "MVVM Architecture",
    "Two-Way Data Binding",
    "Modular Architecture",
    "Single Page Applications",
    "SPA",
    "Efficient DOM Manipulation",
    "AngularJS Modules",
    "AngularJS Built-in Directives",
    "ng-model",
    "ng-repeat",
    "ng-if",
    "ng-show",
    "ng-hide",
    "ng-class",
    "ng-style",
    "ng-click",
    "ng-bind",
    "ng-src",
    "ng-include",
    "Custom Directives",
    "Directive Definition Object",
    "DDO",
    "Isolated and Shared Scope in Directives",
    "AngularJS Expressions",
    "One-Way Data Binding",
    "AngularJS Filters",
    "Built-in Filters",
    "Creating Custom Filters",
    "Using Filters in Templates",
    "Chaining Filters",
    "AngularJS Controllers",
    "Controller Scope and Scope Binding",
    "Controller Methods and Properties",
    "Scope Hierarchy",
    "Dependency Injection",
    "Service",
    "Factory",
    "Provider",
    "Form Validation",
    "Validating Forms in AngularJS",
    "Built-in Validators",
    "Custom Validators",
    "ngRoute",
    "ng-view",
    "Dynamic View Loading",
    "Built-in Helper Functions",
    "$timeout", "$interval", "$location",
    "$http", "$routeParams",
    "Angularjs with typescript"
]

const MongoDBAndBuildingRESTAPIwithMongoDB = [
    "MongoDB",
    "NoSQL",
    "SQL",
    "MongoDB Architecture",
    "MongoDB Data Types",
    "Primitive Data Types in MongoDB",
    "Array and Object Data Types",
    "Embedded Documents",
    "BSON",
    "Binary JSON",
    "Configuring Access Control",
    "MongoDB Driver",
    "CRUD",
    "Collections",
    "Querying MongoDB Documents",
    "Mongoose",
    "Modeling Data",
    "Validating Data",
]

const Flask = [
    "Flask",
    "Web Frameworks",
    "Django",
    "Virtual Environment",
    "App Routing",
    "Defining Routes in Flask",
    "Route Parameters",
    "Dynamic URLs",
    "Using URL Variables in Flask",
    "URL Building",
    "URL Redirection",
    "Flask HTTP Methods",
    "Handling Form Data in Flask",
    "Flask Request Object",
    "request.args", "request.form","request.json",
    "Handling Query Parameters in Flask",
    "Flask Cookies",
    "File Uploading in Flask",
    "Saving Files",
    "request.files",
]

const RichInternetApps = [
    "AJAX",
    "Asynchronous JavaScript and XML",
    "RIA",
    "Rich Internet Applications",
    "Manipulating DOM with JavaScript",
    "HTTP Requests using XMLHTTPRequest",
    "PHP with AJAX",
    "Open Source Frameworks",
    "CMS",
    "Django",
    "MVC",
    "Model View Controller Architecture in Django",
    "Building REST APIs with Django",
    "Django Templates",
    "AJAX Integration",
    "Drupal",
    "Joomla",
]

const chapter1tags = IntroToWebX 
const chapter2tags =  TypeScript
const chapter3tags = IntroToAngularJS
const chapter4tags = MongoDBAndBuildingRESTAPIwithMongoDB 
const chapter5tags = Flask 
const chapter6tags = RichInternetApps

// this is still incomplete so don't use it yet
function getPointsMappedForWEBX(question) {
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

console.log(getPointsMappedForWEBX("what is Flask?"))

export default getPointsMappedForWEBX