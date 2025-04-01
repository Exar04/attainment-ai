const IntroToIoT = [
    "IoT",
    "Physical Design",
    "Sensors, Actuators, and Devices",
    "Power Supply and Connectivity in IoT",
    "Logical Design",
    "Network Architecture",
    "Data Communication Protocols",
    "Cloud Computing and Edge Computing in IoT",
    "Functional Block",
    "Sensing and Data Collection",
    "Data Processing and Analysis",
    "Actuation and Control",
    "Communication and Networking",
    "Smart Homes and Smart Cities",
    "Healthcare and Wearable Devices",
    "Industrial IoT",
    "IIoT",
    "Agriculture, Transportation, and Logistics",
    "Smart Object",
]

const IoTArch = [
    "New Network Architectures",
    "Scale and Scalability in IoT Networks",
    "Security Concerns in IoT",
    "Handling Constrained Devices and Networks",
    "Managing and Storing IoT Data",
    "Legacy Devices in IoT Networks",
    "The IoT World Forum",
     "IoTWF",
    "Standardized Architecture",
    "The OSI Model",
    "IoT Layers",
    "IoT Reference Model",
    "IT",
    "Information Technology",
    "OT",
    "Operational Technology",
    "Simplified IoT Architecture",
    "Device Layer, Network Layer, and Application Layer",
    "Communication and Data Flow in IoT",
    "Core IoT Functional Stack",
    "Device and Connectivity Layer",
    "Edge/Fog Computing and Data Processing",
    "Cloud/Platform Layer",
    "Analytics Versus Control Applications",
    "Data Analytics",
    "Control in IoT Systems",
    "Real-time Data Analytics","Historical Data Analytics",
    "Network Analytics",
    "Smart Services in IoT",
    "IoT Data Management and Compute Stack",
    "Data Storage, Processing, and Security in IoT",
    "Fog Computing",
    "Edge Computing",
]

const PrinciplesOfConnectedDevicesAndPortocolsInIot = [
"RFID",
"NFC", 
"Near Field Communication",
"Radio Frequency Identification",
"Bluetooth Low Energy",
"BLE",
"LiFi",
"Light Fidelity",
"WPAN",
"802.15",
"IEEE 802.15",
"Bluetooth",
"IEEE 802.15.4",
"Zigbee",
"Z-Wave",
"Narrow Band IoT",
"NB-IoT",
"Internet Protocol and Transmission Control Protocol",
"6LoWPAN",
"WLAN",
"WAN",
"IEEE 802.11",
"Wide Area Network",
"Communication Across Long Distances Using WAN",
"Wi-Fi 6",
"Long-range Communication Systems and Protocols",
"Cellular Connectivity",
"LTE", "LTE-A",
"LoRa",
"LoRaWAN",
]

const EdgeToCloudProtocol = [
    "HTTP",
    "Hypertext Transfer Protocol",
    "HTTP Methods",
    "HTTP Headers and Cookies",
    "HTTP/2",
    "HTTP/3",
    "WebSocket",
    "Platforms",
    "MQTT",
    "Message Queuing Telemetry Transport",
    "Lightweight Messaging",
    "Publish/Subscribe Model",
    "pub/sub",
    "QoS",
    "MQTT-SN",
    "MQTT for Sensor Networks",
    "Constrained Application Protocol",
    "CoAP",
    "Streaming Text Oriented Message Protocol",
    "STOMP",
    "Advanced Message Queuing Protocol",
    "AMQP",
]

const IoTAndDataAnalytics = [
"IoT Analytics",
"Data Collection, Processing, and Analysis in IoT",
"Volume and Velocity",
"Data Quality",
"Heterogeneous IoT Data Sources",
"Real-time in IoT Analytics",
"Batch Processing in IoT Analytics",
"Cloud-based IoT Data Storage",
"Cloud-based IoT Data Processing",
"Scalability and Flexibility of Cloud IoT Analytics",
"Cloud Platforms for IoT Analytics",
"Strategies to Organize Data",
"Data Preprocessing and Cleaning",
"Data Aggregation and Transformation Techniques",
"Data Pipelines",
"Linked Analytics Data Sets",
"Data Lakes",
"Raw IoT Data",
"Data Retention",
"Visualization",
"Dashboarding",
]

const IotApplicationDesign = [
    "M2M",
    "Prototyping",
    "Machine-to-Machine",
    "Tools and Technologies for IoT Prototyping",
    "Arduino", "Raspberry Pi",
    "Steps in Developing an IoT Prototype",
    "Testing and Iterating IoT Prototypes",
    "Case Study Related to: Home Automation",
    "Smart Lighting in Home Automation",
    "Home Intrusion Detection Systems",
    "Case Study Related to: Cities",
    "Smart Parking Solutions in Urban Areas",
    "IoT Sensors for Real-time Parking Space Availability",
    "City-Wide Traffic Management Using IoT",
    "Case Study Related to: Environment",
    "Weather Monitoring Systems Using IoT",
    "Weather Reporting Bot for Real-Time Updates",
    "Air Pollution Monitoring Using IoT Sensors",
    "Forest Fire Detection Using IoT Technology",
    "Case Study Related to: Agriculture",
    "Smart Irrigation Systems for Precision Agriculture",
    "IoT-Enabled Soil Moisture and Temperature Monitoring",
    "Automated Watering and Fertilization Systems",
    "Case Study Related to: Smart Library",
    "IoT for Library Management and Automation",
    "Smart Shelves and Automated Check-In/Check-Out Systems",
    "Real-Time Tracking of Library Books and Resources",
    "Improving User Experience in Libraries Using IoT",
    "IIoT",
    "Industrial Internet of Things",
    "Internet of Behavior",
    "IoB",
]


const chapter1tags = IntroToIoT
const chapter2tags = IoTArch
const chapter3tags = PrinciplesOfConnectedDevicesAndPortocolsInIot
const chapter4tags = EdgeToCloudProtocol
const chapter5tags = IoTAndDataAnalytics
const chapter6tags = IotApplicationDesign

function getPointsMappedForIOE(question) {
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

console.log(getPointsMappedForIOE("what is Data Lake?"))

export default getPointsMappedForIOE