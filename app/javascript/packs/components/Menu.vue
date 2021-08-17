<template>
  <div>
    <VAppBar app color='background' dense flat>
      <VAppBarNavIcon color='primary' v-on:click="menu = !menu">
        <VIcon>{{ menu ? "mdi-chevron-left-box" : "mdi-cog" }}</VIcon>
      </VAppBarNavIcon>      
      <VSpacer></VSpacer>
      <VSwitch dense :input-value="$store.getters.dark" v-on:change='toggleDark' class='mt-5'/>
      <VAppBarNavIcon color='primary'>
        <VIcon>mdi-help-circle</VIcon>
      </VAppBarNavIcon>      
    </VAppBar>
    <VNavigationDrawer left app v-model='menu'>
      <VList nav >
        <VSubheader class='pl-2'>Add Card</VSubheader>
        <VListItemGroup>
          <VListItem 
            v-for='application in applications' 
            :key='application.id'
            v-on:click='newCard = application'
          >
            <VListItemTitle>{{ application.name }}</VListItemTitle>
            <VListItemIcon>
              <VAvatar size='24'>
                <VImg :src="application.icon" />
              </VAvatar>
            </VListItemIcon>
          </VListItem>          
        </VListItemGroup>
      </VList>
      <template v-slot:append>
        <VList nav >
          <VListItemGroup>
            <VListItem>
              <VListItemIcon>
                <VIcon>mdi-cog</VIcon>
              </VListItemIcon>
              <VListItemTitle>Settings</VListItemTitle>
            </VListItem>          
          </VListItemGroup>
        </VList>
      </template>
    </VNavigationDrawer>
    <NewCard 
      v-if="newCard" 
      :application="newCard" 
      v-on:closed="newCard = false" 
    />
  </div>
</template>

<script>
import NewCard from './NewCard.vue'
export default {
  watch: {
  },
  components: {
    NewCard
  },
  props: {
    opened: Boolean
  },
  data: () => ({
    menu: false,
    newCard: false
  }),
  methods: {
    close() {
      this.$emit('close')
    },
    toggleDark() {
      this.$store.dispatch('toggleDark')
        .then(dark => this.$vuetify.theme.dark = dark)
    }
  },
  computed: {
    applications() {
      return this.$store.getters.applications
    }
  }
}

</script>