<template>
  <div>
    <VRow>
      <VCol cols='12'>
        <VTextField 
          v-model="card.name" 
          color='accent' 
          label='Name' 
          :placeholder="card.application.name"
          hint="What are we calling it? (optional)"
          persistent-hint
        />
      </VCol>
      <VCol cols='12'>
        <VTextField 
          v-model="card.url" 
          color='accent' 
          label='URL' 
          required 
          placeholder="http://localhost:7878"
          hint="The bookmark you've been using up until now"
          persistent-hint
        />
      </VCol>
      <VCol cols='12'>
        <VTextField 
          v-model="card.apiKey" 
          color='accent' 
          label='API Key' 
          required 
          placeholder="some-long-string-of-gibberish"
          hint="From Settings > General in Radarr"
          persistent-hint
        />
      </VCol>      
    </VRow>
  </div>
</template>

<script>
// import model from './model'


export default {
  props: {
    card: Object
  },
}
</script>