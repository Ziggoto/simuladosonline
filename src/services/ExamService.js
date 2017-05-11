import Vue from 'vue'

export default {
  endpoint: 'http://localhost:3030',
  getStudents () {
    // TODO criar um service só pra isso
    return Vue.http.get(`${this.endpoint}/students`)
  },
  getAll () {
    return Vue.http.get(`${this.endpoint}/exams`)
  },
  answerExam (studentId, answers) {
    return Vue.http.put(`${this.endpoint}/students/${studentId}`, {
      $push: {
        doneExams: answers
      },
      $pull: {
        todoExams: {
          '_id' : answers._id
        }
      }
    })
  },
  examsToCorrect () {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${this.endpoint}/students`).then(response => {
        return response.body.data
      }, err => {
        reject(err)
      }).then(students => {
        // Populates the examsToCorrect array
        const examsToCorrect = []

        students.forEach(student => {
          student.doneExams.forEach(exam => {
            examsToCorrect.push({
              student: student,
              exam: exam
            })
          })
        })

        resolve(examsToCorrect)
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
