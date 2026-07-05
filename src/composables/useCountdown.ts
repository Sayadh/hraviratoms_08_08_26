import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

/** Reactive countdown to a target date, updated once per second. */
export function useCountdown(targetISO: string) {
  const target = new Date(targetISO).getTime()
  const now = ref(Date.now())
  let interval: ReturnType<typeof setInterval> | undefined

  onMounted(() => {
    interval = setInterval(() => {
      now.value = Date.now()
    }, 1000)
  })
  onBeforeUnmount(() => interval && clearInterval(interval))

  const parts = computed<CountdownParts>(() => {
    const diff = Math.max(0, target - now.value)
    const totalSeconds = Math.floor(diff / 1000)
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
      isPast: target - now.value <= 0,
    }
  })

  return { parts }
}
