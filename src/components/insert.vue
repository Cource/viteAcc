<template lang="pug">
.insert
  .top
    .id # {{ id }}
    .full
      .data
        .history
          p(v-for="(item, index) in queue" @click="queue.splice(index, 1)") {{item}}
        .sum(@click='clear') {{sum}}
      form(@submit='pushInput' onsubmit="return false")
        input(type="text" v-model="input")
  .bottom(v-show="!showPur")
    .left
      button(@click="addToInput('7')") 7
      button(@click="addToInput('8')") 8
      button(@click="addToInput('9')") 9
      button(@click="addToInput('4')") 4
      button(@click="addToInput('5')") 5
      button(@click="addToInput('6')") 6
      button(@click="addToInput('1')") 1
      button(@click="addToInput('2')") 2
      button(@click="addToInput('3')") 3
      button(@click="addToInput('0')") 0
      button(@click="addToInput('.')") .
    .right
      button(style="grid-area:back" @click='popInput') &lt-
      button(@click="addToInput('/')") /
      button(@click="addToInput('-')") -
      button(style="grid-area:mul" @click="addToInput('*')") x
      button(style="grid-area:plus" @click='pushInput') +
      button.purchase(@click="showPur = true")
        .img
      button.sell(@click='sell')
        .img
  .pur(v-if="showPur")
    form(@submit="addDist" onsubmit="return false" )
      input.distname(type="text" v-if="showAdd")
    .add(@click="showAdd = !showAdd")
      .img(v-if="!showAdd")
      .cancel(v-if="showAdd") Cancel
      p(v-if="!showAdd") Add a distributor
      .close
    ul.disList
      li.disItem(v-for="distributor in distributors" :key="distributor.id") {{ distributor }}
</template>

<script>
import axios from 'axios'
import vueAxios from 'vue-axios'
import { ref, computed, onMounted } from 'vue'

export default {
  setup(){
    const id = ref(0)
    const input = ref('')
    const queue = ref([])
    const sum = computed(()=> queue.value.reduce(function(a,b){return eval(a) + eval(b)}, 0))
    const showPur = ref(false)
    const distributors = ref(['Milk', 'Chicken eggs'])
    const showAdd = ref(false)

    function pushInput(){
      const data = eval(input.value)
      if (data){
        queue.value.push(input.value)
        input.value = ''
      }
    }
    function addToInput(char){
      input.value += char
    }
    function popInput(){
      input.value = input.value.slice(0, input.value.length-1)
    }
    function clear(){
      input.value = ''
      queue.value = []
      sum.value = 0
    }
    function sell(){
      if (sum.value !== 0){
        axios.post('http://127.0.0.1:8080/api/sale', {amt: parseInt(sum.value)})
          .then((res)=> console.log(res.data))
          .then(_=>{
            clear()
            updateId()
          })
      }
    }
    function quit(){
      axios.get('http://127.0.0.1:8080/api/close').then((res)=> console.log(res))
    }
    function updateId(){
      axios.get('http://127.0.0.1:8080/api/init',)
        .then((res)=> id.value = res.data.lastSale + 1)
    }

    onMounted(_=> updateId())

    return{
      id, input, queue, sum, distributors, showPur, showAdd, // Data
      pushInput, addToInput, popInput, clear, sell //Methods
    }
  }
}
</script>

<style lang="sass">
*:focus
  outline: none
%flexcol
  display: flex
  flex-direction: column

.insert
  background-color: #EEF6F6
  width: 35rem
  border-radius: 1rem 0 0 1rem
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.2)
  font-size: 2rem
  @extend %flexcol
  height: 100%
  z-index: 2

  .top
    @extend %flexcol
    justify-content: space-between
    flex: 1 0
    .id
      align-self: flex-end
      font-size: 1.5rem
      color: #5E8A8D
      margin: 1rem 1rem 0 0
    .full
      .data
        display: flex
        align-items: flex-end
        justify-content: space-between
        margin: 1rem
        .history
          max-height: 15rem
          width: 10rem
          @extend %flexcol
          align-items: flex-end
          overflow-y: auto
          direction: rtl
        .history p
          color: #5E8A8D
          direction: ltr
          border-radius: 10rem
          padding: 0 0.7rem
          transition: background 0.1s, color 0.1s
          &:hover
            background: #e89
            color: #fff
        .sum
          font-weight: bold
          font-size: 3rem
          padding: 0 0.5rem
          border-radius: 1rem
          transition: background 0.1s, color 0.1s
          &:hover
            background: #e89
            color: #fff
          &:active
            background: #E1EFEF
      input
        background: #E1EFEF
        border-radius: 0.8rem 0.8rem 0 0
        font-size: 2rem
        padding-left: 1rem
        color: #5E8A8D
        width: calc(100% - 1rem)

  .bottom
    background: #fff
    height: 30rem
    display: grid
    grid-template-columns: 3fr 1fr
    .left
      display: grid
      grid-template-columns: auto auto auto
      width: 100%
      button
        margin: auto
        padding: 1rem 2rem
        font-size: 2.2rem
        border-radius: 1rem
        font-weight: bold
      button:active
        background: #E1EFEF
        transition: background 0.2s
    .right
      width: 20%
      border: 0
      border-left: 2px
      border-style: solid
      border-color: #E1EFEF
      display: grid
      grid-template-areas: 'back back' '. .' 'mul mul' 'plus plus' '. .'
      button
        font-size: 2rem
        padding: 1rem 2rem
      button:active
        background: #E1EFEF
        transition: background 0.2s
      .sell, .purchase
        background: #69D8BA
      .sell:hover, .purchase:hover
        background: #6de2c3
      .sell:active, .purchase:active
        background: #4dbd9f
      .img
        height: 2rem
        width: 2rem
      .sell .img
        background: url('../assets/sell.svg') center/contain no-repeat
      .purchase .img
        background: url('../assets/purchase.svg') center/contain no-repeat
  .pur
    height: 25rem
    @extend %flexcol
    .distname
      font-size: 1.5rem
    .add
      display: flex
      align-items: center
      font-weight: bold
      .img
        height: 2rem
        width: 2rem
        margin: 1rem 1rem
        background: url(../assets/add.svg) center/contain no-repeat
      .cancel
        padding: 0.5rem 1rem
        background: #3C4748
        color: white
    .disList
      background: #fff
      padding: 1rem
      flex-grow: 1
      .disItem
        list-style: none
        font-size: 1.5rem
        margin-top: 0.5rem
        padding: 0.1rem 0.7rem
        border-radius: 10rem
        &:hover
          background: #eee
</style>