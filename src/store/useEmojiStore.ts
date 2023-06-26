import { defineStore } from "pinia"
import EmojiJson from '@/assets/git_emojis.json'
import { Ref, onMounted, ref } from "vue"

type Emoji = {
    emoji: string,
    name: string,
    fallback_url: string
}

const useEmojiStore = defineStore('emoji_store', () => {
        const emojis = ref<Map<string, Emoji[]>>(new Map())
        const types = ref<string[]>([])

        const getEmojis = (): Ref<Map<string, Emoji[]>> => emojis
        const getTypes = (): Ref<string[]> => types

        const _flat = (item: any, preKey: string = "", res: Emoji[] = []) => {
            var title = ''
            const target = ['name', 'emoji']
            var tmp: string[] = []
            Object.entries(item).forEach(([key, val]) => {
                if(target.includes(key)) {
                    tmp.push(val as string)
                } else if(key === 'fallback_url') {
                    tmp.push(val as string)
                    res.push({
                        emoji: tmp[0],
                        name: tmp[1],
                        fallback_url: tmp[2]
                    })
                    tmp = []
                } else if(val && typeof val === "object") {
                    _flat(val, preKey + key + "-", res)
                } else {
                    title = val as string
                }
            })
            return {
                title: title,
                content: res
            };
        }
        const initEmoji = () => {
            var map = new Map<string, Emoji[]>()
            Object.entries(EmojiJson).forEach(e => {
                let res = _flat(e)
                let title = res.title
                let content = res.content
                map.set(title ,content)
                types.value.push(title)
            })
            emojis.value = map
        }

        onMounted(() => {
            initEmoji()
        })

        return {
            getEmojis,
            getTypes,
        }
    }
)

export { useEmojiStore }
export type { Emoji }
