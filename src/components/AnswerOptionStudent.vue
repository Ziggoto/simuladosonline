<template lang="pug">
.question
  p #[b {{number}})] {{description}}
  .ui.form
    .inline.field(v-for='(option, index) in options')
      input(type='checkbox', :value='option.description', v-model='answer')
      label(v-bind:class='answeredOptions.find(option.description) ? "answered" : ""') {{option.description}}
</template>

<script>
export default {
  props: ['number', 'description', 'options', 'answeredOptions'],
  data () {
    return {
      answer: []
    }
  },
  mounted () {
    console.log('Answers: ', this.answeredOptions)
  },
  watch: {
    answer: {
      handler (value, mutation) {
        this.$emit('updateAnswer', {number: this.number, value: value})
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
p
  text-align: justify

label
  font-weight: normal !important

.answered
  color: green !important
  font-weight: bold !important
</style>
