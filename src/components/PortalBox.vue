<script setup>
import { categories } from '@/data/categories.js'
</script>

<template>
  <div class="wiki-box" style="border-color: var(--color-wiki-panel-blue-border); background: var(--color-wiki-panel-blue-bg);">
    <div class="font-[Georgia,'Times_New_Roman',serif] text-base mb-2 font-normal">Portál</div>
    <div class="grid grid-cols-2 gap-1">
      <router-link
        v-for="cat in categories"
        :key="cat.slug"
        :to="{ name: 'category', params: { slug: cat.slug } }"
        class="text-sm px-1 py-0.5"
      >
        {{ cat.name }}
      </router-link>
    </div>
  </div>
</template>
