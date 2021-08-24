<template>
  <VProgressCircular 
    :size='size' 
    :rotate="-90"           
    :value='progress' 
    :color='color'
  >
    <VAvatar :size='size - 6' >
      <VImg :src="image"  />
    </VAvatar>
  </VProgressCircular>

</template>

<script>
export default {
  watch: {
  },
  props: {
    image: String,
    progress: {
      type:     Number,
      default:  50
    },
    color: {
      type:     String,
      default:  'primary'
    },
    size: {
      type: Number,
      default: 40
    }
  }
}
</script>