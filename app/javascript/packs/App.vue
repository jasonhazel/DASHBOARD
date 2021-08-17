<template>
  <VApp>
    <Menu />
    <VMain>
      <Dashboard />

      
    </VMain>    
  </VApp>
</template>

<script>
import Dashboard from './components/Dashboard.vue'
import Menu from './components/Menu.vue'
export default {
  methods: {
  },
  components: {
    Menu,
    Dashboard
  },
  data: function () {
    return { }
  },
  created() {
    this.$vuetify.theme.dark = this.$store.getters.dark
  },
}
</script>

<style scoped>
#app {
  background-color: var(--v-background-base);
}
</style>
