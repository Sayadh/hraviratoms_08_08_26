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
        'mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em]',
        light ? 'text-gold-light' : 'text-gold-dark',
      ]"
    >
      <span class="h-px w-6" :class="light ? 'bg-gold-light' : 'bg-gold-dark'" />
      {{ eyebrow }}
      <span v-if="align === 'center'" class="h-px w-6" :class="light ? 'bg-gold-light' : 'bg-gold-dark'" />
    </p>
    <h2
      data-reveal
      :class="[
        'text-4xl sm:text-5xl font-medium leading-[1.1]',
        light ? 'text-cream' : 'text-ink',
      ]"
    >
      {{ title }}
    </h2>
    <p v-if="subtitle" data-reveal :class="['mt-5 text-lg leading-relaxed', light ? 'text-cream/80' : 'text-ink-soft']">
      {{ subtitle }}
    </p>
  </div>
</template>
