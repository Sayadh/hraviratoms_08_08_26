<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { scrollToId } from '@/composables/useLenis'

const links = [
  { id: 'home', label: 'Գլխավոր' },
  { id: 'about', label: 'Մեր Մասին' },
  { id: 'schedule', label: 'Ծրագիր' },
  { id: 'gallery', label: 'Պատկերասրահ' },
  { id: 'games', label: 'Խաղեր' },
  { id: 'location', label: 'Վայրը' },
  { id: 'rsvp', label: 'Հաստատել' },
]

const scrolled = ref(false)
const menuOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

function go(id: string) {
  menuOpen.value = false
  scrollToId(id)
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="scrolled ? 'py-3' : 'py-6'"
  >
    <div
      class="mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-500 sm:px-6"
      :class="scrolled ? 'glass shadow-glass py-2' : 'bg-transparent py-1'"
      style="margin-inline: 1rem"
    >
      <button class="font-display text-lg font-semibold tracking-tight text-ink" @click="go('home')">
        🎉 Մեր Ուրախ Օրը
      </button>

      <nav class="hidden items-center gap-1 md:flex">
        <button
          v-for="link in links"
          :key="link.id"
          class="rounded-full px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-white/50 hover:text-ink"
          @click="go(link.id)"
        >
          {{ link.label }}
        </button>
      </nav>

      <button
        class="hidden rounded-full bg-gradient-to-r from-gold-dark to-sunset px-5 py-2.5 text-sm font-semibold text-cream shadow-glass transition-transform hover:scale-105 md:inline-block"
        @click="go('rsvp')"
      >
        Հաստատել
      </button>

      <button
        class="flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden"
        aria-label="Բացել/փակել ընտրացանկը"
        @click="menuOpen = !menuOpen"
      >
        <svg v-if="!menuOpen" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        <svg v-else viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav v-if="menuOpen" class="glass mx-4 mt-3 flex flex-col gap-1 rounded-3xl p-3 shadow-glass md:hidden">
        <button
          v-for="link in links"
          :key="link.id"
          class="rounded-2xl px-4 py-3 text-left text-base font-medium text-ink-soft transition-colors hover:bg-white/50 hover:text-ink"
          @click="go(link.id)"
        >
          {{ link.label }}
        </button>
      </nav>
    </Transition>
  </header>
</template>
