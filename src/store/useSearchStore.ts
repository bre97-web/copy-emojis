import { defineStore } from "pinia"

const useSearchStore = defineStore('search_store', {
    state: () => ({
        keyword: '' as string
    }),
    getters: {
        getKeyword: (state) => state.keyword
    },
    actions: {
        setKeyword(keyword: string) {
            this.keyword = keyword
        }
    },
    persist: false
})

export { useSearchStore }
