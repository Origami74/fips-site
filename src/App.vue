<template>
  <div id="app">
    <SiteHeader />
    <main id="main-content">
      <HeroSection />
      <FeatureBlocks />
      <LearnDiscover />
      <ArchitectureSection />
      <IdentitySection />
      <GetInvolved />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import HeroSection from './components/HeroSection.vue'
import FeatureBlocks from './components/FeatureBlocks.vue'
import ArchitectureSection from './components/ArchitectureSection.vue'
import LearnDiscover from './components/LearnDiscover.vue'
import IdentitySection from './components/IdentitySection.vue'
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