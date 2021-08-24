<template>
  <VTooltip right>
    <template v-slot:activator="{ on, attrs }">
      <a v-bind="attrs" v-on="on" v-on:click.prevent="$emit('click', episode.url)" target="_blank">
        <Icon
          class="mr-1" 
          v-bind="attrs" 
          v-on="on" 
          :progress="episode.downloaded" 
          :image="episode.image"
          color="green"
          :size="size"
        />
      </a>
    </template>
    <slot />

  </VTooltip>
</template>

<script>

import Icon from './Icon.vue'
export default {
  components: { Icon },
  data() { return { } },
  props: { 
    episode: Object, 
    size: {
      type: Number,
      default: 40
    }
  },
  methods: {
  },
  computed: { 

  }
}
</script>