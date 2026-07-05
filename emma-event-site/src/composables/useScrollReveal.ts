import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { gsap, ScrollTrigger, ensureGsapRegistered } from '@/lib/gsap'

interface RevealOptions {
  y?: number
  stagger?: number
  duration?: number
  start?: string
  once?: boolean
}

/**
 * Applies a fade-up scroll reveal to every direct child matching [data-reveal]
 * inside the given container ref. Cleans itself up on unmount.
 */
export function useScrollReveal(containerRef: Ref<HTMLElement | null>, options: RevealOptions = {}) {
  const { y = 48, stagger = 0.12, duration = 0.9, start = 'top 82%', once = true } = options
  let triggers: ScrollTrigger[] = []

  onMounted(() => {
    ensureGsapRegistered()
    if (!containerRef.value) return
    const targets = containerRef.value.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y })
      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.value,
          start,
          once,
        },
      })
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger)
    }, containerRef.value)

    onBeforeUnmount(() => {
      ctx.revert()
      triggers.forEach((t) => t.kill())
      triggers = []
    })
  })
}
