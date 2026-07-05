<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { useGenderVotes } from '@/composables/useGenderVotes'
import { gsap } from '@/lib/gsap'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

const { state, boyPercent, girlPercent, total, vote } = useGenderVotes()

function onVote(choice: 'boy' | 'girl', e: MouseEvent) {
  vote(choice)
  const target = e.currentTarget as HTMLElement
  gsap.fromTo(target, { scale: 0.96 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
}
</script>

<template>
  <section ref="sectionRef" class="relative bg-cream py-28 sm:py-32">
    <div class="mx-auto max-w-5xl px-6">
      <SectionHeading
        eyebrow="Կռահի՛ր"
        title="Տղա՞, թե Աղջիկ։ Դու Ես Որոշում։"
        subtitle=""
      />

      <div data-reveal class="mt-14 overflow-hidden rounded-[2rem] shadow-soft">
        <div class="grid grid-cols-1 sm:grid-cols-2">
          <button
            class="group relative flex flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-br from-sky/40 to-sky-dark/50 px-6 py-16 transition-all duration-300 sm:py-24"
            :class="state.myVote === 'boy' ? 'ring-4 ring-inset ring-sky-dark' : ''"
            @click="onVote('boy', $event)"
          >
            <span class="absolute inset-0 origin-bottom scale-y-0 bg-sky-dark/15 transition-transform duration-500 group-hover:scale-y-100" />
            <span class="relative text-6xl transition-transform duration-300 group-hover:scale-110 sm:text-7xl">💙</span>
            <span class="relative font-display text-2xl font-semibold text-ink sm:text-3xl">Թիմ Տղա</span>
            <span class="relative font-display text-5xl font-bold tabular-nums text-sky-dark sm:text-6xl">{{ 50 }}%</span>
            <span v-if="state.myVote === 'boy'" class="relative rounded-full bg-white/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-sky-dark">Քո Ընտրությունը ✓</span>
          </button>

          <button
            class="group relative flex flex-col items-center justify-center gap-4 overflow-hidden bg-gradient-to-bl from-pink/40 to-pink-dark/50 px-6 py-16 transition-all duration-300 sm:py-24"
            :class="state.myVote === 'girl' ? 'ring-4 ring-inset ring-pink-dark' : ''"
            @click="onVote('girl', $event)"
          >
            <span class="absolute inset-0 origin-bottom scale-y-0 bg-pink-dark/15 transition-transform duration-500 group-hover:scale-y-100" />
            <span class="relative text-6xl transition-transform duration-300 group-hover:scale-110 sm:text-7xl">🩷</span>
            <span class="relative font-display text-2xl font-semibold text-ink sm:text-3xl">Թիմ Աղջիկ</span>
            <span class="relative font-display text-5xl font-bold tabular-nums text-pink-dark sm:text-6xl">{{ 50 }}%</span>
            <span v-if="state.myVote === 'girl'" class="relative rounded-full bg-white/70 px-4 py-1 text-xs font-bold uppercase tracking-widest text-pink-dark">Քո Ընտրությունը ✓</span>
          </button>
        </div>

        <div class="flex h-3 w-full">
          <div class="bg-sky-dark transition-all duration-700 ease-out" :style="{ width: 50 + '%' }" />
          <div class="bg-pink-dark transition-all duration-700 ease-out" :style="{ width: 50 + '%' }" />
        </div>
      </div>
    </div>
  </section>
</template>
