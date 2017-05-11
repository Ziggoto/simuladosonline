<template lang="pug">
div(@click='changeState', :class='["ui", active ? "blue" : "", "label"]') {{student.name}}
</template>

<script>
export default {
  props: ['student'],
  data () {
    return {
      active: false
    }
  },
  methods: {
    changeState () {
      this.active = !this.active

      this.$emit('update', {
        status: this.active,
        student: this.student._id
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
div
  cursor: pointer
</style>
