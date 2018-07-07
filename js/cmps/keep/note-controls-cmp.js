// import eventBus, {USR_MSG_DISPLAY} from '../services/event-bus.service.js'
import bus from '../../services/event-bus.service.js'


export default {
    template: `
        <section class="controls">
            <button @click="deleteNote(note.id)">delete</button>
            <button  v-if="currMode !== 'edit'" @click="editNote(note.id)">edit</button>
            <button @click="pinNote(note.id)">pin</button>
            <button  v-if="currMode === 'list'" @click="previewNote(note.id)">preview</button>
        </section>
    `,
    props: ['note', 'currMode'],
    data() {
        return {
            noteId: this.note.id
        }
    },
    created() {
        // console.log(this.noteId);
    },
    methods: {
        deleteNote(noteId) {
            bus.$emit('deleteNote', noteId);
            // console.log('delete', noteId);
        },
        editNote(noteId) {
            bus.$emit('editNote', noteId);
            // console.log('delete', noteId);
        },
        previewNote(noteId) {
            bus.$emit('previewNote', noteId);
            // console.log('delete', noteId);
        },
        pinNote(noteId) {
            bus.$emit('pinNote', noteId);
            // console.log('delete', noteId);
        },
        
    }
}
