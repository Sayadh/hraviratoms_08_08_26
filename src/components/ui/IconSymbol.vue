<script setup lang="ts">
defineProps<{ name: string }>()
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="name === 'door'">
      <path d="M6 21V4.5C6 3.7 6.7 3 7.5 3h6c.8 0 1.5.7 1.5 1.5V21" />
      <path d="M4 21h16" />
      <path d="M14 12.5v.01" />
    </template>
    <template v-else-if="name === 'chat'">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7A2.5 2.5 0 0 1 17.5 15H10l-4.5 4V15H6.5A2.5 2.5 0 0 1 4 12.5v-7Z" />
    </template>
    <template v-else-if="name === 'food'">
      <path d="M7 3v7a2 2 0 1 0 4 0V3" />
      <path d="M9 10v11" />
      <path d="M16 3c-1.5 1.5-2 3-2 5.5 0 1.7 1 2.8 2 3.2V21" />
    </template>
    <template v-else-if="name === 'camera'">
      <path d="M4 8.5A1.5 1.5 0 0 1 5.5 7H8l1-2h6l1 2h2.5A1.5 1.5 0 0 1 20 8.5V18a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18V8.5Z" />
      <circle cx="12" cy="13" r="3.2" />
    </template>
    <template v-else-if="name === 'confetti'">
      <path d="M4 20 14 4" />
      <circle cx="18" cy="6" r="1.4" />
      <circle cx="9" cy="15" r="1.2" />
      <path d="M13 9l2 2M6 18l2 2M17 12l2.5.8" />
    </template>
    <template v-else-if="name === 'cake'">
      <path d="M4 21v-6.5A1.5 1.5 0 0 1 5.5 13h13a1.5 1.5 0 0 1 1.5 1.5V21" />
      <path d="M4 21h16" />
      <path d="M8 13V9.5c0-.8.7-1.5 1.5-1.5H10c.5 0 1-.3 1-1s.5-1 1-1 1 .3 1 1 .5 1 1 1h.5c.8 0 1.5.7 1.5 1.5V13" />
      <path d="M12 4.2V6" />
    </template>
    <template v-else-if="name === 'sun'">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6 19 19M19 5l-1.4 1.4M6.4 17.6 5 19" />
    </template>
    <template v-else-if="name === 'dinner'">
      <path d="M5 3v9a3 3 0 0 0 3 3v6M5 3v6M8 3v6M11 3v6" />
      <path d="M18 3c-1.4 1.4-2 3-2 6s.6 4.6 2 6v6" />
    </template>
    <template v-else-if="name === 'party'">
      <path d="M4 21 15 6l3 3L6 20Z" />
      <path d="M13.5 8.5 15 3l4 3.5-4.5 2Z" />
      <circle cx="18.5" cy="5.5" r="0.6" fill="currentColor" />
    </template>
    <template v-else-if="name === 'fire'">
      <path d="M12 22c4 0 6-2.7 6-6.2 0-3-2-4.8-2.6-7.3-.4 1.6-1.4 2.6-2 2-1-1-1.2-3.7-1.4-5.5-3 2-5 6-5 9.3C7 19 8.3 22 12 22Z" />
    </template>
    <template v-else-if="name === 'bag'">
      <path d="M6 8h12l-1 12.5a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 7 20.5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </template>
    <template v-else-if="name === 'star'">
      <path d="m12 3 2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1L6.6 19.3l1.3-6-4.6-4.1 6.1-.6Z" />
    </template>
    <template v-else-if="name === 'shirt'">
      <path d="M8 4 4 7l2 3 2-1.3V21h8V8.7L18 10l2-3-4-3-1.5 1.5a3 3 0 0 1-5 0Z" />
    </template>
    <template v-else-if="name === 'pool'">
      <path d="M3 18c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0" />
      <path d="M6 13v-3a6 6 0 0 1 12 0v3" />
    </template>
    <template v-else-if="name === 'shoe'">
      <path d="M3 17.5V13l4-1.5 2.5 2 4-1.5 3 2.5H21v2.5a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 17.5Z" />
    </template>
    <template v-else-if="name === 'swim'">
      <path d="M4 9h16l-2 6H6Z" />
      <path d="M9 9V6.5A2.5 2.5 0 0 1 11.5 4h1A2.5 2.5 0 0 1 15 6.5V9" />
    </template>
    <template v-else-if="name === 'smile'">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 10.5v.01M15.5 10.5v.01" />
      <path d="M8 14.5c1 1.3 2.4 2 4 2s3-.7 4-2" />
    </template>
    <template v-else-if="name === 'pin'">
      <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </template>
    <template v-else-if="name === 'car'">
      <path d="M4 16.5V13l1.5-4.5A2 2 0 0 1 7.4 7h9.2a2 2 0 0 1 1.9 1.5L20 13v3.5" />
      <path d="M4 16.5h16M6.5 16.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM17.5 16.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </template>
    <template v-else-if="name === 'nav'">
      <path d="m12 2 8 20-8-5-8 5Z" />
    </template>
  </svg>
</template>
