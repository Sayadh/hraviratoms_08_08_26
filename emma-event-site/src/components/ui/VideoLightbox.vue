<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps<{ src: string | null; alt?: string }>()
const emit = defineEmits<{ close: [] }>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

watch(
  () => props.src,
  (src) => {
    document.body.style.overflow = src ? 'hidden' : ''
  },
)

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="src"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-8"
        @click.self="emit('close')"
      >
        <Transition
          appear
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
        >
          <div class="relative w-full max-w-4xl" :key="src">
            <video
              :src="src"
              controls
              autoplay
              playsinline
              class="max-h-[80vh] w-full rounded-2xl bg-black shadow-soft"
              :aria-label="alt"
            >
              {{ alt }}
            </video>
          </div>
        </Transition>

        <button
          class="glass absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-cream shadow-glass transition-transform hover:scale-105 sm:right-8 sm:top-8"
          aria-label="Փակել տեսանյութը"
          @click="emit('close')"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
