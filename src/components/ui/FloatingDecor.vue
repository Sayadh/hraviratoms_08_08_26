<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'hero' | 'warm' | 'cool' | 'sunset' }>(), { variant: 'warm' })
</script>

<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <template v-if="variant === 'hero'">
      <div data-parallax data-parallax-depth="35" class="animate-float absolute left-[8%] top-[18%] h-24 w-24 rounded-full bg-gold-light/30 blur-2xl" />
      <div data-parallax data-parallax-depth="55" class="animate-float-slow absolute right-[12%] top-[28%] h-32 w-32 rounded-full bg-sky/30 blur-2xl" />
      <div data-parallax data-parallax-depth="25" class="animate-float absolute left-[20%] bottom-[15%] h-20 w-20 rounded-full bg-pink/30 blur-xl" />
      <div data-parallax data-parallax-depth="45" class="animate-float-slow absolute right-[22%] bottom-[22%] h-16 w-16 rounded-full bg-sunset/30 blur-xl" />
      <span data-parallax data-parallax-depth="60" class="animate-float absolute left-[15%] top-[60%] text-4xl opacity-70">🎈</span>
      <span data-parallax data-parallax-depth="40" class="animate-float-slow absolute right-[16%] top-[15%] text-4xl opacity-70">🎉</span>
      <span data-parallax data-parallax-depth="50" class="animate-float absolute right-[8%] bottom-[35%] text-3xl opacity-70">✨</span>
    </template>
    <template v-else-if="variant === 'warm'">
      <div class="animate-float-slow absolute -left-10 top-10 h-40 w-40 rounded-full bg-gold-light/20 blur-3xl" />
      <div class="animate-float absolute -right-16 bottom-0 h-56 w-56 rounded-full bg-beige-dark/30 blur-3xl" />
    </template>
    <template v-else-if="variant === 'cool'">
      <div class="animate-float absolute -left-14 bottom-10 h-48 w-48 rounded-full bg-sky/20 blur-3xl" />
      <div class="animate-float-slow absolute right-0 top-0 h-40 w-40 rounded-full bg-pink/20 blur-3xl" />
    </template>
    <template v-else-if="variant === 'sunset'">
      <div class="animate-float-slow absolute left-1/4 top-0 h-56 w-56 rounded-full bg-sunset/25 blur-3xl" />
      <div class="animate-float absolute right-1/4 bottom-0 h-56 w-56 rounded-full bg-pink-dark/20 blur-3xl" />
    </template>
  </div>
</template>
