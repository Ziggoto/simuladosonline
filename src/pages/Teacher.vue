<template lang="pug">
div
  .ui.modal(ref='studentsModal')
    i.close.icon
    .header
      | Selecione os alunos para receber o TD
    .content
      clickable-label(v-for='student in students', :student='student', @update='updateSendList')
    .actions
      .ui.button(@click='hideModal') Cancel
      .ui.button(@click='sendExam') OK

  .ui.grid
    .one.column.row
      .ui.text.container
        .ui.header Dashboard dos Professores
    .one.column.row
      .ui.text.container
        router-link.primary.ui.button(to='question') Cadastrar questão
    .two.column.row
      .column
        .ui.stacked.segment
          .ui.container
            .ui.header
              span TDs criados
              span(style='cursor: pointer', @click='mountExam')
                i.large.add.circle.icon

          .ui.segments
            .ui.segment(v-for='exam in exams')
              span {{exam.name}}
              span
                a.ui.primary.icon.button(@click='openStudentsModal(exam._id)')
                  i.send.icon
      .column
        .ui.stacked.segment
          .ui.container
            .ui.header TDs para corrigir
            table.ui.celled.padded.table
              thead
                tr
                  th.single.line TD
                  th Aluno
                  th
              tbody
                tr(v-for='exam in examsToCorrect')
                  td
                    | {{exam.exam.name}}
                  td.single.line
                    | {{exam.student.name}}
                  td
                    a.ui.primary.icon.button(@click='resolveExam(exam.exam._id, exam.student._id)')
                      i.unhide.icon
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import ExamService from '@/services/ExamService'
import ClickableLabel from '@/components/ClickableLabel'

export default {
  components: {
    ClickableLabel
  },
  data () {
    return {
      students: [],
      exams: [],
      sendList: [],
      examToSend: '',
      examsToCorrect: []
    }
  },
  mounted () {
    ExamService.getAll().then(response => {
      this.exams = response.body.data
    }, err => {
      console.error('err ', err)
    })

    ExamService.getStudents().then(response => {
      this.students = response.body.data
    }, err => {
      console.error('err ', err)
    })

    ExamService.examsToCorrect()
    .then(response => {
      this.examsToCorrect = response
    })
    .catch(err => {
      console.error('Err ', err)
    })
  },
  methods: {
    openStudentsModal (examId) {
      this.examToSend = examId
      $(this.$refs.studentsModal).modal('show')
    },
    updateSendList (data) {
      if (data.status) {
        this.sendList.push(data.student)
      } else {
        _.remove(this.sendList, el => el === data.student)
      }

      console.log('sendList: ', this.sendList)
    },
    mountExam () {
      this.$router.push('/make-test')
    },
    hideModal () {
      $(this.$refs.studentsModal).modal('hide')
    },
    sendExam () {
      console.log(`Send TD ${this.examToSend} to ${this.sendList}`)
      this.hideModal()

      const exam = this.exams.find(exam => exam._id === this.examToSend)
      ExamService.sendExam(exam, this.sendList)
    },
    resolveExam (examId, student) {
      this.$router.push({ name: 'ResolveTest', params: {student: student, examId: examId} })
    }
  }
}
</script>

<style lang="stylus" scoped>
.ui.grid
  .one.column.row
    .ui.text.container
      text-align: center

  .two.column.row
    .column
      .ui.stacked.segment
        .ui.container
          .ui.header
            display: flex
            justify-content: space-between

.ui.segments
  .ui.segment
    display: flex
    justify-content: space-between
</style>
