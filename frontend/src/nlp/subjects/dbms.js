const databaseSystemConceptsAndArch = [
"Database",
"Data Abstraction",
"Data Independence",
"Access Control",
"Data Integrity",
"Data Security",
"Data Persistence",
"Recovery",
"File System",
"DBMS",
"Levels of Data Abstraction",
"Physical Level",
"Logical Level",
"View Level",
"1-Tier Architecture",
"2-Tier Architecture",
"3-Tier Architecture",
"Query Processor",
"Storage Manager",
"Transaction Management",
"Database Administrator",
"DBA",
"Database Design",
"User Access Control",
"User Security",
"Performance Monitoring",
"Performance Optimization",
"Backup and Recovery Management",
]

const EntityRelationshipModel = [
"Conceptual Modeling",
"Dataase Design",
"The Entity-Relationship Model",
"ER",
"Entity Type",
"Entity Sets",
"Strong Entities",
"Weak Entities",
"Attributes",
"Keys",
"Simple Attributes",
"Composite Attributes",
"Single-Valued Attributes",
"Multi-Valued Attributes",
"Derived Attributes",
"Candidate Key",
"Primary Key",
"Foreign Key",
"Relationship Types",
"Relationship Sets",
"One-to-One",
"One-to-Many",
"Many-to-Many",
"Participation Constraints",
"Generalization",
"Specialization",
"Aggregation",
"Generalization",
"Top Down Approach",
"Specialization",
"Bottom Up Approach",
"Aggregation",
"Combining Relationship",
"Extended Entity-Relationship Model",
"EER",
"Superclass",
"Subclass",
"Inheritance",
"Disjoint",
"Overlapping",
]

const RelationalModelAndRelationalAlgebra = [
"Relational Model",
"Entity Integrity Constraint",
"Referential Integrity Constraint",
"Relational Database Schemas",
"Schema",
"Instance",
"Relational Schema Notation",
"Primary Key",
"Candidate Key",
"Super Key",
"Foreign Key",
"Secondary Key",
"Mapping",
"Mapping Weak Entities",
"Unary Relational Operations",
"Selection",
"Projection",
"Rename",
"Set Theory Operations",
"Union",
"Intersection",
"Difference",
"Cartesian Product",
"Binary Relational Operations",
"Join Operations",
"Theta Join",
"Equi Join",
"Natural Join",
"Outer Join",
"Division",
]


const chapter1tags = databaseSystemConceptsAndArch 
const chapter2tags = EntityRelationshipModel 
const chapter3tags =  RelationalModelAndRelationalAlgebra
const chapter4tags = []
const chapter5tags = []
const chapter6tags = []

// this is still incomplete so don't use it yet
function getPointsMappedForDBMS(question) {
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

console.log(getPointsMappedForDBMS("what is Dbms?"))

export default getPointsMappedForDBMS