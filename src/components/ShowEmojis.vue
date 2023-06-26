<template>
    <div class="space-y-16">
        <md-chip-set type="filter">
            <md-filter-chip v-for="e in types" :label="e" @click="pushCurrentType(e)"></md-filter-chip>
        </md-chip-set>

        <div>
            <template v-if="currentTypes.length <= 1">
                <ul class="flex flex-wrap flex-col md:flex-row gap-4">
                    <li 
                        v-for="(e, index) in filter"
                        :key="index"
                        class="w-full md:flex-1 md:flex-grow md:w-auto mx-auto items-stretch text-center p-4 space-y-4 border rounded-xl surface elevation"
                        data-state="reverse"
                    >
                        <md-elevation></md-elevation>
                        <h1 class="text-8xl lg:text-9xl">{{ e.emoji }}</h1>
                        <p class="text-xs">{{ e.name }}</p>
                    </li>
                </ul>
            </template>
            <template v-else>
                <ul class="space-y-8">
                    <li v-for="(title, index) in currentTypes" :key="index" class="flex flex-col gap-4">
                        <h1 class="font-bold text-4xl text-primary">{{ title }}</h1>
                        <ul class="flex flex-row items-stretch gap-4 overflow-x-scroll pl-2 py-4">
                            <li
                                v-for="(e, index) in singleFilter(title)"
                                :key="index"
                                class="p-4 space-y-4 border rounded-xl text-center surface elevation"
                                data-state="reverse"
                            >
                                <md-elevation></md-elevation>
                                
                                <h1 class="text-8xl lg:text-9xl">{{ e.emoji }}</h1>
                                <p class="text-xs text-secondary">{{ e.name }}</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </template>
        </div>

        <nav class="flex items-center justify-end">
            <md-tonal-button @click="increase">More</md-tonal-button>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { Emoji, useEmojiStore } from '@/store/useEmojiStore';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const emojiStore = useEmojiStore()

/**
 * chip-set 过滤器
 */
const types = computed(() => emojiStore.getTypes)
const currentTypes = ref<string[]>([])
const pushCurrentType = (type: string) => {
    if(currentTypes.value.includes(type)) {
        currentTypes.value.splice(currentTypes.value.indexOf(type), 1)
    } else {
        currentTypes.value.push(type)
    }
}

const filter = computed<Emoji[]>(() => {
    let emojis: Emoji[] = []
    if (currentTypes.value.length === 0) {
        emojiStore.getEmojis.forEach(e => emojis.push(...e))
    } else if (emojiStore.getEmojis.has(currentTypes.value[0])) {
        emojis.push(...emojiStore.getEmojis.get(currentTypes.value[0]) as Emoji[])
    }
    return emojis.splice(0, currentMaxIndex.value)
})
const singleFilter = (type: string) => {
    let emojis: Emoji[] = []
    if (emojiStore.getEmojis.has(type)) {
        emojis.push(...emojiStore.getEmojis.get(type) as Emoji[])
    }
    return emojis.splice(0, currentMaxIndex.value)
}

/**
 * 页面显示的最大emoji数量
 * 它在 filter() 和 singleFilter() 中被使用
 */
const currentMaxIndex = ref(50)
const increase = () => {
    currentMaxIndex.value = currentMaxIndex.value + 25
}

onMounted(() => {
    emojiStore.initEmoji() 
})
</script>

<style scoped></style>