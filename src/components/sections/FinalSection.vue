<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef, { y: 24, duration: 1.1 })
</script>

<template>
  <section ref="sectionRef" class="relative overflow-hidden bg-gradient-to-br from-sunset-dark via-sunset to-pink-dark py-28 text-cream sm:py-36">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_45%),radial-gradient(circle_at_75%_80%,rgba(255,255,255,0.15),transparent_45%)]" />
    <div class="relative mx-auto max-w-2xl px-6 text-center">
      <p data-reveal class="text-5xl">🎈🎂👶</p>
      <h2 data-reveal class="mt-6 font-display text-4xl font-medium leading-tight sm:text-5xl">
        Անհամբեր Սպասում Ենք Միասին Տոնելուն
      </h2>
      <p data-reveal class="mt-5 text-lg text-cream/90 sm:text-xl">
        Շնորհակալություն, որ մեր պատմության մասն ես կազմում՝ ծննդյան օրերի, անակնկալների
        և այն ամենի, ինչ դրանց միջև է։ Կտեսնվենք շուտով՝ ամառային արևի ներքո։
      </p>
    </div>
  </section>
</template>
