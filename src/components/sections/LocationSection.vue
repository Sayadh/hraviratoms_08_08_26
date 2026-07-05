<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { eventConfig } from '@/config'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import IconSymbol from '@/components/ui/IconSymbol.vue'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const info = [
  { icon: 'pin', title: 'Ժամանում', text: 'Խնդրում ենք ժամանել 10:30–11:00-ի միջև, որպեսզի բոլորս միասին սկսենք։' },
  { icon: 'swim', title: 'Չմոռանաս', text: 'Բեր քո լողազգեստը, լողավազանի բաց է ամբողջ օրը։' },
]

// Try opening the Yandex Navigator app directly; if it's not installed, the page
// stays visible after a short delay, so we fall back to the Yandex Maps website.
function openDirections() {
  const openedAt = Date.now()
  window.location.href = eventConfig.yandexNavigatorAppUrl

  setTimeout(() => {
    if (document.visibilityState === 'visible' && Date.now() - openedAt < 2000) {
      window.location.href = eventConfig.yandexMapsWebUrl
    }
  }, 1200)
}
</script>

<template>
  <section id="location" ref="sectionRef" class="relative bg-cream py-28 sm:py-32">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="Գտի՛ր մեզ" :title="eventConfig.venueName" :subtitle="eventConfig.addressLine" />

      <div data-reveal class="mt-14 grid gap-6 lg:grid-cols-5">
        <div class="overflow-hidden rounded-3xl shadow-soft lg:col-span-3">
          <iframe
            :src="eventConfig.mapsEmbedSrc"
            class="h-80 w-full sm:h-full sm:min-h-[24rem]"
            style="border: 0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Երեկույթի վայրի քարտեզ"
          />
        </div>

        <div class="flex flex-col gap-4 lg:col-span-2">
          <div v-for="item in info" :key="item.title" class="glass shadow-glass flex gap-4 rounded-3xl p-5">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gold-light/40 text-gold-dark">
              <IconSymbol :name="item.icon" class="h-5 w-5" />
            </div>
            <div>
              <h3 class="font-display text-lg font-semibold text-ink">{{ item.title }}</h3>
              <p class="mt-1 text-sm leading-relaxed text-ink-soft">{{ item.text }}</p>
            </div>
          </div>

          <button
            type="button"
            @click="openDirections"
            class="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dark to-sunset px-6 py-4 text-sm font-semibold text-cream shadow-glass transition-transform hover:scale-[1.02]"
          >
            Ցույց Տալ Ուղղությունը
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
