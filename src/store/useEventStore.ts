import moment from "moment";
import { defineStore } from "pinia";

type Event = {
    msg: string,
    index?: number
}

const useEventStore = defineStore('event_store', {
    state: () => ({
        events: [] as Event[]
    }),
    getters: {
        getEvents: (state) => state.events || {msg: ''}
    },
    actions: {
        push(event: Event) {
            let e = {
                msg: event.msg,
                index: parseInt(moment().format('x'))
            }
            this.events.push(e)
            setTimeout(() => {
                this.events.splice(this.events.indexOf(e), 1)
            }, 5000)
        }
    },
    persist: false
})

export { useEventStore }
export type { Event }
