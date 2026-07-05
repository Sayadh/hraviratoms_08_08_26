<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap, ensureGsapRegistered } from '@/lib/gsap'
import { schedule } from '@/data/schedule'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import IconSymbol from '@/components/ui/IconSymbol.vue'

const accentClasses: Record<string, string> = {
  gold: 'bg-gold text-cream',
  sky: 'bg-sky-dark text-cream',
  pink: 'bg-pink-dark text-cream',
  sunset: 'bg-sunset text-cream',
}

const containerRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | undefined

onMounted(() => {
  ensureGsapRegistered()
  if (!containerRef.value) return

  ctx = gsap.context(() => {
    const items = gsap.utils.toArray<HTMLElement>('.timeline-item')
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 40, x: i % 2 === 0 ? -16 : 16 },
        {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%' },
        },
      )
    })

    if (lineRef.value) {
      gsap.fromTo(
        lineRef.value,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top',
          scrollTrigger: {
            trigger: containerRef.value,
            start: 'top 70%',
            end: 'bottom 60%',
            scrub: 0.6,
          },
        },
      )
    }
  }, containerRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="schedule" class="relative bg-beige py-28 sm:py-32">
    <div class="mx-auto max-w-3xl px-6">
      <SectionHeading eyebrow="Ամբողջ օրվա ծրագիրը" title="Օրվա Ծրագիրը" subtitle="Առաջին գրկախառնումից մինչև վերջին հրաժեշտը՝ ահա թե ինչպես կանցնի օրը։" />

      <div ref="containerRef" class="relative mt-16">
        <div class="absolute left-5 top-0 h-full w-px bg-gold-dark/20 sm:left-1/2 sm:-translate-x-1/2">
          <div ref="lineRef" class="h-full w-full origin-top bg-gradient-to-b from-gold-dark via-sunset to-pink-dark" />
        </div>

        <div class="flex flex-col gap-10 sm:gap-14">
          <div
            v-for="(item, i) in schedule"
            :key="item.title"
            class="timeline-item relative flex gap-5 sm:gap-0"
            :class="i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'"
          >
            <div class="flex-1 sm:px-10">
              <div
                class="glass shadow-glass rounded-3xl p-6"
                :class="i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'"
              >
                <p class="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">{{ item.time }}</p>
                <h3 class="font-display text-xl font-semibold text-ink">{{ item.title }}</h3>
                <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ item.description }}</p>
              </div>
            </div>

            <div class="relative z-10 order-first flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-glass ring-4 ring-beige sm:order-none sm:absolute sm:left-1/2 sm:-translate-x-1/2" :class="accentClasses[item.accent]">
              <IconSymbol :name="item.icon" class="h-5 w-5" />
            </div>

            <div class="hidden flex-1 sm:block" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
