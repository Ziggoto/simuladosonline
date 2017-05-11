<template lang="pug">
.ui.text.container
  .ui.header {{exam.name}}
  answer-option(v-for='(question, index) in exam.questions', :number='index + 1', :description='exam.questions[index].description', :options='exam.questions[index].options', @updateAnswer='updateAnswer')
  p
    a.ui.positive.button(@click='finish') Finalizar TD
</template>

<script>
import ExamService from '@/services/ExamService'
import AnswerOption from '@/components/AnswerOptionStudent'

export default {
  components: {
    AnswerOption
  },
  data () {
    return {
      exam: {},
      answers: {}
    }
  },
  mounted () {
    ExamService.getExam(this.$route.params.examId).then(response => {
      this.exam = response.body
    }, err => {
      console.error('err.... ', err)
    })
  },
  methods: {
    finish () {
      const answeredExam = this.exam
      answeredExam.answers = this.answers

      ExamService.answerExam(this.$route.params.student, answeredExam).then(response => {
        this.$swal('TD enviado', 'Aguarde que o seu TD será corrigido', 'success').then(() => {
          setTimeout(() => {
            this.$router.push('/student')
          }, 200)
        })
      }, err => {
        console.error('Err ', err)
      })
    },
    updateAnswer (answer) {
      this.answers[answer.number] = answer.value
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
