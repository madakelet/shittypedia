<script setup>
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InfoBox from '@/components/InfoBox.vue'
import { articles } from '@/data/articles.js'
import { categories } from '@/data/categories.js'
import { horoscope } from '@/data/horoscope.js'

const route = useRoute()
const router = useRouter()

const article = computed(() => articles.find(a => a.slug === route.params.slug))
const category = computed(() => {
  if (!article.value) return null
  return categories.find(c => c.slug === article.value.categorySlug)
})

const relatedArticles = computed(() => {
  if (!article.value || !category.value) return []
  return articles
    .filter(a => a.categorySlug === article.value.categorySlug && a.slug !== article.value.slug)
    .slice(0, 5)
})

const isHoroscope = computed(() => route.params.slug === 'horoszkop')

// Redirect to 404 if article not found
watch(() => route.params.slug, () => {
  if (route.name === 'article' && !article.value) {
    router.replace({ name: 'not-found' })
  }
}, { immediate: true })
</script>

<template>
  <div v-if="article">
    <!-- Article title -->
    <h1 class="!text-3xl !mt-0">{{ article.title }}</h1>

    <div class="relative">
      <!-- Infobox -->
      <InfoBox
        v-if="article.imageUrl || article.infobox"
        :title="article.title"
        :imageUrl="article.imageUrl"
        :category="category?.name"
        :data="article.infobox"
      />

      <!-- Article content -->
      <div class="article-content" v-html="article.content"></div>

      <!-- Horoscope table -->
      <div v-if="isHoroscope" class="mt-6">
        <h2>Csillagjegyek</h2>
        <table class="wiki-table">
          <thead>
            <tr>
              <th>Horoszkóp</th>
              <th>Születési időszak</th>
              <th>Jellemzők</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sign in horoscope" :key="sign.sign">
              <td class="font-bold">{{ sign.sign }}</td>
              <td>{{ sign.period }}</td>
              <td>{{ sign.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Category -->
    <div v-if="category" class="mt-8 pt-4 border-t border-wiki-border-soft">
      <span class="text-sm text-wiki-muted">Kategória: </span>
      <router-link
        :to="{ name: 'category', params: { slug: category.slug } }"
        class="text-sm"
      >
        {{ category.name }}
      </router-link>
    </div>

    <!-- Related articles -->
    <div v-if="relatedArticles.length > 0" class="mt-4">
      <h3 class="!text-base !border-none !pb-0">Kapcsolódó szócikkek</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li v-for="rel in relatedArticles" :key="rel.slug">
          <router-link :to="{ name: 'article', params: { slug: rel.slug } }" class="text-sm">
            {{ rel.title }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
