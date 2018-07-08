// import eventBus, {USR_MSG_DISPLAY} from '../services/event-bus.service.js'
import noteControls from './note-controls-cmp.js'



export default {
    template: `
        <section class="note">
        <h1 v-if="currMode !== 'edit' && currMode !== 'new'"> {{note.data.title}} </h1>
        <h1 v-if="currMode === 'edit' || currMode === 'new'">
                <input type="text" v-model="note.data.title" placeholder="Enter title"/>
        </h1>
            <div class="content">
              <img ref="img" :src="note.data.src" />
              <div v-if="currMode === 'edit'  || currMode === 'new'">
                    <input type="text" v-model="note.data.src" placeholder="Enter image url"/>
                </div>
            </div>
            

            <note-controls :note="note" :currMode="currMode"></note-controls>
        </section>
    `,
    props: ['note', 'currMode'],
    data() {
        return {
            // title: this.note.data.title,
        }
    },
    created() {
        // console.log('note-img created');
    },
    methods: {
        // setImg(imgUrl) {
        //     // this.$refs.img.src = imgUrl;
        //     console.log(this.$refs.img);

        //     this.$refs.img.onerror = function () {
        //         console.log("error!!!!!!!!!");
        //         this.$refs.img.src = "http://via.placeholder.com/350x150";
        //         return;
        //     };
            
    
        //     //  this.$refs.img.src = imgUrl;
        //      this.note.data.src = imgUrl;
            
        // }
    },
    components: {
        noteControls
    }
}