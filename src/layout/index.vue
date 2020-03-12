<template>
  <div>
    <Nav/>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './components/nav'
export default {
  data () {
    return {}
  },
  components: {
    Nav
  }
}
</script>

<style>

</style>
