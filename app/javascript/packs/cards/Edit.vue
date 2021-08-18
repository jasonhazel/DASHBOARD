<template>
  <VDialog value='true' persistent max-width="600px">
    <VCard>
      <VForm v-on:submit.prevent='save'>
        <VToolbar flat color='primary'>
          <VToolbarTitle>Edit {{ card.settings.application.name }}</VToolbarTitle>
          <VSpacer />
          <VBtn icon v-on:click="$emit('closed')">
            <VIcon>mdi-close</VIcon>
          </VBtn>
        </VToolbar>
        <VCardText>
          <SonarrForm :card.sync="card.settings" />
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
export default {
  props: {
    card: Object
  },
  data() {
    return { }
  },
  methods: {
    save() {
      this.$emit('save', this.card)
    }
  },
}

</script>