<script setup>
import { ref } from 'vue'

defineProps({
  slug: String,
  title: String,
  excerpt: String,
  imageUrl: String,
})

const imgError = ref(false)
</script>

<template>
  <div class="wiki-box">
    <div v-if="imageUrl && !imgError" class="mb-3 border border-wiki-border-soft">
      <img
        :src="imageUrl"
        :alt="title"
        @error="imgError = true"
        class="w-full h-40 object-cover"
        loading="lazy"
      />
    </div>
    <div v-else class="img-placeholder mb-3 h-32">
      Kép hamarosan
    </div>
    <h3 class="!text-base !mt-0 !mb-1 !border-none !pb-0">
      <router-link :to="{ name: 'article', params: { slug } }">{{ title }}</router-link>
    </h3>
    <p class="text-sm text-wiki-text mb-2">{{ excerpt }}</p>
    <router-link :to="{ name: 'article', params: { slug } }" class="text-sm">
      Tovább a szócikkhez &rarr;
    </router-link>
  </div>
</template>
