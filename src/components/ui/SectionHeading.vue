<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    subtitle?: string
    align?: 'center' | 'left'
    light?: boolean
  }>(),
  { align: 'center', light: false },
)
</script>

<template>
  <div :class="['max-w-2xl', align === 'center' ? 'mx-auto text-center' : 'text-left']">
    <p
      v-if="eyebrow"
      data-reveal
      :class="[
        'shadow-glass mb-5 inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.3em] backdrop-blur',
        light ? 'bg-cream/10 text-gold-light' : 'bg-white/50 text-gold-dark',
      ]"
    >
      <span class="h-1.5 w-1.5 rounded-full" :class="light ? 'bg-gold-light' : 'bg-gold-dark'" />
      {{ eyebrow }}
    </p>

    <h2
      data-reveal
      :class="[
        'text-4xl font-medium leading-[1.12] tracking-tight sm:text-5xl',
        light ? 'text-cream' : 'text-ink',
      ]"
    >
      {{ title }}
    </h2>

    <div
      data-reveal
      class="mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-gold-dark via-sunset to-pink-dark"
      :class="align === 'center' ? 'mx-auto' : ''"
    />

    <p v-if="subtitle" data-reveal :class="['mt-6 text-lg leading-relaxed', light ? 'text-cream/80' : 'text-ink-soft']">
      {{ subtitle }}
    </p>
  </div>
</template>
