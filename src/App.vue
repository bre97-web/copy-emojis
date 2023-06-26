<template>
  <div class="background noScrollY">
    <Header class="fixed top-0 right-0 z-50 w-full"></Header>

    <main class="py-28 px-8 container min-h-screen mx-auto">
      <router-view v-slot="{ Component }">
        <component :is="Component"></component>
      </router-view>
    </main>

    <nav class="container">
      <md-branded-fab lowered class="fixed right-8 bottom-8" label="Go Top" @click="goTop">
        <md-icon slot="icon">arrow_upward</md-icon>
      </md-branded-fab>
    </nav>

    <footer>

    </footer>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue'

const goTop = async () => {

  const delay = (event: any) => new Promise<void>(resolve => setTimeout(() => {
    event()
    resolve()
  }, 5))

  const run = async (fn: () => void) => await delay(fn)

  for (let obj = {
    num: document.documentElement.scrollTop,
    step: 1
  }; obj.num >= 0; obj.num = obj.num - obj.step) {
    await run(() => {
      document.body.scrollTop = obj.num
      document.documentElement.scrollTop = obj.num
    })
    obj.step += 0.5
  }
}


</script>

<style scoped></style>