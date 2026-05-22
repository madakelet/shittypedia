<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { articles } from '@/data/articles.js'

const router = useRouter()
const query = ref('')
const showResults = ref(false)

const searchResults = computed(() => {
  if (!query.value || query.value.length < 2) return []
  const q = query.value.toLowerCase()
  return articles
    .filter(a => a.title.toLowerCase().includes(q) || a.slug.includes(q))
    .slice(0, 10)
})

function goToArticle(slug) {
  query.value = ''
  showResults.value = false
  router.push({ name: 'article', params: { slug } })
}

function onSearch() {
  if (searchResults.value.length > 0) {
    goToArticle(searchResults.value[0].slug)
  }
}

function onBlur() {
  setTimeout(() => { showResults.value = false }, 200)
}
</script>

<template>
  <header class="border-b border-wiki-border-soft bg-white">
    <div class="max-w-[1200px] mx-auto px-4 py-2 flex items-center gap-4 flex-wrap md:flex-nowrap">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-3 shrink-0 no-underline hover:no-underline">
        <div class="w-12 h-12 rounded-full bg-[#f0f0f0] border border-wiki-border-soft flex items-center justify-center">
          <span class="font-[Georgia,'Times_New_Roman',serif] text-2xl font-bold text-wiki-text">S</span>
        </div>
        <div>
          <div class="font-[Georgia,'Times_New_Roman',serif] text-[22px] leading-tight tracking-tight text-black">Shittypédia</div>
          <div class="font-[Georgia,'Times_New_Roman',serif] text-[11px] text-wiki-muted">A valódi enciklopédia</div>
        </div>
      </router-link>

      <!-- Search -->
      <div class="relative flex-1 min-w-0 order-3 md:order-2 w-full md:w-auto">
        <form @submit.prevent="onSearch" class="flex">
          <input
            v-model="query"
            @focus="showResults = true"
            @blur="onBlur"
            @input="showResults = true"
            type="text"
            placeholder="Keresés a Shittypédián"
            class="flex-1 border border-wiki-border-soft px-3 py-1.5 text-sm outline-none focus:border-wiki-link"
          />
          <button
            type="submit"
            class="px-4 py-1.5 bg-wiki-button-bg border border-wiki-button-border border-l-0 text-sm hover:bg-[#eaecf0] cursor-pointer"
          >
            Keresés
          </button>
        </form>
        <div v-if="showResults && searchResults.length > 0" class="search-results">
          <div
            v-for="result in searchResults"
            :key="result.slug"
            class="search-result-item"
            @mousedown.prevent="goToArticle(result.slug)"
          >
            {{ result.title }}
          </div>
        </div>
      </div>

      <!-- Parody links -->
      <div class="hidden md:flex items-center gap-2 text-xs text-wiki-muted order-2 md:order-3 shrink-0">
        <span class="cursor-default hover:underline">Adományok</span>
        <span>·</span>
        <span class="cursor-default hover:underline">Fiók létrehozása</span>
        <span>·</span>
        <span class="cursor-default hover:underline">Bejelentkezés</span>
      </div>
    </div>
  </header>
</template>
