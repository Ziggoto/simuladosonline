<template lang="pug">
.grouped.fields
  .field
    label Alternativa \#{{option}}
    input(type='text', v-model='questionOption.description')
  .field
    .ui.checkbox
      input(type='checkbox', ref='checkbox', v-model='questionOption.isRight')
      label Essa resposta é verdadeira
</template>

<script>
import $ from 'jquery'

export default {
  props: ['option'],
  data () {
    return {
      questionOption: {
        description: '',
        isRight: false
      }
    }
  },
  mounted () {
    $(this.$refs.checkbox).checkbox()
    this.$emit('addOption', this.option)
  },
  watch: {
    'questionOption': {
      handler (value, mutation) {
        value.number = this.option - 1
        this.$emit('updateOption', value)
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
