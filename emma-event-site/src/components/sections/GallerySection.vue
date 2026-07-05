<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import { useScrollReveal } from '@/composables/useScrollReveal'
import { gallery } from '@/data/gallery'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import VideoLightbox from '@/components/ui/VideoLightbox.vue'

const sectionRef = ref<HTMLElement | null>(null)
const galleryRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef, { stagger: 0.04, y: 30 })

const activeVideo = ref<{ src: string; alt: string } | null>(null)

function openVideo(src: string, alt: string) {
  activeVideo.value = { src, alt }
}

let lightbox: PhotoSwipeLightbox | undefined

onMounted(() => {
  // Only <a class="gallery-photo"> elements are handled by PhotoSwipe —
  // video cards are plain buttons that open the custom VideoLightbox instead.
  lightbox = new PhotoSwipeLightbox({
    gallery: galleryRef.value ?? undefined,
    children: 'a.gallery-photo',
    pswpModule: () => import('photoswipe'),
    bgOpacity: 0.92,
    showHideAnimationType: 'zoom',
  })
  lightbox.init()
})

onBeforeUnmount(() => {
  lightbox?.destroy()
})
</script>

<template>
  <section id="gallery" ref="sectionRef" class="relative bg-beige py-28 sm:py-32">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="Հիշողություններ ստեղծելու պահին" title="Պատկերասրահ" subtitle="Մի փոքրիկ նախադիտում այն պահերի, որոնք անհամբեր սպասում ենք ստեղծել միասին։ Հպվեք ցանկացած նկարին՝ մեծացնելու համար, կամ սեղմեք տեսանյութը՝ նայելու համար։" />

      <div ref="galleryRef" class="mt-14 columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4 [&>*]:mb-4 sm:[&>*]:mb-5">
        <template v-for="item in gallery" :key="item.id">
          <a
            v-if="item.type === 'image'"
            data-reveal
            :href="item.src"
            :data-pswp-width="item.width"
            :data-pswp-height="item.height"
            class="gallery-photo group relative mb-4 block break-inside-avoid overflow-hidden rounded-2xl shadow-glass sm:mb-5"
          >
            <img
              :src="item.thumb"
              :alt="item.alt"
              loading="lazy"
              decoding="async"
              class="w-full scale-100 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span class="absolute inset-0 flex items-end bg-gradient-to-t from-ink/40 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span class="text-sm font-medium text-cream">{{ item.alt }}</span>
            </span>
          </a>

          <button
            v-else
            data-reveal
            type="button"
            class="gallery-video group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl shadow-glass sm:mb-5"
            @click="openVideo(item.src, item.alt)"
          >
            <img
              :src="item.thumb"
              :alt="item.alt"
              loading="lazy"
              decoding="async"
              class="w-full scale-100 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span class="absolute inset-0 bg-ink/15 transition-colors duration-300 group-hover:bg-ink/25" />
            <span class="absolute inset-0 flex items-center justify-center">
              <span class="glass shadow-glass flex h-14 w-14 items-center justify-center rounded-full text-cream transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </span>
            <span class="absolute inset-0 flex items-end bg-gradient-to-t from-ink/50 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span class="text-sm font-medium text-cream">{{ item.alt }}</span>
            </span>
          </button>
        </template>
      </div>
    </div>

    <VideoLightbox
      :src="activeVideo?.src ?? null"
      :alt="activeVideo?.alt"
      @close="activeVideo = null"
    />
  </section>
</template>
