package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type Student struct {
	Name     string
	MesId    string
	Feedback SubjectFeedback
}
type SubjectFeedback struct {
	SubjectName  string
	FeedbackList []int
	// for each subjects there will be 5 chapters and we will get the points allocated accordingly
	// [ 1, 			3, 1, 4, 5]
	// 	 ^  			^
	//   chapter1       Chapter2 gets 	  ... and so on
	//   gets this		this muchpoints
}

type ExitSurveyStruct struct {
	// each co has int key -> points and int value -> number of students
	Co1 map[int]int
	Co2 map[int]int
	Co3 map[int]int
	Co4 map[int]int
	Co5 map[int]int
	Co6 map[int]int
}

var listOfStudents map[string]Student

var exitSurveyData map[string]ExitSurveyStruct

func main() {
	listOfStudents = make(map[string]Student)
	exitSurveyData = make(map[string]ExitSurveyStruct)

	mamux := mux.NewRouter()
	mamux.HandleFunc("/", printExitSurvey)

	mamux.HandleFunc("/getStudentList", getStudentList)
	mamux.HandleFunc("/addStudent", addStudent).Methods("POST")
	mamux.HandleFunc("/validateStudent", validateStudent).Methods("POST")
	mamux.HandleFunc("/feedback", feedback).Methods("POST")
	mamux.HandleFunc("/getExitSurvey", getExitSurvey).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"}, // Allow all origins (for development, restrict in production)
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders: []string{"Content-Type"},
	})

	handler := c.Handler(mamux)

	http.ListenAndServe(":8000", handler)
}
func getExitSurvey(w http.ResponseWriter, r *http.Request) {
	var a struct {
		SubjectName string
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(body, &a)

	if err != nil {
		fmt.Println(err)
		http.Error(w, "Error while unmarsheling data", http.StatusInternalServerError)
		return
	}

	json, err := json.Marshal(exitSurveyData[a.SubjectName])
	if err != nil {
		http.Error(w, "Error while sending data", http.StatusBadRequest)
		return
	}
	w.Write(json)
}
func printExitSurvey(w http.ResponseWriter, r *http.Request) {
	d, e := json.Marshal(exitSurveyData)
	if e != nil {
		fmt.Println(e)
		return
	}
	w.Write(d)
}

func feedback(w http.ResponseWriter, r *http.Request) {
	var a struct {
		MesId       string
		SubjectName string
		Feedback    []int
		/*
			This will have array of 6 values
			each index represents the respective Co number
			and the value in that index is the rating given by student to that course outcome
			ex [1,1,3,1,2,5]
		*/

	}

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(body, &a)

	if err != nil {
		fmt.Println(err)
		http.Error(w, "Error while unmarsheling data", http.StatusInternalServerError)
		return
	}

	if student, ok := listOfStudents[a.MesId]; ok {
		student.Feedback.FeedbackList = a.Feedback
		student.Feedback.SubjectName = a.SubjectName
		listOfStudents[a.MesId] = student
	} else {
		http.Error(w, "Invalid user", http.StatusBadRequest)
		return
	}
	sub, ok := exitSurveyData[a.SubjectName]
	if !ok {
		sub = ExitSurveyStruct{
			Co1: make(map[int]int),
			Co2: make(map[int]int),
			Co3: make(map[int]int),
			Co4: make(map[int]int),
			Co5: make(map[int]int),
			Co6: make(map[int]int),
		}
		for i := range 5 {
			sub.Co1[i] = 0
		}
		for i := range 5 {
			sub.Co2[i] = 0
		}
		for i := range 5 {
			sub.Co3[i] = 0
		}
		for i := range 5 {
			sub.Co4[i] = 0
		}
		for i := range 5 {
			sub.Co5[i] = 0
		}
		for i := range 5 {
			sub.Co6[i] = 0
		}
	}

	sub.Co1[a.Feedback[0]] += 1
	sub.Co2[a.Feedback[1]] += 1
	sub.Co3[a.Feedback[2]] += 1
	sub.Co4[a.Feedback[3]] += 1
	sub.Co5[a.Feedback[4]] += 1
	sub.Co6[a.Feedback[5]] += 1

	exitSurveyData[a.SubjectName] = sub

	w.WriteHeader(http.StatusAccepted)
}

func validateStudent(w http.ResponseWriter, r *http.Request) {
	var a Student
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(body, &a)

	if err != nil {
		http.Error(w, "Error while unmarsheling data", http.StatusInternalServerError)
		return
	}
	if _, ok := listOfStudents[a.MesId]; !ok {
		http.Error(w, "User desn't exist!", http.StatusInternalServerError)
		return
	}
	data, err := json.Marshal(listOfStudents[a.MesId])
	if err != nil {
		http.Error(w, "Error while marsheling data", http.StatusInternalServerError)
		return
	}
	w.Write(data)
}

func getStudentList(w http.ResponseWriter, r *http.Request) {
	json, err := json.Marshal(listOfStudents)
	if err != nil {
		http.Error(w, "Error while sending data", http.StatusBadRequest)
		return
	}
	w.Write(json)
}

func addStudent(w http.ResponseWriter, r *http.Request) {
	var a Student
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(body, &a)

	if err != nil {
		http.Error(w, "Error while unmarsheling data", http.StatusInternalServerError)
		return
	}

	// listOfStudents = append(listOfStudents, a)
	listOfStudents[a.MesId] = a
	w.Write([]byte("Studnet added"))
}

// curl -X POST localhost:8000/addStudent \
// -H "Content-Type: application/json" \
// -d '{"Name": "John Doe", "MesId": "12345"}'

// curl localhost:8000/getStudentList
