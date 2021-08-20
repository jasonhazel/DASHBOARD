<template>
  <div>
    <VSubheader>Upcoming</VSubheader>
    <VSlideGroup show-arrows='always' ref='upcoming'>
      <template v-for="movie in calendar">
        <VSlideItem v-if="!movie.downloaded" :key="movie.id" >
          <VTooltip right>
            <template v-slot:activator="{ on, attrs }">
              <a v-bind="attrs" v-on="on" v-on:click.prevent="openTo(movie.url)" target="_blank">
                <VProgressCircular 
                  class="mr-3" 
                  v-bind="attrs" 
                  v-on="on"
                  :size='40' 
                  :value='movie.downloaded ? 100 : 0' 
                  color='green'
                >
                  <VAvatar size='34'>
                    <VImg :src="movie.poster"  />
                  </VAvatar>
                </VProgressCircular>
              </a>
            </template>
            <div>{{ movie.title }}</div>
          </VTooltip>
        </VSlideItem>
      </template>
    </VSlideGroup>
  </div>
</template>

<script>
export default {
  props: {
    calendar: Array
  }
}
</script>