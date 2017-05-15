<template lang="pug">
.question
  p #[b {{number}})] {{description}}
  .ui.form
    .inline.field(v-for='(option, index) in options')
      input(type='checkbox', :value='option.description', v-model='answer')
      label {{option.description}}
</template>

<script>
export default {
  props: ['number', 'description', 'options', 'answeredOptions'],
  data () {
    return {
      answer: []
    }
  },
  methods: {
    isAnswered (option) {
      if (this.answeredOptions && this.answeredOptions.find(option.description)) {
        return true
      }
      return false
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
