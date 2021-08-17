<template>
  <VContainer>
    <VRow>
      <VCol v-for="card in cards" :key="card.id" cols='12' sm='6' md='4'>
        <Component :is="cardComponent(card)" :card="card" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<script>
export default {
  created () {
  },
  props: {
  },
  components: {  },
  data: () => ({

  }),
  methods: {
    cardComponent(card) {
      return card.application.components.card
    }
  },
  computed: {
    cards() {
      return this.$store.getters.cards
    }
  }
}

</script>

<style lang='scss'>

</style>