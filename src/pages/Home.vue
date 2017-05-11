<template lang="pug">
div
  .ui.modal(ref='authModal')
    i.close.icon
    .header
      | Se identifique
    .content
      .ui.form
        .field
          input(placeholder='Seu usuário', v-model='student')
    .actions
      .ui.button(@click='hideModal') Cancel
      .ui.button(@click='doAuth') OK

  .hello
    h1 Selecione o seu perfil de usuário
    .action-buttons
      router-link.large.ui.primary.button(to='teacher') Sou professor
      a.large.ui.green.button(@click='auth') Sou aluno
</template>

<script>
import $ from 'jquery'
import Vue from 'vue'

export default {
  name: 'hello',
  data () {
    return {
      student: ''
    }
  },
  methods: {
    auth () {
      $(this.$refs.authModal).modal('show')
    },
    hideModal () {
      $(this.$refs.authModal).modal('hide')
    },
    doAuth () {
      const endpoint = 'http://localhost:3030/students?name=' + encodeURIComponent(this.student)
      Vue.http.get(endpoint).then(resolve => {
        if (resolve.body.total > 0) {
          this.hideModal()

          setTimeout(() => {
            this.$router.push({ name: 'Student', params: { id: resolve.body.data[0]._id } })
          }, 200)
        } else {
          console.log('Usuário não existe')
        }
      }, err => {
        console.error('err ', err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.hello
  text-align: center

  .action-buttons
    margin-top: 40px
    display: flex
    justify-content: center

  h1
    font-weight: normal

  a
    color: #42b983;
</style>
