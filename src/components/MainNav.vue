<script setup>
import { useRouter } from 'vue-router'
import { articles } from '@/data/articles.js'

const router = useRouter()

function randomArticle() {
  const idx = Math.floor(Math.random() * articles.length)
  router.push({ name: 'article', params: { slug: articles[idx].slug } })
}
</script>

<template>
  <nav class="bg-wiki-tab-bg border-b border-wiki-border-soft">
    <div class="max-w-[1200px] mx-auto px-4 py-1.5 flex items-center gap-1 text-sm flex-wrap">
      <router-link to="/" class="px-2 py-0.5 hover:bg-[#eaecf0] rounded-sm">Kezdőlap</router-link>
      <span class="text-wiki-muted">·</span>
      <router-link to="/abc" class="px-2 py-0.5 hover:bg-[#eaecf0] rounded-sm">Szócikkek</router-link>
      <span class="text-wiki-muted">·</span>
      <router-link to="/kategoria" class="px-2 py-0.5 hover:bg-[#eaecf0] rounded-sm">Kategóriák</router-link>
      <span class="text-wiki-muted">·</span>
      <router-link to="/abc" class="px-2 py-0.5 hover:bg-[#eaecf0] rounded-sm">ABC sorrend</router-link>
      <span class="text-wiki-muted">·</span>
      <a href="#" @click.prevent="randomArticle" class="px-2 py-0.5 hover:bg-[#eaecf0] rounded-sm">Véletlen szócikk</a>
    </div>
  </nav>
</template>
