<template lang="pug">
h1 {{ msg }}
button(@click="count++") count is: {{ count }}
p Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
</template>

<script>
export default{
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>
