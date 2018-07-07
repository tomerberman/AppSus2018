import keepService from '../../services/keep-service.js';
import noteTxt from './note-txt-cmp.js'
import noteImg from './note-img-cmp.js'
import noteAudio from './note-audio-cmp.js'


export default {
    template: `
        <section  class="note-edit" v-if="note">
            <button @click="$router.push('/keep')">back</button>
            <h1>note Edit</h1>

            <component :is="note.noteType" :note="note" :curr-mode="'edit'" v-if="note"></component>
           
            <pre>
                {{note}}

                {{currMode}}
            </pre>
        </section>
    `,
    data() {
        return {
            note: null,
            currMode:'edit'
        }
    },
    created() {
        this.loadNote()
    },
    methods: {
        loadNote() {
            keepService
                .getNoteById(this.$route.params.noteId)
                .then(note => {  
                    this.note = note;
                });
        },
        gotSrc() {
               return this.note.data.hasOwnProperty('src');
        }
    },
    watch: {
        '$route.params.noteId': function (newNoteId) {
            console.log('$route.params.noteId has changed!', newNoteId);
            this.loadNote();
        }
    },
    components: {
        noteTxt,
        noteImg,
        noteAudio
    }
}


// <div>
// <label for="title">Title:</label> 
// <input type="text" v-model="note.data.title"/>
// </div>
// <div v-if="gotSrc()">
// <label for="txt"> Audio src:</label> 
// <input type="text" v-model="note.data.src"/>
// </div>