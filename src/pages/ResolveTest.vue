<template lang="pug">
.ui.text.container
  .ui.header {{exam.title}}
  answer-option(v-for='(question, index) in exam.questions', :number='index + 1', :description='exam.questions[index].description', :options='exam.questions[index].options', :answeredOptions='exam.answers[index + 1]')
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
      exam: {}
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
    finish () {
      // console.log('Save TD')
      this.$swal('TD enviado', 'Aguarde que o seu TD será corrigido', 'success')
      .then(() => {
        this.$router.push('/student')
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
