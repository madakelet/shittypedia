<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { categories } from '@/data/categories.js'
import { articles } from '@/data/articles.js'

const route = useRoute()
const router = useRouter()

const category = computed(() => categories.find(c => c.slug === route.params.slug))

const categoryArticles = computed(() => {
  if (!category.value) return []
  return articles.filter(a => a.categorySlug === category.value.slug)
})

// If slug doesn't match any category, show all categories as a listing page
const isListing = computed(() => !category.value)

watch(() => route.params.slug, () => {
  if (route.name === 'category' && !category.value) {
    // Stay on page — show category listing
  }
}, { immediate: true })
</script>

<template>
  <!-- Single category page -->
  <div v-if="category">
    <h1 class="!text-3xl !mt-0">{{ category.name }}</h1>
    <p class="text-wiki-muted mb-4">{{ category.description }}</p>

    <div class="space-y-3">
      <div v-for="article in categoryArticles" :key="article.slug" class="wiki-box">
        <h3 class="!text-base !mt-0 !mb-1 !border-none !pb-0">
          <router-link :to="{ name: 'article', params: { slug: article.slug } }">
            {{ article.title }}
          </router-link>
        </h3>
        <p class="text-sm text-wiki-muted m-0">{{ article.excerpt }}</p>
      </div>
    </div>
  </div>

  <!-- Category listing page (fallback) -->
  <div v-else>
    <h1 class="!text-3xl !mt-0">Kategóriák</h1>
    <p class="text-wiki-muted mb-4">A Shittypédia szócikkeinek fő kategóriái.</p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <router-link
        v-for="cat in categories"
        :key="cat.slug"
        :to="{ name: 'category', params: { slug: cat.slug } }"
        class="wiki-box hover:no-underline hover:bg-wiki-panel-blue-bg"
      >
        <div class="font-[Georgia,'Times_New_Roman',serif] text-lg mb-1">{{ cat.name }}</div>
        <p class="text-sm text-wiki-muted m-0">{{ cat.description }}</p>
      </router-link>
    </div>
  </div>
</template>
