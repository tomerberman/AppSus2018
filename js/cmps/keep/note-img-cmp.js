// import eventBus, {USR_MSG_DISPLAY} from '../services/event-bus.service.js'
import controls from './controls-cmp.js'


export default {
    template: `
        <section class="note ">
            <h1> {{data.title}} </h1>
            <div class="content">
              <img :src="data.src" />
            </div>
            <controls></controls>
        </section>
    `,
    props: ['data'],
    data() {
        return {
            msg: null
        }
    },
    created() {

    },
    methods: {
        closeMsg() {
            this.msg = null;
        }
    },
    components: {
        controls
    }
}