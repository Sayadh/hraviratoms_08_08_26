<script setup lang="ts">
import { eventConfig } from '@/config'
</script>

<template>
  <footer class="bg-ink py-8 text-center text-cream/70">
    <p class="text-sm">
      {{ eventConfig.dateLabel }} &middot; {{ eventConfig.venueName }} &middot; Պատրաստված է 💛-ով {{ eventConfig.hostNames }} կողմից
    </p>
  </footer>
</template>
