<script setup lang="ts">
import { ref } from 'vue'
import { useCountdown } from '@/composables/useCountdown'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { eventConfig } from '@/config'
import FlipUnit from '@/components/ui/FlipUnit.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import FloatingDecor from '@/components/ui/FloatingDecor.vue'

const { parts } = useCountdown(eventConfig.dateISO)
const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)
</script>

<template>
  <section ref="sectionRef" class="relative overflow-hidden bg-gradient-to-br from-ink via-[#3a2e22] to-ink py-28 text-cream sm:py-32">
    <FloatingDecor variant="sunset" />
    <div class="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
      <SectionHeading
        eyebrow="Հիշիր այս պահը"
        title="Հաշվարկը Սկսված է"
        :subtitle="`Նշի՛ր օրացույցում՝ ${eventConfig.dateLabel}, ժամը ${eventConfig.timeLabel}, սպասումն ավարտվում է։`"
        light
      />

      <div data-reveal class="mt-14 flex items-center justify-center gap-1.5 sm:gap-8">
        <FlipUnit :value="parts.days" label="Օր" />
        <span class="font-display text-lg text-gold-light sm:text-4xl">:</span>
        <FlipUnit :value="parts.hours" label="Ժամ" />
        <span class="font-display text-lg text-gold-light sm:text-4xl">:</span>
        <FlipUnit :value="parts.minutes" label="Րոպե" />
        <span class="font-display text-lg text-gold-light sm:text-4xl">:</span>
        <FlipUnit :value="parts.seconds" label="Վրկ" />
      </div>
    </div>
  </section>
</template>
