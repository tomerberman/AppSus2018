// import eventBus, {USR_MSG_DISPLAY} from '../services/event-bus.service.js'


export default {
    template: `<section class="note "> {{data.txt}} </section>`,
    props: ['data'],
    data(){
        return {
           msg: null
        }
    },
    created() {
       console.log('note-txt created');
    },
    methods:{
       
    }
}
