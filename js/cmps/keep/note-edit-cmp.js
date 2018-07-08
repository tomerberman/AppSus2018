import keepService from '../../services/keep-service.js';
import noteTxt from './note-txt-cmp.js'
import noteImg from './note-img-cmp.js'
import noteAudio from './note-audio-cmp.js'


export default {
    template: `
        <section class="note-edit" v-if="note">
            <h1>note Edit</h1>
            <button @click="$router.push('/keep')"><i class="fas fa-angle-left"></i> Back</button>
            <component :is="note.noteType" :note="note" :curr-mode="'edit'" v-if="note"></component>
        
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

