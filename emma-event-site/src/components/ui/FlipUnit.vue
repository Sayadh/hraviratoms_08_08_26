<script setup lang="ts">
import { ref, watch } from 'vue'
import { gsap } from '@/lib/gsap'

const props = defineProps<{ value: number; label: string }>()

const display = ref(props.value)
const cardRef = ref<HTMLElement | null>(null)

watch(
  () => props.value,
  (next) => {
    if (!cardRef.value) {
      display.value = next
      return
    }
    const tl = gsap.timeline()
    tl.to(cardRef.value, {
      rotateX: -90,
      duration: 0.28,
      ease: 'power1.in',
      onComplete: () => {
        display.value = next
      },
    }).to(cardRef.value, {
      rotateX: 0,
      duration: 0.32,
      ease: 'power2.out',
    })
  },
)

const padded = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <div class="flex flex-col items-center gap-2 sm:gap-3">
    <div style="perspective: 400px" class="h-16 w-16 sm:h-24 sm:w-24">
      <div
        ref="cardRef"
        class="glass shadow-glass flex h-full w-full items-center justify-center rounded-2xl"
        style="transform-style: preserve-3d"
      >
        <span class="font-display text-2xl font-semibold text-ink sm:text-4xl tabular-nums">{{ padded(display) }}</span>
      </div>
    </div>
    <span class="text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft sm:text-sm">{{ label }}</span>
  </div>
</template>
