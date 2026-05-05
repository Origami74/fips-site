<template>
  <div id="app">
    <SiteHeader />
    <main id="main-content">
      <HeroSection />
      <FeatureBlocks />
      <LearnDiscover />
      <GetInvolved />
    </main>
    <SiteFooter />

    <!-- Demo: floating variant in the bottom-right corner. -->
    <airplane-ready variant="floating" position="bottom-right"></airplane-ready>
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureBlocks from './components/FeatureBlocks.vue'
import LearnDiscover from './components/LearnDiscover.vue'
import GetInvolved from './components/GetInvolved.vue'
</script>

<style>
@import './style/variables.css';
@import './style/base.css';
</style>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

#main-content {
  flex: 1;
}
</style>