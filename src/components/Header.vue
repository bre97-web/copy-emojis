<template>
    <header class="shadow px-2 flex justify-between items-center">
        <Title></Title>

        <nav class="space-x-2 flex">
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
        <h1 class="font-bold text-primary">Copy Emojis!</h1>
        <p class="text-primary ">Preview</p>
    </section>
)
const Button = ({ label }: { label: string}) => (
    <button data-state="reverse" class="bg-transparent hover:surface rounded-md px-4 py-2">
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