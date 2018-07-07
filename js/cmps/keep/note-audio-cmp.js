// import eventBus, {USR_MSG_DISPLAY} from '../services/event-bus.service.js'
import noteControls from './note-controls-cmp.js'


export default {
    template: `
        <section class="note ">
        <h1 v-if="currMode !== 'edit'"> {{note.data.title}} </h1>
        <h1 v-if="currMode === 'edit'">
                <input type="text" v-model="note.data.title"/>
        </h1>
            <div class="content">
                <audio ref="audio" controls>
                    <source  :src="note.data.src" type="audio/mp3">
                    Your browser does not support the audio tag.
                </audio>
                <div v-if="currMode === 'edit'">
                    <input  type="text" v-model="note.data.src" @input="reloadSound()"/>
                </div>
            </div>
            <note-controls :note="note" :currMode="currMode"></note-controls>
        </section>
    `,
    props: ['note', 'currMode'],
    data() {
        return {
            // title: this.note.data.title,
            // url
        }
    },
    created() {

    },
    methods: {
         reloadSound() {
            this.$refs.audio.load(); //call this to just preload the audio without playing
             //this.$refs.audio.play();
            // this.$refs.img.src = imgUrl;
            // console.log(this.$refs.img);

            // this.$refs.img.onerror = function () {
            //     console.log("error!!!!!!!!!");
            //     this.$refs.img.src = "http://via.placeholder.com/350x150";
            //     return;
            // };
            
    
            // //  this.$refs.img.src = imgUrl;
            //  this.note.data.src = imgUrl;
            
        }
    },
    components: {
        noteControls
    }
}