import { onBeforeUnmount, onMounted } from 'vue'
import Lenis from 'lenis'
import { ScrollTrigger, ensureGsapRegistered } from '@/lib/gsap'

let lenisInstance: Lenis | null = null

/** Initializes Lenis smooth scrolling once and syncs it with GSAP ScrollTrigger. */
export function useLenis() {
  onMounted(() => {
    if (lenisInstance) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    ensureGsapRegistered()

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisInstance = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    ScrollTrigger.defaults({})
  })

  onBeforeUnmount(() => {
    // Keep singleton alive across route-less single page — no teardown needed.
  })
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -72 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
