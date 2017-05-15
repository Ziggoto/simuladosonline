import Vue from 'vue'

export default {
  endpoint: 'http://localhost:3030',
  getStudents () {
    // TODO criar um service só pra isso
    return Vue.http.get(`${this.endpoint}/students`)
  },
  createStudent (studentName) {
    return Vue.http.post(`${this.endpoint}/students`, {
      name: studentName,
      todoExams: [],
      doneExams: []
    })
  },
  getAll () {
    return Vue.http.get(`${this.endpoint}/exams`)
  },
  getAnsweredExam (studentId, examId) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${this.endpoint}/students/${studentId}`)
      .then(response => {
        console.log('My response... ', response)
        resolve(response.body.doneExams.find(exam => exam._id === examId))
      }, err => {
        reject(err)
      })
    })
  },
  answerExam (studentId, answers) {
    return Vue.http.put(`${this.endpoint}/students/${studentId}`, {
      $push: {
        doneExams: answers
      },
      $pull: {
        todoExams: {
          '_id': answers._id
        }
      }
    })
  },
  examsToCorrect () {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${this.endpoint}/students`).then(response => {
        // Populates the examsToCorrect array
        const examsToCorrect = []

        response.body.data.forEach(student => {
          student.doneExams.forEach(exam => {
            examsToCorrect.push({
              student: student,
              exam: exam
            })
          })
        })

        resolve(examsToCorrect)
      }, err => {
        reject(err)
      })
    })
  },
  getExam (examId) {
    return Vue.http.get(`${this.endpoint}/exams/${examId}`)
  },
  sendExam (exam, students) {
    const promises = students.map(student => Vue.http.put(`${this.endpoint}/students/${student}`, {
      $push: {
        todoExams: exam
      }
    })
    )
    return Promise.all(promises)
  }
}
