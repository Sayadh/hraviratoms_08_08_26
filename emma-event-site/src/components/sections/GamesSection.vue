<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { games } from '@/data/games'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef, { stagger: 0.06 })
</script>

<template>
  <section id="games" ref="sectionRef" class="relative bg-cream py-28 sm:py-32">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="Երեկույթի ռեժիմ" title="Խաղեր և Զվարճանք Ամբողջ Օրը" subtitle="" />

      <div class="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        <div
          v-for="game in games"
          :key="game.name"
          data-reveal
          class="group relative overflow-hidden rounded-3xl bg-white/60 p-6 shadow-glass ring-1 ring-white/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-soft sm:p-8"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-gold-light/0 to-pink/0 opacity-0 transition-opacity duration-300 group-hover:from-gold-light/30 group-hover:to-pink/30 group-hover:opacity-100" />
          <span class="relative mb-4 block text-4xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 sm:text-5xl">{{ game.emoji }}</span>
          <h3 class="relative font-display text-lg font-semibold text-ink sm:text-xl">{{ game.name }}</h3>
          <p class="relative mt-1.5 text-sm text-ink-soft">{{ game.blurb }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
