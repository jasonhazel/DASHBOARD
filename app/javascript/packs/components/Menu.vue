<template>
  <div>
    <VAppBar app color='background' dense flat>
      <VAppBarNavIcon color='primary' v-on:click="menu = !menu">
        <VIcon>{{ menu ? "mdi-chevron-left-box" : "mdi-menu" }}</VIcon>
      </VAppBarNavIcon>      
      <slot>
        <VToolbarTitle>
          DVRR
        </VToolbarTitle>
        <VSpacer></VSpacer>
        <VAppBarNavIcon color='primary'>
          <VIcon>mdi-help-circle</VIcon>
        </VAppBarNavIcon>      
      </slot>
    </VAppBar>
    <VNavigationDrawer left app v-model='menu'>
      <VList nav >
        <VSubheader class='pl-2'>Add Card</VSubheader>
        <VListItemGroup>
          <VListItem 
            v-for='application in applications' 
            :key='application.id'
            v-on:click="$emit('new', application)"
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
              <VListItemTitle>Settings</VListItemTitle>
              <VListItemIcon>
                <VIcon>mdi-cog</VIcon>
              </VListItemIcon>
            </VListItem>          
          </VListItemGroup>
        </VList>
      </template>
    </VNavigationDrawer>
  </div>
</template>

<script>

import applications from '../cards'

export default {
  components: { },
  props: {
    opened: Boolean
  },
  data: () => ({
    menu: false
  }),
  methods: {
    close() {
      this.$emit('close')
    },
  },
  computed: {
    applications() {
      return applications
    }
  }
}

</script>