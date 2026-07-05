<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from '@/lib/gsap'
import { useCountdown } from '@/composables/useCountdown'
import { useMouseParallax } from '@/composables/useMouseParallax'
import { scrollToId } from '@/composables/useLenis'
import { eventConfig } from '@/config'
import FloatingDecor from '@/components/ui/FloatingDecor.vue'

const { parts } = useCountdown(eventConfig.dateISO)
const heroRef = ref<HTMLElement | null>(null)
useMouseParallax(heroRef)

onMounted(() => {
  gsap.fromTo(
    '.hero-reveal',
    { opacity: 0, y: 36 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.14, ease: 'power3.out', delay: 0.2 },
  )
})

const unit = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section id="home" ref="heroRef" class="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-cream via-cream to-beige">
    <!-- cinematic summer atmosphere -->
    <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(242,137,92,0.18),transparent_45%),radial-gradient(circle_at_80%_15%,rgba(143,203,232,0.25),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(243,184,203,0.25),transparent_45%)]" />
    <div class="absolute inset-0 opacity-60" style="background-image: radial-gradient(rgba(207,157,84,0.35) 1px, transparent 1px); background-size: 26px 26px; mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 40%, transparent 100%)" />
    <FloatingDecor variant="hero" />

    <div class="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 text-center">
      <p class="hero-reveal mb-6 inline-flex items-center gap-2 rounded-full bg-white/50 px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] text-gold-dark shadow-glass backdrop-blur">
        Ծննդյան Տոն <span class="text-pink-dark">•</span> Սեռի Բացահայտում
      </p>

      <h1 class="hero-reveal font-display text-5xl font-medium leading-[1.05] text-ink sm:text-6xl md:text-7xl">
        Մի Փոքրիկ Կյանք, <br class="hidden sm:block" />
        <span class="text-gradient-sunset">Երկու Մեծ Տոն</span>
      </h1>

      <p class="hero-reveal mt-6 font-display text-xl font-medium text-ink sm:text-2xl">
        {{ eventConfig.dateLabel }} &middot; {{ eventConfig.timeLabel }}
      </p>

      <!-- compact countdown teaser -->
      <div class="hero-reveal mt-10 flex items-center gap-3 sm:gap-5">
        <div v-for="u in [{ v: parts.days, l: 'Օր' }, { v: parts.hours, l: 'Ժամ' }, { v: parts.minutes, l: 'Ր.' }, { v: parts.seconds, l: 'Վրկ' }]" :key="u.l" class="glass shadow-glass flex w-16 flex-col items-center rounded-2xl py-3 sm:w-20">
          <span class="font-display text-2xl font-semibold tabular-nums text-ink sm:text-3xl">{{ unit(u.v) }}</span>
          <span class="mt-1 text-[10px] font-semibold uppercase tracking-widest text-ink-soft sm:text-xs">{{ u.l }}</span>
        </div>
      </div>

      <button
        class="btn-glow hero-reveal mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-sunset to-pink-dark px-8 py-4 text-base font-semibold text-cream shadow-soft transition-transform duration-300 hover:scale-105 active:scale-95"
        @click="scrollToId('rsvp')"
      >
        Միացե՛ք Մեր Հատուկ Օրվան
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </button>
    </div>

    <button
      class="hero-reveal absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-ink-soft transition-colors hover:text-ink"
      aria-label="Ոլորել դեպի «Մեր Մասին» բաժինը"
      @click="scrollToId('about')"
    >
      <span class="flex flex-col items-center gap-2">
        <span class="text-xs font-semibold uppercase tracking-[0.3em]">Ոլորել</span>
        <span class="flex h-9 w-6 items-start justify-center rounded-full border-2 border-current p-1">
          <span class="h-2 w-1 animate-bounce rounded-full bg-current" />
        </span>
      </span>
    </button>
  </section>
</template>
