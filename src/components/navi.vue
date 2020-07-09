<template lang="pug">
.nav
  .top
    .sale(@click="changePage('sale')")
      .img
    .close(@click="changePage('close')")
      .img
    .debt(@click="changePage('debt')")
      .img
  .bottom
    .user
</template>

<script>
import $ from 'jquery'
import {ref, onMounted} from 'vue'

export default{setup(){
  function changePage(page){
    $(`.${page}`).css({background: '#E1EFEF'})
    $(`.nav .top>:not(.${page}`).css({background: 'none'})
  }  
  
  onMounted(()=> changePage('sale'))
  return {
    changePage
  }
}}
</script>

<style lang="sass">
$iconsize: 2.5rem
.nav
  display: flex
  flex-direction: column
  justify-content: space-between
  align-items: center
  border-radius: 0 1rem 1rem 0
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.2)
  z-index: 10

  .img
    height: $iconsize
    width: $iconsize
  .sale .img
    background: url('../assets/sale.svg') center/contain no-repeat
    margin-left: -0.25rem
  .close .img
    background: url('../assets/close.svg') center/contain no-repeat
  .debt .img
    background: url('../assets/debt.svg') center/contain no-repeat

  .sale, .close, .debt
    margin: 1.5rem 0.5rem
    padding: 0.8rem
    border-radius: 1rem
</style>