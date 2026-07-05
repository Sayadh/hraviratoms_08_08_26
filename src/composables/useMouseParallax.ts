import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { gsap } from '@/lib/gsap'

/**
 * Moves every [data-parallax] child inside containerRef slightly, following
 * the pointer, with a depth factor read from data-parallax-depth (default 20).
 */
export function useMouseParallax(containerRef: Ref<HTMLElement | null>) {
  function handleMove(e: MouseEvent) {
    const el = containerRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width - 0.5
    const relY = (e.clientY - rect.top) / rect.height - 0.5

    el.querySelectorAll<HTMLElement>('[data-parallax]').forEach((node) => {
      const depth = Number(node.dataset.parallaxDepth ?? 20)
      gsap.to(node, {
        x: relX * depth,
        y: relY * depth,
        duration: 1,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })
  }

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    containerRef.value?.addEventListener('mousemove', handleMove)
  })
  onBeforeUnmount(() => {
    containerRef.value?.removeEventListener('mousemove', handleMove)
  })
}
