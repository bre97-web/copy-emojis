import { defineStore } from "pinia";
import { Ref, onMounted, ref } from "vue";

const useDarkStore = defineStore('dark_store', () => {
    const isDark = ref<boolean>(false)

    const getIsDark = (): Ref<boolean> => isDark
    const setDark = (flag: boolean): void => {
        isDark.value = flag
        syncHTML()
    }
    const toggleDark = () => {
        isDark.value = !isDark.value
        syncHTML()
    }
    const syncHTML = () => {
        if(isDark.value) {
            document.querySelector('html')?.classList.add('dark')
        } else {
            document.querySelector('html')?.classList.remove('dark')
        }
    }

    onMounted(() => {
        syncHTML()
    })

    return {
        isDark,
        getIsDark,
        setDark,
        toggleDark,
        syncHTML
    }
})

export { useDarkStore }