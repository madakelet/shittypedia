<script setup>
import { computed } from 'vue'
import ArticleCard from '@/components/ArticleCard.vue'
import PortalBox from '@/components/PortalBox.vue'
import { articles } from '@/data/articles.js'
import { categories } from '@/data/categories.js'
import { featuredArticles, articleOfTheDay } from '@/data/featuredArticles.js'
import { didYouKnow } from '@/data/didYouKnow.js'

const featured = computed(() =>
  featuredArticles.map(f => {
    const article = articles.find(a => a.slug === f.slug)
    return article ? { ...article, excerpt: f.excerpt || article.excerpt } : null
  }).filter(Boolean)
)

const todayArticle = computed(() => {
  const article = articles.find(a => a.slug === articleOfTheDay.slug)
  return article ? { ...article, excerpt: articleOfTheDay.excerpt || article.excerpt } : null
})

// Build ABC index
const abcIndex = computed(() => {
  const groups = {}
  const sorted = [...articles]
    .filter(a => a.categorySlug !== 'horoszkop' && a.categorySlug !== 'tesztek')
    .sort((a, b) => a.title.localeCompare(b.title, 'hu'))
  for (const article of sorted) {
    const letter = article.title.charAt(0).toUpperCase()
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(article)
  }
  return groups
})

const activeLetters = computed(() => Object.keys(abcIndex.value).sort((a, b) => a.localeCompare(b, 'hu')))
</script>

<template>
  <div>
    <!-- Welcome box -->
    <div class="flex flex-col lg:flex-row gap-4 mb-6">
      <div class="wiki-box wiki-box-blue flex-1">
        <h1 class="!text-2xl !mt-0 !border-none !pb-0 mb-1">Üdvözöljük a Shittypédián!</h1>
        <p class="font-[Georgia,'Times_New_Roman',serif] text-sm text-wiki-muted italic mb-3">A valódi enciklopédia.</p>
        <p>
          Itt valóban megtudhatja a legfontosabb dolgokat a világról: a 2000-es évek tinisorozatairól,
          a magyar trash-televíziózás kiemelkedő pillanatairól, a Disney Channel aranykoráról,
          a kérdéses minőségű internetes személyiségtesztekről, valamint minden olyan kulturális jelenségről,
          amelyet a hivatalos történelemkönyvek gyáván kihagytak.
        </p>
      </div>
      <div class="lg:w-64 shrink-0">
        <PortalBox />
      </div>
    </div>

    <!-- Featured articles -->
    <div class="mb-6">
      <h2 class="!text-xl">Kiemelt cikkek</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ArticleCard
          v-for="article in featured"
          :key="article.slug"
          :slug="article.slug"
          :title="article.title"
          :excerpt="article.excerpt"
          :imageUrl="article.imageUrl"
        />
      </div>
    </div>

    <div class="flex flex-col lg:flex-row gap-6 mb-6">
      <!-- Article of the day -->
      <div class="flex-1">
        <h2 class="!text-xl">A nap szócikke</h2>
        <ArticleCard
          v-if="todayArticle"
          :slug="todayArticle.slug"
          :title="todayArticle.title"
          :excerpt="todayArticle.excerpt"
          :imageUrl="todayArticle.imageUrl"
        />
      </div>

      <!-- Did you know? -->
      <div class="lg:w-80 shrink-0">
        <h2 class="!text-xl">Tudta-e?</h2>
        <div class="wiki-box wiki-box-yellow">
          <ul class="list-disc pl-5 space-y-2 text-sm">
            <li v-for="(fact, i) in didYouKnow" :key="i">{{ fact }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Categories overview -->
    <div class="mb-6">
      <h2 class="!text-xl">Kategóriák</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <router-link
          v-for="cat in categories"
          :key="cat.slug"
          :to="{ name: 'category', params: { slug: cat.slug } }"
          class="wiki-box text-center hover:no-underline hover:bg-wiki-panel-blue-bg transition-colors"
        >
          <div class="font-[Georgia,'Times_New_Roman',serif] text-base">{{ cat.name }}</div>
        </router-link>
      </div>
    </div>

    <!-- ABC index preview -->
    <div class="mb-6">
      <h2 class="!text-xl">ABC sorrend</h2>

      <!-- Letter nav -->
      <div class="flex flex-wrap gap-1 mb-4">
        <router-link
          v-for="letter in activeLetters"
          :key="letter"
          :to="{ name: 'abc', hash: '#' + letter }"
          class="px-2 py-0.5 text-sm border border-wiki-border-soft hover:bg-wiki-panel-blue-bg"
        >
          {{ letter }}
        </router-link>
      </div>

      <!-- Compact list -->
      <div class="columns-1 md:columns-2 lg:columns-3 gap-6">
        <div v-for="letter in activeLetters" :key="letter" class="break-inside-avoid mb-4">
          <h3 class="!text-lg !mt-0 !border-none !pb-0 mb-1">{{ letter }}</h3>
          <ul class="list-none pl-0 space-y-0.5">
            <li v-for="article in abcIndex[letter]" :key="article.slug">
              <router-link :to="{ name: 'article', params: { slug: article.slug } }" class="text-sm">
                {{ article.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
