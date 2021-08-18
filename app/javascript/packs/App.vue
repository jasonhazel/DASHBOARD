<template>
  <VApp>
    <Menu v-on:new='newCardDialog' />
    <VMain>
      <Dashboard v-on:edit='editCardDialog' />

      <!-- kinda hate this right now -->
      <NewCard 
        v-if="newCard" 
        :application="newCard" 
        v-on:save='saveCard'
        v-on:closed="newCard = false" 
      />

      <EditCard
        v-if="editCard"
        :card="editCard"
        v-on:save='updateCard'
        v-on:closed="editCard = false"
      />
      
    </VMain>    
  </VApp>
</template>

<script>
import Dashboard from './components/Dashboard.vue'
import Menu from './components/Menu.vue'
import NewCard from './cards/New.vue'
import EditCard from './cards/Edit.vue'
export default {
  methods: {
  },
  components: {
    Menu,
    Dashboard,
    NewCard,
    EditCard
  },
  data: function () {
    return { 
      newCard: false,
      editCard: false
    }
  },
  mounted() {
    this.$store.dispatch('getCards')
  },
  methods: {
    newCardDialog(application) {
      this.newCard = application
    },
    editCardDialog(card) {
      this.editCard = card
    },
    saveCard(card) {
      this.$store.dispatch('createCard', card)
      this.newCard = false
    },
    updateCard(card) {
      this.$store.dispatch('updateCard', card)
      this.editCard = false
    }
  }
}
</script>

<style scoped>
#app {
  background-color: var(--v-background-base);
}
</style>
