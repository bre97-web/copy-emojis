<template>
    <div class="space-y-16">
        <SearchInput></SearchInput>

        <EmojiChipSet :types="types" :push-current-type="pushCurrentType"></EmojiChipSet>

        <div>
            <EmojiSet :row="!isSingleType && searchStore.getKeyword.length === 0">
                <SearchResult v-if="searchStore.getKeyword.length !== 0" :emojis="filter({clip: false})"></SearchResult>
                <template v-else>
                    <template v-if="isSingleType">
                        <EmojiCard v-for="(e, index) in filter({})" :key="index" :emoji="e"></EmojiCard>
                    </template>
                    <template v-else>
                        <li v-for="(title, index) in currentTypes" :key="index" class="flex flex-col gap-4">
                            <h1 class="font-bold text-4xl text-primary">{{ title }}</h1>
                            <ul class="flex flex-row items-stretch gap-4 overflow-x-scroll pl-2 py-4">
                                <EmojiCard v-for="(e, index) in filter({types: [title]})" :key="index" :emoji="e"></EmojiCard>
                            </ul>
                        </li>
                    </template>
                </template>

            </EmojiSet>
        </div>

        <nav class="flex items-center justify-end">
            <md-tonal-button @click="increase">More</md-tonal-button>
        </nav>
    </div>
</template>

<script setup lang="ts">
import { Emoji, useEmojiStore } from '@/store/useEmojiStore'
import { computed, ref } from 'vue'
import EmojiCard from './EmojiCard.vue'
import EmojiChipSet from './EmojiChipSet.vue'
import EmojiSet from './EmojiSet.vue'
import SearchResult from './SearchResult.vue'
import SearchInput from './SearchInput.vue'
import { useSearchStore } from '@/store/useSearchStore'

const emojiStore = useEmojiStore()
const searchStore = useSearchStore()

/**
 * types返回emojiStore中的types
 */
const types = computed(() => emojiStore.getTypes().value)

/**
 * chip-set 过滤器
 * currentTypes包含的字符串都是一个规则，currentTypes.includes(e)为true时是符合规则的
 */
const currentTypes = ref<string[]>([])

/**
 * 向currentTypes激活一条数据，如果元素存在则删除元素，如果元素不存在则添加元素
 */
const pushCurrentType = (type: string) => {
    if (currentTypes.value.includes(type)) {
        currentTypes.value.splice(currentTypes.value.indexOf(type), 1)
    } else {
        currentTypes.value.push(type)
    }
}

/**
 * 当选择的规则（currentTypes）的元素个数小于等于1时返回true
 * 它代表当前选择的过滤器的个数
 * 当过滤器个数为0或1时，DOM中的元素排列是flex-row
 * 当过滤器个数大于1时，DOM中的元素排列是flex-col
 */
const isSingleType = computed<boolean>(() => currentTypes.value.length <= 1)

/**
 * 过滤出符合currentTypes的所有元素
 * 当currentTypes元素个数为0时，不过滤（返回所有emoji元素）
 * 
 * 当types没有传递时，默认值为currentTypes，这意味着全部的emoji将被返回
 * 当clip没有传递时，默认值为true，这意味着会截取currentMaxIndex个参数返回
 */
const filter = ({types = currentTypes.value, clip = true}: { types?: string[], clip?: boolean}): Emoji[] => {
    let emojis: Emoji[] = []
    if (types.length === 0) {
        emojiStore.getEmojis().value.forEach(e => emojis.push(...e))
    } else {
        types.forEach(e => {
            if(emojiStore.getEmojis().value.has(e)) {
                emojis.push(...emojiStore.getEmojis().value.get(e) as Emoji[])
            }
        })
        
    }
    if(clip) {
        return emojis.splice(0, currentMaxIndex.value)
    }
    return emojis
}
/**
 * 页面显示的最大emoji数量
 * 它在 filter() 和 singleFilter() 中被使用
 */
const currentMaxIndex = ref(50)
const increase = () => {
    currentMaxIndex.value = currentMaxIndex.value + 25
}
</script>

<style scoped></style>