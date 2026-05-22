<script setup>
import { computed } from 'vue'
import { articles } from '@/data/articles.js'

const abcIndex = computed(() => {
  const groups = {}
  const sorted = [...articles].sort((a, b) => a.title.localeCompare(b.title, 'hu'))
  for (const article of sorted) {
    const letter = article.title.charAt(0).toUpperCase()
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(article)
  }
  return groups
})

const letters = computed(() => Object.keys(abcIndex.value).sort((a, b) => a.localeCompare(b, 'hu')))
</script>

<template>
  <div>
    <h1 class="!text-3xl !mt-0">Szócikkek ABC sorrendben</h1>
    <p class="text-wiki-muted mb-4">A Shittypédia összes szócikke betűrendben.</p>

    <!-- Letter navigation -->
    <div class="flex flex-wrap gap-1 mb-6 pb-3 border-b border-wiki-border-soft">
      <a
        v-for="letter in letters"
        :key="letter"
        :href="'#' + letter"
        class="px-2.5 py-1 text-sm border border-wiki-border-soft hover:bg-wiki-panel-blue-bg"
      >
        {{ letter }}
      </a>
    </div>

    <!-- Article lists by letter -->
    <div class="columns-1 md:columns-2 lg:columns-3 gap-8">
      <div v-for="letter in letters" :key="letter" :id="letter" class="break-inside-avoid mb-6">
        <h2 class="!text-2xl !mt-0">{{ letter }}</h2>
        <ul class="list-none pl-0 space-y-1">
          <li v-for="article in abcIndex[letter]" :key="article.slug">
            <router-link :to="{ name: 'article', params: { slug: article.slug } }">
              {{ article.title }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
