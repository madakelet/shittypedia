<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: String,
  imageUrl: String,
  category: String,
  data: {
    type: Object,
    default: null,
  },
})

const imgError = ref(false)
</script>

<template>
  <div class="infobox">
    <div class="infobox-title">{{ title }}</div>
    <div v-if="imageUrl && !imgError" class="border-b border-wiki-border-soft">
      <img
        :src="imageUrl"
        :alt="title"
        @error="imgError = true"
        class="w-full object-cover"
        loading="lazy"
      />
    </div>
    <div v-else-if="imageUrl && imgError" class="img-placeholder border-b border-wiki-border-soft">
      Kép hamarosan
    </div>
    <div class="infobox-data">
      <div v-if="category" class="infobox-row">
        <span class="infobox-label">Kategória</span>
        <span>{{ category }}</span>
      </div>
      <template v-if="data">
        <div v-for="(value, key) in data" :key="key" class="infobox-row">
          <span class="infobox-label">{{ key }}</span>
          <span>{{ value }}</span>
        </div>
      </template>
    </div>
  </div>
</template>
