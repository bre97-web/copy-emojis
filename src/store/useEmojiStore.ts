import { defineStore } from "pinia"
import EmojiJson from '@/assets/git_emojis.json'

type Emoji = {
    emoji: string,
    name: string,
    fallback_url: string
}

const useEmojiStore = defineStore('emoji_store', {
    state: () => ({
        emojis: new Map() as Map<string, Emoji[]>,
        types: [] as string[]
    }),
    getters: {
        getEmojis: (state) => state.emojis,
        getTypes: (state) => state.types
    },
    actions: {
        initEmoji() {
            const flat = (item: any, preKey: string = "", res: Emoji[] = []) => {
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
                        flat(val, preKey + key + "-", res)
                    } else {
                        title = val as string
                    }
                })
                return {
                    title: title,
                    content: res
                };
            }
   
            var map = new Map<string, Emoji[]>()
            Object.entries(EmojiJson).forEach(e => {
                let res = flat(e)
                let title = res.title
                let content = res.content
                map.set(title ,content)
                this.types.push(title)
            })

            this.emojis = map
        }
    },
    persist: false
})

export { useEmojiStore }
export type { Emoji }
