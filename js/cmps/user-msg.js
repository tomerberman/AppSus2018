import eventBus, {USR_MSG_DISPLAY} from '../services/event-bus.service.js'


export default {
    template: `
        <section v-if="msg" class="user-msg" :class="msg.type">
            <button @click="closeMsg">X</button>
            <h1>{{msg.txt}}</h1>
        </section>
    `,
    data(){
        return {
           msg: null
        }
    },
    created() {
        eventBus.$on(USR_MSG_DISPLAY, msg => {
            this.msg = msg;
            setTimeout(this.closeMsg, 3000);
        })
        
    },
    methods:{
        closeMsg(){
            this.msg = null;
        }
    }
}