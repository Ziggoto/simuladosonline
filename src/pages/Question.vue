<template lang="pug">
.ui.text.container
  .ui.form
    .field
      label Descreva a questão
      textarea(v-model='question.description')
    .field
      a.primary.ui.button(@click='options += 1') Adicionar alternativa
    answer-option(v-for='option in options', :option='option', @addOption='addOption', @updateOption='pushOption')
    //- .grouped.fields(v-for='option in options')
    //-   .field
    //-     label Alternativa \#{{option}}
    //-     input(type='text')
    //-   .field
    //-     .ui.checkbox
    //-       input(type='checkbox', tabindex='0', class='hidden')
    //-       label Essa resposta é verdadeira
    .field(style='display: flex; justify-content: space-between;margin-bottom:20px;margin-top:20px')
      router-link.negative.ui.button(to='Teacher') Cancelar
      a.ui.button(@click='nextQuestion') Concluir e iniciar nova questão
      a.positive.ui.button(@click='finish') Concluir e voltar para o menu
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'
import AnswerOption from '@/components/AnswerOption'

export default {
  components: {
    AnswerOption
  },
  data () {
    return {
      options: 1,
      question: {
        description: '',
        options: []
      }
    }
  },
  mounted () {
    $('.ui.checkbox').checkbox()
  },
  methods: {
    addOption (number) {
      this.question.options.push({})
    },
    pushOption (data) {
      this.question.options[data.number] = data
    },
    sendQuestion () {
      Vue.http.post('http://localhost:3030/questions', this.question).then(response => {
        console.log(response)
      }, response => {
        console.error(response)
      })
    },
    nextQuestion () {
      this.sendQuestion()
      this.question = {
        description: '',
        options: []
      }
    },
    finish (debug) {
      this.sendQuestion()
      this.$router.push('/teacher')
    }
  }
}
</script>

<style>
</style>
