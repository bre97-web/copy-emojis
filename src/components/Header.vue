<template>
    <header class="backdrop-blur-lg px-2 py-1 flex justify-between items-center">
        <Title></Title>

        <nav class="space-x-2 flex justify-stretch">
            <router-link to="/">
                <Button label="Emoji"></Button>
            </router-link>    
            <router-link to="/favorites">
                <Button label="Favorites"></Button>
            </router-link>
        </nav>

        <DarkSwitch></DarkSwitch>
    </header>
</template>

<script setup lang="tsx">
import DarkSwitch from './DarkSwitch.vue'

const Title = () => (
    <section class="flex flex-col">
        <h1 class="font-bold text-[--md-sys-color-on-inverse-primary]">Copy Emojis!</h1>
        <p class="text-[--md-sys-color-on-inverse-secondary]">Preview</p>
    </section>
)
const Button = ({ label }: { label: string}) => (
    <button data-state="reverse" class="text-[--md-sys-color-on-inverse-primary] hover:bg-black/5 rounded-md px-4 py-2">
        <md-elevation></md-elevation>
        { label }
    </button>
)
</script>

<style scoped>
.active {
    @apply font-bold;
}
</style>