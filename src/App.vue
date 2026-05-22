<script setup>
import { RouterView } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import TabNav from './components/TabNav.vue'
import MainNav from './components/MainNav.vue'
import SiteFooter from './components/SiteFooter.vue'
import PersonPopup from './components/PersonPopup.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <SiteHeader />
    <TabNav />
    <MainNav />
    <main class="max-w-[1200px] w-full mx-auto px-4 py-4 flex-1">
      <RouterView />
    </main>
    <SiteFooter />
    <PersonPopup />
  </div>
</template>
