<template lang="pug">
.ui.grid
  .one.column.row
    .ui.text.container
      .ui.header Tela de criação de TDs
      | Para inserir uma questão, apenas é necessário arrastar as questões desejadas para a lista direita

  .one.column.row
    .ui.text.container
      .ui.form
        .field
          label Insira o nome do TD
          input(type='text', v-model='examName')
  .two.column.row
    .column
      .ui.stacked.segment
        .ui.container
          .ui.header
            span Questões criadas

        .ui.segments
          draggable(v-model='allQuestions', :options="{group:'people'}", @start='drag=true', @end='drag=false')
            .ui.segment(v-for='question in allQuestions')
              span {{question.description}}

    .column
      .ui.stacked.segment
        .ui.container
          .ui.header Questões do TD
        .ui.segments
          draggable(v-model='choosedQuestions', :options="{group:'people'}", @start='drag=true', @end='drag=false')
            .ui.segment(v-for='question in choosedQuestions')
              span {{question.description}}

  .one.column.row
    .ui.text.container
      router-link.negative.ui.button(to='Teacher') Cancelar
      a.positive.ui.button(@click='finish') Concluir e voltar para o menu
</template>

<script>
import Vue from 'vue'
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  data () {
    return {
      examName: '',
      allQuestions: [],
      choosedQuestions: [{description: ''}]
    }
  },
  mounted () {
    Vue.http.get('http://localhost:3030/questions').then(response => {
      // console.log('response ', response.body.data)
      this.allQuestions = response.body.data
    }, err => {
      console.error('err ', err)
    })
  },
  methods: {
    finish () {
      Vue.http.post('http://localhost:3030/exams', {
        name: this.examName,
        questions: this.choosedQuestions
      })
      .then(response => {
        console.log('response ', response)

        this.$swal('TD criado', 'Agora ele estará disponivel para ser realizado', 'success')
          .then(res => {
            this.$router.push('/teacher')
          })
      }, err => {
        console.console.error('error ', err)
      })
    }
  }
}
</script>

<style lang="stylus">
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
