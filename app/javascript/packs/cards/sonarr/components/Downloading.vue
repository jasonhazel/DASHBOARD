<template>
  <div>
    <VSubheader>Downloading</VSubheader>
    <VSlideGroup show-arrows='always' :center-active='true' ref='downloading'>
      <VSlideItem  v-if="queue.length == 0">
        <div style="width: 100%" class='grey--text text-overline text-center'>Nothing Queued</div>
      </VSlideItem>
      <VSlideItem v-for="download in queue" :key="download.id" >
        <VTooltip right>
          <template v-slot:activator="{ on, attrs }">
            <VProgressCircular 
              class="mr-3" 
              v-bind="attrs" 
              v-on="on"
              :rotate="-90" 
              :size='40' 
              :value='download.progress' 
              :color='downloadColor(download)'
            >
              <VAvatar size='34' >
                <VImg :src="download.poster"  />
              </VAvatar>
            </VProgressCircular>
            
          </template>
          
          <div><strong>{{ download.seriesTitle }}</strong></div>
          <div>{{ download.episodeTitle }} ({{ download.episodeNumber }})</div>
          <div v-if="download.status == 'downloading'">
            {{ download.etaDistance }} remaining
          </div>
          <div v-if="download.status == 'paused'">
            Paused
          </div>
        </VTooltip>
      </VSlideItem>
    </VSlideGroup>
  </div>
</template>

<script>
export default {
  props: { queue: Array }
}
</script>