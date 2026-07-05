<script setup lang="ts">
import { reactive, ref } from 'vue'
import confetti from 'canvas-confetti'
import { useScrollReveal } from '@/composables/useScrollReveal'
import SectionHeading from '@/components/ui/SectionHeading.vue'

const sectionRef = ref<HTMLElement | null>(null)
useScrollReveal(sectionRef)

interface RsvpForm {
  fullName: string
  guests: number
  phone: string
  attending: 'yes' | 'no' | 'maybe' | ''
  comments: string
}

const form = reactive<RsvpForm>({
  fullName: '',
  guests: 1,
  phone: '',
  attending: '',
  comments: '',
})

const errors = reactive<Partial<Record<keyof RsvpForm, string>>>({})
const submitted = ref(false)
const submitting = ref(false)

function validate(): boolean {
  errors.fullName = form.fullName.trim().length < 2 ? 'Խնդրում ենք մուտքագրել ձեր անուն ազգանունը։' : ''
  errors.phone = form.phone.trim().length < 6 ? 'Խնդրում ենք մուտքագրել վավեր հեռախոսահամար։' : ''
  errors.attending = form.attending === '' ? 'Տեղեկացրու՝ կարո՞ղ ես գալ։' : ''
  return !errors.fullName && !errors.phone && !errors.attending
}

async function submit() {
  if (!validate()) return
  submitting.value = true

  // Keep a local copy regardless of network status.
  try {
    const key = 'rsvp-submissions'
    const existing = JSON.parse(window.localStorage.getItem(key) ?? '[]')
    existing.push({ ...form, submittedAt: new Date().toISOString() })
    window.localStorage.setItem(key, JSON.stringify(existing))
  } catch {
    // storage unavailable — non-blocking
  }

  // Notify the hosts on Telegram via the serverless function in /api/rsvp.
  // Best-effort: guests still see a confirmed RSVP even if this call fails.
  try {
    await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
  } catch (err) {
    console.warn('Could not notify Telegram:', err)
  }

  submitting.value = false
  submitted.value = true
  confetti({
    particleCount: 90,
    spread: 75,
    origin: { y: 0.6 },
    colors: ['#dba748', '#ff7a45', '#f596bf', '#5fc2e8'],
  })
}
</script>

<template>
  <section id="rsvp" ref="sectionRef" class="relative overflow-hidden bg-gradient-to-b from-beige to-cream py-28 sm:py-32">
    <div class="mx-auto max-w-xl px-6">
      <SectionHeading eyebrow="Գրեթե պատրաստ ենք" title="Հաստատել Մասնակցությունը" subtitle="Տեղեկացրու մեզ, որ գալիս ես․ հաշվում ենք օրերը (և հյուրերին)։" />

      <div data-reveal class="glass shadow-soft mt-12 rounded-[2rem] p-6 sm:p-10">
        <Transition
          enter-active-class="transition duration-500 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          mode="out-in"
        >
          <div v-if="submitted" key="thanks" class="flex flex-col items-center py-10 text-center">
            <span class="text-6xl">🎉</span>
            <h3 class="mt-4 font-display text-2xl font-semibold text-ink">Դու Մասնակիցների Ցանկում Ես!</h3>
            <p class="mt-2 text-ink-soft">Շնորհակալություն, {{ form.fullName.split(' ')[0] }}։ Անհամբեր սպասում ենք քեզ հետ տոնելու։</p>
          </div>

          <form v-else key="form" class="flex flex-col gap-5" @submit.prevent="submit">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-ink">Անուն Ազգանուն</label>
              <input
                v-model="form.fullName"
                type="text"
                placeholder="Անի Հակոբյան"
                class="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-ink placeholder:text-ink-soft/50 outline-none transition focus:border-gold-dark"
              />
              <p v-if="errors.fullName" class="mt-1 text-xs font-medium text-sunset-dark">{{ errors.fullName }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="mb-1.5 block text-sm font-semibold text-ink">Հյուրերի Քանակ</label>
                <input
                  v-model.number="form.guests"
                  type="number"
                  min="1"
                  max="10"
                  class="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-ink outline-none transition focus:border-gold-dark"
                />
              </div>
              <div>
                <label class="mb-1.5 block text-sm font-semibold text-ink">Հեռախոսահամար</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="+374 XX XXX XXX"
                  class="w-full rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-ink placeholder:text-ink-soft/50 outline-none transition focus:border-gold-dark"
                />
              </div>
            </div>
            <p v-if="errors.phone" class="-mt-3 text-xs font-medium text-sunset-dark">{{ errors.phone }}</p>

            <div>
              <label class="mb-2 block text-sm font-semibold text-ink">Կմասնակցե՞ս</label>
              <div class="grid grid-cols-3 gap-3">
                <button
                  v-for="opt in [{ v: 'yes', l: 'Այո 🎉' }, { v: 'maybe', l: 'Միգուցե' }, { v: 'no', l: 'Ոչ' }]"
                  :key="opt.v"
                  type="button"
                  class="rounded-2xl border px-3 py-2.5 text-sm font-semibold transition-all"
                  :class="form.attending === opt.v ? 'border-gold-dark bg-gold-light/40 text-ink' : 'border-white/60 bg-white/50 text-ink-soft hover:bg-white/70'"
                  @click="form.attending = opt.v as RsvpForm['attending']"
                >
                  {{ opt.l }}
                </button>
              </div>
              <p v-if="errors.attending" class="mt-1 text-xs font-medium text-sunset-dark">{{ errors.attending }}</p>
            </div>

            <div>
              <label class="mb-1.5 block text-sm font-semibold text-ink">Մեկնաբանություններ</label>
              <textarea
                v-model="form.comments"
                rows="3"
                placeholder="Սննդային նախասիրություններ, երգի ցանկություն կամ որևէ այլ բան..."
                class="w-full resize-none rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-ink placeholder:text-ink-soft/50 outline-none transition focus:border-gold-dark"
              />
            </div>

            <button
              type="submit"
              :disabled="submitting"
              class="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-dark via-sunset to-pink-dark px-8 py-4 text-base font-semibold text-cream shadow-glass transition-transform duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-70"
            >
              <span v-if="!submitting">Ուղարկել Հաստատումը</span>
              <span v-else class="flex items-center gap-2">
                <span class="h-4 w-4 animate-spin rounded-full border-2 border-cream border-t-transparent" />
                Ուղարկվում է...
              </span>
            </button>
          </form>
        </Transition>
      </div>
    </div>
  </section>
</template>
