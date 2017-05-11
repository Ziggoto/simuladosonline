<template lang="pug">
.ui.text.container
  .ui.header {{exam.title}}
  answer-option(v-for='(question, index) in exam.questions', :number='index + 1', :description='exam.questions[index].description', :options='exam.questions[index].options')
  p
    a.ui.positive.button(@click='finish') Finalizar TD
</template>

<script>
import AnswerOption from '@/components/AnswerOptionStudent'

export default {
  components: {
    AnswerOption
  },
  data () {
    return {
      exam: {
        title: 'TD Matemática I',
        questions: [
          {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus orci tincidunt nulla euismod, in porttitor velit mollis. Vivamus tincidunt eu libero feugiat tempor. Praesent nec porttitor ex. Etiam bibendum, orci et blandit ultricies, dui est imperdiet erat, vel mollis turpis massa vel dolor. Phasellus et varius risus. Nam id pulvinar justo, vitae semper nisl. Donec pharetra nulla nisl, sit amet auctor sem porttitor eleifend. Suspendisse convallis, ligula id laoreet viverra, eros quam dapibus velit, eget pellentesque arcu ipsum interdum lorem. Ut vestibulum, diam ac consequat malesuada, felis nisi sodales lectus, id elementum massa metus ac enim.',
            options: ['Opção a', 'Opção b', 'Opção c', 'Opção d', 'Opção e']
          },
          {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus orci tincidunt nulla euismod, in porttitor velit mollis. Vivamus tincidunt eu libero feugiat tempor. Praesent nec porttitor ex. Etiam bibendum, orci et blandit ultricies, dui est imperdiet erat, vel mollis turpis massa vel dolor. Phasellus et varius risus. Nam id pulvinar justo, vitae semper nisl. Donec pharetra nulla nisl, sit amet auctor sem porttitor eleifend. Suspendisse convallis, ligula id laoreet viverra, eros quam dapibus velit, eget pellentesque arcu ipsum interdum lorem. Ut vestibulum, diam ac consequat malesuada, felis nisi sodales lectus, id elementum massa metus ac enim.',
            options: ['Opção a', 'Opção b', 'Opção c', 'Opção d', 'Opção e']
          },
          {
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin dapibus orci tincidunt nulla euismod, in porttitor velit mollis. Vivamus tincidunt eu libero feugiat tempor. Praesent nec porttitor ex. Etiam bibendum, orci et blandit ultricies, dui est imperdiet erat, vel mollis turpis massa vel dolor. Phasellus et varius risus. Nam id pulvinar justo, vitae semper nisl. Donec pharetra nulla nisl, sit amet auctor sem porttitor eleifend. Suspendisse convallis, ligula id laoreet viverra, eros quam dapibus velit, eget pellentesque arcu ipsum interdum lorem. Ut vestibulum, diam ac consequat malesuada, felis nisi sodales lectus, id elementum massa metus ac enim.',
            options: ['Opção a', 'Opção b', 'Opção c', 'Opção d', 'Opção e']
          }
        ]
      }
    }
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
