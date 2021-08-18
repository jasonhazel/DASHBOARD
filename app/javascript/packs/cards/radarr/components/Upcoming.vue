<template>
  <div>
    <VSubheader>Upcoming</VSubheader>
    <VSlideGroup show-arrows='always' ref='upcoming'>
      <VSlideItem v-for="movie in calendar" :key="movie.id" >
        <VTooltip right>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on="on" v-on:click.prevent="openTo(movie.url)" target="_blank">
              <VAvatar size='40' class="mr-3" >
                <VImg :src="movie.poster"  />
              </VAvatar>
            </a>
          </template>
          <div>{{ movie.title }}</div>
        </VTooltip>
      </VSlideItem>
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