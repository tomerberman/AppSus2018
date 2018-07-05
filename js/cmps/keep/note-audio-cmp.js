// import eventBus, {USR_MSG_DISPLAY} from '../services/event-bus.service.js'
import controls from './controls-cmp.js'


export default {
    template: `
        <section class="note ">
            <h1> {{data.title}} </h1>
            <div class="content">
                <audio controls>
                    <source :src="data.src" type="audio/mp3">
                    Your browser does not support the audio tag.
                </audio>
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