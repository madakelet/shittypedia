<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { persons } from '@/data/persons.js'

const visible = ref(false)
const person = ref(null)
const popupStyle = ref({})
const isMobile = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 768
}

function handleClick(e) {
  const el = e.target.closest('.person-link')
  if (!el) {
    if (visible.value) {
      visible.value = false
    }
    return
  }

  e.preventDefault()
  const key = el.dataset.person
  if (!key || !persons[key]) return

  person.value = persons[key]
  visible.value = true

  if (!isMobile.value) {
    const rect = el.getBoundingClientRect()
    const top = rect.bottom + window.scrollY + 8
    let left = rect.left + window.scrollX

    if (left + 350 > window.innerWidth) {
      left = window.innerWidth - 370
    }
    if (left < 10) left = 10

    popupStyle.value = {
      top: `${top}px`,
      left: `${left}px`,
    }
  }
}

function close() {
  visible.value = false
}

onMounted(() => {
  checkMobile()
  document.addEventListener('click', handleClick)
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClick)
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <!-- Desktop tooltip -->
  <Teleport to="body">
    <div
      v-if="visible && person && !isMobile"
      class="person-popup"
      :style="popupStyle"
      @click.stop
    >
      <div class="person-popup-title">{{ person.name }}</div>
      <div v-if="person.subtitle" class="person-popup-subtitle">{{ person.subtitle }}</div>
      <p class="m-0">{{ person.description }}</p>
    </div>

    <!-- Mobile modal -->
    <div
      v-if="visible && person && isMobile"
      class="fixed inset-0 z-[999] bg-black/30"
      @click="close"
    >
      <div class="person-popup" @click.stop>
        <div class="flex justify-between items-start mb-2">
          <div class="person-popup-title">{{ person.name }}</div>
          <button @click="close" class="text-wiki-muted text-lg leading-none cursor-pointer">&times;</button>
        </div>
        <div v-if="person.subtitle" class="person-popup-subtitle">{{ person.subtitle }}</div>
        <p class="m-0">{{ person.description }}</p>
      </div>
    </div>
  </Teleport>
</template>
