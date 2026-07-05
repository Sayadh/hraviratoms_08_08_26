import { computed, reactive, readonly } from 'vue'

const STORAGE_KEY = 'gender-reveal-votes'
const MY_VOTE_KEY = 'gender-reveal-my-vote'

type Vote = 'boy' | 'girl'

interface VoteState {
  boy: number
  girl: number
  myVote: Vote | null
}

function loadInitial(): VoteState {
  if (typeof window === 'undefined') return { boy: 24, girl: 21, myVote: null }
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    const myVote = window.localStorage.getItem(MY_VOTE_KEY) as Vote | null
    if (saved) {
      const parsed = JSON.parse(saved) as { boy: number; girl: number }
      return { boy: parsed.boy, girl: parsed.girl, myVote }
    }
  } catch {
    // ignore corrupt storage
  }
  // Friendly starting seed so the section doesn't look empty on first visit.
  return { boy: 24, girl: 21, myVote: null }
}

const state = reactive<VoteState>(loadInitial())

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ boy: state.boy, girl: state.girl }))
    if (state.myVote) window.localStorage.setItem(MY_VOTE_KEY, state.myVote)
  } catch {
    // storage unavailable (private mode, etc.) — fail silently
  }
}

export function useGenderVotes() {
  const total = computed(() => state.boy + state.girl)
  const boyPercent = computed(() => (total.value ? Math.round((state.boy / total.value) * 100) : 50))
  const girlPercent = computed(() => 100 - boyPercent.value)

  function vote(choice: Vote) {
    if (state.myVote === choice) return
    if (state.myVote === 'boy') state.boy--
    if (state.myVote === 'girl') state.girl--
    state[choice]++
    state.myVote = choice
    persist()
  }

  return {
    state: readonly(state),
    total,
    boyPercent,
    girlPercent,
    vote,
  }
}
