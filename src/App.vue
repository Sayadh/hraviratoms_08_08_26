<script setup lang="ts">
import { useLenis } from '@/composables/useLenis'
import NavBar from '@/components/layout/NavBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import CountdownSection from '@/components/sections/CountdownSection.vue'
import GenderPredictionSection from '@/components/sections/GenderPredictionSection.vue'
import ScheduleSection from '@/components/sections/ScheduleSection.vue'
import GamesSection from '@/components/sections/GamesSection.vue'
import GallerySection from '@/components/sections/GallerySection.vue'
import LocationSection from '@/components/sections/LocationSection.vue'
import DressCodeSection from '@/components/sections/DressCodeSection.vue'
import RsvpSection from '@/components/sections/RsvpSection.vue'
import FinalSection from '@/components/sections/FinalSection.vue'

useLenis()
</script>

<template>
  <div class="min-h-screen bg-cream">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <CountdownSection />
      <GenderPredictionSection />
      <ScheduleSection />
      <GamesSection />
      <GallerySection />
      <LocationSection />
      <DressCodeSection />
      <RsvpSection />
      <FinalSection />
    </main>
    <AppFooter />
  </div>
</template>
