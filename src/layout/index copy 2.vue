<template>
  <div>
    <Nav/>

    <router-view></router-view>
  </div>
</template>

<script>
import Nav from './components/nav'
import Aside from './components/aside'
export default {
  data () {
    return {}
  },
  components: {
    Nav, Aside
  }
}
</script>

<style>

</style>
