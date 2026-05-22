<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <nav class="border-b border-wiki-border-soft bg-white">
    <div class="max-w-[1200px] mx-auto px-4 flex items-center justify-between text-xs">
      <!-- Left tabs -->
      <div class="flex">
        <router-link
          to="/"
          class="px-3 py-2 border-b-2 no-underline hover:no-underline"
          :class="isHome ? 'border-wiki-link text-wiki-link' : 'border-transparent text-wiki-muted hover:text-wiki-text'"
        >
          Kezdőlap
        </router-link>
        <span class="px-3 py-2 text-wiki-muted cursor-default border-b-2 border-transparent">Vitalap</span>
      </div>
      <!-- Right tabs -->
      <div class="hidden sm:flex">
        <span class="px-3 py-2 text-wiki-link border-b-2 border-wiki-link cursor-default">Olvasás</span>
        <span class="px-3 py-2 text-wiki-muted cursor-default border-b-2 border-transparent">Lapforrás</span>
        <span class="px-3 py-2 text-wiki-muted cursor-default border-b-2 border-transparent">Laptörténet</span>
        <span class="px-3 py-2 text-wiki-muted cursor-default border-b-2 border-transparent">Eszközök</span>
      </div>
    </div>
  </nav>
</template>
