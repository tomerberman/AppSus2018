// import eventBus, {USR_MSG_DISPLAY} from '../services/event-bus.service.js'


export default {
    template: `
        <section class="controls">
            <button @click="closeMsg(this)">delete</button>
            <button @click="closeMsg(this)">edit</button>
            <button @click="closeMsg(this)">pin</button>
        </section>
    `,
    data(){
        return {
            msg: null
        }
    },
    created() {
        // eventBus.$on(USR_MSG_DISPLAY, msg => {
        //     this.msg = msg;
        //     setTimeout(this.closeMsg, 3000);
        // })
        
    },
    methods:{
        closeMsg(id){
            this.msg = null;
            console.log('clicked', id);
            
        }
    }
}