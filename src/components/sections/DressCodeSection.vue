<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import IconSymbol from '@/components/ui/IconSymbol.vue'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef, { stagger: 0.08 })

const items = [
  { icon: 'shirt', label: 'Ամառային Ոչ Պաշտոնական' },
  { icon: 'pool', label: 'Հարմար Լողավազանի Համար' },
  { icon: 'shoe', label: 'Հարմարավետ Կոշիկներ' },
  { icon: 'swim', label: 'Բեր Լողազգեստ' },
  { icon: 'smile', label: 'Լավ Տրամադրություն Պարտադիր է 😊' },
]
</script>

<template>
  <section ref="sectionRef" class="relative bg-beige py-24 sm:py-28">
    <div class="mx-auto max-w-4xl px-6">
      <SectionHeading eyebrow="Ինչ հագնել" title="Հագուստի Կանոն" subtitle="Ցանկալի է լինել ամառային բաց երանգների գույներով:" />

      <div class="mt-12 flex flex-wrap justify-center gap-4 sm:gap-6">
        <div
          v-for="item in items"
          data-reveal
          :key="item.label"
          class="glass shadow-glass flex w-36 flex-col items-center gap-3 rounded-3xl px-4 py-7 text-center transition-transform duration-300 hover:-translate-y-1.5 sm:w-40"
        >
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-light/40 text-gold-dark">
            <IconSymbol :name="item.icon" class="h-6 w-6" />
          </div>
          <span class="text-sm font-semibold text-ink-soft">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
