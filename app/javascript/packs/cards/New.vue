<template>
  <VDialog value='true' persistent max-width="600px">
    <VCard>
      <VForm v-on:submit.prevent='save'>
        <VToolbar flat color='primary'>
          <VToolbarTitle>{{ application.name }}</VToolbarTitle>
          <VSpacer />
          <VBtn icon v-on:click="$emit('closed')">
            <VIcon>mdi-close</VIcon>
          </VBtn>
        </VToolbar>
        <VCardText>
          <Component :is="application.form" :card.sync="card" />
        </VCardText>
        
        <VCardActions>
          <VSpacer />
          <VBtn text v-on:click="$emit('closed')">Close</VBtn>
          <VBtn text type='submit'>Save</VBtn>
        </VCardActions>
      </VForm>
    </VCard>
  </VDialog>
</template>

<script>
// import { uuid } from 'vue-uuid'; 
export default {
  props: {
    application: Object
  },
  data() {
    return {
      card: {
        application: this.application
      }
    }
  },
  methods: {
    save() {
      this.$emit('save', this.card)
      // this.$emit('closed')
    }
  },
}

</script>