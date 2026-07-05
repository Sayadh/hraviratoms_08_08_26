<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import FloatingDecor from '@/components/ui/FloatingDecor.vue'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const pillars = [
  { label: 'Ծննդյան Տոն', accent: 'gold' },
  { label: 'Սեռի Բացահայտում', accent: 'pink' },
  { label: 'Ընտանիք', accent: 'sunset' },
  { label: 'Ընկերներ', accent: 'sky' },
  { label: 'Ամառ', accent: 'gold' },
  { label: 'Լողավազանի Երեկույթ', accent: 'sky' },
]

const accentDot: Record<string, string> = {
  gold: 'bg-gold-dark',
  sky: 'bg-sky-dark',
  pink: 'bg-pink-dark',
  sunset: 'bg-sunset-dark',
}

const accentGlow: Record<string, string> = {
  gold: 'hover:shadow-[0_18px_40px_-16px_rgb(179,120,26,0.45)]',
  sky: 'hover:shadow-[0_18px_40px_-16px_rgb(31,142,196,0.45)]',
  pink: 'hover:shadow-[0_18px_40px_-16px_rgb(221,77,144,0.45)]',
  sunset: 'hover:shadow-[0_18px_40px_-16px_rgb(232,67,28,0.45)]',
}
</script>

<template>
  <section id="about" ref="sectionRef" class="relative overflow-hidden bg-cream py-28 sm:py-36">
    <FloatingDecor variant="warm" />
    <div class="relative mx-auto max-w-4xl px-6">
      <SectionHeading
        eyebrow="Ինչու ենք հավաքվում"
        title="Մեկ Անմոռանալի Օր, Երկու Տոնի Առիթ"
        subtitle="Սիրով հրավիրում ենք տոնելու Սայոյի ծնունդն ու վերջապես բացահայտելու երեխայի սեռը:"
      />

      <div data-reveal class="mt-14 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        <span
          v-for="p in pillars"
          :key="p.label"
          class="glass shadow-glass inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:-translate-y-1 sm:text-base"
          :class="accentGlow[p.accent]"
        >
          <span class="h-2 w-2 rounded-full" :class="accentDot[p.accent]" />
          {{ p.label }}
        </span>
      </div>

      <p data-reveal class="mx-auto mt-14 max-w-2xl text-center font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">
        «Համեղ կերակուր, հրաշալի ընկերակցություն, տաք արև ու մեկ շատ մեծ գաղտնիք․
        սա է կատարյալ բաղադրատոմսը մի օրվա համար, որը մշտապես կհիշենք»։
      </p>
    </div>
  </section>
</template>
