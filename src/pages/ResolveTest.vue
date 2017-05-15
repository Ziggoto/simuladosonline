<template lang="pug">
.ui.text.container
  .ui.header {{exam.name}}
  answer-option(v-for='(question, index) in exam.questions', :number='index + 1', :description='exam.questions[index].description', :options='exam.questions[index].options', :answeredOptions='exam.answers[index + 1]', @updateAnswer='updateAnswer')
  p
    a.ui.positive.button(@click='finish') Corrigir TD
</template>

<script>
// import _ from 'lodash'
import ExamService from '@/services/ExamService'
import AnswerOption from '@/components/AnswerOptionStudent'

export default {
  components: {
    AnswerOption
  },
  data () {
    return {
      exam: {},
      correctAnswers: {}
    }
  },
  mounted () {
    ExamService.getAnsweredExam(this.$route.params.student, this.$route.params.examId)
    .then(response => {
      this.exam = response
    }, err => {
      console.error('Err ', err)
    })
  },
  methods: {
    updateAnswer (answer) {
      this.correctAnswers[answer.number] = answer.value
    },
    finish () {
      const newGrade = {
        exam: this.$route.params.examId,
        grade: ExamService.calcGrade(this.correctAnswers, this.exam.answers)
      }

      ExamService.updateGrade(this.$route.params.student, newGrade).then(response => {
        this.$swal('Nota atribuída com sucesso', `Nota final desse aluno foi ${newGrade.grade}`, 'success')
        .then(() => {
          this.$router.push('/teacher')
        })
      }, err => {
        console.error('Err... ', err)
      })
    }
  }
}
</script>

<style lang="stylus">
.ui.text.container
  .ui.header
    text-align: center

  .question
    margin-top: 30px

  p:last-child
    margin-top: 30px
    margin-bottom: 30px
    text-align: center
</style>
