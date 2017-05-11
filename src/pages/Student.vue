<template lang="pug">
.ui.grid
  .one.column.row
    .ui.text.container
      .ui.header Dashboard dos alunos
  .one.column.row.tds-todo
    .ui.stacked.segment
      .ui.container
        .ui.header
          span TDs para fazer

      .ui.segments
        .ui.segment(v-for='exam in exams')
          span {{exam.name}}
          span
            a.ui.primary.icon.button(@click='doTest(exam._id)')
              i.write.icon
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      exams: []
    }
  },
  mounted () {
    const endpoint = `http://localhost:3030/students?_id=${this.$route.params.id}`
    Vue.http.get(endpoint).then(response => {
      this.exams = response.body.data[0].todoExams
    }, err => {
      console.error('err ', err)
    })
  },
  methods: {
    doTest (examId) {
      // console.log(this.$route.params)
      this.$router.push({name: 'DoTest', params: {student: this.$route.params.id, examId: examId}})
    }
  }
}
</script>

<style lang="stylus" scoped>
.ui.text.container
  text-align: center

.one.column.row.tds-todo
  display: flex
  justify-content: center

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
