<template lang="pug">
navi
insert
</template>

<script>
import navi from './components/navi.vue'
import insert from './components/insert.vue'

export default {
  name: 'App',
  components: {
    navi,
    insert
  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  font-family: product sans
  background: none
  border: none
  color: #3C4748
#app
  display: flex
  height: 100vh
  justify-content: space-between

@media only screen and (max-width: 1000px)
  #app
    flex-direction: column
    justify-content: normal
  .nav
    flex-direction: row
    border-radius: 0 0 1rem 1rem
    .top
      display: flex
      :nth-child(n)
        margin: 0.3rem
        padding: 0.1rem
      .img
        height: 1.5rem
  .insert
    width: 100%
</style>
