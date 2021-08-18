<template>
  <div>
    <VSubheader>Upcoming</VSubheader>
    <VSlideGroup show-arrows='always' ref='upcoming'>
      <VSlideItem v-for="episode in calendar" :key="episode.id" >
        <VTooltip right>
          <template v-slot:activator="{ on, attrs }">
            <a v-bind="attrs" v-on="on" v-on:click.prevent="openTo(episode.url)" target="_blank">
              <VAvatar size='40' class="mr-3" >
                <VImg :src="episode.poster"  />
              </VAvatar>
            </a>
          </template>
          <div><strong>{{ episode.shortAirDate }}</strong></div>
          <div>{{ episode.seriesTitle }}</div>
          <div>{{ episode.title }} ({{ episode.number }})</div>
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