import { defineStore } from "pinia";
import { Emoji } from "./useEmojiStore";


const useFavoriteStore = defineStore('favorite_store', {
    state: () => ({
        favorites: [] as Emoji[]
    }),
    getters: {
        getFavorites: (state): Emoji[] => state.favorites
    },
    actions: {
        /**
         * favorites内部的元素是唯一的，push会判断favorites内部是否存在将要添加的元素
         */
        push(e: Emoji) {
            if(!this.favorites.includes(e)) {
                this.favorites.push(e)
            }
        },
        remove(e: Emoji) {
            this.favorites.splice(this.favorites.indexOf(e), 1)
        },
        toggle(e: Emoji) {
            if(this.favorites.includes(e)) {
                this.favorites.splice(this.favorites.indexOf(e), 1)
            } else {
                this.favorites.push(e)
            }
        }
    },
    persist: true
})

export { useFavoriteStore }