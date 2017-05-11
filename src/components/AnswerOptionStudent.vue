<template lang="pug">
.question
  p #[b {{number}})] {{description}}
  .ui.form
    .inline.field(v-for='option in options')
      input(type='checkbox', :value='option.content', v-model='answer')
      label {{option.content}}
</template>

<script>
export default {
  props: ['number', 'description', 'options'],
  data () {
    return {
      answer: []
    }
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
</style>
